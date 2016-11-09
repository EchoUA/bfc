/* BFC App */
var BfcApp = angular.module("BfcApp", [
    "ui.router",
    "oc.lazyLoad",
    'toaster',
    'ngAnimate',
    'ui.materialize',
    'ngUnderscore',
    'ui.slimscroll',
    'xeditable',
    'ngHandsontable',
    'ngTagsInput',
    'ngFileUpload'
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
BfcApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/* Setup global settings */
BfcApp.factory('settings', ['$rootScope', '$http', 'CSRF_TOKEN', function($rootScope, $http, CSRF_TOKEN) {

   // User Details
   $http.get('/api/user-role').success(function(response) {
       $rootScope.CURRENT_USER = response;
   });

    var settings = {
        csrf_token : CSRF_TOKEN
    };

   return settings;
}]);

/* Setup Layout Part - Header */
BfcApp.controller('HeaderController', ['$scope', function($scope) {
}]);

/* Setup Layout Part - Footer */
BfcApp.controller('FooterController', ['$scope', function($scope) {
}]);

/* Setup Routing For All Pages */
BfcApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider

    // Dashboard
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/app/src/views/dashboard/dashboard.html",
            data: {
                pageTitle: 'Admin Dashboard',
                // breadcrumbs: 'Dashboard',
                permissions: 'admin|user|bcp',
            },
            controller: "DashboardCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '/app/build/js/controllers/dashboard/DashboardCtrl.min.js',
                            '/app/build/js/services/UserService.min.js',
                        ]
                    });
                }]
            }
        })

    // Users
        .state('users', {
            url: "/users",
            templateUrl: "/app/src/views/users/users.html",
            data: {
                pageTitle: 'Users',
                // breadcrumbs: 'Users',
                permissions: 'admin',
            },
            controller: "UsersCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/users/UsersCtrl.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/directives/ItemsPaginationDirective.min.js',
                        ]
                    });
                }]
            }
        })

    // Users create
        .state('users/create', {
            url: "/users/create",
            templateUrl: "/app/src/views/users/create.html",
            data: {
                pageTitle: 'Create new user',
                // breadcrumbs: 'Create new user',
                permissions: 'admin',
            },
            controller: "UsersCreateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/users/UsersCreateCtrl.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CompanyService.min.js',
                            '/app/build/js/services/RoleService.min.js',
                        ]
                    });
                }]
            }
        })

    // Users edit
        .state('users/edit', {
            url: "/users/edit/:id",
            templateUrl: "/app/src/views/users/edit.html",
            data: {
                pageTitle: 'Edit user',
                // breadcrumbs: 'Edit user',
                permissions: 'admin',
            },
            controller: "UsersEditCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/users/UsersEditCtrl.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CompanyService.min.js',
                            '/app/build/js/services/RoleService.min.js',
                        ]
                    });
                }]
            }
        })

        // Companies
        .state('companies', {
            url: "/companies",
            templateUrl: "/app/src/views/companies/companies.html",
            data: {
                pageTitle: 'Companies',
                // breadcrumbs: 'Companies',
                permissions: 'admin',
            },
            controller: "CompaniesCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/companies/CompaniesCtrl.min.js',
                            '/app/build/js/services/CompanyService.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/directives/ItemsPaginationDirective.min.js',
                        ]
                    });
                }]
            }
        })

        // Users create
        .state('companies/create', {
            url: "/companies/create",
            templateUrl: "/app/src/views/companies/create.html",
            data: {
                pageTitle: 'Create new company',
                // breadcrumbs: 'Create new company',
                permissions: 'admin',
            },
            controller: "CompaniesCreateCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/companies/CompaniesCreateCtrl.min.js',
                            '/app/build/js/services/CompanyService.min.js'
                        ]
                    });
                }]
            }
        })

        // Users edit
        .state('companies/edit', {
            url: "/companies/edit/:id",
            templateUrl: "/app/src/views/companies/edit.html",
            data: {
                pageTitle: 'Edit company',
                // breadcrumbs: 'Edit company',
                permissions: 'admin',
            },
            controller: "CompaniesEditCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/companies/CompaniesEditCtrl.min.js',
                            '/app/build/js/services/CompanyService.min.js',
                            '/app/build/js/services/UserService.min.js',
                        ]
                    });
                }]
            }
        })

        // Forms (by company id)
        .state('forms', {
            url: "/forms/:company_id/",
            templateUrl: "/app/src/views/forms/forms.html",
            data: {
                pageTitle: 'Forms',
                // breadcrumbs: 'Forms',
                permissions: 'admin|bcp|user',
            },
            controller: "FormsCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/forms/FormsCtrl.min.js',
                            '/app/build/js/services/FormService.min.js',
                            '/app/build/js/services/QuestionService.min.js',
                            '/app/build/js/services/CompanyService.min.js',
                            '/app/build/js/services/UserService.min.js'
                        ]
                    });
                }]
            }
        })

        // Forms view (by company id and form id)
        .state('forms.view_1', {
            url: "1/view/:form_id",
            templateUrl: "/app/src/views/forms/form_one.html",
            data: {
                pageTitle: 'Forms',
                // breadcrumbs: 'Forms',
                permissions: 'admin|bcp|user',
            },
            controller: "FormOneCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/forms/FormOneCtrl.min.js',
                            '/app/build/js/controllers/forms/FormsCtrl.min.js',
                            '/app/build/js/services/FormService.min.js',
                            '/app/build/js/services/QuestionService.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CommentService.min.js',
                            '/app/build/js/directives/ActionDropdownDirective.min.js',
                        ]
                    });
                }]
            }
        })

        // Forms view (by company id and form id)
        .state('forms.view_2', {
            url: "2/view/:form_id",
            templateUrl: "/app/src/views/forms/form_two.html",
            data: {
                pageTitle: 'Forms',
                // breadcrumbs: 'Forms',
                permissions: 'admin|bcp|user',
            },
            controller: "FormTwoCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/forms/FormTwoCtrl.min.js',
                            '/app/build/js/controllers/forms/FormsCtrl.min.js',
                            '/app/build/js/services/FormService.min.js',
                            '/app/build/js/services/QuestionService.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CommentService.min.js',
                            '/app/build/js/directives/ActionDropdownDirective.min.js',
                        ]
                    });
                }]
            }
        })

        // Forms view (by company id and form id)
        .state('forms.view_3', {
            url: "3/view/:form_id",
            templateUrl: "/app/src/views/forms/form_three.html",
            data: {
                pageTitle: 'Forms',
                // breadcrumbs: 'Forms',
                permissions: 'admin|bcp|user',
            },
            controller: "FormThreeCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/forms/FormThreeCtrl.min.js',
                            '/app/build/js/controllers/forms/FormsCtrl.min.js',
                            '/app/build/js/services/FormService.min.js',
                            '/app/build/js/services/QuestionService.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CommentService.min.js',
                            '/app/build/js/directives/ActionDropdownDirective.min.js',
                        ]
                    });
                }]
            }
        })

        // Forms view (by company id and form id)
        .state('forms.view_4', {
            url: "4/view/:form_id",
            templateUrl: "/app/src/views/forms/form_four.html",
            data: {
                pageTitle: 'Forms',
                // breadcrumbs: 'Forms',
                permissions: 'admin|bcp|user',
            },
            controller: "FormFourCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/forms/FormFourCtrl.min.js',
                            '/app/build/js/controllers/forms/FormsCtrl.min.js',
                            '/app/build/js/services/FormService.min.js',
                            '/app/build/js/services/QuestionService.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CommentService.min.js',
                            '/app/build/js/directives/ActionDropdownDirective.min.js',
                        ]
                    });
                }]
            }
        })

        // Forms view (by company id and form id)
        .state('forms.view_5', {
            url: "5/view/:form_id",
            templateUrl: "/app/src/views/forms/form_five.html",
            data: {
                pageTitle: 'Forms',
                // breadcrumbs: 'Forms',
                permissions: 'admin|bcp|user',
            },
            controller: "FormFiveCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BfcApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            '/app/build/js/controllers/forms/FormFiveCtrl.min.js',
                            '/app/build/js/controllers/forms/FormsCtrl.min.js',
                            '/app/build/js/services/FormService.min.js',
                            '/app/build/js/services/QuestionService.min.js',
                            '/app/build/js/services/UserService.min.js',
                            '/app/build/js/services/CommentService.min.js',
                            '/app/build/js/directives/ActionDropdownDirective.min.js',
                        ]
                    });
                }]
            }
        })
}]);


/* Init global settings and run the app */
BfcApp.run(["$rootScope", "settings", "$state", "$interval", "$http", function ($rootScope, settings, $state, $interval, $http) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    // Check Permissions (routes)
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.data.permissions) {
            $rootScope.$watch('CURRENT_USER.user_role', function (newValue, oldValue) {
                if ($rootScope.CURRENT_USER != null) {
                    if (!(toState.data.permissions.split('|').indexOf($rootScope.CURRENT_USER.user_role) > -1)) {
                        $state.go("dashboard");
                    }
                }
            });
        }
    });

    // Check Permissions (views)
    $rootScope.checkPermission = function (roles) {
        if ($rootScope.CURRENT_USER != null) {
            if (!(roles.split('|').indexOf($rootScope.CURRENT_USER.user_role) > -1)) {
                return false;
            } else {
                return true;
            }
        }
    };

}]);
