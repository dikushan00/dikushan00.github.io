'use strict'

$('.main_btn').on("click", function (e) {
    e.preventDefault();
});

$('a').on("click", function (e) {
    e.preventDefault();
});

$(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st > 492) {
        $('.swipe_btn').css({
            "display": "block"
        });
        //        $('.swipe_btn').animate({
        //            opacity: 0.3
        //        }, 1000);
    } else {
        $('.swipe_btn').css({
            "display": "none"
        });
    }

    /*if (st > 40) {
        $(".header").addClass("fixed");
        $(".home").css("margin-top", "60px");
        $(".header").animate({
            height: 60
        }, {
            duration: 500,
            delay: 10
        });
    } else {
        console.log("height 90");
        $(".header").removeClass("fixed");
        $(".header").animate({
            height: 90
        }, 500);
    }*/
});

$('.swipe_btn').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 500);
    return false;
});

/*document.querySelector(".swipe_btn").animate([
  // keyframes
    {
        transform: 'translate3D(0, 0, 0)'
    },
    {
        transform: 'translate3D(0, -5px, 0)'
    },
    {
        transform: 'translate3D(0, 0, 0)'
    }
], {
    // timing options
    duration: 2000,
    iterations: Infinity
});*/

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 3, // values from 0 to 3000, with step 50ms
    duration: 1500, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

$('a[href*="#"]').on('click', function (e) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 3
    }, 1200);
});

//$(".home_slider").slick({
//    dots: true,
//    infinite: true,
//    speed: 1000,
//    slidesToShow: 1,
//    adaptiveHeight: true,
//    arrows: false,
//    autoplay: true,
//    autoplaySpeed: 3000
//});

$(".header_card_link").on("click", function (e) {
    e.preventDefault();
    $(".basket_drop").fadeToggle();
});
