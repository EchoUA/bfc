'use strict';
angular.module('BfcApp').controller('FormThreeCtrl', ['$scope', '$state', '$stateParams', 'toaster', 'FormService', '$filter', '$http', 'underscore', 'QuestionService',  'UserService', 'CommentService', function($scope, $state, $stateParams, toaster, FormService, $filter, $http, underscore, QuestionService, UserService, CommentService) {

    /*
     Todo - From 3 functional
     */
    function getQuestions() {
        /*
         Todo - Get form
         */
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

                // $scope.q_data = [];

                /*
                 Save question
                 */
                $scope.save = function (id) {
                    QuestionService.Update($scope.questions[id].id, JSON.stringify($scope.questions[id].data)).then(function (response) {
                        console.log(response);
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
                        $scope.questions[2].data = [
                            ['', 'Forecast for FinancialYear __/__/20__', 'Financial Period up to __/__/20__', 'Financial Year20__', 'Financial Year20__', 'Financial Year20__'],
                            ['L/Cs', '', '', '', ''],
                            ['Documentary collections', '', '', '', '', ''],
                            ['Open account', '', '', '', '', ''],
                            ['Guarantees', '', '', '', '', ''],
                            ['Import loans', '', '', '', '', ''],
                            ['Pre-payments', '', '', '', '', ''],
                            ['Other', '', '', '', '', ''],
                            ['Total Imports Supported', '=SUM(B2:B8)', '=SUM(C2:C8)', '=SUM(D2:D8)', '=SUM(E2:E8)', '=SUM(F2:F8)'],
                            ['L/Cs', '', '', '', ''],
                            ['Documentary collections', '', '', '', '', ''],
                            ['Open account', '', '', '', '', ''],
                            ['Pre/post shipment finance', '', '', '', '', ''],
                            ['Pre-payments', '', '', '', '', ''],
                            ['Other', '', '', '', '', ''],
                            ['Total Exports Supported', '=SUM(B10:B15)', '=SUM(C10:C15)', '=SUM(D10:D15)', '=SUM(E10:E15)', '=SUM(F10:F15)']
                        ];
                    } else {
                        $scope.questions[2].data = JSON.parse($scope.questions[2].data);
                    }


                    var q2_container = document.getElementById('question_2'),
                        q2_hot;

                    q2_hot = new Handsontable(q2_container, {
                        data: $scope.questions[2].data,
                        formulas: true,

                    });
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
                        $scope.questions[3].data = [
                            ['', 'Forecast for20__', 'Period up to__/__/20__', 'Year20__', 'Year20__', 'Year20__'],
                            ['Number of import LCs issued (#)', '', '', '', '', ''],
                            ['Total value of import LCs issued (USD million)', '', '', '', '', ''],
                            ['% of the value of import LCs issued that were confirmed by other banks', '', '', '', '', '']
                        ];
                    } else {
                        $scope.questions[3].data = JSON.parse($scope.questions[3].data);
                    }


                    var q3_container = document.getElementById('question_3'),
                        q3_hot;

                    q3_hot = new Handsontable(q3_container, {
                        data: $scope.questions[3].data
                    });
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
                        $scope.questions[4].data = [
                            ['', 'Average', 'Maximum'],
                            ['Validity period (days)', '', ''],
                            ['Payment terms (days)', '', '']
                        ];
                    } else {
                        $scope.questions[4].data = JSON.parse($scope.questions[4].data);
                    }


                    var q4_container = document.getElementById('question_4'),
                        q4_hot;

                    q4_hot = new Handsontable(q4_container, {
                        data: $scope.questions[4].data
                    });
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
                        $scope.questions[5].data = [
                            ['#', 'Correspondent Bank Name', 'Current Credit Limit', '(indicate currency)', 'Tenor in months', 'Utilization Rate (%)'],
                            ['1', '', '', '', '', ''],
                            ['2', '', '', '', '', ''],
                            ['3', '', '', '', '', ''],
                            ['4', '', '', '', '', ''],
                            ['5', '', '', '', '', '']
                        ];
                    } else {
                        $scope.questions[5].data = JSON.parse($scope.questions[5].data);
                    }


                    var q5_container = document.getElementById('question_5'),
                        q5_hot;

                    q5_hot = new Handsontable(q5_container, {
                        data: $scope.questions[5].data,
                        columns: [
                            {
                                type: 'text',
                                readOnly: true
                            },
                            {
                                type: 'text'
                            },
                            {
                                type: 'text'
                            },
                            {
                                type: 'dropdown',
                                source: ['USD', 'EUR', 'RUB', 'UHA']
                            },
                            {
                                type: 'text'
                            },
                            {
                                type: 'text'
                            },
                        ],
                        cells: function (r, c) {
                            var cellProperties;
                            if (r === 0 && c === 2) {
                                cellProperties = {
                                    type: 'text'
                                };
                                return cellProperties;
                            }
                        },
                    });
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
                        $scope.questions[6].data = [
                            ['#', 'Correspondent Bank Name', 'Current Credit Limit', '(indicate currency)', 'Tenor in months', 'Utilization Rate (%)'],
                            ['1', '', '', '', '', ''],
                            ['2', '', '', '', '', ''],
                            ['3', '', '', '', '', ''],
                            ['4', '', '', '', '', ''],
                            ['5', '', '', '', '', '']
                        ];
                    } else {
                        $scope.questions[6].data = JSON.parse($scope.questions[6].data);
                    }


                    var q6_container = document.getElementById('question_6'),
                        q6_hot;

                    q6_hot = new Handsontable(q6_container, {
                        data: $scope.questions[6].data,
                        columns: [
                            {
                                type: 'text',
                                readOnly: true
                            },
                            {
                                type: 'text'
                            },
                            {
                                type: 'text'
                            },
                            {
                                type: 'dropdown',
                                source: ['USD', 'EUR', 'RUB', 'UHA']
                            },
                            {
                                type: 'text'
                            },
                            {
                                type: 'text'
                            },
                        ],
                        cells: function (r, c) {
                            var cellProperties;
                            if (r === 0 && c === 2) {
                                cellProperties = {
                                    type: 'text'
                                };
                                return cellProperties;
                            }
                        },
                    });
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
                        $scope.questions[7].data = [
                            ['', 'Year 20__', 'Year 20__'],
                            ['Interest income from Trade Finance', '', ''],
                            ['Fee/commission income from Trade Finance', '', '']
                        ];
                    } else {
                        $scope.questions[7].data = JSON.parse($scope.questions[7].data);
                    }


                    var q7_container = document.getElementById('question_7'),
                        q7_hot;

                    q7_hot = new Handsontable(q7_container, {
                        data: $scope.questions[7].data,
                    });
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
                        $scope.questions[8].data = [
                            ['', 'Year 20__'],
                            ['Market share (%)', ''],
                            ['Ranking (#)', '']
                        ];
                    } else {
                        $scope.questions[8].data = JSON.parse($scope.questions[8].data);
                    }


                    var q8_container = document.getElementById('question_8'),
                        q8_hot;

                    q8_hot = new Handsontable(q8_container, {
                        data: $scope.questions[8].data,
                    });
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
                        $scope.questions[9].data = [
                            ['IMPORTS SUPPORTED', '', 'EXPORTS SUPPORTED', ''],
                            ['Country', 'Main Goods Imported', 'Country', 'Main Goods Exported'],
                            ['', '', '', ''],
                            ['', '', '', '']
                        ];
                    } else {
                        $scope.questions[9].data = JSON.parse($scope.questions[9].data);
                    }


                    var q9_container = document.getElementById('question_9'),
                        q9_hot;

                    q9_hot = new Handsontable(q9_container, {
                        data: $scope.questions[9].data,
                        mergeCells: [
                            {row: 0, col: 0, rowspan: 1, colspan: 2},
                            {row: 0, col: 2, rowspan: 1, colspan: 2}
                        ],
                        cells: function (r, c) {
                            var cellProperties;
                            if ((r === 2 && c === 0) || (r === 3 && c === 0) || (r === 2 && c === 2) || (r === 3 && c === 2)) {
                                cellProperties = {
                                    type: 'dropdown',
                                    source: ['Ukraine', 'Germany']
                                };
                                return cellProperties;
                            }
                        },
                    });
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
                            check: '',
                            comment: ''
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
                            check: '',
                            comment: ''
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
                        $scope.questions[12].data = [
                            ['Name', 'Years of exp in trade finance', 'Certificates or training', '', 'Name', 'Years of exp in trade finance', 'Certificates or training'],
                            ['', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', ''],
                        ];
                    } else {
                        $scope.questions[12].data = JSON.parse($scope.questions[12].data);
                    }


                    var q12_container = document.getElementById('question_12'),
                        q12_hot;

                    q12_hot = new Handsontable(q12_container, {
                        data: $scope.questions[12].data,
                        mergeCells: [
                            {row: 0, col: 3, rowspan: 3, colspan: 1}
                        ]
                    });
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
                        $scope.questions[13].data = [
                            ['Name', 'Years of exp in trade finance', 'Certificates or training', '', 'Name', 'Years of exp in trade finance', 'Certificates or training'],
                            ['', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', ''],
                        ];
                    } else {
                        $scope.questions[13].data = JSON.parse($scope.questions[13].data);
                    }


                    var q13_container = document.getElementById('question_13'),
                        q13_hot;

                    q13_hot = new Handsontable(q13_container, {
                        data: $scope.questions[13].data,
                        mergeCells: [
                            {row: 0, col: 3, rowspan: 3, colspan: 1}
                        ]
                    });
                }


                /*
                 End Question 13
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