'use strict';

angular.module('4doctorsApp', ['ngRoute','ngAnimate','4doctorsApp.service','4doctorsApp.controllers','4doctorsApp.directives', 'LocalStorageModule']);

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
    })
    .when('/wishlist', {
      templateUrl: 'templates/wishlist.html',
      controller: 'wishListCtrl'
    })
    .when('/empty-wishlist', {
      templateUrl: 'templates/empty-wishlist.html',
      controller: function(){
        
      }
    })
    .when('/cart', {
      templateUrl: 'templates/cart.html',
      controller: 'cartCtrl'
    }).
    when('/checkout/step1', {
      templateUrl: 'templates/checkout-step1.html',
      controller: 'checkoutCtrl'
    }).
    when('/checkout/step2', {
      templateUrl: 'templates/checkout-step2.html',
      controller: 'checkoutCtrl'
    }).
    when('/checkout/step3', {
      templateUrl: 'templates/checkout-step3.html',
      controller: 'checkoutCtrl'
    }).
    when('/checkout/step4', {
      templateUrl: 'templates/checkout-step4.html',
      controller: 'checkoutCtrl'
    }).
    when('/checkout/step5', {
      templateUrl: 'templates/checkout-step5.html',
      controller: 'checkoutCtrl'
    }).
    when('/checkout/step6', {
      templateUrl: 'templates/checkout-step6.html',
      controller: 'checkoutCtrl'
    })
    .when('/checkout/step7', {
      templateUrl: 'templates/checkout-step7.html',
      controller: 'checkoutCtrl'
    })
    .when('/success', {
      templateUrl: 'templates/success.html',
      controller: 'checkoutCtrl'
    })
    .otherwise({
      redirectTo: '/',
      templateUrl: 'templates/homepage.html'
    });
}]);

angular.module('4doctorsApp').config(function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('4doctorsApp');
});