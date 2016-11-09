'use strict';

/*
    Todo - User service
 */
angular.module('BfcApp').factory('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {

    var api_url = '/api/users';

    var service = {};

    service.Index = Index;
    service.AvailableUsers = AvailableUsers;
    service.GetUserCompany = GetUserCompany;
    service.GetUserQuestionsByForm = GetUserQuestionsByForm;
    service.Store = Store;
    service.StoreAssign = StoreAssign;
    service.StoreQuestions = StoreQuestions;
    service.StoreQuestionsToBcp = StoreQuestionsToBcp;
    service.Show = Show;
    service.Update = Update;
    service.UpdatePassword = UpdatePassword;
    service.Dispatch = Dispatch;
    service.DispatchPreview = DispatchPreview;
    service.Destroy = Destroy;

    return service;


    function Index(page, all) {
        return $http.get(api_url+'?page='+page+'&all='+all).then(handleSuccess, handleError);
    }

    function AvailableUsers(role) {
        var tmp_role = 1;
        if(typeof role !== 'undefined'){
            tmp_role = role;
        }
        return $http.get(api_url+'/get/available/'+ tmp_role).then(handleSuccess, handleError);
    }

    function GetUserCompany(id) {
        return $http.get(api_url+'/'+id+'/company').then(handleSuccess, handleError);
    }

    function GetUserQuestionsByForm(id, form_id) {
        return $http.get(api_url + '/' + id + '/' + form_id + '/questions').then(handleSuccess, handleError);
    }

    function Store(data) {
        return $http.post(api_url, data).then(handleSuccess, handleError);
    }

    function StoreAssign(data, company_id, form_id) {
        return $http.post(api_url+'/store-assign/'+company_id+'/'+form_id, data).then(handleSuccess, handleError);
    }

    function StoreQuestions(id, form_id, data) {
        return $http.post(api_url + '/' + id + '/' + form_id + '/questions', data).then(handleSuccess, handleError);
    }

    function StoreQuestionsToBcp(company_id, form_id, data) {
        return $http.post(api_url + '/'+company_id+'/'+form_id +'/questions-bcp', data).then(handleSuccess, handleError);
    }

    function Show(id) {
        return $http.get(api_url+'/'+id).then(handleSuccess, handleError);
    }

    function Update(data) {
        return $http.put(api_url+'/' + data.id, data).then(handleSuccess, handleError);
    }

    function UpdatePassword(data) {
        return $http.put(api_url+'/' + data.id +'/password', data).then(handleSuccess, handleError);
    }

    function Dispatch(role, company_id) {
        return $http.get(api_url+'/' + role +'/' + company_id +'/dispatch').then(handleSuccess, handleError);
    }

    function DispatchPreview(role, company_id) {
        return $http.get(api_url+'/' + role +'/' + company_id +'/dispatch-preview').then(handleSuccess, handleError);
    }

    function Destroy(id) {
        return $http.delete(api_url+'/' + id).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}