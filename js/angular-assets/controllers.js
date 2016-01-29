angular.module('4doctorsApp.controllers', [])
.controller('4doctrsMainCtrl', ['$scope','$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
  $scope.slide = '';
  $scope.home = '';
  $rootScope.emptyWishlist = false;

  $rootScope.back = function(e) {
    $scope.slide = 'slide-right';
    $window.history.back();
  }
  $rootScope.go = function(path){
    $scope.slide = 'slide-left';
    $('body').removeClass('show-menu-enabled');
    setTimeout(function(){
      $('body').removeClass('show-menu');
    },500)
    $location.url(path);
  }
  $rootScope.menu = function(path){
    $('body').toggleClass('show-menu-enabled');
    if($('body').hasClass('show-menu')){
      setTimeout(function(){
        $('body').removeClass('show-menu');
      },500)
    }else{
      $('body').addClass('show-menu');
    }
    return false;
  }

  $(document).on('click', '.sales-wrapper .full-image-close' ,function(){
    $('.sales-wrapper').removeClass('show');
    return false;
  });
  $(document).on('click', '.homepage .btn' ,function(){
    $('.sales-wrapper').addClass('show');
    $('.thankyou').removeClass('thankyou');
    return false;
  });
   $(document).on('change','.subscribe-form input',function(){
    $('.sale-block').addClass('thankyou')
  });
}])
.controller('ItemsListCtrl', ['$http', '$scope', '$routeParams', 'Wishlist', function($http, $scope, $routeParams, Wishlist){
  $scope.inwishlist = 0;
  $scope.options = {};
  $http.get('items/'+ $routeParams.categId +'.json').success(function(data) {
    $scope.items = data;
    angular.forEach($scope.items, function(product){
      var keys = Object.keys(localStorage),
          i = keys.length;

      while ( i-- ) {
        if (keys[i].split('.')[1] == product.id)
          product.inWishlist = true;
      }
    });
    $scope.options.size = [];
    $scope.options.color = [];
    $scope.options.brand = [];
    angular.forEach($scope.items, function(item){
      angular.forEach(item.options.size, function(optionSize){
        if ($scope.options.size.indexOf(optionSize) === -1) {
            $scope.options.size.push(optionSize);
        }
      });

      angular.forEach(item.options.color, function(optionColor){
        if ($scope.options.color.indexOf(optionColor) === -1) {
            $scope.options.color.push(optionColor);
        }
      });

      angular.forEach(item.options.brand, function(optionBrand){
        if ($scope.options.brand.indexOf(optionBrand) === -1) {
            $scope.options.brand.push(optionBrand);
        }
      });
    });
  });

  var selectedSizes = [];
  $scope.selectSize = function(size) {
      if (selectedSizes.indexOf(size) < 0) {
          selectedSizes.push(size)
      }
  }
  $scope.unselectSize = function(size) {
      if (selectedSizes.indexOf(size) >= 0) {
          delete selectedSizes[selectedSizes.indexOf(size)]
      }
  };

  $scope.filterProductsBySize = function(product) {
      var result = true;
      angular.forEach(selectedSizes, function(element) {
          if(product.options.size.indexOf(element) == -1){
            result = false;
          }
      });
      return result;
  }


  $scope.price = '';
  $scope.reverse = false;

  $scope.order = function(order) {
    $scope.price = 'price';
    $scope.reverse = (order == 'low') ? !$scope.reverse : true;
  };

  $scope.lang = 'en';

  var sizes = {
    ru: {xxs: '38 - 40', xs: '42-44', s: 46, m: 48, l: '50-52', xl: '52-54', xxl: '54-56', xxxl: '56-58'}, 
    en: {xxs: 'xxs', xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl', xxl: 'xxl', xxxl: 'xxxl'}
  };

  $scope.getSize = function (size, lang) {
    return sizes[lang][size] || ''
  };

  $scope.addToWishlist = function($event,item){
    var productData;
    for (i in $scope.items){
      if($scope.items[i].id == item.id){
        productData = $scope.items[i];
        $scope.items[i].inWishlist = true;
      }
    }

    $event.preventDefault();
    
    return Wishlist.addToWishlist($event.target, productData);
  }
  $scope.removeFromWishlist = function($event, item){
    var productToRemove;
    for (i in $scope.items){
      if($scope.items[i].id == item.id){
        productToRemove = $scope.items[i].id;
        $scope.items[i].inWishlist = false;
      }
    }
    $event.preventDefault();
    return Wishlist.removeFromWishlist($event.target, productToRemove);
  }

  $scope.filter = {};

  $scope.filterByProperties = function (item) {
      // Use this snippet for matching with AND
      var matchesAND = true;
      for (var prop in $scope.filter) {
          if (noSubFilter($scope.filter[prop])) continue;
          if (!$scope.filter[prop][item[prop]]) {
              matchesAND = false;
              break;
          }
      }
      return matchesAND;
  };
  
  function noSubFilter(subFilterObj) {
      for (var key in subFilterObj) {
          if (subFilterObj[key]) return false;
      }
      return true;
  }

  $scope.clearFilter = function() {
    $scope.filter = {};
    selectedSizes = [];
  };
}])
.controller('wishListCtrl', function($http, $scope, $rootScope, $routeParams, updateCart, Wishlist, localStorageService){
  $scope.inwishlist = 0;
  $scope.wishlistItems = [];
  var keys = Object.keys(localStorage),
      i = keys.length;
  while ( i-- ) {
    $scope.wishlistItems.push(localStorageService.get(keys[i].split('.')[1]));
  }

  if($scope.wishlistItems.length == 0){
    $rootScope.emptyWishlist = true;
  }else{
    $rootScope.emptyWishlist = false;
  }

  $scope.removeFromWishlist = function($event, item){
    var productToRemove;
    for (i in $scope.wishlistItems){
      if($scope.wishlistItems[i].id == item.id){
        productToRemove = $scope.wishlistItems[i].id;
        $scope.wishlistItems[i].inWishlist = false;
      }
    }
    
    $event.preventDefault();
    return Wishlist.removeFromWishlist($event.target, productToRemove);
  }

})
.controller('ItemDetailCtrl', ['$http', '$scope', '$routeParams', 'updateCart', 'Wishlist', function($http, $scope, $routeParams, updateCart, Wishlist){
  $http.get('items/' + $routeParams.itemId +'.json').success(function(data) {
    $scope.itemDetail = data;
  });

  $scope.lang = 'en';

  var sizes = {
    ru: {xxs: '38 - 40', xs: '42-44', s: 46, m: 48, l: '50-52', xl: '52-54', xxl: '54-56', xxxl: '56-58'}, 
    en: {xxs: 'xxs', xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl', xxl: 'xxl', xxxl: 'xxxl'}
  };

  $scope.getSize = function (size, lang) {
    return sizes[lang][size] || ''
  };

  $scope.updateCart = function($event,item){
    
    return updateCart.update();
  }

  $scope.addToWishlist = function($event,item){
    $scope.itemDetail.inWishlist = true;

    $event.preventDefault();
    
    return Wishlist.addToWishlist($event.target);
  }
  $scope.removeFromWishlist = function($event, item){
    var productToRemove = $scope.itemDetail.id;

    $scope.itemDetail.inWishlist = false;
    $event.preventDefault();
    return Wishlist.removeFromWishlist($event.target, productToRemove);
  }

  $('.filter-switcher, .shipping-methods, .payment-methods').each(function(i,e){
    $(e).find('input').parent().removeClass('checked')
    $(e).find('input:checked').parent().addClass('checked');
    $(e).find('input:disabled').parent().addClass('disabled');
    $('input', e).change(function(){
      $(e).find('input').parent().removeClass('checked')
      $(e).find('input:checked').parent().addClass('checked');
    });
  });
}])
.controller('cartCtrl', function($scope, Qty, saveForm){

  $scope.plus = function($event){  
    return Qty.plus($event.target);
  }
  $scope.minus = function($event){    
    return Qty.minus($event.target);
  }

})
.controller('checkoutCtrl', function($scope, $location, $rootScope, saveForm){
  $scope.customer = saveForm.get() || {};
  $scope.countryList = [{
    value: '1',
    name: 'Россия'
  },
  {
    value: '2',
    name: 'США'
  }];
  $scope.cityList = [{
    value: '1',
    name: 'Москва'
  },
  {
    value: '2',
    name: 'Новосибирск'
  }]
  $scope.keyUp = function($event){
    if($event.target.value.length > 0){
      $($event.target).parent().addClass('not-empty');
    }else{
      $($event.target).parent().removeClass('not-empty');
    }
  }

  $scope.submit = function (form, $event){
    if (form.$invalid) {
      return;
    }
    var params = {
      'name' : $scope.customer.name ? $scope.customer.name : $scope.name,
      'email' : $scope.customer.email ? $scope.customer.email : $scope.email,
      'tel' : $scope.customer.tel ? $scope.customer.tel : $scope.tel,
      'city' : $scope.customer.city ? $scope.customer.city : ($scope.cityModel ? $scope.cityModel.name : undefined),
      'country' : $scope.customer.country ? $scope.customer.country : ($scope.countryModel ? $scope.countryModel.name : undefined),
      'address' : $scope.customer.address ? $scope.customer.address : $scope.address,
      'shipping': $scope.shipping,
      'payment' : $scope.payment,
    }

    if (form.$valid){
      saveForm.set(params);
      $rootScope.go('/checkout/step'+ $($event.target).data('next'));
    }
  }
  $scope.customer = saveForm.get();
});