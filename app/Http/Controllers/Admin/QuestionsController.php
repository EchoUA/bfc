<?php

namespace App\Http\Controllers\Admin;

use App\Question;
use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Exception;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class QuestionsController extends Controller
{

    /**
     * Update question
     *
     * @param int $id Question id
     * @param Request $request Question data
     * @throws Exception If model could not be update
     * @return Response
     */
    public function update(int $id, Request $request): Response
    {
        try{
            $question = Question::findOrFail($id);
            $question->data = json_encode($request->all());
            $question->save();
            return response([
                'data' => $question
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Get users to questions
     *
     * @param int $id Question id
     * @throws Exception If model could not be update
     * @return Response
     */
    public function users(int $id): Response
    {
        try{
            $question = Question::findOrFail($id);
            $all_users = $question->users()->get();
            $users = [];
            foreach ($all_users as $item) {
                $user = User::findOrFail($item['id']);
                if($user->hasRole('user')){
                    array_push($users, $item);
                }
            }
            return response([
                'data' => $users
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Detach user
     *
     * @param int $id Question id
     * @param int $user_id User id
     * @throws Exception If model could not be update
     * @return Response
     */
    public function detach(int $id, int $user_id): Response
    {
        try{
            $question = Question::findOrFail($id);
            $question->users()->detach($user_id);
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
     * Get question by form id
     *
     * @param int $id Form id
     * @return Response
     */
    public function form($id): Response
    {
        $questions = Question::where('form_id', $id)->get();
        return response([
            'data' => $questions
        ], 200);
    }

    /**
     * Approve question
     *
     * @param int $id Form id
     * @return Response
     */
    public function approve($id): Response
    {
        try{
            $question = Question::findOrFail($id);
            $question->status = 1;
            $question->save();
            return response([
                'data' => $question
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Dissaprove question
     *
     * @param int $id Form id
     * @return Response
     */
    public function disapprove($id): Response
    {
        try{
            $question = Question::findOrFail($id);
            $question->status = 2;
            $question->save();
            return response([
                'data' => $question
            ], 200);
        }catch (ModelNotFoundException $e){
            return response([
                'error' => true
            ], 400);
        }
    }

    /**
     * Store questions to form one
     *
     * @param int $id Form id
     * @throws Exception If model could not be crated
     */
    public function storeQuestionsToFormOne(int $id)
    {
        $data = [];
        for($i = 1; $i<=5; $i++){
            array_push($data, [
                'form_id' => $id,
                'data' => '',
                'position' => $i,
                'status' => 2,
            ]);
        }
        if($questions = Question::insert($data)){
            return $questions;
        }else{
            throw new Exception('Question could not be crated');
        }
    }

    /**
     * Store questions to form two
     *
     * @param int $id Form id
     * @throws Exception If model could not be crated
     */
    public function storeQuestionsToFormTwo(int $id)
    {
        $data = [];
        for($i = 0; $i<=52; $i++){
            array_push($data, [
                'form_id' => $id,
                'data' => '',
                'position' => $i,
                'status' => 2,
            ]);
        }
        if($questions = Question::insert($data)){
            return $questions;
        }else{
            throw new Exception('Question could not be crated');
        }
    }

    /**
     * Store questions to form three
     *
     * @param int $id Form id
     * @throws Exception If model could not be crated
     */
    public function storeQuestionsToFormThree(int $id)
    {
        $data = [];
        for($i = 1; $i<=13; $i++){
            array_push($data, [
                'form_id' => $id,
                'data' => '',
                'position' => $i,
                'status' => 2,
            ]);
        }
        if($questions = Question::insert($data)){
            return $questions;
        }else{
            throw new Exception('Question could not be crated');
        }
    }

    /**
     * Store questions to form four
     *
     * @param int $id Form id
     * @throws Exception If model could not be crated
     */
    public function storeQuestionsToFormFour(int $id)
    {
        $data = [];
        array_push($data, [
            'form_id' => $id,
            'data' => '',
            'position' => 1,
            'status' => 2,
        ]);
        if($questions = Question::insert($data)){
            return $questions;
        }else{
            throw new Exception('Question could not be crated');
        }
    }

    /**
     * Store questions to form five
     *
     * @param int $id Form id
     * @throws Exception If model could not be crated
     */
    public function storeQuestionsToFormFive(int $id)
    {
        $data = [];
        for($i = 1; $i<=41; $i++){
            array_push($data, [
                'form_id' => $id,
                'data' => '',
                'position' => $i,
                'status' => 2,
            ]);
        }
        if($questions = Question::insert($data)){
            return $questions;
        }else{
            throw new Exception('Question could not be crated');
        }
    }

}
