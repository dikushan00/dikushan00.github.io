'use strict';

$('.main_btn').on("click", function (e) {
  e.preventDefault();
});
$('a[href*="#"]').on('click', function (e) {
  $('html,body').animate({
    scrollTop: $($(this).attr('href')).offset().top + 3
  }, 1200);
});
$(document).on('scroll', function () {
  var scrollBtn = $(this).scrollTop(); //    if (scrollBtn >= 600) {
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
        });
        $(dots).addClass("active_dots");
      });
    }
  });
});
$(document).ready(function () {
  $('.slider').slick({
    arrows: true,
    dots: true,
    //autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }, {
      breakpoint: 550,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});
var form_toggle_btn = $(".form_toggle_btn");
form_toggle_btn.on("click", function () {
  $(".form-search").slideToggle();
});
var arr = $(".event_zagol p");
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var key = _step.value;

    if (key.textContent.length > 40) {
      key.textContent = key.textContent.slice(0, 40) + "...";
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var desc = $(".search_item_desc");
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = desc[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var _key = _step2.value;

    if (_key.textContent.length > 300) {
      _key.textContent = _key.textContent.slice(0, 300) + "...";
    }
  }
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
      _iterator2["return"]();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var title = $(".news_title");
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = title[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var _key2 = _step3.value;
    var word = _key2.textContent;
    word = word.replace(/ +/g, ' ').trim();

    if (word.length > 75) {
      _key2.textContent = _key2.textContent.slice(0, 75) + "...";
    }
  }
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
      _iterator3["return"]();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var news_desc = $(".news_text_desc");
var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
  for (var _iterator4 = news_desc[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
    var _key3 = _step4.value;

    if (_key3.textContent.length > 290) {
      _key3.textContent = _key3.textContent.slice(0, 290) + "...";
    }
  }
} catch (err) {
  _didIteratorError4 = true;
  _iteratorError4 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
      _iterator4["return"]();
    }
  } finally {
    if (_didIteratorError4) {
      throw _iteratorError4;
    }
  }
}

$(document).on("click", function () {
  if ($(".navbar-collapse").attr("class").includes("in")) {
    $(".swipe_dots").animate({
      "opacity": "0"
    }, 500);
  } else {
    $(".swipe_dots").animate({
      "opacity": ".35"
    }, 500);
  }
});
$(".section_footer").css("height", window.screen.availHeight - 65);

if ($(".page_next").attr("class").includes("disabled")) {
  $(".page_next").css("cursor", "pointer");
}

$(document).ready(function () {
  $('.foto_slider').slick({
    arrows: true,
    dots: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 800,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      },
      dots: false
    }, {
      breakpoint: 550,
      settings: {
        slidesToShow: 1
      }
    }]
  });
});
$(function () {
  $('.minimized').click(function (event) {
    var i_path = $(this).attr('src');
    $('body').append('<div id="overlay"></div><div id="magnify"><img src="' + i_path + '"><div id="close-popup"><i></i></div></div>');
    $('#magnify').css({
      left: ($(document).width() - $('#magnify').outerWidth()) / 2,
      // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
      top: ($(window).height() - $('#magnify').outerHeight()) / 2
    });
    $('#overlay, #magnify').fadeIn('fast');
    $('body').addClass("pop_overflow");
  });
  $('body').on('click', '#close-popup, #overlay', function (event) {
    event.preventDefault();
    $('#overlay, #magnify').fadeOut('fast', function () {
      $('#close-popup, #magnify, #overlay').remove();
    });
    $('body').removeClass("pop_overflow");
  });
});