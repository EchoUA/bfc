'use strict';
angular.module('BfcApp').controller('FormTwoCtrl', ['$scope', '$state', '$stateParams', 'toaster', 'FormService', '$filter', '$http', 'underscore', 'QuestionService',  'UserService', 'CommentService',  function($scope, $state, $stateParams, toaster, FormService, $filter, $http, underscore, QuestionService, UserService, CommentService) {

    /*
     Todo - From 2 functional
     */
    function getQuestions() {
        /*
         Todo - Get form
         */
        // UserService.Index(1, true).then(function (response) {
        //     var users_names = [];
        //     angular.forEach(response.data, function (v, k) {
        //         users_names.push(v.name);
        //     });
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
                    toaster.pop('success', "Success!", "");
                });
            };


            /*
             Question 0
             */
            $scope.questions[0] = getQuestionByPosition(0);
            if ($scope.questions[0]) {
                if (underscore.isEmpty($scope.questions[0].data)) {
                    $scope.questions[0].data = [
                        ['Bank name', response.data.name],
                        ['All currency figures are in what units (thousand, million, etc)?', ''],
                        ['Bank-only or consolidated', ''],
                        ['Name of banking license', ''],
                        ['Date of receipt of banking license', ''],
                        ['Year the bank was founded', ''],
                        ['Completed by (name and title)', ''],
                        ['Completed on (day/month/year)', ''],
                    ];
                } else {
                    $scope.questions[0].data = JSON.parse($scope.questions[0].data);
                }

                var q0_container = document.getElementById('question_0'),
                    q0_hot;

                q0_hot = new Handsontable(q0_container, {
                    data: $scope.questions[0].data,
                    cells: function (r, c) {
                        var cellProperties;
                        if (r === 7 && c === 1) {
                            cellProperties = {
                                type: 'date' // force text type for first row
                            };
                            return cellProperties;
                        }
                    },
                });
            }

            /*
             End Question 0
             */


            /*
             Question 1
             */
            $scope.questions[1] = getQuestionByPosition(1);
            if ($scope.questions[1]) {
                if (underscore.isEmpty($scope.questions[1].data)) {
                    $scope.questions[1].data = {
                        file: '',
                        comment: ''
                    };
                } else {
                    $scope.questions[1].data = JSON.parse($scope.questions[1].data);
                }
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
                        file: '',
                        comment: ''
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
                        file: '',
                        comment: ''
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
                        file: '',
                        comment: ''
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
                    $scope.questions[5].data = [
                        ['Company Name', '% Owned', 'Main Activities', 'Total Assets of Subsidiary as of __/__/20__ ', 'Total Net Income of Subsidiary in Financial Year 20__'],
                        ['Subsidiary Companies      ', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['Associate Companies', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[5].data = JSON.parse($scope.questions[5].data);
                }

                var q5_container = document.getElementById('question_5'),
                    q5_hot;

                q5_hot = new Handsontable(q5_container, {
                    data: $scope.questions[5].data,
                });
            }
            /*
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
                        ['Name', '% Ownership', 'Represented on Board of Directors? (Yes/No)', 'Is Public/ Gov’t? (Yes/No)', 'Main business activity of shareholder', 'Country', 'Political Affiliation (if any)'],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['Other', '', '', '', '', '', ''],
                        ['TOTAL', '=SUM(B1:B5)', '', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[6].data = JSON.parse($scope.questions[6].data);
                }

                var q6_container = document.getElementById('question_6'),
                    q6_hot;

                q6_hot = new Handsontable(q6_container, {
                    data: $scope.questions[6].data,
                    columns: [
                        {},
                        {
                            type: 'numeric',
                            format: '%'
                        },
                        {
                            type: 'dropdown',
                            source: ['yes', 'no']
                        },
                        {
                            type: 'dropdown',
                            source: ['yes', 'no']
                        },
                        {},
                        {
                            type: 'dropdown',
                            source: ['USA', 'Ukraine']
                        },
                        {},
                    ],

                    formulas: true,
                    cells: function (r, c) {
                        var cellProperties;
                        if ((r === 0 && c === 1)) {
                            cellProperties = {
                                type: 'text'
                            };
                            return cellProperties;
                        }
                        if ((r === 0 && c === 2) || (r === 0 && c === 3) || (r === 0 && c === 5)) {
                            cellProperties = {
                                type: 'text'
                            };
                            return cellProperties;
                        }
                    },
                });
            }
            /*
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
                        ['Name', 'Representing which shareholder', 'Board Member Since (Year)', 'Is he/she Independent (Yes/No)', 'Is he/she an executive of the Bank (Title/No)', 'Experience', 'Prior Banking Experience (Yes/No)'],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[7].data = JSON.parse($scope.questions[7].data);
                }

                var q7_container = document.getElementById('question_7'),
                    q7_hot;

                q7_hot = new Handsontable(q7_container, {
                    data: $scope.questions[7].data,
                    columns: [
                        {},
                        {},
                        {
                            type: 'date',
                        },
                        {
                            type: 'dropdown',
                            source: ['yes', 'no']
                        },
                        {},
                        {},
                        {
                            type: 'dropdown',
                            source: ['yes', 'no']
                        },
                    ],
                    cells: function (r, c) {
                        var cellProperties;
                        if ((r === 0 && c === 2) || (r === 0 && c === 3) || (r === 0 && c === 6)) {
                            cellProperties = {
                                type: 'text'
                            };
                            return cellProperties;
                        }
                    },
                });
            }
            /*
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
                        check: '',
                        comment: ''
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
                    $scope.questions[9].data = [
                        ['Committee Name', 'Name of Members'],
                        ['', ''],
                        ['', ''],
                        ['', ''],
                        ['', ''],
                        ['', '']
                    ];
                } else {
                    $scope.questions[9].data = JSON.parse($scope.questions[9].data);
                }

                var q9_container = document.getElementById('question_9'),
                    q9_hot;

                q9_hot = new Handsontable(q9_container, {
                    data: $scope.questions[9].data,
                });
            }
            /*
             /*
             End Question 9
             */

            /*
             Question 10
             */
            $scope.questions[10] = getQuestionByPosition(10);
            if ($scope.questions[10]) {
                if (underscore.isEmpty($scope.questions[10].data)) {
                    $scope.questions[10].data = [
                        ['Name (Mr./Ms.)', '', '', '', '',],
                        ['Title', '', '', 'Since:', ''],
                        ['Years of professional experience', 'Total:', '', '', ''],
                        ['Years of banking experience', 'Total:', '', 'With this bank:', ''],
                        ['Previous experience', '', '', '', ''],
                        ['Specific expertise', '', '', '', ''],
                        ['Degree and University', '', '', '', ''],
                        ['Other', '', '', '', ''],

                        ['', '', '', '', ''],

                        ['Name (Mr./Ms.)', '', '', '', ''],
                        ['Title', '', '', 'Since:', ''],
                        ['Years of professional experience', 'Total:', '', '', ''],
                        ['Years of banking experience', 'Total:', '', 'With this bank:', ''],
                        ['Previous experience', '', '', '', ''],
                        ['Specific expertise', '', '', '', ''],
                        ['Degree and University', '', '', '', ''],
                        ['Other', '', '', '', ''],

                        ['', '', '', '', ''],

                        ['Name (Mr./Ms.)', '', '', '', ''],
                        ['Title', '', '', 'Since:', ''],
                        ['Years of professional experience', 'Total:', '', '', ''],
                        ['Years of banking experience', 'Total:', '', 'With this bank:', ''],
                        ['Previous experience', '', '', '', ''],
                        ['Specific expertise', '', '', '', ''],
                        ['Degree and University', '', '', '', ''],
                        ['Other', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[10].data = JSON.parse($scope.questions[10].data);
                }

                var q10_container = document.getElementById('question_10'),
                    q10_hot;

                q10_hot = new Handsontable(q10_container, {
                    data: $scope.questions[10].data,
                    mergeCells: [
                        {row: 0, col: 1, rowspan: 1, colspan: 4},
                        {row: 1, col: 1, rowspan: 1, colspan: 2},
                        {row: 2, col: 2, rowspan: 1, colspan: 3},
                        {row: 4, col: 1, rowspan: 1, colspan: 4},
                        {row: 5, col: 1, rowspan: 1, colspan: 4},
                        {row: 6, col: 1, rowspan: 1, colspan: 4},
                        {row: 7, col: 1, rowspan: 1, colspan: 4},

                        {row: 8, col: 0, rowspan: 1, colspan: 5},

                        {row: 9, col: 1, rowspan: 1, colspan: 4},
                        {row: 10, col: 1, rowspan: 1, colspan: 2},
                        {row: 11, col: 2, rowspan: 1, colspan: 3},
                        {row: 13, col: 1, rowspan: 1, colspan: 4},
                        {row: 14, col: 1, rowspan: 1, colspan: 4},
                        {row: 15, col: 1, rowspan: 1, colspan: 4},
                        {row: 16, col: 1, rowspan: 1, colspan: 4},

                        {row: 17, col: 0, rowspan: 1, colspan: 5},

                        {row: 18, col: 1, rowspan: 1, colspan: 4},
                        {row: 19, col: 1, rowspan: 1, colspan: 2},
                        {row: 20, col: 2, rowspan: 1, colspan: 3},
                        {row: 22, col: 1, rowspan: 1, colspan: 4},
                        {row: 23, col: 1, rowspan: 1, colspan: 4},
                        {row: 24, col: 1, rowspan: 1, colspan: 4},
                        {row: 25, col: 1, rowspan: 1, colspan: 4},
                    ]
                });
            }
            /*
             /*
             End Question 10
             */

            /*
             Question 11
             */
            $scope.questions[11] = getQuestionByPosition(11);
            if ($scope.questions[11]) {
                if (underscore.isEmpty($scope.questions[11].data)) {
                    $scope.questions[11].data = [
                        ['', 'Plan for __/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Branch Type #1', '', '', '', ''],
                        ['Branch Type #2', '', '', '', ''],
                        ['Total Offices', '', '', '', ''],

                        ['Please define briefly the different types of offices*:', '', '', '', ''],

                        ['', 'Description', '', '', ''],
                        ['Branch Type #1', '', '', '', ''],
                        ['Branch Type #2	', '', '', '', ''],

                    ];
                } else {
                    $scope.questions[11].data = JSON.parse($scope.questions[11].data);
                }

                var q11_container = document.getElementById('question_11'),
                    q11_hot;

                q11_hot = new Handsontable(q11_container, {
                    data: $scope.questions[11].data,
                    mergeCells: [
                        {row: 4, col: 0, rowspan: 1, colspan: 5},
                        {row: 5, col: 1, rowspan: 1, colspan: 4},
                        {row: 6, col: 1, rowspan: 1, colspan: 4},
                        {row: 7, col: 1, rowspan: 1, colspan: 4},

                    ]
                });
            }
            /*
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
                        ['Customer Segment: Retail', '', '', ''],
                        ['Name of Committee / Approval Level', 'Committee Members', 'Approval Authority (in local currency)', 'Can approve related party loans (Y/N)'],
                        ['', '', '', ''],
                        ['', '', '', ''],
                        ['', '', '', ''],

                        ['Customer Segment: SME', '', '', ''],

                        ['Name of Committee / Approval Level', 'Committee Members', 'Approval Authority (in local currency)', 'Can approve related party loans (Y/N)'],
                        ['', '', '', ''],
                        ['', '', '', ''],
                        ['', '', '', ''],

                        ['Customer Segment: Large corporates', '', '', ''],

                        ['Name of Committee / Approval Level', 'Committee Members', 'Approval Authority (in local currency)', 'Can approve related party loans (Y/N)'],
                        ['', '', '', ''],
                        ['', '', '', ''],
                        ['', '', '', ''],

                    ];
                } else {
                    $scope.questions[12].data = JSON.parse($scope.questions[12].data);
                }

                var q12_container = document.getElementById('question_12'),
                    q12_hot;

                q12_hot = new Handsontable(q12_container, {
                    data: $scope.questions[12].data,
                    columns: [
                        {},
                        {},
                        {},
                        {
                            type: 'dropdown',
                            source: ['yes', 'no']
                        },
                    ],
                    mergeCells: [
                        {row: 0, col: 0, rowspan: 1, colspan: 3},
                        {row: 5, col: 0, rowspan: 1, colspan: 3},
                        {row: 10, col: 0, rowspan: 1, colspan: 3},

                    ],
                    cells: function (r, c) {
                        var cellProperties;
                        if (r === 0 || r === 1 || r === 6 || r === 11) {
                            cellProperties = {
                                type: 'text'
                            };
                            return cellProperties;
                        }
                    },
                });
            }
            /*
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
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Large Corporate', '', '', '', ''],
                        ['Commercial/Medium Enterprise', '', '', '', ''],
                        ['SME', '', '', '', ''],
                        ['Consumer', '', '', '', ''],
                        ['Banks/ Other Financial Institutions', '', '', '', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B1:B6)', '=SUM(C1:C6)', '=SUM(D1:D6)', '=SUM(E1:E6)'],
                    ];
                } else {
                    $scope.questions[13].data = JSON.parse($scope.questions[13].data);
                }

                var q13_container = document.getElementById('question_13'),
                    q13_hot;

                q13_hot = new Handsontable(q13_container, {
                    data: $scope.questions[13].data,
                    formulas: true,
                    cells: function (r, c) {
                        var cellProperties;
                        if (r === 6) {
                            cellProperties = {
                                readOnly: true
                            };
                            return cellProperties;
                        }
                    },
                });
            }
            /*
             /*
             End Question 13
             */

            /*
             Question 14
             */
            $scope.questions[14] = getQuestionByPosition(14);
            if ($scope.questions[14]) {
                if (underscore.isEmpty($scope.questions[14].data)) {
                    $scope.questions[14].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Economic sector/Industry #1', '', '', '', ''],
                        ['Economic sector/Industry #2', '', '', '', ''],
                        ['Economic sector/Industry #3', '', '', '', ''],
                        ['Economic sector/Industry #4', '', '', '', ''],
                        ['Economic sector/Industry #5', '', '', '', ''],
                        ['Economic sector/Industry #6', '', '', '', ''],
                        ['Economic sector/Industry #7', '', '', '', ''],
                        ['Economic sector/Industry #8', '', '', '', ''],
                        ['Economic sector/Industry #9', '', '', '', ''],
                        ['Economic sector/Industry #10', '', '', '', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B1:B11)', '=SUM(C1:C11)', '=SUM(D1:D11)', '=SUM(E1:E11)'],
                    ];
                } else {
                    $scope.questions[14].data = JSON.parse($scope.questions[14].data);
                }

                var q14_container = document.getElementById('question_14'),
                    q14_hot;

                q14_hot = new Handsontable(q14_container, {
                    data: $scope.questions[14].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 14
             */

            /*
             Question 15
             */
            $scope.questions[15] = getQuestionByPosition(15);
            if ($scope.questions[15]) {
                if (underscore.isEmpty($scope.questions[15].data)) {
                    $scope.questions[15].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Local Currency', '', '', '', ''],
                        ['Foreign Currency', '', '', '', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B1:B3)', '=SUM(C1:C3)', '=SUM(D1:D3)', '=SUM(E1:E3)']
                    ];
                } else {
                    $scope.questions[15].data = JSON.parse($scope.questions[15].data);
                }

                var q15_container = document.getElementById('question_15'),
                    q15_hot;

                q15_hot = new Handsontable(q15_container, {
                    data: $scope.questions[15].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 15
             */

            /*
             Question 16
             */
            $scope.questions[16] = getQuestionByPosition(16);
            if ($scope.questions[16]) {
                if (underscore.isEmpty($scope.questions[16].data)) {
                    $scope.questions[16].data = [
                        ['', '__/__/20__', 'Typical Loan to Value Ratio (%)', 'Frequency of (Re)Appraisals'],
                        ['Real estate', '', '', ''],
                        ['Inventories', '', '', ''],
                        ['Shares of other companies', '', '', ''],
                        ['Equipment', '', '', ''],
                        ['Gold and precious metals', '', '', ''],
                        ['Cash', '', '', ''],
                        ['Other collateral', '', '', ''],
                        ['Guarantees of individuals or enterprises', '', '', ''],
                        ['Total Secured', '=SUM(B1:B9)', '=SUM(C1:C9)', '=SUM(D1:D9)'],
                        ['Unsecured', '', '', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B9:B11)', '=SUM(C9:C11)', '=SUM(D9:D11)'],
                    ];
                } else {
                    $scope.questions[16].data = JSON.parse($scope.questions[16].data);
                }

                var q16_container = document.getElementById('question_16'),
                    q16_hot;

                q16_hot = new Handsontable(q16_container, {
                    data: $scope.questions[16].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 16
             */


            /*
             Question 17
             */
            $scope.questions[17] = getQuestionByPosition(17);
            if ($scope.questions[17]) {
                if (underscore.isEmpty($scope.questions[17].data)) {
                    $scope.questions[17].data = [
                        ['', '__/__/20__'],
                        ['Demand and less than 1 month', ''],
                        ['From 1 to 3 months', ''],
                        ['From 3 to 12 months', ''],
                        ['From 1 to 5 years', ''],
                        ['More than 5 years', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B1:B6)'],
                    ];
                } else {
                    $scope.questions[17].data = JSON.parse($scope.questions[17].data);
                }

                var q17_container = document.getElementById('question_17'),
                    q17_hot;

                q17_hot = new Handsontable(q17_container, {
                    data: $scope.questions[17].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 17
             */

            /*
             Question 18
             */
            $scope.questions[18] = getQuestionByPosition(18);
            if ($scope.questions[18]) {
                if (underscore.isEmpty($scope.questions[18].data)) {
                    $scope.questions[18].data = [
                        ['', '__/__/20__'],
                        ['Fixed interest rate', ''],
                        ['Floating interest rate', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B1:B3)'],
                    ];
                } else {
                    $scope.questions[18].data = JSON.parse($scope.questions[18].data);
                }

                var q18_container = document.getElementById('question_18'),
                    q18_hot;

                q18_hot = new Handsontable(q18_container, {
                    data: $scope.questions[18].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 18
             */

            /*
             Question 19
             */
            $scope.questions[19] = getQuestionByPosition(19);
            if ($scope.questions[19]) {
                if (underscore.isEmpty($scope.questions[19].data)) {
                    $scope.questions[19].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Performing Loans', '', '', '', ''],
                        ['Non-performing Loans', '', '', '', ''],
                        ['Other Funded Exposure', '', '', '', ''],
                        ['Total Funded Exposure to Related Parties', '=SUM(B1:B4)', '=SUM(C1:C4)', '=SUM(D1:D4)', '=SUM(E1:E4)'],
                        ['Unfunded Exposure to Related Parties**', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[19].data = JSON.parse($scope.questions[19].data);
                }

                var q19_container = document.getElementById('question_19'),
                    q19_hot;

                q19_hot = new Handsontable(q19_container, {
                    data: $scope.questions[19].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 19
             */

            /*
             Question 20
             */
            $scope.questions[20] = getQuestionByPosition(20);
            if ($scope.questions[20]) {
                if (underscore.isEmpty($scope.questions[20].data)) {
                    $scope.questions[20].data = [
                        ['', '__/__/20__', 'NPL (Y/N)', '31/12/20__', 'NPL (Y/N)', '31/12/20__', 'NPL (Y/N)', '31/12/20__', 'NPL (Y/N)'],
                        ['Funded', '', '', '', '', '', '', '', ''],
                        ['Unfunded', '', '', '', '', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[20].data = JSON.parse($scope.questions[20].data);
                }

                var q20_container = document.getElementById('question_20'),
                    q20_hot;

                q20_hot = new Handsontable(q20_container, {
                    data: $scope.questions[20].data,
                });
            }
            /*
             /*
             End Question 20
             */

            /*
             Question 21
             */
            $scope.questions[21] = getQuestionByPosition(21);
            if ($scope.questions[21]) {
                if (underscore.isEmpty($scope.questions[21].data)) {
                    $scope.questions[21].data = [
                        ['', '__/__/20__'],
                        ['Staff Loans', ''],
                        ['Related Party Loans', ''],
                        ['Total Staff & Related Party Loans', ''],
                    ];
                } else {
                    $scope.questions[21].data = JSON.parse($scope.questions[21].data);
                }

                var q21_container = document.getElementById('question_21'),
                    q21_hot;

                q21_hot = new Handsontable(q21_container, {
                    data: $scope.questions[21].data,
                });
            }
            /*
             /*
             End Question 21
             */

            /*
             Question 22
             */
            $scope.questions[22] = getQuestionByPosition(22);
            if ($scope.questions[22]) {
                if (underscore.isEmpty($scope.questions[22].data)) {
                    $scope.questions[22].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Funded Exposure to Top 20', '', '', '', ''],
                        ['Unfunded* Exposure to Top 20', '', '', '', ''],
                        ['Single Largest Funded and Unfunded Exposure', '', '', '', '']
                    ];
                } else {
                    $scope.questions[22].data = JSON.parse($scope.questions[22].data);
                }

                var q22_container = document.getElementById('question_22'),
                    q22_hot;

                q22_hot = new Handsontable(q22_container, {
                    data: $scope.questions[22].data,
                });
            }
            /*
             /*
             End Question 22
             */

            /*
             Question 23
             */
            $scope.questions[23] = getQuestionByPosition(23);
            if ($scope.questions[23]) {
                if (underscore.isEmpty($scope.questions[23].data)) {
                    $scope.questions[23].data = [
                        ['#', 'Obligor Name', 'Outstanding Exposure', 'NPL', 'Days overdue', 'Sector', 'Collateral Coverage', 'Owner-ship', 'Related party', '', ''],
                        ['1', '', '', '', '', '', '', '', '', '', ''],
                        ['2', '', '', '', '', '', '', '', '', '', ''],
                        ['3', '', '', '', '', '', '', '', '', '', ''],
                        ['4', '', '', '', '', '', '', '', '', '', ''],
                        ['5', '', '', '', '', '', '', '', '', '', ''],
                        ['6', '', '', '', '', '', '', '', '', '', ''],
                        ['7', '', '', '', '', '', '', '', '', '', ''],
                        ['8', '', '', '', '', '', '', '', '', '', ''],
                        ['9', '', '', '', '', '', '', '', '', '', ''],
                        ['10', '', '', '', '', '', '', '', '', '', ''],
                        ['11', '', '', '', '', '', '', '', '', '', ''],
                        ['12', '', '', '', '', '', '', '', '', '', ''],
                        ['13', '', '', '', '', '', '', '', '', '', ''],
                        ['14', '', '', '', '', '', '', '', '', '', ''],
                        ['15', '', '', '', '', '', '', '', '', '', ''],
                        ['16', '', '', '', '', '', '', '', '', '', ''],
                        ['17', '', '', '', '', '', '', '', '', '', ''],
                        ['18', '', '', '', '', '', '', '', '', '', ''],
                        ['19', '', '', '', '', '', '', '', '', '', ''],
                        ['20', '', '', '', '', '', '', '', '', '', ''],
                        ['', 'TOTAL', '', '', '', '', '', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[23].data = JSON.parse($scope.questions[23].data);
                }

                var q23_container = document.getElementById('question_23'),
                    q23_hot;

                q23_hot = new Handsontable(q23_container, {
                    data: $scope.questions[23].data,
                    mergeCells: [
                        {row: 0, col: 2, rowspan: 1, colspan: 3},
                    ]
                });
            }
            /*
             /*
             End Question 23
             */

            /*
             Question 24
             */
            $scope.questions[24] = getQuestionByPosition(24);
            if ($scope.questions[24]) {
                if (underscore.isEmpty($scope.questions[24].data)) {
                    $scope.questions[24].data = [
                        ['', 'NPL* (Y/N)', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Standard', '', '', '', '', ''],
                        ['Special Mention', '', '', '', '', ''],
                        ['Substandard', '', '', '', '', ''],
                        ['Doubtful', '', '', '', '', ''],
                        ['Loss', '', '', '', '', ''],
                        ['Total Gross Loan Portfolio', '=SUM(B2:B6)', '=SUM(C2:C6)', '=SUM(D2:D6)', '=SUM(E2:E6)', '=SUM(F2:F6)'],
                    ];
                } else {
                    $scope.questions[24].data = JSON.parse($scope.questions[24].data);
                }

                var q24_container = document.getElementById('question_24'),
                    q24_hot;

                q24_hot = new Handsontable(q24_container, {
                    data: $scope.questions[24].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 24
             */

            /*
             Question 25
             */
            $scope.questions[25] = getQuestionByPosition(25);
            if ($scope.questions[25]) {
                if (underscore.isEmpty($scope.questions[25].data)) {
                    $scope.questions[25].data = [
                        ['Sector', 'Amount of NPLs'],
                        ['', ''],
                        ['', ''],
                        ['', ''],
                    ];
                } else {
                    $scope.questions[25].data = JSON.parse($scope.questions[25].data);
                }

                var q25_container = document.getElementById('question_25'),
                    q25_hot;

                q25_hot = new Handsontable(q25_container, {
                    data: $scope.questions[25].data,
                });
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
                    $scope.questions[26].data = [
                        ['', 'Period up to __/__/20__', 'Year 20__', 'Year 20__', 'Year 20__'],
                        ['NPLs sold during the year', '', '', '', ''],
                        ['Foreclosed Assets sold during the year', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[26].data = JSON.parse($scope.questions[26].data);
                }

                var q26_container = document.getElementById('question_26'),
                    q26_hot;

                q26_hot = new Handsontable(q26_container, {
                    data: $scope.questions[26].data,
                });
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
                    $scope.questions[27].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Foreclosed assets on the balance', '', '', '', ''],
                        ['Of which included in total NPLs', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[27].data = JSON.parse($scope.questions[27].data);
                }

                var q27_container = document.getElementById('question_27'),
                    q27_hot;

                q27_hot = new Handsontable(q27_container, {
                    data: $scope.questions[27].data,
                });
            }
            /*
             /*
             End Question 27
             */

            /*
             Question 28
             */
            $scope.questions[28] = getQuestionByPosition(28);
            if ($scope.questions[28]) {
                if (underscore.isEmpty($scope.questions[28].data)) {
                    $scope.questions[28].data = [
                        ['', 'Period up to __/__/20__', 'Year 20__', 'Year 20__', 'Year 20__'],
                        ['Gross Write-offs', '', '', '', ''],
                        ['Recoveries*', '', '', '', ''],
                        ['Net Write-offs (Gross Write-offs – Recoveries)', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[28].data = JSON.parse($scope.questions[28].data);
                }

                var q28_container = document.getElementById('question_28'),
                    q28_hot;

                q28_hot = new Handsontable(q28_container, {
                    data: $scope.questions[28].data,
                });
            }
            /*
             /*
             End Question 28
             */

            /*
             Question 29
             */
            $scope.questions[29] = getQuestionByPosition(29);
            if ($scope.questions[29]) {
                if (underscore.isEmpty($scope.questions[29].data)) {
                    $scope.questions[29].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Generic provisions', '', '', '', ''],
                        ['Specific provisions (for NPLs)', '', '', '', ''],
                        ['Total Loan Loss Reserves', '=SUM(B1:B3)', '=SUM(C1:C3)', '=SUM(D1:D3)', '=SUM(E1:E3)'],
                    ];
                } else {
                    $scope.questions[29].data = JSON.parse($scope.questions[29].data);
                }

                var q29_container = document.getElementById('question_29'),
                    q29_hot;

                q29_hot = new Handsontable(q29_container, {
                    data: $scope.questions[29].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 29
             */

            /*
             Question 30
             */
            $scope.questions[30] = getQuestionByPosition(30);
            if ($scope.questions[30]) {
                if (underscore.isEmpty($scope.questions[30].data)) {
                    $scope.questions[30].data = [
                        ['', '__/__/20__', '31/12/20__'],
                        ['Direct real estate investments', '', ''],
                        ['Construction loans and loans to real estate developers', '', ''],
                        ['Residential mortgage loans', '', ''],
                        ['Commercial real estate loans', '', ''],
                        ['Loans to manufacturers of cement and other construction materials*', '', ''],
                        ['Total', '=SUM(B1:B6)', '=SUM(C1:C6)'],
                    ];
                } else {
                    $scope.questions[30].data = JSON.parse($scope.questions[30].data);
                }

                var q30_container = document.getElementById('question_30'),
                    q30_hot;

                q30_hot = new Handsontable(q30_container, {
                    data: $scope.questions[30].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 30
             */

            /*
             Question 31
             */
            $scope.questions[31] = getQuestionByPosition(31);
            if ($scope.questions[31]) {
                if (underscore.isEmpty($scope.questions[31].data)) {
                    $scope.questions[31].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Largest group depositor', '', '', '', ''],
                        ['Top 20 depositors', '', '', '', ''],
                    ];
                } else {
                    $scope.questions[31].data = JSON.parse($scope.questions[31].data);
                }

                var q31_container = document.getElementById('question_31'),
                    q31_hot;

                q31_hot = new Handsontable(q31_container, {
                    data: $scope.questions[31].data,
                });
            }
            /*
             /*
             End Question 31
             */

            /*
             Question 32
             */
            $scope.questions[32] = getQuestionByPosition(32);
            if ($scope.questions[32]) {
                if (underscore.isEmpty($scope.questions[32].data)) {
                    $scope.questions[32].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Local Currency', '', '', '', ''],
                        ['Foreign Currency', '', '', '', ''],
                        ['Total Customer Deposits', '=SUM(B2:B3)', '=SUM(C2:C3)', '=SUM(D2:D3)', '=SUM(E2:E3)'],
                    ];
                } else {
                    $scope.questions[32].data = JSON.parse($scope.questions[32].data);
                }

                var q32_container = document.getElementById('question_32'),
                    q32_hot;

                q32_hot = new Handsontable(q32_container, {
                    data: $scope.questions[32].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 32
             */

            /*
             Question 33
             */
            $scope.questions[33] = getQuestionByPosition(33);
            if ($scope.questions[33]) {
                if (underscore.isEmpty($scope.questions[33].data)) {
                    $scope.questions[33].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Retail Deposits', '', '', '', ''],
                        ['Corporate Deposits', '', '', '', ''],
                        ['Total Customer Deposits', '=SUM(B2:B3)', '=SUM(C2:C3)', '=SUM(D2:D3)', '=SUM(E2:E3)'],
                    ];
                } else {
                    $scope.questions[33].data = JSON.parse(getQuestionByPosition(33).data);
                }

                var q33_container = document.getElementById('question_33'),
                    q33_hot;

                q33_hot = new Handsontable(q33_container, {
                    data: $scope.questions[33].data,
                    formulas: true,
                });
            }
            /*
             /*
             End Question 33
             */

            /*
             Question 34
             */
            $scope.questions[34] = getQuestionByPosition(34);
            if ($scope.questions[34]) {
                if (underscore.isEmpty($scope.questions[34].data)) {
                    $scope.questions[34].data = [
                        ['', '__/__/20__'],
                        ['Fixed interest rate', ''],
                        ['Floating interest rate', ''],
                        ['Non-interest bearing', ''],
                    ];
                } else {
                    $scope.questions[34].data = JSON.parse($scope.questions[34].data);
                }

                var q34_container = document.getElementById('question_34'),
                    q34_hot;

                q34_hot = new Handsontable(q34_container, {
                    data: $scope.questions[34].data,
                });
            }
            /*
             /*
             End Question 34
             */

            /*
             Question 35
             */
            $scope.questions[35] = getQuestionByPosition(35);
            if ($scope.questions[35]) {
                if (underscore.isEmpty($scope.questions[35].data)) {
                    $scope.questions[35].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Tier 1, capital', '', '', '', ''],
                        ['Deductions', '', '', '', ''],
                        ['Tier 2, capital', '', '', '', ''],
                        ['Deductions', '', '', '', ''],
                        ['Total Capital', '', '', '', ''],
                        ['Total Risk Weighted Assets', '', '', '', ''],
                        ['Tier 1 ratio (%)', '', '', '', ''],
                        ['Total CAR ratio (%)', '', '', '', ''],
                        ['Basis of calculation (Basel I, Basel II, local standards)', '', '', '', '']
                    ];
                } else {
                    $scope.questions[35].data = JSON.parse($scope.questions[35].data);
                }

                var q35_container = document.getElementById('question_35'),
                    q35_hot;

                q35_hot = new Handsontable(q35_container, {
                    data: $scope.questions[35].data,
                });
            }
            /*
             /*
             End Question 35
             */

            /*
             Question 36
             */
            $scope.questions[36] = getQuestionByPosition(36);
            if ($scope.questions[36]) {
                if (underscore.isEmpty($scope.questions[36].data)) {
                    $scope.questions[36].data = [
                        ['Lender', 'Amount', 'Expiry Date', '31/12/20__', '31/12/20__'],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],
                        ['', '', '', '', ''],

                    ];
                } else {
                    $scope.questions[36].data = JSON.parse($scope.questions[36].data);
                }

                var q36_container = document.getElementById('question_36'),
                    q36_hot;

                q36_hot = new Handsontable(q36_container, {
                    data: $scope.questions[36].data,
                });
            }
            /*
             /*
             End Question 36
             */

            /*
             Question 37
             */
            $scope.questions[37] = getQuestionByPosition(37);
            if ($scope.questions[37]) {
                if (underscore.isEmpty($scope.questions[37].data)) {
                    $scope.questions[37].data = [
                        ['', 'Up to 1 month', '1-3 Months', '3-12 months', '1-5 years', 'Over 5 years', 'No Maturity', 'TOTAL'],
                        ['FINANCIAL ASSETS', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                        ['FINANCIAL LIABILITIES', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', ''],
                        ['Gap', '', '', '', '', '', '', ''],

                    ];
                } else {
                    $scope.questions[37].data = JSON.parse($scope.questions[37].data);
                }

                var q37_container = document.getElementById('question_37'),
                    q37_hot;

                q37_hot = new Handsontable(q37_container, {
                    data: $scope.questions[37].data,
                });
            }
            /*
             /*
             End Question 37
             */

            /*
             Question 38
             */
            $scope.questions[38] = getQuestionByPosition(38);
            if ($scope.questions[38]) {
                if (underscore.isEmpty($scope.questions[38].data)) {
                    $scope.questions[38].data = [
                        ['', 'Up to 1 month', '1-3 Months', '3-12 months', '1-5 years', 'Over 5 years', 'Non-interest bearing'],
                        ['FINANCIAL ASSETS', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['FINANCIAL LIABILITIES', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', ''],
                        ['Gap', '', '', '', '', '', ''],

                    ];
                } else {
                    $scope.questions[38].data = JSON.parse($scope.questions[38].data);
                }

                var q38_container = document.getElementById('question_38'),
                    q38_hot;

                q38_hot = new Handsontable(q38_container, {
                    data: $scope.questions[38].data,
                });
            }
            /*
             /*
             End Question 38
             */

            /*
             Question 39
             */
            $scope.questions[39] = getQuestionByPosition(39);
            if ($scope.questions[39]) {
                if (underscore.isEmpty($scope.questions[39].data)) {
                    $scope.questions[39].data = [
                        ['', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['A. Total On-balance sheet FX Assets', '', '', '', ''],
                        ['B. Total Off-balance sheet FX Assets (e.g. FX forward purchases)', '', '', '', ''],
                        ['Total Gross FX Long Position (A+B)', '', '', '', ''],
                        ['C. Total On-balance sheet FX Liabilities', '', '', '', ''],
                        ['D. Total Off-balance sheet FX Liabilities (e.g. FX forward sales)', '', '', '', ''],
                        ['Total Gross FX Short Position (C+D)', '', '', '', ''],
                        ['Net Open Position: On-Balance (A-C)', '', '', '', ''],
                        ['Net Open Position: On and Off-Balance ((A+B)-(C+D))', '', '', '', ''],

                    ];
                } else {
                    $scope.questions[39].data = JSON.parse($scope.questions[39].data);
                }

                var q39_container = document.getElementById('question_39'),
                    q39_hot;

                q39_hot = new Handsontable(q39_container, {
                    data: $scope.questions[39].data
                });
            }
            /*
             /*
             End Question 39
             */

            /*
             Question 40
             */
            $scope.questions[40] = getQuestionByPosition(40);
            if ($scope.questions[40]) {
                if (underscore.isEmpty($scope.questions[40].data)) {
                    $scope.questions[40].data = [
                        ['Type of Commitment', '__/__/20__', '31/12/20__', '31/12/20__', '31/12/20__'],
                        ['Committed credit lines/loans', '', '', '', ''],
                        ['Letters of credit', '', '', '', ''],
                        ['Guarantees', '', '', '', ''],
                        ['Other', '', '', '', ''],
                        ['Total', '', '', '', ''],

                    ];
                } else {
                    $scope.questions[40].data = JSON.parse($scope.questions[40].data);
                }

                var q40_container = document.getElementById('question_40'),
                    q40_hot;

                q40_hot = new Handsontable(q40_container, {
                    data: $scope.questions[40].data
                });
            }
            /*
             /*
             End Question 40
             */

            /*
             Question 41
             */
            $scope.questions[41] = getQuestionByPosition(41);
            if ($scope.questions[41]) {
                if (underscore.isEmpty($scope.questions[41].data)) {
                    $scope.questions[41].data = {
                        item_1: {
                            check: '',
                            comment: '',
                            radio: ''
                        },
                        item_2: {
                            check: '',
                            comment: ''
                        },
                        item_3: {
                            check: '',
                            comment: ''
                        },
                        item_4: {
                            check: '',
                            comment: ''
                        },
                        item_5: {
                            check: '',
                        }
                    };
                } else {
                    $scope.questions[41].data = JSON.parse($scope.questions[41].data);
                }
            }
            /*
             End Question 41
             */

            /*
             Question 42
             */
            $scope.questions[42] = getQuestionByPosition(42);
            if ($scope.questions[42]) {
                if (underscore.isEmpty($scope.questions[42].data)) {
                    $scope.questions[42].data = {
                        comment: ''
                    };
                } else {
                    $scope.questions[42].data = JSON.parse($scope.questions[42].data);
                }
            }
            /*
             End Question 42
             */

            /*
             Question 43
             */
            $scope.questions[43] = getQuestionByPosition(43);
            if ($scope.questions[43]) {
                if (underscore.isEmpty($scope.questions[43].data)) {
                    $scope.questions[43].data = [
                        ['#', 'Obligor Name'],
                        ['1', ''],
                        ['2', ''],
                        ['3', ''],
                        ['4', ''],
                        ['5', ''],
                        ['6', ''],
                        ['7', ''],
                        ['8', ''],
                        ['9', ''],
                        ['10', '']

                    ];
                } else {
                    $scope.questions[43].data = JSON.parse($scope.questions[43].data);
                }

                var q43_container = document.getElementById('question_43'),
                    q43_hot;

                q43_hot = new Handsontable(q43_container, {
                    data: $scope.questions[43].data,
                });
            }
            /*
             /*
             End Question 43
             */

            /*
             Question 44
             */
            $scope.questions[44] = getQuestionByPosition(44);
            if ($scope.questions[44]) {
                if (underscore.isEmpty($scope.questions[44].data)) {
                    $scope.questions[44].data = {
                        'data': [
                            ['#', 'Depositor Name', 'Sector', 'Related party'],
                            ['1', '', '', ''],
                            ['2', '', '', ''],
                            ['3', '', '', ''],
                            ['4', '', '', ''],
                            ['5', '', '', ''],
                            ['6', '', '', ''],
                            ['7', '', '', ''],
                            ['8', '', '', ''],
                            ['9', '', '', ''],
                            ['10', '', '', ''],

                        ],
                        'addition': {
                            1: {"comment": ""},
                            2: {"comment": ""},
                            3: {"comment": ""},
                            4: {"comment": ""},
                            5: {"comment": ""},
                            6: {"comment": ""},
                            7: {"comment": ""},
                        }
                    };
                } else {
                    $scope.questions[44].data = JSON.parse($scope.questions[44].data);
                }

                var q44_container = document.getElementById('question_44'),
                    q44_hot;

                q44_hot = new Handsontable(q44_container, {
                    data: $scope.questions[44].data.data,
                });
            }
            /*
             /*
             End Question 44
             */

            /*
             Question 45
             */
            $scope.questions[45] = getQuestionByPosition(45);
            if ($scope.questions[45]) {
                if (underscore.isEmpty($scope.questions[45].data)) {
                    $scope.questions[45].data = {
                        comment: ''
                    };
                } else {
                    $scope.questions[45].data = JSON.parse($scope.questions[45].data);
                }
            }
            /*
             End Question 45
             */

            /*
             Question 46
             */
            $scope.questions[46] = getQuestionByPosition(46);
            if ($scope.questions[46]) {
                if (underscore.isEmpty($scope.questions[46].data)) {
                    $scope.questions[46].data = {
                        comment: ''
                    };
                } else {
                    $scope.questions[46].data = JSON.parse($scope.questions[46].data);
                }
            }
            /*
             End Question 46
             */

            /*
             Question 47
             */
            $scope.questions[47] = getQuestionByPosition(47);
            if ($scope.questions[47]) {
                if (underscore.isEmpty($scope.questions[47].data)) {
                    $scope.questions[47].data = {
                        item_1: {
                            check: '',
                            comment: ''
                        },
                        item_2: {
                            check: '',
                            comment: ''
                        }
                    };
                } else {
                    $scope.questions[47].data = JSON.parse($scope.questions[47].data);
                }
            }
            /*
             End Question 47
             */

            /*
             Question 48
             */
            $scope.questions[48] = getQuestionByPosition(48);
            if ($scope.questions[48]) {
                if (underscore.isEmpty($scope.questions[48].data)) {
                    $scope.questions[48].data = {
                        item_1: {
                            check: '',
                            radio: ''
                        },
                        item_2: {
                            check: '',
                            radio: ''
                        },
                        item_3: {
                            check: '',
                            radio: ''
                        },
                        item_4: {
                            check: '',
                            radio: ''
                        },
                        item_5: {
                            check: '',
                            radio: ''
                        },
                        item_6: {
                            check: '',
                            radio: ''
                        },
                        item_7: {
                            check: '',
                            radio: ''
                        },
                    };
                } else {
                    $scope.questions[48].data = JSON.parse($scope.questions[48].data);
                }
            }
            /*
             End Question 48
             */

            /*
             Question 49
             */
            $scope.questions[49] = getQuestionByPosition(49);
            if ($scope.questions[49]) {
                if (underscore.isEmpty($scope.questions[49].data)) {
                    $scope.questions[49].data = {
                        item_1: {
                            check: '',
                            radio: ''
                        },
                        item_2: {
                            check: '',
                            radio: ''
                        },
                    };
                } else {
                    $scope.questions[49].data = JSON.parse($scope.questions[49].data);
                }
            }
            /*
             End Question 49
             */

            /*
             Question 50
             */
            $scope.questions[50] = getQuestionByPosition(50);
            if ($scope.questions[50]) {
                if (underscore.isEmpty($scope.questions[50].data)) {
                    $scope.questions[50].data = {
                        item_1: {
                            comment: '',
                            check: '',
                        },
                        item_2: {
                            comment: '',
                        },
                        item_3: {
                            comment: '',
                        },
                    };
                } else {
                    $scope.questions[50].data = JSON.parse($scope.questions[50].data);
                }
            }
            /*
             End Question 50
             */


            /*
             Question 51
             */
            $scope.questions[51] = getQuestionByPosition(51);
            if ($scope.questions[51]) {
                if (underscore.isEmpty($scope.questions[51].data)) {
                    $scope.questions[51].data = {
                        item_1: {
                            comment: '',
                            check: '',
                            radio: '',
                        },
                        item_2: {
                            comment: '',
                            check: '',
                            radio: '',
                        },
                    };
                } else {
                    $scope.questions[51].data = JSON.parse($scope.questions[51].data);
                }
            }
            /*
             End Question 51
             */

            /*
             Question 52
             */
            $scope.questions[52] = getQuestionByPosition(52);
            if ($scope.questions[52]) {
                if (underscore.isEmpty($scope.questions[52].data)) {
                    $scope.questions[52].data = {
                        check: ''
                    };
                } else {
                    $scope.questions[52].data = JSON.parse($scope.questions[52].data);
                }
            }
            /*
             End Question 52
             */

        });
        // });
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