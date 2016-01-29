(function($){
  $('.filter-btn').click(function(e){
    e.preventDefault();
    $('.filter-popup').addClass('active');
  });
  $('.filter-cancel').click(function(e){
    e.preventDefault();
    $('.filter-btn').removeClass('filter-btn__set');
    $('.filter-popup').removeClass('active');
  });
  $('.filter-apply').click(function(e){
    e.preventDefault();
    $('.reset-filter-btn').addClass('show');
    $('.filter-btn').addClass('filter-btn__set');
    $('.filter-popup').removeClass('active');
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
  // $('.filter-switcher, .shipping-methods, .payment-methods').each(function(i,e){
  //   $(e).find('input').parent().removeClass('checked')
  //   $(e).find('input:checked').parent().addClass('checked');
  //   $(e).find('input:disabled').parent().addClass('disabled');
  //   $('input', e).change(function(){
  //     $(e).find('input').parent().removeClass('checked')
  //     $(e).find('input:checked').parent().addClass('checked');
  //   });
  // });

  $('.product-image-zoom').click(function(e){
    e.preventDefault();
    $('body').append('<div class="full-image"><img src="'+ this.href +'"><a href="#" class="full-image-close"></a>');

  });

  $('body').on('click','.full-image-close',function(e){
    e.preventDefault();
    $(this).parent().hide().remove();
  });

  function wishlistItems(action){
    if($('.header-wishlist i').length > 0){
      var count = parseInt($('.header-wishlist i').text());
      switch (action){
        case 'remove' : 
          count--;
          if(count == 0){
            $('.header-wishlist i').remove();
          }else{
            $('.header-wishlist i').text(count);
          };
          break;
        case 'add' :
          count++
          $('.header-wishlist i').text(count);
          break;
      }
    }else{
      $('.header-wishlist a').append('<i>');
      $('.header-wishlist i').text(1);
    }
  }

  function addToWishlist(element){
    $(element).addClass('wishlist-active');
    $('body').append('<div class="wishlist-overlay"><div class="added-wishlist"></div></div>');
    var $overlay = $('.wishlist-overlay');
    $overlay.fadeIn();
    wishlistItems('add');

    setTimeout(function(){
      $overlay.fadeOut(400, function(){$overlay.remove()})
    },800);
  };
  function removeFromWishlist(element){
    $(element).removeClass('wishlist-active');
    $('body').append('<div class="wishlist-overlay"><div class="removed-wishlist">Не нравится</div></div>');
    var $overlay = $('.wishlist-overlay');
    $overlay.fadeIn();
    wishlistItems('remove');

    setTimeout(function(){
      $overlay.fadeOut(400, function(){$overlay.remove()})
    },800);
  };

  $('.product-wishlist, .items-list-item__wishlist').click(function(e){
    e.preventDefault();
    if($(this).hasClass('wishlist-active')){
      removeFromWishlist(this);
    }else{
      addToWishlist(this);
    }
  });

  $('.qty-minus').click(function(e){
    e.preventDefault();
    var $qty = $(this).siblings('.qty');
    var qty = parseInt($qty.val());
    qty--;
    if (qty <= 0) {
      qty = 0;
    }
    $qty.val(qty);
  });
  $('.qty-plus').click(function(e){
    e.preventDefault();
    var $qty = $(this).siblings('.qty');
    var qty = parseInt($qty.val());
    qty++;
    $qty.val(qty);
  });

  var owl = $(".product-images-list ul");
  if (owl.length > 0){
    owl.owlCarousel({
      loop:false,
      margin:0,
      autoplay:false,
      nav:false,
      items: 1,
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

  $('.input-box').each(function(i,e){
    $('input, select', this).each(function(){
      if(this.value.length !== 0){
        $(this).parent().addClass('not-empty');
      }
    });
  });
  $('.input-box input, .input-box textarea').keyup(function(){
    if(this.value.length !== 0){
      $(this).parent().addClass('not-empty');
    }
  });
  $('.input-box input, .input-box select, .input-box textarea').blur(function(){
    if(this.value.length !== 0){
      $(this).parent().addClass('not-empty');
    }else{
      $(this).parent().removeClass('not-empty');
    }
  });
})(jQuery);