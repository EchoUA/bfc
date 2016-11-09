<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// Base route
Route::get('/', function () {
    if(\Illuminate\Support\Facades\Auth::guest()){
        return redirect('login/');
    }
    return redirect('admin/');
});
Route::get('/home', function () {
    return redirect('/');
});



// Admin panel routing
Route::group(['prefix' => 'admin'], function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', 'Admin\AdminController@index');
    });
});

// Admin panel API routing
Route::group(['prefix' => 'api'], function () {
    Route::group(['middleware' => ['auth']], function () {

        // Users routing
        Route::resource('/users', 'Admin\UsersController');
        Route::get('/users/get/available/{role}', 'Admin\UsersController@available');
        Route::put('/users/{id}/password', 'Admin\UsersController@setPassword');
        Route::post('/users/{id}/{form_id}/questions', 'Admin\UsersController@setQuestions');
        Route::get('/users/{id}/{form_id}/questions', 'Admin\UsersController@getQuestions');
        Route::post('/users/{company_id}/{form_id}/questions-bcp', 'Admin\UsersController@storeQuestionsToBcp');
        Route::get('/users/{id}/company', 'Admin\UsersController@getCompany');
        Route::get('/users/{role}/{company_id}/dispatch', 'Admin\UsersController@dispatchToUsers');
        Route::get('/users/{role}/{company_id}/dispatch-preview', 'Admin\UsersController@dispatchToUsersPreview');
        Route::post('/users/store-assign/{form_id}/{company_id}', 'Admin\UsersController@storeAssign');

        // Companies routing
        Route::resource('/companies', 'Admin\CompaniesController');
        Route::get('/companies/{id}/users', 'Admin\CompaniesController@getCompaniesUsers');
        Route::post('/companies/{id}/users', 'Admin\CompaniesController@setCompaniesUsers');
        Route::post('/companies/{id}/update', 'Admin\CompaniesController@update');

        // Forms routing
        Route::get('/forms/{id}', 'Admin\FormsController@index');
        Route::get('/forms/{id}/show', 'Admin\FormsController@show');
        Route::get('/forms/{id}/progress-bar', 'Admin\FormsController@progressBar');
        Route::get('/forms/{id}/approve', 'Admin\FormsController@approve');

        // Questions routing
        Route::resource('/questions', 'Admin\QuestionsController');
        Route::get('/questions/{id}/form', 'Admin\QuestionsController@form');
        Route::get('/questions/{id}/approve', 'Admin\QuestionsController@approve');
        Route::get('/questions/{id}/disapprove', 'Admin\QuestionsController@disapprove');
        Route::get('/questions/{id}/users', 'Admin\QuestionsController@users');
        Route::get('/questions/{id}/{user_id}/detach', 'Admin\QuestionsController@detach');

        // Comments routing
        Route::get('/comments/{question_id}/question', 'Admin\CommentsController@getToQuestion');
        Route::post('/comments', 'Admin\CommentsController@create');


        // Roles routing
        Route::get('/roles', 'Admin\RolesController@index');

        Route::get('user-role', function(){
            $user = Auth::user();
            return [
                'user_id'=>$user->id,
                'user_name'=>$user->name,
                'user_role'=> $user->roles[0]['name']
            ];
        });

    });
});

// Authentication routing
Auth::routes();

// Set user password
Route::get('password/set/{token}', 'Auth\SetPasswordController@show');
Route::post('password/set', 'Auth\SetPasswordController@store');
