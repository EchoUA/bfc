'use strict';
angular.module('BfcApp').controller('UsersCreateCtrl', ['$scope', 'UserService', 'CompanyService', 'RoleService', 'toaster', '$state', function($scope, UserService, CompanyService, RoleService, toaster, $state) {


    /*
     Todo - Get roles
     */
    RoleService.Index().then(function (response) {
        $scope.roles = response.data;
    });

    /*
     Todo - Create new user
     */
    $scope.data = {};
    $scope.create = function () {

        UserService.Store($scope.data).then(function (response) {
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
        })
    }

}]);