'use strict'

$('.main_btn').on("click", function (e) {
    e.preventDefault();
});

$('a[href*="#"]').on('click', function (e) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 3
    }, 1200);
});


$(document).on('scroll', function () {
    var scrollBtn = $(this).scrollTop();

//    if (scrollBtn >= 600) {
//        $(".swipe_dots").fadeIn(400).css("display", "flex");
//
//    } else {
//        $(".swipe_dots").fadeOut(400)
//    }

    $(".block_area").each(function () {
        if (scrollBtn + 200 >= $(this).offset().top && scrollBtn + 200 <= $(this).offset().top + 750) {
            var dots = "#" + $(this).attr("id") + "_dots";
            $(".dot").each(function () {
                $(this).removeClass("active_dots");
            });
            $(dots).addClass("active_dots");
            
            $('a[href*="#"]').on('click', function (e) {
                var dots = $(this).attr('href') + "_dots";

                $(".dot").each(function () {
                    $(this).removeClass("active_dots");
                })
                $(dots).addClass("active_dots");
            });
        }
    })
});

$(document).ready(function() {
            $('.slider').slick({
                arrows: true,
                dots: true,         autoplay: true,
                speed: 1000,
                autoplaySpeed: 2000,
                responsive: [{
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        });


var form_toggle_btn = $(".form_toggle_btn");
form_toggle_btn.on("click", () => {
    $(".form-search").slideToggle();
})
