'use strict';

/*
    Todo - CRUD service
 */
angular.module('BfcApp').factory('CrudService', CrudService);

CrudService.$inject = ['$http'];
function CrudService($http) {

    var service = {};
    service.api_url = 'api/url';
    service.Index = Index;
    service.Store = Store;
    service.Show = Show;
    service.Update = Update;
    service.Destroy = Destroy;

    return service;


    function Index(page) {
        return $http.get(service.api_url+'?page='+page).then(handleSuccess, handleError);
    }

    function Store(data) {
        return $http.post(service.api_url, data).then(handleSuccess, handleError);
    }

    function Show(id) {
        return $http.get(service.api_url+'/'+id).then(handleSuccess, handleError);
    }

    function Update(data) {
        return $http.put(service.api_url+'/' + data.id, data).then(handleSuccess, handleError);
    }

    function Destroy(id) {
        return $http.delete(service.api_url+'/' + id).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}