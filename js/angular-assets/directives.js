angular.module('4doctorsApp.directives', [])
.directive('categoryFilter', function(){
  return {
    restrict: 'E',
    templateUrl: "templates/directives/category-filter.html",
    link: function(scope, element){
      $('.filter-btn').click(function(e){
        e.preventDefault();
        $('.filter-popup').addClass('active');
        $('header').addClass('hide');
      });
      $('.filter-cancel').click(function(e){
        e.preventDefault();
        $('.filter-btn').removeClass('filter-btn__set');
        $('.filter-popup').removeClass('active');
        $('header').removeClass('hide');
      });
      $('.filter-apply').click(function(e){
        e.preventDefault();
        $('header').removeClass('hide');
        $('.reset-filter-btn').addClass('show');
        $('.filter-btn').addClass('filter-btn__set');
        $('.filter-popup').removeClass('active');
        scope.filter = {};
      });
      $('.reset-filter-btn').click(function(e){
        e.preventDefault();
        $('.filter-btn').removeClass('filter-btn__set');
        $(this).removeClass('show');
        $('.filter-switcher').each(function(i,e){
          $(e).find('input[type="radio"],input[type="checkbox"]').prop('checked', '').trigger('change');
          $('input', e).change(function(){
            $(e).find('input').parent().removeClass('checked')
            $(e).find('input:checked').parent().addClass('checked');
          });
        });
      });
      $('.filter-switcher, .shipping-methods, .payment-methods').each(function(i,e){
        $(e).find('input').parent().removeClass('checked')
        $(e).find('input:checked').parent().addClass('checked');
        $(e).find('input:disabled').parent().addClass('disabled');
        $('input', e).change(function(){
          $(e).find('input').parent().removeClass('checked')
          $(e).find('input:checked').parent().addClass('checked');
        });
      });
    }
  }
})
.directive('productImages', function(){
  return {
    restrict: "E",
    templateUrl: "templates/directives/product-images.html",
    scope: {
      images : "=",
      zoom : "="
    },
    link: function(scope){
        scope.$on('onRepeatLast', function(scope, element, attrs){
          var owl = $(".product-images-list ul");
          if (owl.length > 0){
            owl.owlCarousel({
              loop:false,
              margin:0,
              center: true,
              autoplay:false,
              nav:false,
              items: 2,
              afterMove: function (elem) {
                var current = this.currentItem;
                var src = elem.find(".owl-item").eq(current).find("img").attr('src');
              }
            });
            owl.on('changed.owl.carousel', function(event) {
              var current = event.item.index;
              var src = $(event.target).find(".owl-item").eq(current).find("img").data('full');
              $('.product-image-zoom').attr('href',src)
            });
          }
        });
      
        $('.product-image-zoom').click(function(e){
          e.preventDefault();
          $('body').append('<div class="full-image" style="display:none;"><img src="'+ this.href +'"><a href="#" class="full-image-close"></a>');
          $('.full-image').fadeIn();

        });
        $('body').on('click','.full-image-close',function(e){
          e.preventDefault();
          $(this).parent().fadeOut(400, function(){
            $('.full-image').remove();
          });
        });
    }
  }
})
.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
})
.directive('updateWishListStatus', function(localStorageService){
  return {
    restrict: "E",
    template: '<div class="header-wishlist"><a ng-click="go(\'/wishlist\')" href="#/wishlist"><img src="images/svg/wishlist-top.svg" width="22" alt=""><i ng-if="inwishlist" ng-show="inwishlist">{{inwishlist}}</i></a></div>',
    scope: {
      inwishlist: "="
    },    
    controller : function($scope){
      $scope.inwishlist = window['localStorage'].length;      
      //console.log($scope);
    }
  }
});