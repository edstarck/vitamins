$(function() {

    //Dropdown
    $('.enter_toggle').on('click', function(e){
        e.preventDefault();
        $(this).next().slideToggle();
    });

    //Gamburger
    var McButton = $("[data=hamburger-menu]");
    var McBar1 = McButton.find("b:nth-child(1)");
    var McBar2 = McButton.find("b:nth-child(2)");
    var McBar3 = McButton.find("b:nth-child(3)");

    McButton.click( function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
        if (McButton.hasClass("active")) {
            McBar1.velocity({ top: "50%" }, {duration: 200, easing: "swing"});
            McBar3.velocity({ top: "50%" }, {duration: 200, easing: "swing"})
            .velocity({rotateZ:"90deg"}, {duration: 800, delay: 200, easing: [500,20] });
            McButton.velocity({rotateZ:"135deg"}, {duration: 800, delay: 200, easing: [500,20] });
        } else {
            McButton.velocity("reverse");
            McBar3.velocity({rotateZ:"0deg"}, {duration: 800, easing: [500,20] })
            .velocity({ top: "100%" }, {duration: 200, easing: "swing"});
            McBar1.velocity("reverse", {delay: 800});
        }
    });

    //Popup
    $(function(){
        var magnificPopup = $.magnificPopup.instance;
        $('.link-popup').magnificPopup({
            type: 'inline',
            preloader: false,
            removalDelay: 300,
            // fixedContentPos: false,
            mainClass: 'mfp-fade',
            callbacks: {
                beforeOpen: function() {
                    $('.wrap').addClass('wrap--blur');
                },
                close: function() {
                    $('.wrap').removeClass('wrap--blur');
                }
            }
        });
        $('.modal_close').each(function(){
            $(this).on('click', function(){
                magnificPopup.close();
            });
        });
        $('.modal_anymore').each(function(){
            $(this).on('click', function(){
                magnificPopup.close();
            });
        });
    });

    //TASTE
    var item = $(".fruit_item");
    var text = $(".fruit_text-wrap");
    item.each(function(){
        $(this).bind('mouseenter', function(){
            text.addClass("fruit_text-wrap--hidden");
            item.addClass('fruit_item--hidden');
            $(this).removeClass('fruit_item--hidden').addClass('fruit_item--active');
            var atrItem = $(this).attr("data-fruit");
            text.each(function(){
                if(atrItem === $(this).attr("data-text")) {
                    $(this).removeClass("fruit_text-wrap--hidden").addClass("fruit_text-wrap--active");
                }
            });
        });
        $(this).bind('mouseleave', function(){
            text.removeClass("fruit_text-wrap--hidden");
            item.removeClass('fruit_item--hidden');
            $(this).removeClass('fruit_item--active');
            text.removeClass("fruit_text-wrap--active");
        });
    });

    // SLIDER PRODUCT
    $('.slideshow__pic').on('click',function(e){
        e.preventDefault();
        var
        $this = $(this),
        item = $this.closest('.slideshow__item'),
        container = $this.closest('.slideshow'),
        mainImage = container.find('.slideshow__display'),
        path = item.find('img').attr('src'),
        duration = 400;
        if(!item.hasClass('slideshow__item_active')) {
            item.addClass('slideshow__item_active')
            .siblings()
            .removeClass('slideshow__item_active');
            mainImage.find('img').fadeOut(duration, function() {
                $(this).attr('src',path).fadeIn(duration);
            });
        }
    });

    //SVG Fallback
    if(!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

    $("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

// STICKY HEADER

(function(){

  var offsetTopPanel = 300;

  function fixedNav() {
    if (window.scrollY >= offsetTopPanel) {
      document.body.classList.add('fixed-nav');
    } else {
      document.body.classList.remove('fixed-nav');
    }
  }

  window.addEventListener('scroll', fixedNav);

})();

// SLIDER
(function () {

  var swiper = new Swiper('.carousel_container', {
    containerModifierClass: 'carousel_container-',
    wrapperClass: 'carousel_wrapper',
    slideClass: 'carousel_item',
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 12,
    nextButton: '.carousel_button-next',
    prevButton: '.carousel_button-prev',
    breakpoints: {
      650: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      750: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      950: {
        slidesPerView: 2,
        spaceBetween: 50
      }
    }
  });

}());

// Overlay
(function() {
  var triggerBttn = $('.trigger-overlay'),
    overlay = document.querySelector( 'div.overlay' ),
    closeBttn = $('.link-scroll--inner');
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };

  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.add( overlay, 'close' );
      $('html').css('overflow', 'auto');
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close' ) ) {
      classie.add( overlay, 'open' );
      $('html').css('overflow', 'hidden');
    }
  }

  triggerBttn.bind( 'click', toggleOverlay );
  closeBttn.bind( 'click', toggleOverlay );
  closeBttn.bind('click', function(){
    var McButton = $("[data=hamburger-menu]");
    var McBar1 = McButton.find("b:nth-child(1)");
    var McBar2 = McButton.find("b:nth-child(2)");
    var McBar3 = McButton.find("b:nth-child(3)");

    McButton.toggleClass("active");
    if (McButton.hasClass("active")) {
      McBar1.velocity({ top: "50%" }, {duration: 200, easing: "swing"});
      McBar3.velocity({ top: "50%" }, {duration: 200, easing: "swing"})
            .velocity({rotateZ:"90deg"}, {duration: 800, delay: 200, easing: [500,20] });
      McButton.velocity({rotateZ:"135deg"}, {duration: 800, delay: 200, easing: [500,20] });
    } else {
      McButton.velocity("reverse");
      McBar3.velocity({rotateZ:"0deg"}, {duration: 800, easing: [500,20] })
            .velocity({ top: "100%" }, {duration: 200, easing: "swing"});
      McBar1.velocity("reverse", {delay: 800});
    }
  })
})();