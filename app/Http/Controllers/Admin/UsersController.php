<?php

namespace App\Http\Controllers\Admin;

use App\Company;
use App\Form;
use App\Mail\DispatchToUsersOrBcp;
use App\Mail\RegisterBcp;
use App\Mail\RegisterUser;
use App\Question;
use App\QuestionUser;
use App\Role;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Validator;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    /**
     * Show all of the users for the application.
     *
     * @param Request $request Get all users or paginate
     * @return Response
     */
    public function index(Request $request): Response
    {
        return response([
            'data' => $request->all == 'true' ? User::with('role_user')->with('creation_user')->get() : User::with('role_user')->with('company')->with('creation_user')->orderBy('id', 'desc')->paginate(100)
        ], 200);
    }

    /**
     * Show available (users without companies) users for the application.
     *
     * @return Response
     */
    public function available($role = false): Response
    {
        return response([
            'data' => $role == 1 ? User::has('company', '<', 1)->get() : User::has('company', '<', 1)
                ->whereHas('role_user', function ($query) use ($role) {
                $query->where('name', $role);
                })
                ->get()
        ], 200);
    }

    /**
     * Get user company.
     *
     * @param int $id User id
     * @return Response
     */
    public function getCompany(int $id): Response
    {
        $user = User::findOrFail($id);
        return response([
            'data' => $user->company()->first()
        ], 200);
    }

    /**
     * Get user questions
     *
     * @param int $id User id
     * @param int $form_id Form id
     * @return Response
     */
    public function getQuestions($id, $form_id): Response
    {
        return response([
            'data' => User::find($id)->questions()->where('form_id', $form_id)->get()
        ], 200);
    }

    /**
     * Store new user.
     *
     * @param Request $request User data
     * @return Response
     */
    public function store(Request $request): Response
    {
        $rules = [
            'name' => 'required',
            'email' => 'unique:users|required|email',
            'password' => 'required|confirmed|min:8',
            'password_confirmation' => 'required',
            'role' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $messages = $validator->messages();

            return response([
                'error' => $messages
            ], 400);
        } else {
            $data = $request->all();
            $data['creation_date'] = time();
            $data['creation_user'] = Auth::user()->id;
            $user = User::create($data);
            $user->attachRole($request->role);

            return response([
                'success' => true, 'data' => $user
            ], 201);
        }
    }

    /**
     * Show user.
     *
     * @param int $id User id
     * @throws ModelNotFoundException If user is not found
     * @return Response
     */
    public function show(int $id): Response
    {
        try{
            $user = User::with('role_user', 'company')->findOrFail($id);
            return response([
                'data' => $user
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Update user info.
     *
     * @param int $id User id
     * @param Request $request User data
     * @throws ModelNotFoundException If user is not found
     * @return Response
     */
    public function update(int $id, Request $request): Response
    {
        try{
            $user = User::findOrFail($id);
            $rules = [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $request->id. ',id',
                'role' => 'required'
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                $messages = $validator->messages();
                return response([
                    'error' => $messages
                ], 400);
            } else {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->save();

                $user->detachRoles();
                $user->attachRole($request->role);

                return response([
                    'success' => true, 'data' => $user
                ], 200);
            }
        }catch (ModelNotFoundException $e){
            return response([
                'error' => $messages
            ], 400);
        }
    }


    /**
     * Store or update user questions.
     *
     * @param int $company_id Company id
     * @param int $form_id Form id
     * @param Request $request User data
     * @return Response
     */
    public function storeAssign(Request $request, $company_id, $form_id): Response
    {
        $users = $request->users;
        $questions = $request->data;

        $old_users = [];
        $new_users = [];

        foreach ($users as $item){
            $rules = [
                'email' => 'required|email',
            ];

            $validator = Validator::make($item, $rules);
            if ($validator->fails()) {
                $messages = $validator->messages();
                return response([
                    'error' => $messages
                ], 400);
            } else {
                $user = User::where('email', $item['email'])->first();
                if($user){
                    array_push($old_users, $item);
                    // Detach old questions
                    $this->detachQuestions($user, $form_id);
                    // Attach new questions and company
                    $user->questions()->attach($questions);
                    $user->company()->detach();
                    $user->company()->attach($company_id);
                }else{
                    array_push($new_users, $item);
                    // Create user
                    $token = Str::random(60);
                    $user = User::create([
                        'name' => '',
                        'email' => $item['email'],
                        'password' => '',
                        'password_token' => $token,
                        'creation_date' => time(),
                        'creation_user' => Auth::user()->id
                    ]);
                    // Attach new questions, company and role
                    $tmp_role = new Role();
                    $user->attachRole($tmp_role->getBySlug('user')->id);
                    $user->questions()->attach($questions);
                    $user->company()->detach();
                    $user->company()->attach($company_id);
                }
            }
        }

        return response([
            'success' => true
        ], 200);
    }


    /**
     * Store questions to bcp.
     *
     * @param int $company_id Company id
     * @param int $form_id Form id
     * @param Request $request Questions data
     * @return Response
     */
    public function storeQuestionsToBcp($company_id, $form_id, Request $request): Response
    {
        $questions =  $request->all();
        $company = new Company();
        $users = $company->findOrFail($company_id)->users()->get();

        foreach ($users as $user) {
            $user = User::findOrFail($user['id']);
            if($user->hasRole('bcp')){
                $this->detachQuestions($user, $form_id);
                $user->questions()->attach($questions);
            }
        }
        return response([
            'success' => true
        ], 200);
    }

    /**
     * Assign questions
     *
     * @param int $id User id
     * @param int $form_id Form id
     * @param Request $request Questions data
     * @return Response
     */
    public function setQuestions($id, $form_id, Request $request): Response
    {
        try{
            $user = User::findOrFail($id);
            // Detach old questions
            $data_old = $this->detachQuestions($user, $form_id);
            // Attach new questions
            $data_new = [];
            foreach ($request->all() as $item) {
                array_push($data_new, $item['id']);
            }
            $user->questions()->attach($data_new);

            return response([
                'success' => $data_old
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    private function detachQuestions($user, $form_id){
        $old_ids = $user->questions()->where('form_id', $form_id)->get();
        $data_old = [];
        foreach ($old_ids as $item) {
            array_push($data_old, $item['id']);
        }
        if(!empty($data_old)){
            $user->questions()->detach($data_old);
        }
        return $data_old;
    }

    /**
     * Update user  password.
     *
     * @param int $id User id
     * @param Request $request Password data
     * @throws ModelNotFoundException If user is not found
     * @return Response
     */
    public function setPassword(int $id, Request $request): Response
    {
        try{
            $user = User::findOrFail($id);
            $rules = [
                'password' => 'required|confirmed|min:8',
                'password_confirmation' => 'required'
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                $messages = $validator->messages();
                return response([
                    'error' => $messages
                ], 400);
            } else {
                $user->password = $request->password;
                $user->save();

                return response([
                    'success' => true, 'data' => $user
                ], 200);
            }
        }catch (ModelNotFoundException $e){
            return response([
                'error' => $messages
            ], 400);
        }
    }

    /**
     * Dispatch to bcp or users.
     *
     * @param string $role User role
     * @param int $company_id Company id
     * @return Response
     */
    public function dispatchToUsers(string $role, int $company_id): Response
    {
        try{
            $users = $this->assignedUsersOfCompany($role, $company_id);
            // Send Mail
            foreach ($users as $item) {
                $user = User::findOrFail($item['id']);
                if($user->hasRole($role)){
                    if($role == 'user'){
                        Mail::to($user)->send(new RegisterUser($user, $user->password_token));
                    }else{
                        // Send mail to BCp
                        Mail::to($user)->send(new RegisterBcp($user, $user->password_token));
                    }
                }
            }
            return response([
                'success' => true
            ], 200);
        }catch (Exception $e){
            return $e->getMessage();
        }

    }

    /**
     * Dispatch to bcp or users - list preview.
     *
     * @param string $role User role
     * @param int $company_id Company id
     * @return Response
     */
    public function dispatchToUsersPreview(string $role, int $company_id): Response
    {
        try{
            $data = [];

            $forms = Form::where('company_id', $company_id)->get();

            foreach ($forms as $item) {
                $form = new Form();
                $form = $form->findOrFail($item['id']);
                $questions = $form->questions;
                $question_users = [];
                foreach ($questions as $item) {
                    $question = new Question();
                    $question = $question->findOrFail($item['id']);
                    $question_u = $question->users;
                    $temp_u = [];
                    foreach ($question_u as $item) {
                        $user = User::findOrFail($item['id']);
                        if($user->hasRole($role)){
                            array_push($temp_u, $user);
                        }
                    }
                    array_push($question_users, [
                        'question' => $question,
                        'users' => $temp_u
                    ]);
                }
                array_push($data, [
                    'form' => $form,
                    'questions_users' => $question_users,
                ]);
            }

            return response([
                'success' => true,
                'data' => $data
            ], 200);
        }catch (Exception $e){
            return $e->getMessage();
        }
    }

    private function assignedUsersOfCompany(string $role, int $company_id){
        try{
            $forms = Form::where('company_id', $company_id)->get();
            $data = [];
            foreach ($forms as $item) {
                $form = new FormsController();
                $users = $form->users($item->id);
                foreach ($users as $i) {
                    $user = User::findOrFail($i);
                    if($user->hasRole($role)){
                        array_push($data, $user);
                    }
                }
            }
            return array_unique($data);
        }catch (ModelNotFoundException $e){
            throw new Exception('User not found');
        }
    }

    /**
     * Delete user.
     *
     * @param int $id User id
     * @return Response
     */
    public function destroy(int $id): Response
    {
        if(isset($id)){
            User::destroy($id);
            return response([
                'success' => true
            ], 200);
        }else{
            return response([
                'error' => true
            ], 400);
        }
    }
    
}
