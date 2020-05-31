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
});

$('.swipe_btn').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 500);
    return false;
});

$('a[href*="#"]').on('click', function (e) {
    $('html,body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 3
    }, 1200);
});

$(".header_card_link").on("click", function (e) {
    e.preventDefault();
    $(".basket_drop").fadeToggle();
});

$("#contact_content_form_table").on("click", function () {
    $("#res_table").fadeToggle(700);
})
