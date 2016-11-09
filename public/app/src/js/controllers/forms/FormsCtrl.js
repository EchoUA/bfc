'use strict';
angular.module('BfcApp').controller('FormsCtrl', ['$scope','$rootScope', '$stateParams', 'toaster', 'FormService',  'CompanyService', 'UserService', 'QuestionService', 'underscore', '$state', function($scope, $rootScope, $stateParams, toaster, FormService, CompanyService, UserService, QuestionService, underscore, $state) {

    /*
    Todo - Get company  info
     */
    CompanyService.Show($stateParams.company_id).then(function (res) {
        $scope.company = res.data;
    });

    /*
     Todo - Get company users
     */
    CompanyService.GetCompaniesUsers($stateParams.company_id).then(function (response) {
        $scope.users = response;
    });


    /*
     Todo - Get all forms
     */
    $scope.company_id = $stateParams.company_id;
    FormService.Index($stateParams.company_id).then(function (response) {
        $scope.forms = response.data;
        if($rootScope.CURRENT_USER.user_role == 'user' || $rootScope.CURRENT_USER.user_role == 'bcp'){
            // redirect user to own form
            $state.go('forms.view_'+$scope.forms[0].position, { company_id :  $stateParams.company_id, form_id :  $scope.forms[0].id  });
        }else{
            // redirect admin to form 1
            $state.go('forms.view_1', { company_id :  $stateParams.company_id, form_id :  $scope.forms[0].id  });
        }
    });

    $scope.dispatchToUsersPreview = function (role) {
        UserService.DispatchPreview(role, $stateParams.company_id).then(function (response) {
            if(response.success){
                $scope.dispatch_users = response.data;
            };
        });
    };

    $scope.dispatchToUsers = function (role) {
        UserService.Dispatch(role, $stateParams.company_id).then(function (response) {
            if(response.success){
                toaster.pop('success', "Mail Notification sent successfully!", "");
            };
        });
    };

    function drawProgressBar(){
        FormService.ProgressBar($state.params.form_id).then(function (res) {
            $scope.progress_bar = res;
        });
    };

    $scope.$watchCollection(function(){
        return $state.params;
    }, function(){
        if(typeof $state.params.form_id != 'undefined'){
            drawProgressBar();
        }
    });

    /*
    Todo - Approve form
     */
    $scope.approveForm = function () {
        FormService.Approve($state.params.form_id).then(function (res) {
            if(res.success){
                toaster.pop('success', "Your answers have been saved!", "");
                $state.reload();
            };
        });
    };
    /*
    END - Approve form
     */

    // ===================================================================
    // /*
    // Todo - load all form questions
    //  */
    // $scope.$watch(function () {
    //     return $state.params.form_id;
    // }, function (newParams, oldParams) {
    //     $scope.current_questions = [];
    //     $scope.tmp_questions = [];
    //
    // });

    // $rootScope.checkVisibleQuestion = function (id) {
    //     return $rootScope.CURRENT_USER.user_role == 'user' && id != $rootScope.CURRENT_USER.user_id;
    // };

    // $scope.assign_modal = {};
    // /*
    // Todo - get user questions
    //  */
    // $scope.getUserQuestions = function (id) {
    //     $scope.temp_user_id = id;
    //
    //     UserService.GetUserQuestionsByForm(id, $state.params.form_id).then(function (response) {
    //         $scope.current_questions = response.data;
    //
    //         QuestionService.GetByForm($state.params.form_id).then(function (response) {
    //             $scope.tmp_questions = response.data;
    //
    //             var current_q_ids = underscore.pluck($scope.current_questions, 'id');
    //
    //             angular.forEach(current_q_ids, function (v, k) {
    //                 var question = underscore.find($scope.tmp_questions, function (i) {
    //                     return i.id == v;
    //                 });
    //                 $scope.tmp_questions.splice(underscore.indexOf($scope.tmp_questions, question), 1);
    //             });
    //
    //         });
    //     });
    // };


    // /*
    //  Todo - Assign user
    //  */
    // $scope.assignQuestion = function (id) {
    //     var question = underscore.find($scope.tmp_questions, function (i) {
    //         return i.id == id;
    //     });
    //     $scope.current_questions.push(question);
    //     $scope.tmp_questions.splice(underscore.indexOf($scope.tmp_questions, question), 1);
    // };
    //
    //
    // $scope.deassignQuestion = function (id) {
    //     var question = underscore.find($scope.current_questions, function (i) {
    //         return i.id == id;
    //     });
    //     $scope.tmp_questions.push(question);
    //     $scope.current_questions.splice(underscore.indexOf($scope.current_questions, question), 1);
    // };
    //
    // $scope.assignAllQuestion = function () {
    //     angular.forEach($scope.tmp_questions, function (v, k) {
    //         $scope.current_questions.push(v);
    //     });
    //     $scope.tmp_questions = [];
    // };
    //
    // /*
    // Todo - assign users to form
    //  */
    // $scope.assignUsersToForm = function () {
    //
    //     if(!underscore.isUndefined($scope.temp_user_id)){
    //         UserService.StoreQuestions($scope.temp_user_id, $state.params.form_id, $scope.current_questions).then(function (response) {
    //             if(response.success){
    //                 toaster.pop('success', "Success!", "");
    //             }
    //         });
    //     }
    // };

}]);