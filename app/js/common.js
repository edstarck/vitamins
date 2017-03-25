$(function() {

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
    .velocity({ top: "86%" }, {duration: 200, easing: "swing"});
    McBar1.velocity("reverse", {delay: 800});
  }
  });

  //Popup
  $(function(){
      var keys = {37: 1, 38: 1, 39: 1, 40: 1};

      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
      }

      function preventDefaultForScrollKeys(e) {
          if (keys[e.keyCode]) {
              preventDefault(e);
              return false;
          }
      }
      var magnificPopup = $.magnificPopup.instance;
      $('.link-popup').magnificPopup({
          type: 'inline',
          preloader: false,
          removalDelay: 300,
          fixedContentPos: false,
          mainClass: 'mfp-fade',
          callbacks: {
            beforeOpen: function() {
              $('.wrap').addClass('wrap--blur');
              $('body').css({
                'overflow': 'hidden'
              });
            },
            close: function() {
              $('.wrap').removeClass('wrap--blur');
              $('body').css({
                'overflow': 'auto'
              });
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

  var offsetTopPanel = 140;

  function fixedNav() {
    if (window.pageYOffset >= offsetTopPanel) {
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
      480: {
        slidesPerView: 1,
        spaceBetween: 0
      },
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
      $('body').css({
        'overflow': 'auto'
      });
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
      $('body').css({
        'overflow': 'hidden'
      });
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
            .velocity({ top: "86%" }, {duration: 200, easing: "swing"});
      McBar1.velocity("reverse", {delay: 800});
    }
  })
})();

// Advantages mobile
$(document).ready(function(){
  $('.slider__grid').clone().appendTo('.advantages .wrap_inner');
});

// Mobile menu
(function(){
  window.morulusCustomSb = (function() {
    var nu=navigator.userAgent,
    aus=['Mozilla','IE'],
    // Remove event listner polyfill
    removeEventListner = function(el, type, handler) {
      if ( el.addEventListener ) {
        el.removeEventListener(type, handler, false);
      }  else if ( elem.attachEvent ) {
        el.detachEvent("on" + type, handler);
      } else {
        el["on"+type] = null;
      };
    },
    // Event listner polyfill
    eventListner = function(el, type, handler, once) {
        var realhandler = once ? function() {
          removeEventListner(el, type, realhandler);
        } : handler;
        if ( el.addEventListener ) {
          listen = el.addEventListener( type, handler, false );
        } else if (el.attachEvent) {
           listen = el.addEventListener( 'on'+type, handler, false );
        } else {
          el['on'+type] = handler;
        }
        return el;
    },
    retfalse = function() { return !!0; },
    disableSelection = function(el) {
        if (nu.indexOf(aus[0]) != -1) // FF
        el.style['MozUserSelect']='none';
        else if (nu.indexOf(aus[1]) != -1) // IE
        eventListner(el, 'selectstart.disableTextSelect', retfalse);
        else
        eventListner(el, 'mousedown.disableTextSelect', retfalse);
    },
    enableSelection = function(el) {
        if (nu.indexOf(aus[0]) != -1) // FF
        el.style['MozUserSelect']='';
        else if (nu.indexOf(aus[1]) != -1) // IE
        removeEventListner(el, 'selectstart.disableTextSelect', retfalse);
        else
        removeEventListner(el, 'mousedown.disableTextSelect', retfalse);
    }
    return function(a) {

      var
      listen,
      i,
      d=document,
      s, // Scrollable
      n, // Custom scrollbar wrapper
      r, // Runner
      height, // Runner height
      scrollTop, // Start scroll top,
      // Scroll handler
      handlerScroll = function(e) {

        r.style.top = ( (100 - parseInt(r.style.height)) * (s.scrollTop/(s.scrollHeight-s.clientHeight)) )+'%';
      },
      drag = !!0,
      screenY = 0,
      handlerMove = function(e) {
        var d = ((height*(scrollTop/(s.scrollHeight-s.clientHeight)))+(e.screenY-screenY));
        if (d>height) d = height;
        else if (d<0) d = 0;
        // set Scroll top
        s.scrollTop = Math.round((s.scrollHeight-s.clientHeight)*(d/height));
      },
      handlerUp = function(e) {
        drag=!!0;
        // Enable selection
        enableSelection(s);
        // remove listen for window move
        removeEventListner(window, 'mousemove', handlerMove);
        e.stopPropagation();
      },
      handlerDown = function(e) {
        drag=!0;screenY=e.screenY;
        height=s.clientHeight-parseInt(window.getComputedStyle(r).height);
        scrollTop=s.scrollTop;
        // Disable selection
        disableSelection(s);
        // Listen for window move
        eventListner(window, 'mousemove', handlerMove);
        eventListner(window, 'mouseup', handlerUp, true);
        e.preventDefault();
        return false;
      },
      handlerWrapDown = function(e) {
       if(e.offsetX>n.offsetWidth-20){
          s.scrollTop = Math.round((s.scrollHeight-s.clientHeight)*(e.offsetY/n.offsetHeight));
          handlerDown(e);
        }
      },
      n=d.createElement('div');
      r=d.createElement('figure');
      s=d.createElement('div');

      // Wrap each insert elements
      for (i=0;i<a.childNodes.length;i++) {
        s.appendChild(a.childNodes[0]);
      }
      a.appendChild(n);
      n.appendChild(r);
      n.appendChild(s);
      n.className = '-morulus-customsb';
      // Set size of runner
      r.style.height = (100*(s.clientHeight/s.scrollHeight)
       .toFixed(2))+'%';
      // Listen for scroll
      eventListner(s,'scroll',handlerScroll);
      // Listen for drug
      eventListner(r,'mousedown',handlerDown);
      eventListner(r,'mouseup',handlerUp);
      // Listerb for drug on wrapper
      eventListner(n,'mousedown',handlerWrapDown);
    };
  })();

  function go(){
    var x = window.innerWidth;
    if(x <= 754) {
      morulusCustomSb(document.querySelector('.nav-box'));
      window.removeEventListener('resize', go);
    } else if (x >= 754) {
      window.addEventListener('resize', go);
    }
  }

  go();

})();