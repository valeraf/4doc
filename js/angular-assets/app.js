'use strict';

angular.module('4doctorsApp', ['ngRoute','ngAnimate','4doctorsApp.controllers']);

angular.module('4doctorsApp').config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
    when('/category/:categId', {
      templateUrl: 'templates/category.html',
      controller: 'ItemsListCtrl'
    }).
    when('/category/item/:itemId', {
      templateUrl: 'templates/product.html',
      controller: 'ItemDetailCtrl'
    }).
    otherwise({
      redirectTo: '/',
      templateUrl: 'templates/homepage.html',
      controller : function($scope){
        $scope.isHome = true;
        console.log($scope.isHome);
      }
    });
}]);