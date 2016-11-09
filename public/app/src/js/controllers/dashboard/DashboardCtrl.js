'use strict';
angular.module('BfcApp').controller('DashboardCtrl', ['$scope', '$state', '$rootScope', 'UserService', function($scope, $state, $rootScope, UserService) {

    /*
    Todo - main page redirect
     */
    if ($rootScope.CURRENT_USER != null) {
        if ($rootScope.CURRENT_USER.user_role == 'user' || $rootScope.CURRENT_USER.user_role == 'bcp') {
            UserService.GetUserCompany($rootScope.CURRENT_USER.user_id).then(function (response) {
                if (response.data.id) {
                    $state.go('forms', {company_id: response.data.id});
                }
            });
        } else {
            $state.go('companies');
        }
    }else{
        $state.reload();
    }

}]);