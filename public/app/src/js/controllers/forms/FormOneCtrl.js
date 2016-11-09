'use strict';
angular.module('BfcApp').controller('FormOneCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'toaster', 'FormService', '$filter', '$http', 'underscore', 'QuestionService', 'UserService', 'CommentService',  function($scope, $state, $rootScope, $stateParams, toaster, FormService, $filter, $http, underscore, QuestionService, UserService, CommentService) {

    /*
     Todo - From 1 functional
     */
    function getQuestions() {
        FormService.Show($stateParams.form_id).then(function (response) {

            function getQuestionByPosition(position) {
                var question = underscore.find(response.data.questions, function (item) {
                    return item.position == position;
                });
                if(typeof question != 'undefined'){
                    question.check = true;
                }
                return question;
            }

            $scope.q_data = [];

            /*
             Save question
             */
            $scope.save = function (id) {
                QuestionService.Update($scope.questions[id].id, JSON.stringify($scope.questions[id].data)).then(function (response) {
                    toaster.pop('success', "Success!", "");
                });
            };

            $scope.questions = [];

            /*
             Question 1
             */
            $scope.questions[1] = getQuestionByPosition(1);

            if($scope.questions[1]) {
                if (underscore.isEmpty($scope.questions[1].data)) {
                    $scope.questions[1].data = [
                        // ['Bank name', ''],
                        ['Currency', ''],
                        ['Current unit', ''],
                        ['Bank only of consolidated', '']
                    ];
                } else {
                    $scope.questions[1].data = JSON.parse($scope.questions[1].data);
                }

                var q1_container = document.getElementById('question_1'),
                    q1_hot;

                q1_hot = new Handsontable(q1_container, {
                    data: $scope.questions[1].data,
                    cells: function (r, c) {
                        var cellProperties;
                        if ((r === 1 && c === 1)) {
                            cellProperties = {
                                type: 'dropdown',
                                source: ['Unit', 'thousand', 'million']
                            };
                            return cellProperties;
                        }
                        if ((r === 2 && c === 1)) {
                            cellProperties = {
                                type: 'dropdown',
                                source: ['Bank Only', 'Consolidated']
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

            if($scope.questions[2]) {
                if (underscore.isEmpty($scope.questions[2].data)) {
                    $scope.questions[2].data = {
                        check_1: '',
                        check_2: '',
                        check_3: '',
                        check_4: ''
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

            if($scope.questions[3]) {
                if (underscore.isEmpty($scope.questions[3].data)) {
                    $scope.questions[3].data = ([
                        ['', '__/__/20__', '12/31/2015', '12/31/2014', '12/31/2013'],
                        ['Principal or interest is 90 days or more past due', '', '', '', ''],
                        ['The bank has placed the exposure in non-accural status', '', '', '', ''],
                        ['Restructured within the last 12 months', '', '', '', ''],
                        ['Full repayment is doubtful even if current or less than 90 days past due', '', '', '', ''],
                        ['Total NPL', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['Gross loans', '', '', '', ''],
                        ['ADB NPL ratio', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['ADB NPL ratio covenant', '', '', '', ''],
                    ]);
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

            if($scope.questions[4]) {
                if (underscore.isEmpty($scope.questions[4].data)) {
                    $scope.questions[4].data = [
                        ["Non accural loans", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                        ["Non-accrual loans that are current or <90 days past due", "", "", "", ""],
                        ["Non-accrual loans that are >90 days", "", "", "", ""],
                        ["Total Non-accrual Loans ", " -   ", " -   ", " -   ", " -   "],
                        ["", "", "", "", ""],
                        ["Non accural loans", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                        ["Non-accrual loans that are current or <90 days past due", "", "", "", ""],
                        ["Non-accrual loans that are >90 days", "", "", "", ""],
                        ["Total Non-accrual Loans ", " -   ", " -   ", " -   ", " -   "],
                        ["", "", "", "", ""],
                        ["Restructured loans", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                        ["Loans restructured within the past 12 months (outstanding balance amount only)", "", "", "", ""],
                        ["Loans restructured within the past 12 months (outstanding balance amount only), not including any loans already included in 1, or 2 ", "", "", "", ""],
                        ["", "", "", "", ""],
                        ["Full repayment is doubftul", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                        ["Other loans for which full repayment is doubtful (do not include loans already included in 1, 2 or 3)", "", "", "", ""]
                    ];
                } else {
                    $scope.questions[4].data = JSON.parse($scope.questions[4].data);
                }

                var q4_container = document.getElementById('question_4'),
                    q4_hot;

                q4_hot = new Handsontable(q4_container, {
                    data: $scope.questions[4].data,
                });
            }
            /*
             End Question 4
             */


            /*
             Question 5
             */
            $scope.questions[5] = getQuestionByPosition(5);

            if($scope.questions[5]) {
                if (underscore.isEmpty($scope.questions[5].data)) {
                    $scope.questions[5].data = {
                        1: [
                            ["", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                            ["Funded Exposure to Top 20 ", "", "", "", ""],
                            ["Unfunded Exposure to Top 20 ", "", "", "", ""],
                            ["Single Largest Funded and Unfunded Exposure", "", "", "", ""]
                        ],
                        2: [
                            ["", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                            ["Regulatory NPL ratio per the central bank definition", "", "", "", ""]
                        ],
                        3: [
                            ["", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                            ["Tier 1, capital", "", "", "", ""],
                            ["Deductions", "", "", "", ""],
                            ["Tier 2, capital", "", "", "", ""],
                            ["Deductions", "", "", "", ""],
                            ["Total Capital", " -   ", " -   ", " -   ", " -   "],
                            ["Total Risk Weighted Assets", "", "", "", ""],
                            ["Tier 1 ratio (%)", "", "", "", ""],
                            ["Total CAR ratio (%)", "", "", "", ""],
                            ["Basis of calculation (Basel I, Basel II, local standards)", "", "", "", ""]
                        ],
                        4: [
                            ["", "__\/__\/20__", "12\/31\/2015", "12\/31\/2014", "12\/31\/2013"],
                            ["A. Total On-balance sheet FX Assets ", "", "", "", ""],
                            ["B. Total Off-balance sheet FX Assets (e.g. FX forward purchases)", "", "", "", ""],
                            ["Total Gross FX Long Position (A+B)", " -   ", " -   ", " -   ", " -   "],
                            ["C. Total On-balance sheet FX Liabilities", "", "", "", ""],
                            ["D. Total Off-balance sheet FX Liabilities (e.g. FX forward sales)", "", "", "", ""],
                            ["Total Gross FX Short Position (C+D)", " -   ", " -   ", " -   ", " -   "],
                            ["Net Open Position: On-Balance (A-C)", " -   ", " -   ", " -   ", " -   "],
                            ["Net Open Position: On and Off-Balance ((A+B)-(C+D))", " -   ", " -   ", " -   ", " -   "]
                        ]
                    }
                } else {
                    $scope.questions[5].data = JSON.parse($scope.questions[5].data);
                }

                // 1 table
                var q5_1_container = document.getElementById('question_5_1'),
                    q5_1_hot;

                q5_1_hot = new Handsontable(q5_1_container, {
                    data: $scope.questions[5].data[1],
                });

                // 2 table
                var q5_2_container = document.getElementById('question_5_2'),
                    q5_2_hot;

                q5_2_hot = new Handsontable(q5_2_container, {
                    data: $scope.questions[5].data[2],
                });

                // 3 table
                var q5_3_container = document.getElementById('question_5_3'),
                    q5_3_hot;

                q5_3_hot = new Handsontable(q5_3_container, {
                    data: $scope.questions[5].data[3],
                });

                // 4  table
                var q5_4_container = document.getElementById('question_5_4'),
                    q5_4_hot;

                q5_4_hot = new Handsontable(q5_4_container, {
                    data: $scope.questions[5].data[4],
                });
                /*
                 End Question 5
                 */
            }
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