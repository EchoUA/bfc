'use strict';
angular.module('BfcApp').controller('CompaniesEditCtrl', ['$scope', 'CompanyService',  'UserService', 'toaster', '$state',  '$stateParams', function($scope, CompanyService, UserService, toaster, $state, $stateParams) {

    /*
     Todo - Get company data
     */
    CompanyService.Show($stateParams.id).then(function (response) {
        $scope.data = response.data;

        $scope.available_users = [];
        UserService.AvailableUsers('bcp').then(function (response) {
            $scope.available_users = response.data;

            if($scope.data.users[0]){
                $scope.data.bcp = $scope.data.users[0].id;
                $scope.available_users.push($scope.data.users[0]);
            }
        });
    });

    /*
     Todo - Edit company
     */
    $scope.edit = function () {
        CompanyService.Update($scope.data, $scope.file).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $state.go('companies');
            }else{
                angular.forEach(response.error, function (error) {
                    angular.forEach(error, function (message) {
                        toaster.pop('error', "", message);
                    });
                });
            }
        });
    }

}]);