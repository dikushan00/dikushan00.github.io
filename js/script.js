'use strict'

ymaps.ready(function () {
    var my_map = new ymaps.Map("index_map", {
            center: [51.898729, 69.806227],
            zoom: 6
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [51.898729, 69.806227]
            },
        }, {
            preset: 'islands#blackStretchyIcon',
            draggable: true,
            iconColor: '#735184'
        });

    my_map.geoObjects
        .add(myGeoObject)
        .add(new ymaps.Placemark([51.898729, 69.806227], {
            balloonContent: '<strong>Акмолинская область</strong>'
        }, {
            preset: 'islands#dotIcon',
            iconColor: '#735184'
        }));

});

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

$(document).ready(function () {
    $('.slider').slick({
        arrows: true,
        dots: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        autoplaySpeed: 2000,
        draggable: true
        // responsive: [{
        //         breakpoint: 768,
        //         settings: {
        //             draggable: true
        //         }
        //     }
        // ]
    });
});


var form_toggle_btn = $(".form_toggle_btn");
form_toggle_btn.on("click", () => {
    $(".form-search").slideToggle();
})

let arr = $(".event_zagol p");

for (let key of arr) {
    if (key.textContent.length > 40) {
        key.textContent = key.textContent.slice(0, 40) + "...";
    }
}

let desc = $(".search_item_desc");

for (let key of desc) {
    if (key.textContent.length > 300) {
        key.textContent = key.textContent.slice(0, 300) + "...";
    }
}

let title = $(".news_title");

for (let key of title) {
    if (key.textContent.length > 75) {
        key.textContent = key.textContent.slice(0, 75) + "...";
    }
}

let news_desc = $(".news_text_desc");

for (let key of news_desc) {
    if (key.textContent.length > 290) {
        key.textContent = key.textContent.slice(0, 290) + "...";
    }
}

$(document).on("click", function () {
    if ($(".navbar-collapse").attr("class").includes("in")) {
        $(".swipe_dots").animate({
            "opacity": "0"
        }, 500)
    } else {
        $(".swipe_dots").animate({
            "opacity": ".35"
        }, 500)
    }
})

$(".section_footer").css("height", window.screen.availHeight - 65);

$(document).ready(function () {

    let i = 18;
    let view = $(".views-row");
    for (let key of view) {
        if (key.className.includes(i.toString())) {
            key.style.cssText = "display: none";
            i++;
        }
    }

    $(".more_ways_btn").on("click", () => {
        let i = 18;
        let view = $(".views-row");
        for (let key of view) {
            if (key.className.includes(i.toString())) {
                key.style.cssText = "display: block";
                i++;
            }
        }
        $(".more_ways_btn").css("display", "none")
    })
})

let cena = $(".cena_hotel span")

for (let key of cena) {
    if (key.innerText.length > 5) {
        $(".cena_hotel span").css("font-size", "36px")
    }
}


if ($(".page_next").attr("class").includes("disabled")) {
    $(".page_next").css("cursor", "pointer")
}