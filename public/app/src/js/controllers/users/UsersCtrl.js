'use strict';
angular.module('BfcApp').controller('UsersCtrl', ['$scope', 'UserService', 'toaster', function($scope, UserService, toaster) {

    /*
     Todo - Get all users
     */
    $scope.totalPages = 0;
    $scope.currentPage = 1;
    $scope.range = [];
    $scope.items = [];

    $scope.getItems = function(pageNumber){

        if(pageNumber===undefined){
            pageNumber = '1';
        }

        UserService.Index(pageNumber, false).then(function (response) {
            $scope.items = response.data;

            $scope.totalPages   = response.data.last_page;
            $scope.currentPage  = response.data.current_page;

            // Pagination Range
            var pages = [];

            for(var i=1;i<=response.data.last_page;i++) {
                pages.push(i);
            }

            $scope.range = pages;
        });

    };
    $scope.getItems();

    /*
    Todo - Delete user
     */
    $scope.selected_items = {};
    $scope.delete = function () {
        UserService.Destroy($scope.selected_items.id).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $scope.getItems();
            }else{
                toaster.pop('error', "", "Server error!");
            }
        });
    }

}]);