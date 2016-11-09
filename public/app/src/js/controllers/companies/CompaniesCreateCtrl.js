'use strict';
angular.module('BfcApp').controller('CompaniesCreateCtrl', ['$scope', 'CompanyService', 'toaster', '$state', function($scope, CompanyService, toaster, $state) {

    /*
     Todo - Create new company
     */
    $scope.data = {};
    $scope.create = function () {

        CompanyService.Store($scope.data, $scope.file).then(function (response) {
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
        })
    }

}]);