// Pagination directive
BfcApp.directive('itemsPagination', function(){
    return{
        restrict: 'E',
        template: '<ul class="pagination">'+
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getItems(1)">&laquo;</a></li>'+
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getItems(currentPage-1)">&lsaquo; Prev</a></li>'+
        '<li ng-show="totalPages > 1" ng-repeat="i in range" ng-class="{active : currentPage == i}">'+
        '<a href="javascript:void(0)" ng-click="getItems(i)">{{i}}</a>'+
        '</li>'+
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getItems(currentPage+1)">Next &rsaquo;</a></li>'+
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getItems(totalPages)">&raquo;</a></li>'+
        '</ul>'
    };
});