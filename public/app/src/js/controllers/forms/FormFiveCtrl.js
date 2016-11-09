'use strict';
angular.module('BfcApp').controller('FormFiveCtrl', ['$scope', '$state', '$stateParams', 'toaster', 'FormService', '$filter', '$http', 'underscore', 'QuestionService',  'UserService', 'CommentService', function($scope, $state, $stateParams, toaster, FormService, $filter, $http, underscore, QuestionService, UserService, CommentService) {

    /*
    Todo - From 5 functional
     */
    function getQuestions() {
        UserService.Index(1, true).then(function (response) {
            var users_names = [];
            angular.forEach(response.data, function (v, k) {
                users_names.push(v.name);
            });

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
                            ['Bank name', response.data.name],
                            ['Completed by (name and title)', ''],
                            ['Completed on (day/month/year)', ''],
                        ];
                    } else {
                        $scope.questions[1].data = JSON.parse($scope.questions[1].data);
                    }

                    var q1_container = document.getElementById('question_1'),
                        q1_hot;

                    q1_hot = new Handsontable(q1_container, {
                        data: $scope.questions[1].data,
                        columns: [
                            {
                                type: 'text',
                                readOnly: true
                            },
                            {
                                type: 'text',
                            },
                        ],
                        cells: function (r, c) {
                            var cellProperties;
                            if (r === 1 && c === 1) {
                                cellProperties = {
                                    type: 'dropdown',
                                    source: users_names
                                };
                                return cellProperties;
                            }
                            if (r === 2 && c === 1) {
                                cellProperties = {
                                    type: 'date' // force text type for first row
                                };
                                return cellProperties;
                            }
                        },
                    });
                }
                /*
                 End Question 1
                 */


                /*
                 Question 2
                 */
                $scope.questions[2] = getQuestionByPosition(2);
                if ($scope.questions[2]) {
                    if (underscore.isEmpty($scope.questions[2].data)) {
                        $scope.questions[2].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                            item_3: {
                                check: ''
                            },
                        };
                    } else {
                        $scope.questions[2].data = JSON.parse($scope.questions[2].data);
                    }
                }
                /*
                 End Question 2
                 */


                /*
                 Question 3
                 */
                $scope.questions[3] = getQuestionByPosition(3);
                if ($scope.questions[3]) {
                    if (underscore.isEmpty($scope.questions[3].data)) {
                        $scope.questions[3].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[3].data = JSON.parse($scope.questions[3].data);
                    }
                }
                /*
                 End Question 3
                 */

                /*
                 Question 4
                 */
                $scope.questions[4] = getQuestionByPosition(4);
                if ($scope.questions[4]) {
                    if (underscore.isEmpty($scope.questions[4].data)) {
                        $scope.questions[4].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[4].data = JSON.parse($scope.questions[4].data);
                    }
                }
                /*
                 End Question 4
                 */

                /*
                 Question 5
                 */
                $scope.questions[5] = getQuestionByPosition(5);
                if ($scope.questions[5]) {
                    if (underscore.isEmpty($scope.questions[5].data)) {
                        $scope.questions[5].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[5].data = JSON.parse($scope.questions[5].data);
                    }
                }
                /*
                 End Question 5
                 */

                /*
                 Question 6
                 */
                $scope.questions[6] = getQuestionByPosition(6);
                if ($scope.questions[6]) {
                    if (underscore.isEmpty($scope.questions[6].data)) {
                        $scope.questions[6].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[6].data = JSON.parse($scope.questions[6].data);
                    }
                }
                /*
                 End Question 6
                 */

                /*
                 Question 7
                 */
                $scope.questions[7] = getQuestionByPosition(7);
                if ($scope.questions[7]) {
                    if (underscore.isEmpty($scope.questions[7].data)) {
                        $scope.questions[7].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[7].data = JSON.parse($scope.questions[7].data);
                    }
                }
                /*
                 End Question 7
                 */

                /*
                 Question 8
                 */
                $scope.questions[8] = getQuestionByPosition(8);
                if ($scope.questions[8]) {
                    if (underscore.isEmpty($scope.questions[8].data)) {
                        $scope.questions[8].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[8].data = JSON.parse($scope.questions[8].data);
                    }
                }
                /*
                 End Question 8
                 */


                /*
                 Question 9
                 */
                $scope.questions[9] = getQuestionByPosition(9);
                if ($scope.questions[9]) {
                    if (underscore.isEmpty($scope.questions[9].data)) {
                        $scope.questions[9].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[9].data = JSON.parse($scope.questions[9].data);
                    }
                }
                /*
                 End Question 9
                 */

                /*
                 Question 10
                 */
                $scope.questions[10] = getQuestionByPosition(10);
                if ($scope.questions[10]) {
                    if (underscore.isEmpty($scope.questions[10].data)) {
                        $scope.questions[10].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[10].data = JSON.parse($scope.questions[10].data);
                    }
                }
                /*
                 End Question 10
                 */

                /*
                 Question 11
                 */
                $scope.questions[11] = getQuestionByPosition(11);
                if ($scope.questions[11]) {
                    if (underscore.isEmpty($scope.questions[11].data)) {
                        $scope.questions[11].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[11].data = JSON.parse($scope.questions[11].data);
                    }
                }
                /*
                 End Question 11
                 */

                /*
                 Question 12
                 */
                $scope.questions[12] = getQuestionByPosition(12);
                if ($scope.questions[12]) {
                    if (underscore.isEmpty($scope.questions[12].data)) {
                        $scope.questions[12].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[12].data = JSON.parse($scope.questions[12].data);
                    }
                }
                /*
                 End Question 12
                 */

                /*
                 Question 13
                 */
                $scope.questions[13] = getQuestionByPosition(13);
                if ($scope.questions[13]) {
                    if (underscore.isEmpty($scope.questions[13].data)) {
                        $scope.questions[13].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[13].data = JSON.parse($scope.questions[13].data);
                    }
                }
                /*
                 End Question 13
                 */


                /*
                 Question 14
                 */
                $scope.questions[14] = getQuestionByPosition(14);
                if ($scope.questions[14]) {
                    if (underscore.isEmpty($scope.questions[14].data)) {
                        $scope.questions[14].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[14].data = JSON.parse($scope.questions[14].data);
                    }
                }
                /*
                 End Question 14
                 */

                /*
                 Question 15
                 */
                $scope.questions[15] = getQuestionByPosition(15);
                if ($scope.questions[15]) {
                    if (underscore.isEmpty($scope.questions[15].data)) {
                        $scope.questions[15].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[15].data = JSON.parse($scope.questions[15].data);
                    }
                }
                /*
                 End Question 15
                 */

                /*
                 Question 16
                 */
                $scope.questions[16] = getQuestionByPosition(16);
                if ($scope.questions[16]) {
                    if (underscore.isEmpty($scope.questions[16].data)) {
                        $scope.questions[16].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[16].data = JSON.parse($scope.questions[16].data);
                    }
                }
                /*
                 End Question 16
                 */

                /*
                 Question 17
                 */
                $scope.questions[17] = getQuestionByPosition(17);
                if ($scope.questions[17]) {
                    if (underscore.isEmpty($scope.questions[17].data)) {
                        $scope.questions[17].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                            item_3: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[17].data = JSON.parse($scope.questions[17].data);
                    }
                }
                /*
                 End Question 17
                 */

                /*
                 Question 18
                 */
                $scope.questions[18] = getQuestionByPosition(18);
                if ($scope.questions[18]) {
                    if (underscore.isEmpty($scope.questions[18].data)) {
                        $scope.questions[18].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[18].data = JSON.parse($scope.questions[18].data);
                    }
                }
                /*
                 End Question 18
                 */


                /*
                 Question 19
                 */
                $scope.questions[19] = getQuestionByPosition(19);
                if ($scope.questions[19]) {
                    if (underscore.isEmpty($scope.questions[19].data)) {
                        $scope.questions[19].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                            item_3: {
                                comment: ''
                            },
                            item_4: {
                                comment: ''
                            },
                            item_5: {
                                comment: ''
                            },
                            item_6: {
                                comment: ''
                            },
                            item_7: {
                                check: ''
                            },
                            item_8: {
                                check: ''
                            },
                        };
                    } else {
                        $scope.questions[19].data = JSON.parse($scope.questions[19].data);
                    }
                }
                /*
                 End Question 19
                 */

                /*
                 Question 20
                 */
                $scope.questions[20] = getQuestionByPosition(20);
                if ($scope.questions[20]) {
                    if (underscore.isEmpty($scope.questions[20].data)) {
                        $scope.questions[20].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[20].data = JSON.parse($scope.questions[20].data);
                    }
                }
                /*
                 End Question 20
                 */

                /*
                 Question 21
                 */
                $scope.questions[21] = getQuestionByPosition(21);
                if ($scope.questions[21]) {
                    if (underscore.isEmpty($scope.questions[21].data)) {
                        $scope.questions[21].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[21].data = JSON.parse($scope.questions[21].data);
                    }
                }
                /*
                 End Question 21
                 */

                /*
                 Question 22
                 */
                $scope.questions[22] = getQuestionByPosition(22);
                if ($scope.questions[22]) {
                    if (underscore.isEmpty($scope.questions[22].data)) {
                        $scope.questions[22].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[22].data = JSON.parse($scope.questions[22].data);
                    }
                }
                /*
                 End Question 22
                 */

                /*
                 Question 23
                 */
                $scope.questions[23] = getQuestionByPosition(23);
                if ($scope.questions[23]) {
                    if (underscore.isEmpty($scope.questions[23].data)) {
                        $scope.questions[23].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[23].data = JSON.parse($scope.questions[23].data);
                    }
                }
                /*
                 End Question 23
                 */

                /*
                 Question 24
                 */
                $scope.questions[24] = getQuestionByPosition(24);
                if ($scope.questions[24]) {
                    if (underscore.isEmpty($scope.questions[24].data)) {
                        $scope.questions[24].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                            item_3: {
                                check: '',
                            },
                            item_4: {
                                comment: '',
                                check: '',
                            },
                            item_5: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[24].data = JSON.parse($scope.questions[24].data);
                    }
                }
                /*
                 End Question 24
                 */

                /*
                 Question 25
                 */
                $scope.questions[25] = getQuestionByPosition(25);
                if ($scope.questions[25]) {
                    if (underscore.isEmpty($scope.questions[25].data)) {
                        $scope.questions[25].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[25].data = JSON.parse($scope.questions[25].data);
                    }
                }
                /*
                 End Question 25
                 */


                /*
                 Question 26
                 */
                $scope.questions[26] = getQuestionByPosition(26);
                if ($scope.questions[26]) {
                    if (underscore.isEmpty($scope.questions[26].data)) {
                        $scope.questions[26].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[26].data = JSON.parse($scope.questions[26].data);
                    }
                }
                /*
                 End Question 26
                 */

                /*
                 Question 27
                 */
                $scope.questions[27] = getQuestionByPosition(27);
                if ($scope.questions[27]) {
                    if (underscore.isEmpty($scope.questions[27].data)) {
                        $scope.questions[27].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[27].data = JSON.parse($scope.questions[27].data);
                    }
                }
                /*
                 End Question 27
                 */


                /*
                 Question 28
                 */
                $scope.questions[28] = getQuestionByPosition(28);
                if ($scope.questions[28]) {
                    if (underscore.isEmpty($scope.questions[28].data)) {
                        $scope.questions[28].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[28].data = JSON.parse($scope.questions[28].data);
                    }
                }
                /*
                 End Question 28
                 */

                /*
                 Question 29
                 */
                $scope.questions[29] = getQuestionByPosition(29);
                if ($scope.questions[29]) {
                    if (underscore.isEmpty($scope.questions[29].data)) {
                        $scope.questions[29].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[29].data = JSON.parse($scope.questions[29].data);
                    }
                }
                /*
                 End Question 29
                 */

                /*
                 Question 30
                 */
                $scope.questions[30] = getQuestionByPosition(30);
                if ($scope.questions[30]) {
                    if (underscore.isEmpty($scope.questions[30].data)) {
                        $scope.questions[30].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[30].data = JSON.parse($scope.questions[30].data);
                    }
                }
                /*
                 End Question 30
                 */


                /*
                 Question 31
                 */
                $scope.questions[31] = getQuestionByPosition(31);
                if ($scope.questions[31]) {
                    if (underscore.isEmpty($scope.questions[31].data)) {
                        $scope.questions[31].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment_1: '',
                                comment_2: '',
                                comment_3: '',
                            },
                            item_3: {
                                comment_1: '',
                                comment_2: '',
                                comment_3: '',
                            },
                        };
                    } else {
                        $scope.questions[31].data = JSON.parse($scope.questions[31].data);
                    }
                }
                /*
                 End Question 31
                 */

                /*
                 Question 32
                 */
                $scope.questions[32] = getQuestionByPosition(32);
                if ($scope.questions[32]) {
                    if (underscore.isEmpty($scope.questions[32].data)) {
                        $scope.questions[32].data = {
                            item_1: {
                                comment: ''
                            },
                            item_2: {
                                comment: ''
                            },
                            item_3: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[32].data = JSON.parse($scope.questions[32].data);
                    }
                }
                /*
                 End Question 32
                 */

                /*
                 Question 33
                 */
                $scope.questions[33] = getQuestionByPosition(33);
                if ($scope.questions[33]) {
                    if (underscore.isEmpty($scope.questions[33].data)) {
                        $scope.questions[33].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                            item_3: {
                                comment: ''
                            },
                            item_4: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[33].data = JSON.parse($scope.questions[33].data);
                    }
                }
                /*
                 End Question 33
                 */

                /*
                 Question 34
                 */
                $scope.questions[34] = getQuestionByPosition(34);
                if ($scope.questions[34]) {
                    if (underscore.isEmpty($scope.questions[34].data)) {
                        $scope.questions[34].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[34].data = JSON.parse($scope.questions[34].data);
                    }
                }
                /*
                 End Question 34
                 */

                /*
                 Question 35
                 */
                $scope.questions[35] = getQuestionByPosition(35);
                if ($scope.questions[35]) {
                    if (underscore.isEmpty($scope.questions[35].data)) {
                        $scope.questions[35].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[35].data = JSON.parse($scope.questions[35].data);
                    }
                }
                /*
                 End Question 35
                 */


                /*
                 Question 36
                 */
                $scope.questions[36] = getQuestionByPosition(36);
                if ($scope.questions[36]) {
                    if (underscore.isEmpty($scope.questions[36].data)) {
                        $scope.questions[36].data = {
                            item_1: {
                                check: ''
                            },
                            item_2: {
                                comment: ''
                            },
                        };
                    } else {
                        $scope.questions[36].data = JSON.parse($scope.questions[36].data);
                    }
                }
                /*
                 End Question 36
                 */


                /*
                 Question 37
                 */
                $scope.questions[37] = getQuestionByPosition(37);
                if ($scope.questions[37]) {
                    if (underscore.isEmpty($scope.questions[37].data)) {
                        $scope.questions[37].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[37].data = JSON.parse($scope.questions[37].data);
                    }
                }
                /*
                 End Question 37
                 */
                /*
                 Question 38
                 */
                $scope.questions[38] = getQuestionByPosition(38);
                if ($scope.questions[38]) {
                    if (underscore.isEmpty($scope.questions[38].data)) {
                        $scope.questions[38].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[38].data = JSON.parse($scope.questions[38].data);
                    }
                }
                /*
                 End Question 38
                 */
                /*
                 Question 39
                 */
                $scope.questions[39] = getQuestionByPosition(39);
                if ($scope.questions[39]) {
                    if (underscore.isEmpty($scope.questions[39].data)) {
                        $scope.questions[39].data = {
                            comment: ''
                        };
                    } else {
                        $scope.questions[39].data = JSON.parse($scope.questions[39].data);
                    }
                }
                /*
                 End Question 39
                 */
                /*
                 Question 40
                 */
                $scope.questions[40] = getQuestionByPosition(40);
                if ($scope.questions[40]) {
                    if (underscore.isEmpty($scope.questions[40].data)) {
                        $scope.questions[40].data = {
                            check: ''
                        };
                    } else {
                        $scope.questions[40].data = JSON.parse($scope.questions[40].data);
                    }
                }
                /*
                 End Question 40
                 */
            });
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