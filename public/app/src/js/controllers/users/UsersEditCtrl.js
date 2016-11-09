'use strict';
angular.module('BfcApp').controller('UsersEditCtrl', ['$scope', 'UserService', 'CompanyService',  'RoleService', 'toaster', '$state',  '$stateParams', function($scope, UserService, CompanyService, RoleService, toaster, $state, $stateParams) {


    /*
     Todo - Get roles
     */
    RoleService.Index().then(function (response) {
        $scope.roles = response.data;
    });

    /*
     Todo - Get user data
     */
    UserService.Show($stateParams.id).then(function (response) {
        $scope.data = response.data;
        if(response.data.role_user[0]){
            $scope.data.role = response.data.role_user[0].id;
        }
    });

    /*
     Todo - Edit user
     */
    $scope.edit =function () {
        UserService.Update($scope.data).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $state.go('users');
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
    Todo - Edit user password
     */
    $scope.updatePassword = function () {
        UserService.UpdatePassword($scope.data).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $state.go('users');
            }else{
                angular.forEach(response.error, function (error) {
                    angular.forEach(error, function (message) {
                        toaster.pop('error', "", message);
                    });
                });
            }
        });
    };

}]);