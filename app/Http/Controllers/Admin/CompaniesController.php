<?php

namespace App\Http\Controllers\Admin;

use App\Form;
use App\Mail\RegisterBcp;
use App\Question;
use App\Role;
use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Validator;
use App\Company;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    /**
     * Show all of the companies for the application.
     *
     * @param Request $request Company data
     * @return Response
     */
    public function index(Request $request): Response
    {
        if($request->all == 'true'){
            $companies = Company::get();
        }else{
            $companies = Company::with('users')->with('creation_user')->orderBy('id', 'desc')->paginate(100);
            foreach ($companies as $company) {
                foreach ($company['users'] as $item) {
                    $user = User::findOrFail($item['id']);
                    if($user->hasRole('bcp')){
                        $company['bcp'] = $user;
                    }
                }
            }
        }
        return response([
            'data' => $companies
        ], 200);
    }

    /**
     * Store new company.
     *
     * @param Request $request Company data
     * @return Response
     */
    public function store(Request $request): Response
    {
        $rules = [
            'code' => 'unique:companies|required',
            'name' => 'required',
            'bcp_name' => 'required',
            'bcp_email' => 'required|unique:users,email',
        ];

        $validator = Validator::make($request->data, $rules);
        if ($validator->fails()) {
            $messages = $validator->messages();

            return response([
                'error' => $messages
            ], 400);
        } else {

            // Create company
            $data = $request->data;
            if($request->file('avatar')){
                // Load company logo
                $logo_name = md5($data['code']).'.'.$request->avatar->extension();
                $request->file('avatar')->storeAs('public/companies/avatars', $logo_name);
                $data['logo'] = $logo_name;
            }
            $data['creation_date'] = time();
            $data['creation_user'] = Auth::user()->id;
            $company = Company::create($data);

            // Create forms
            $forms = new FormsController();
            $t_f = $forms->store($company->id);

            // Create BCp
            $token = Str::random(60);
            $user = User::create([
                'name' => $data['bcp_name'],
                'email' => $data['bcp_email'],
                'password' => '',
                'password_token' => $token,
            ]);
            $tmp_role = new Role();
            $user->attachRole($tmp_role->getBySlug('bcp')->id);
            // Attach company to BCp
            $user->company()->attach($company->id);

            // Assign him questions
            $this->assignAllQuestions($user->id, $company->id);

            return response([
                'success' => true, 'data' => $t_f
            ], 201);
        }
    }

    /**
     * Assign all questions.
     *
     * @param int $user_id User id
     * @param int $company_id Company id
     * @throws ModelNotFoundException If user or company is not found
     * @return Response
     */
    public function assignAllQuestions($user_id, $company_id)
    {
        try{
            $user = User::findOrFail($user_id);

            $company = new Company();
            $forms = $company->findOrFail($company_id)->forms()->get();

            foreach ($forms as $item) {
                $form = new Form();
                $questions = $form->findOrFail($item->id)->questions()->pluck('id')->toArray();
                $user->questions()->attach($questions);
            }
            return response([
                'success' => true
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }

    }

    /**
     * Show company.
     *
     * @param int $id Company id
     * @throws ModelNotFoundException If company is not found
     * @return Response
     */
    public function show(int $id): Response
    {
        try{
            $company = Company::with('users')->findOrFail($id);
            foreach ($company['users'] as $item) {
                $user = User::findOrFail($item['id']);
                if($user->hasRole('bcp')){
                    $company['bcp'] = $user;
                }
            }
            return response([
                'data' => $company
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Update company.
     *
     * @param int $id Company id
     * @param Request $request Company data
     * @throws ModelNotFoundException If company is not found
     * @return Response
     */
    public function update(int $id, Request $request): Response
    {
        try{
            $company = Company::findOrFail($id);
            $rules = [
                'code' => 'required|unique:companies,code,' . $request->id. ',id',
                'name' => 'required'
            ];

            $validator = Validator::make($request->data, $rules);
            if ($validator->fails()) {
                $messages = $validator->messages();

                return response([
                    'error' => $messages
                ], 400);
            } else {
                $data = $request->data;
                $company->name = $data['name'];
                $company->code = $data['code'];
                if($request->file('avatar')){
                    // Load company logo
                    $logo_name = md5($data['code']).'.'.$request->avatar->extension();
                    $request->file('avatar')->storeAs('public/companies/avatars', $logo_name);
                    $company->logo = $logo_name;
                }
                $company->save();

                $company->users()->detach();
                $company->users()->attach($data['bcp']);

                return response([
                    'success' => true, 'data' => $company
                ], 200);
            }
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Delete company.
     *
     * @param int $id Company id
     * @return Response
     */
    public function destroy(int $id): Response
    {
        if(isset($id)){
            Company::destroy($id);
            return response([
                'success' => true
            ], 200);
        }else{
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Save companies users.
     *
     * @param int $id Company id
     * @param Request $request Users data
     * @throws ModelNotFoundException If company is not found
     * @return Response
     */
    public function setCompaniesUsers(int $id, Request $request): Response
    {
        try{
            $company = Company::findOrFail($id);
            $users = $request->all();
            $data = [];
            if(!empty($users)){
                foreach ($users as $user) {
                    array_push($data, $user['id']);
                }
            }
            $company->users()->detach();
            $company->users()->attach($data);
            return response([
                'success' => true
            ], 201);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Get companies users.
     *
     * @param int $id Company id
     * @throws ModelNotFoundException If company is not found
     * @return Response
     */
    public function getCompaniesUsers(int $id): Response
    {
        try{
            $company_users = Company::findOrFail($id)->users()->get();

            return response([
                'data' => $company_users,
                'success' => true
            ], 201);
        } catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }
}
