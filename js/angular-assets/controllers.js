angular.module('4doctorsApp.controllers', [])
.controller('4doctrsMainCtrl', ['$scope','$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
  $scope.slide = '';

  $rootScope.back = function(e) {
    console.log('dd');
    $scope.slide = 'slide-right';
    $window.history.back();
    console.log($scope.slide);
  }
  $rootScope.go = function(path){
    $scope.slide = 'slide-left';
    $location.url(path);
    console.log($scope.slide);
  }
}])
.controller('ItemsListCtrl', function(){

})
.controller('ItemDetailCtrl', function(){
  
});