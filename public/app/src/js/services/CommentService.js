'use strict';

/*
    Todo - Comment service
 */
angular.module('BfcApp').factory('CommentService', CommentService);

CommentService.$inject = ['$http'];
function CommentService($http) {

    var api_url = '/api/comments';

    var service = {};

    service.Store = Store;
    service.GetToQuestion = GetToQuestion;

    return service;

    function Store(data) {
        return $http.post(api_url, data).then(handleSuccess, handleError);
    }

    function GetToQuestion(question_id) {
        return $http.get(api_url+'/'+question_id+'/question').then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res.data;
    }
}