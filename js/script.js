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

$(window).scroll(function () {
    var st = $(this).scrollTop();
    $(".about_content_dish").css({
        "transform": "translate(0%, -" +
            st / 80 + "%)"
    })
});

var json = new XMLHttpRequest();
json.open('GET', 'basket.json', true);
json.send();
json.onreadystatechange = function () {
    if (json.readyState == 4 && json.status == 200) {
        console.log("state = 4");


        //    if (json.status == 200) {
        //        console.log("status = 200");
        //    } else {
        //        console.log("status is not 200");
        //    }
        var basketCard = JSON.parse(json.responseText);


        var amount = basketCard.amount;
        $(".price span").text(+amount);

        ////////////////////////////////////////////


        var basket_area = $(".basket_item_area");
        var countGoods = 0;
        var cardItems = [];
        basket_area.append("<p class = 'basket_empty'>Корзина пуста</p>");


        var add = function (id, title, price) {
            //        this.id = id;
            //        this.title = title;
            //        this.price = price;

            var id = id;
            var title = title;
            var price = price;

            var basketItem = {
                "id": id,
                "title": title,
                "price": price
            };

            countGoods++;
            amount += parseFloat(price);
            cardItems.push(basketItem);
            if (cardItems.length > 0) {
                $(".basket_empty").remove();
            }
            refresh();
            $(".price span").empty();
            $(".price span").text(amount);

            var basket_area = $(".basket_item_area");

            var basket_item = $("<div/>", {
                class: "basket_item"
            });

            var basket_item_title = "<h4 class = 'basket_item_title'>" + title + "</h4>";
            var basket_item_price = "<p class='basket_item_price'><span class='basket_item_count'>1</span> x <span class = 'basket_item_price4one'>" +
                price + "</span></p>";

            var delete_btn = "<a href=''><i class='fas fa-times-circle basket_item_delete'></i></a>"

            basket_item.append(basket_item_title);
            basket_item.append(basket_item_price);
            basket_item.append(delete_btn);
            basket_area.append(basket_item);
        };

        $(".rmenu_content_item_btn").on("click", function () {
            var product_id = parseInt($(this).attr('data-id'));
            var title;
            var price;

            for (var key of basketCard.basket) {
                if (parseInt(key.id) == product_id) {
                    title = key.title;
                    price = parseFloat(key.price);
                }
            }
            console.log(product_id);
            add(product_id, title, price);
        });


        var refresh = function () {
            $(".price span").empty(); //Очищаем содержимое контейнера
        };
        /*

                Basket.prototype.delete = function () {
                    var basket_items = $('.basket_item');
                    basket_items.remove();
                    var $basketData = $('#basket_data');
                    $basketData.empty();
                    this.countGoods = 0;
                    this.amount = 0;
                    $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
                    $basketData.append('<p>Общая сумма: ' + this.amount + '</p>');
                }*/
    } else {
        console.log("status is not 4");
    }
}
