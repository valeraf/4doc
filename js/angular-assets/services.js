angular.module('4doctorsApp.service', ['ngResource'])
  .factory('Wishlist', function WishlistFactory(localStorageService, $rootScope){
    var products = [];
    return {
      addToWishlist: function(element, productData){
        $(element).addClass('wishlist-active');
        $('body').append('<div class="wishlist-overlay"><div class="added-wishlist">Нравится</div></div>');
        var $overlay = $('.wishlist-overlay');
        $overlay.fadeIn();
        products.push(productData);
        localStorageService.set(productData.id,productData)
        this.wishlistItems('add');

        setTimeout(function(){
          $overlay.fadeOut(400, function(){$overlay.remove()})
        },800);
      },
      removeFromWishlist: function(element, productToRemove){
        localStorageService.remove(productToRemove);
        $(element).removeClass('wishlist-active');
        $('body').append('<div class="wishlist-overlay"><div class="removed-wishlist">Не нравится</div></div>');
        var $overlay = $('.wishlist-overlay');
        $overlay.fadeIn();
        this.wishlistItems('remove');

        setTimeout(function(){
          $overlay.fadeOut(400, function(){$overlay.remove()})
        },800);
      },
      wishlistItems: function(action){
        var totalInWishlist = localStorageService.length();
        if(totalInWishlist == 0){
          $rootScope.emptyWishlist = true;
        }
        if($('.header-wishlist i').length > 0){
          switch (action){
            case 'remove' :                 
              if(totalInWishlist == 0){
                $('.header-wishlist i').remove();
              }else{
                $('.header-wishlist i').text(totalInWishlist);
              };
              break;
            case 'add' :                
              $('.header-wishlist i').text(totalInWishlist);
              break;
          }
        }else{
          $('.header-wishlist a').append('<i>');
          $('.header-wishlist i').text(totalInWishlist);
        }
      }
    }
  })
  .factory('updateCart', function(){
    return {
      update: function(){
        $('body').append('<div class="wishlist-overlay"><div class="added-to-cart">Товар добавлен</div></div>');
        var $overlay = $('.wishlist-overlay');
        $overlay.fadeIn();
        setTimeout(function(){
          $overlay.fadeOut(400, function(){$overlay.remove()})
        },1100);
        if ($('.header-cart i').length > 0){
          var count = parseInt($('.header-cart i').text());
          count++;
          $('.header-cart i').text(count);
        }
      }
    }
  })
  .factory('Qty', function(){
    return {
      plus: function(elemten){

        var $qty = $(elemten).siblings('.qty');
        var qty = parseInt($qty.val());
        qty++;
        $qty.val(qty);
        console.log('plus')
      },
      minus: function(elemten){
        var $qty = $(elemten).siblings('.qty');
        var qty = parseInt($qty.val());
        qty--;
        if (qty <= 0) {
          qty = 0;
        }
        $qty.val(qty);
      }
    }
  })
  .factory('saveForm', function() {
    var savedData = {}
    function set(data) {
      savedData = data;
    }
    function get() {
      return savedData;
    }

    return {
      set: set,
      get: get
    }

  });