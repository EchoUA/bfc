'use strict';

/*
    Todo - Role service
 */
angular.module('BfcApp').factory('RoleService', RoleService);

RoleService.$inject = ['$http'];
function RoleService($http) {

    var api_url = '/api/roles';

    var service = {};

    service.Index = Index;

    return service;


    function Index() {
        return $http.get(api_url).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}