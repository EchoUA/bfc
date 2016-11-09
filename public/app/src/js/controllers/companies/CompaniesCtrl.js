'use strict';
angular.module('BfcApp').controller('CompaniesCtrl', ['$scope', 'CompanyService','UserService', 'toaster', 'underscore', function($scope, CompanyService, UserService, toaster, underscore) {

    /*
     Todo - Get all companies
     */
    $scope.totalPages = 0;
    $scope.currentPage = 1;
    $scope.range = [];
    $scope.items = [];

    $scope.getItems = function(pageNumber){

        if(pageNumber===undefined){
            pageNumber = '1';
        }


        CompanyService.Index(pageNumber).then(function (response) {
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
    Todo - Get all available (users without companies) users
     */
    UserService.Index(1, true).then(function (response) {
        $scope.users = response;
    });

    /*
    Todo - Get all available (users without companies) users
     */
    function availableUsers() {
        UserService.AvailableUsers().then(function (response) {
            $scope.available_users = response;
        });
    }
    availableUsers();

    /*
    Todo - Assigned users modal
     */
    $scope.assignedUsers = function () {
        $scope.attached_users = [];

        var company = underscore.find($scope.items.data, function (i) {
            return i.id == $scope.selected_items.id;
        });

        if(!underscore.isEmpty(company.users)){
            angular.forEach(company.users, function (v,k) {
                $scope.attached_users.push(underscore.find($scope.users.data, function (i) {
                    return i.id == v.id;
                }));
            });
        }

    };

    /*
    Todo - Assign user
     */
    $scope.assignUser = function (id) {
        $scope.attached_users.push(underscore.find($scope.available_users.data, function (i) {
            return i.id == id;
        }));
    };

    $scope.deassignUser = function (v) {
        $scope.attached_users.splice(v, 1);
    };

    // For selectbox (visible item)
    $scope.optionAllowed = function(id){
        var found = underscore.find($scope.attached_users, function (i) {
            return i.id == id;
        });
        if(found){
            return true;
        };
        return false;
    };

    $scope.saveCompaniesUsers = function () {
        CompanyService.CompaniesUsers($scope.selected_items.id, $scope.attached_users).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $scope.getItems();
                availableUsers();
            }else{
                toaster.pop('error', "", "Server error!");
            }
        });
    };

    /*
     Todo - Delete company
     */
    $scope.selected_items = {};
    $scope.delete = function () {
        CompanyService.Destroy($scope.selected_items.id).then(function (response) {
            if(response.success){
                toaster.pop('success', "Success!", "");
                $scope.getItems();
                availableUsers();
            }else{
                toaster.pop('error', "", "Server error!");
            }
        });
    }

}]);