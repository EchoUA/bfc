'use strict';
angular.module('BfcApp').controller('FormFourCtrl', ['$scope', '$state', '$stateParams', 'toaster', 'FormService', '$filter', '$http', 'underscore', 'QuestionService',  'UserService', 'CommentService', function($scope, $state, $stateParams, toaster, FormService, $filter, $http, underscore, QuestionService, UserService, CommentService) {

    /*
     Todo - From 4 functional
     */
    function getQuestions() {
        FormService.Show($stateParams.form_id).then(function (response) {
            $scope.questions = [];

            function getQuestionByPosition(position) {
                var question = underscore.find(response.data.questions, function (item) {
                    return item.position == position;
                });
                if (typeof question != 'undefined') {
                    question.check = true;
                }
                return question;
            }

            /*
             Save question
             */
            $scope.save = function (id) {
                QuestionService.Update($scope.questions[id].id, JSON.stringify($scope.questions[id].data)).then(function (response) {
                    toaster.pop('success', "Success!", "");
                });
            };


            /*
             Question 1
             */
            $scope.questions[1] = getQuestionByPosition(1);
            if ($scope.questions[1]) {
                if (underscore.isEmpty($scope.questions[1].data)) {
                    $scope.questions[1].data = [
                        ['Indicator [prudential acronym]', 'Requirement', 'Actual value 1', 'Complied (Y/N)', 'If not complied, please provide details 2'],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                        ['', '', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[1].data = JSON.parse($scope.questions[1].data);
                }

                var q1_container = document.getElementById('question_1'),
                    q1_hot;

                q1_hot = new Handsontable(q1_container, {
                    data: $scope.questions[1].data,
                    columns: [
                        {},
                        {},
                        {},
                        {
                            type: 'dropdown',
                            source: ['yes', 'no']
                        },
                        {}
                    ],
                    cells: function (r, c) {
                        var cellProperties;
                        if (r === 0 && c === 3) {
                            cellProperties = {
                                type: 'text'
                            };
                            return cellProperties;
                        }
                    },

                });
            }
            /*
             End Question 1
             */

        });
    }
    getQuestions();

    /*
     Assign functional
     */
    $scope.users = [];
    /*
     Todo - Assign questions to user (+ create new user) role
     */
    $scope.storeAssign = function () {
        var arr = [];
        angular.forEach($scope.questions, function (v,k) {
            if(v){
                if(v.check){
                    arr.push(v.id);
                }
            }
        });

        UserService.StoreAssign({
            'data' : arr,
            'users' : (function () {
                var data = [];
                angular.forEach($scope.users, function (v,k) {
                    data.push({
                        'email' : v.text
                    })
                });
                return data;
            }())
        }, $stateParams.company_id, $stateParams.form_id).then(function (response) {
            toaster.pop('success', "Success!", "");
        });
    };

    /*
     Todo - Assign questions to BCp role
     */
    $scope.assignToBcp = function () {
        var arr = [];
        angular.forEach($scope.questions, function (v,k) {
            if(v.check){
                arr.push(v.id);
            }
        });
        UserService.StoreQuestionsToBcp($stateParams.company_id, $stateParams.form_id, arr).then(function (response) {
            toaster.pop('success', "Success!", "");
        });
    };

    /*
     END Assign functional
     */


    /*
     Assign functional
     */
    $scope.users = [];
    /*
     Todo - Assign questions to user (+ create new user) role
     */
    $scope.storeAssign = function () {
        var arr = [];
        angular.forEach($scope.questions, function (v,k) {
            if(v){
                if(v.check){
                    arr.push(v.id);
                }
            }
        });

        UserService.StoreAssign({
            'data' : arr,
            'users' : (function () {
                var data = [];
                angular.forEach($scope.users, function (v,k) {
                    data.push({
                        'email' : v.text
                    })
                });
                return data;
            }())
        }, $stateParams.company_id, $stateParams.form_id).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
            }else{
                angular.forEach(response.error, function (error) {
                    angular.forEach(error, function (message) {
                        toaster.pop('error', "", message);
                    });
                });
            }
        });
    };

    /*
     Todo - Assign questions to BCp role
     */
    $scope.assignToBcp = function () {
        var arr = [];
        angular.forEach($scope.questions, function (v,k) {
            if(v.check){
                arr.push(v.id);
            }
        });
        UserService.StoreQuestionsToBcp($stateParams.company_id, $stateParams.form_id, arr).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
            }
        });
    };

    /*
     END Assign functional
     */


    /*
     Unassign functional
     */

    /*
     Todo - Get users to questions
     */
    $scope.selected_question = {};
    $scope.getQuestionUsers = function (id) {
        $scope.tmp_question_id = id;
        QuestionService.Users(id).then(function (response) {
            $scope.selected_question.users = response.data;
        });
    };

    /*
     Todo - Unassign user from question
     */
    $scope.unassignUser = function (id) {
        QuestionService.Detach($scope.tmp_question_id, id).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $scope.getQuestionUsers($scope.tmp_question_id);
            }
        });
    };

    /*
     END Unassign functional
     */



    /*
     Todo - Comments functional
     */

    // Show reply form
    $scope.visibleReplyForm = false;
    var global_form = angular.element( document.querySelector( '#global_add_comments_form') );
    $scope.showReplyForm = function(id, index){
        console.log(id, index);
        $scope.temp_comment_id = id;
        $scope.temp_comment_index = index;
        var tmp_form = angular.element( document.querySelector( '#tmp_add_comments_form'+id) );
        tmp_form.append(global_form);
        $scope.visibleReplyForm = !$scope.visibleReplyForm;
    };

    // Get all comment to questions
    $scope.comments = [];
    $scope.getAllComments = function (id) {
        $scope.tmp_question_id = id;
        CommentService.GetToQuestion(id).then(function (res) {
            $scope.comments = res;
        });
    };

    // Store new comment
    $scope.new_comment = '';
    $scope.comment_tmp_reply = '';
    $scope.storeComment = function (reply_to, index) {
        var data = {
            'comment':$scope.new_comment,
            'question_id':$scope.tmp_question_id,
        };
        if(typeof reply_to != 'undefined'){
            data.comment = $scope.comment_tmp_reply;
            data.reply = 1;
            data.reply_to = reply_to;
        };
        CommentService.Store(data).then(function (res) {
            if(res.success){
                toaster.pop('success', "Success!", "");
                $scope.new_comment = '';
                // if(typeof index != 'undefined') {
                //     $scope.comments[index].tmp_reply = '';
                // };
                if(typeof index == 'undefined') {
                    $scope.getAllComments($scope.tmp_question_id);
                };

                // reload all comments
                $scope.visibleReplyForm = false;
                // $scope.getAllComments($scope.tmp_question_id);
                $scope.comment_tmp_reply = '';
            }else{
                angular.forEach(res.error, function (error) {
                    angular.forEach(error, function (message) {
                        toaster.pop('error', "", message);
                    });
                });
            }
        });
    };
    /*
     END Comments functional
     */


    /*
     Todo - Approve / Disapprove functional
     */
    $scope.approveQuestion = function(id){
        QuestionService.Approve(id).then(function (res) {
            if(res){
                toaster.pop('success', "Success!", "");
                $state.reload();
            }
        });
    };


    $scope.disapproveQuestion = function(id){
        QuestionService.Disapprove(id).then(function (res) {
            if(res){
                toaster.pop('success', "Success!", "");
                $state.reload();
            }
        });
    };
    /*
     END Approve / Disapprove functional
     */

}]);