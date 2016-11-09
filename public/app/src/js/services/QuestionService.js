'use strict';

/*
    Todo - Question service
 */
angular.module('BfcApp').factory('QuestionService', QuestionService);

QuestionService.$inject = ['$http'];
function QuestionService($http) {

    var api_url = '/api/questions';

    var service = {};

    service.Update = Update;
    service.Users = Users;
    service.Detach = Detach;
    service.GetByForm = GetByForm;
    service.Approve = Approve;
    service.Disapprove = Disapprove;

    return service;

    function Update(id, data) {
        return $http.put(api_url+'/' + id, data).then(handleSuccess, handleError);
    }

    function Users(id) {
        return $http.get(api_url+'/' + id +'/users').then(handleSuccess, handleError);
    }

    function Detach(id, user_id) {
        return $http.get(api_url+'/' + id +'/' + user_id +'/detach').then(handleSuccess, handleError);
    }

    function GetByForm(id) {
        return $http.get(api_url+'/'+id+'/form').then(handleSuccess, handleError);
    }

    function Approve(id) {
        return $http.get(api_url+'/'+id+'/approve').then(handleSuccess, handleError);
    }

    function Disapprove(id) {
        return $http.get(api_url+'/'+id+'/disapprove').then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}