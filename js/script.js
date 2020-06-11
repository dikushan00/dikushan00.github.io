'use strict'

$('.main_btn').on("click", function (e) {
    e.preventDefault();
});

$('a').on("click", function (e) {
    e.preventDefault();
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
});



$(document).on('scroll', function () {
    var scrollBtn = $(this).scrollTop();

    if (scrollBtn >= 500) {
        $(".swipe_btn").fadeIn(400);
    } else {
        $(".swipe_btn").fadeOut(400);
    }
});
