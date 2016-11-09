'use strict';

/*
    Todo - Form service
 */
angular.module('BfcApp').factory('FormService', FormService);

FormService.$inject = ['$http'];
function FormService($http) {

    var api_url = '/api/forms';

    var service = {};

    service.Index = Index;
    service.Show = Show;
    service.ProgressBar = ProgressBar;
    service.Approve = Approve;

    return service;


    function Index(id) {
        return $http.get(api_url+'/'+id).then(handleSuccess, handleError);
    }

    function Show(id) {
        return $http.get(api_url+'/'+id+'/show').then(handleSuccess, handleError);
    }

    function ProgressBar(id) {
        return $http.get(api_url+'/'+id+'/progress-bar').then(handleSuccess, handleError);
    }

    function Approve(id) {
        return $http.get(api_url+'/'+id+'/approve').then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}