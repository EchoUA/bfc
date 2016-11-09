// Action dropdown Directive
BfcApp.directive('ngActionDropdown', ['$timeout', function($timeout) {
    'use strict';

    var setScopeValues = function (scope, attrs) {
        scope.questionId = attrs.questionId;
        scope.userRole = attrs.userRole;
        scope.isAdmin = attrs.userRole == 'admin' ? true : false;
        scope.isBcp = attrs.userRole == 'bcp' ? true : false;
    };

    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            setScopeValues(scope, attrs);
        },
        template:
        '<div class="actions right"> ' +
        '<a class="waves-effect waves-light btn btn-actions dropdown-button" href="" data-activates="dropdown_{{questionId}}" dropdown data-hover="false">' +
        'Actions list ' +
        '</a>' +
        '<ul id="dropdown_{{questionId}}" class="dropdown-content action-list">' +
        '<li ng-show="isBcp"><a href="#userRelationModal" modal class="first"><i class="assign-user-icon"></i>Assign Responsibility</a></li>' +
        '<li ng-show="isAdmin"><a href="" class="first" ng-click="assignToBcp()"><i class="assign-user-icon"></i>Assign Responsibility</a></li>' +
        '<li ng-show="isBcp"><a href="#userUnassignModal" modal ng-click="getQuestionUsers(questionId)"><i class="unassign-user-icon"></i>Unassign users</a></li>' +
        '<li ng-show="isBcp"><a href="" ng-click="approveQuestion(questionId)"><i class="mark-approved-icon"></i>Mark as Approved</a></li>' +
        '<li ng-show="isAdmin"><a href="" ng-click="disapproveQuestion(questionId)"><i class="mark-approved-icon"></i>Disapprove</a></li>' +
        '<li><a href="#commentsModal" modal ng-click="getAllComments(questionId)"><i class="comment-icon"></i>Comment</a></li>' +
        '</ul>'+
        '</div>'
    };

}]);