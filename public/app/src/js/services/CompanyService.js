'use strict';

/*
    Todo - Company service
 */
angular.module('BfcApp').factory('CompanyService', CompanyService);

CompanyService.$inject = ['$http', 'Upload'];
function CompanyService($http, Upload) {

    var api_url = '/api/companies';

    var service = {};

    service.Index = Index;
    service.Store = Store;
    service.Show = Show;
    service.Update = Update;
    service.Destroy = Destroy;
    service.CompaniesUsers = CompaniesUsers;
    service.GetCompaniesUsers = GetCompaniesUsers;

    return service;


    function Index(page, all) {
        return $http.get(api_url+'?page='+page+'&all='+all).then(handleSuccess, handleError);
    }

    function Store(data, file) {
        return Upload.upload({
            url: api_url,
            data: {'avatar': file, 'data': data}
        }).then(handleSuccess, handleError);
        // return $http.post(api_url, data).then(handleSuccess, handleError);
    }

    function Show(id) {
        return $http.get(api_url+'/'+id).then(handleSuccess, handleError);
    }

    function Update(data, file) {
        return Upload.upload({
            url: api_url+'/' + data.id +'/update',
            // method: 'PUT',
            data: {'avatar': file, 'data': data}
        }).then(handleSuccess, handleError);
        // return $http.put(api_url+'/' + data.id, data).then(handleSuccess, handleError);
    }

    function Destroy(id) {
        return $http.delete(api_url+'/' + id).then(handleSuccess, handleError);
    }

    function CompaniesUsers(id, data) {
        return $http.post(api_url+'/' + id +'/users', data).then(handleSuccess, handleError);
    }

    function GetCompaniesUsers(id) {
        return $http.get(api_url+'/' + id+'/users').then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}