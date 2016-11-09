<?php

namespace App\Http\Controllers\Admin;

use App\Form;
use App\Question;
use Illuminate\Http\Request;
use Exception;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class FormsController extends Controller
{
    /**
     * Get all forms
     *
     * @param int $id Company id
     * @return Response
     */
    public function index(int $id): Response
    {
        $user = Auth::user();
        if($user->hasRole('admin')){
            $forms = Form::where('company_id', $id)
                ->with('questions')
                ->get();
            foreach ($forms as $k => $v) {
                $bar = $this->progressBar($v['id']);
                $forms[$k]['progress_bar'] = $bar;
            }
        }elseif($user->hasRole('user') OR $user->hasRole('bcp')){
            $questions = $user->questions()->select('form_id')->pluck('form_id')->toArray();
            if(!empty($questions)){
                $forms = Form::where('company_id', $id)->whereIn('id', array_unique($questions))->get();
                foreach ($forms as $k => $v) {
                    $bar = $this->progressBar($v['id']);
                    $forms[$k]['progress_bar'] = $bar;
                }
            }
        }
        return response([
            'data' => $forms
        ], 200);
    }

    /**
     * Get form with questions
     *
     * @param int $id Form id
     * @return Response
     */
    public function show(int $id): Response
    {
        $form = Form::where('id', $id)
            ->with(['questions'=>function($query){
                $query->with(['users'=>function($query){
                }]);
            }])
            ->first();

        $user = Auth::user();

        if($user->hasRole('user') OR $user->hasRole('bcp')){
            $tmp_questions = [];
            foreach ($form['questions'] as $question) {
                foreach ($question['users'] as $item) {
                    if($item['id'] == $user->id){
                        array_push($tmp_questions, $question);
                    }
                }
            }
            unset($form['questions']);
            $form['questions'] = $tmp_questions;
        }

        return response([
            'data' => $form
        ], 200);
    }

    /**
     * Approve form
     *
     * @param int $id Form id
     * @return Response
     */
    public function approve(int $id): Response
    {
        try{
            $form = new Form();
            $form = $form->findOrFail($id);
            $old_a = $form->approved;
            $form->approved = !$old_a;
            $form->save();
            return response([
                'success' => true
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /*
     * Percentage of filled forms
     *
     * @param int $id Form id
     */
    public function progressBar(int $id)
    {
        $user = Auth::user();
        if($user->hasRole('admin')){
            $form = Form::findOrFail($id);
            $rate = 100 / count($form->questions);
            $active_question = count($form->questions()->where('status', 1)->get());
            return  $active_question * $rate;
        }elseif($user->hasRole('user') OR $user->hasRole('bcp')){
            $questions = $user->questions()->where('form_id', $id)->get();
            $rate = 100 / count($questions);
            $active_question = count($user->questions()->where('form_id', $id)->where('status', 1)->get());
            return  $active_question * $rate;
        }


    }

    /**
     * Get form users
     *
     * @param int $id Form id
     * @throws Exception If model could not be crated
     * @return Response (user id's - [1,2,3...n])
     */
    public function users($id)
    {
        try{
            $form = new Form();
            $form = $form->findOrFail($id);
            $questions = $form->questions()->get();

            // Get user id's (who assign to selected form)
            $users_ids = [];
            foreach ($questions as $item) {
                $question = new Question();
                $question = $question->findOrFail($item['id']);
                $users_tmp = $question->users()->get();
                foreach ($users_tmp as $i) {
                    array_push($users_ids, $i['id']);
                }
            }

            return array_unique($users_ids);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Store forms
     *
     * @param int $id Company id
     * @throws Exception If model could not be crated
     */
    public function store(int $id)
    {
        try{

            $forms = [];
            // 1
            $forms[1] = $this->storeFormOne($id);
            // 2
            $forms[2] = $this->storeFormTwo($id);
            // 3
            $forms[3] = $this->storeFormThree($id);
            // 4
            $forms[4] = $this->storeFormFour($id);
            // 5
            $forms[5] = $this->storeFormFive($id);

            return response(['forms' => $forms]);
        }catch (Exception $e){
            return $e->getMessage();
        }
    }

    /**
     * Store form one
     *
     * @param int $id Company id
     * @throws Exception If model could not be crated
     */
    public function storeFormOne(int $id)
    {
        if($form = Form::create([
            'company_id' => $id,
            'position' => 1,
            'name' => 'Key Financials',
        ])){
            $question = new QuestionsController();
            return $question->storeQuestionsToFormOne($form->id);
        }else{
            throw new Exception('Form could not be crated');
        }

    }

    /**
     * Store form two
     *
     * @param int $id Company id
     * @throws Exception If model could not be crated
     */
    public function storeFormTwo(int $id)
    {
        if($form = Form::create([
            'company_id' => $id,
            'position' => 2,
            'name' => 'Detailed Information',
        ])){
            $question = new QuestionsController();
            return $question->storeQuestionsToFormTwo($form->id);
        }else{
            throw new Exception('Form could not be crated');
        }

    }

    /**
     * Store form three
     *
     * @param int $id Company id
     * @throws Exception If model could not be crated
     */
    public function storeFormThree(int $id)
    {
        if($form = Form::create([
            'company_id' => $id,
            'position' => 3,
            'name' => 'Trade Finance',
        ])){
            $question = new QuestionsController();
            return $question->storeQuestionsToFormThree($form->id);
        }else{
            throw new Exception('Form could not be crated');
        }

    }

    /**
     * Store form four
     *
     * @param int $id Company id
     * @throws Exception If model could not be crated
     */
    public function storeFormFour(int $id)
    {
        if($form = Form::create([
            'company_id' => $id,
            'position' => 4,
            'name' => 'Prudential Ratios',
        ])){
            $question = new QuestionsController();
            return $question->storeQuestionsToFormFour($form->id);
        }else{
            throw new Exception('Form could not be crated');
        }

    }

    /**
     * Store form five
     *
     * @param int $id Company id
     * @throws Exception If model could not be crated
     */
    public function storeFormFive(int $id)
    {
        if($form = Form::create([
            'company_id' => $id,
            'position' => 5,
            'name' => 'AML Questionnaire',
        ])){
            $question = new QuestionsController();
            return $question->storeQuestionsToFormFive($form->id);
        }else{
            throw new Exception('Form could not be crated');
        }
    }


}
