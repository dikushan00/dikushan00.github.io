"use strict";

function FotoArea() {
  Container.call(this);
  this.renderPhotoList();
}

FotoArea.prototype = Object.create(Container.prototype);
FotoArea.prototype.constructor = FotoArea;
var allFoto = [];
var idCardItems = [];
var renderCardItems = [];
var currentPage = 1;
var lastId;
var cardItemsLength;

FotoArea.prototype.renderPhotoSlider = function (path) {
  var sliderArea = $(".foto_slider");
  var foto_slider_item = $("<div />", {
    "class": "foto_slider_item"
  });
  var slider_img = '<img src="' + path + '" alt="Photo">';
  foto_slider_item.append(slider_img);
  sliderArea.append(foto_slider_item);
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
};

FotoArea.prototype.renderPhotoList = function () {
  var cardCount = 0;
  var allowItems = 24;
  var allowSlide = 12;
  var json = new XMLHttpRequest();
  json.open('GET', '../ajax.json', true);
  json.send();

  json.onreadystatechange = function () {
    if (json.readyState === 4 && json.status === 200) {
      console.log("state = 4");
      var cardDB = JSON.parse(json.responseText);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = cardDB.foto[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          allFoto.push(key);
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

      var photoArea = $('.foto_list');
      var slideArr = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = allFoto[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var itemKey = _step2.value;

          if (cardCount < allowItems) {
            if (cardCount < allowSlide) {
              FotoArea.prototype.renderPhotoSlider(itemKey.path);
            }

            idCardItems.push(itemKey.id);
            var newFoto = new Foto(itemKey.id, itemKey.path);
            newFoto.render();
            cardCount++;
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

      var card_area = $(".pag_page");
      cardItemsLength = allFoto.length / allowItems;

      if (cardItemsLength < 1) {
        cardItemsLength = 1;
      }

      if (cardItemsLength > cardItemsLength.toFixed()) {
        cardItemsLength = cardItemsLength.toFixed();
        cardItemsLength++;
      } else {
        cardItemsLength = cardItemsLength.toFixed();
      }

      var maxli = 5;

      for (var i = 1; i <= (cardItemsLength > 5 ? maxli : cardItemsLength); i++) {
        var $page_num_link = $("<a />", {
          "class": "page-link page_number",
          text: i
        });

        if (i !== 5) {
          var $page_list_item = $("<li />", {
            "class": "page-item page-item_" + i
          });
          $page_list_item.append($page_num_link);
          $(".pagination").append($page_list_item);
        } else {
          var _$page_list_item = $("<li />", {
            "class": "page-item page-item_" + i + " page-item_last"
          });

          _$page_list_item.append($page_num_link);

          $(".pagination").append(_$page_list_item);
        }
      }

      if (cardItemsLength == 1) {
        $(".page_next").addClass("disabled");
      }

      $(".page-item_" + currentPage).addClass("active");
    } else {
      console.log("state is not 4");
    }
  };
};

FotoArea.prototype.refreshPhotoList = function () {
  var lastPage = $(".page-item_last").text();
  var firstPage = lastPage - 4;

  if (lastPage > cardItemsLength) {
    lastPage = cardItemsLength;
  }

  $(".page-item_" + currentPage).addClass("active");
  $(".foto_list").empty();

  if (currentPage == cardItemsLength) {
    $(".page_next").addClass("disabled");
  } else {
    $(".page_next").removeClass("disabled");
  }

  if (currentPage > 1) {
    $(".page_prev").removeClass("disabled");
  } else {
    $(".page_prev").addClass("disabled");
  }

  if (currentPage == lastPage && lastPage <= cardItemsLength - 1) {
    lastPage++;
    firstPage = lastPage - 4;
    $(".pagination").empty();

    for (var i = lastPage - 4; i <= lastPage; i++) {
      var $page_num_link = $("<a />", {
        "class": "page-link page_number",
        text: i
      });

      if (i !== lastPage) {
        var $page_list_item = $("<li />", {
          "class": "page-item page-item_" + i
        });
        $page_list_item.append($page_num_link);
        $(".pagination").append($page_list_item);
      } else {
        var _$page_list_item2 = $("<li />", {
          "class": "page-item page-item_" + i + " page-item_last"
        });

        _$page_list_item2.append($page_num_link);

        $(".pagination").append(_$page_list_item2);
      }
    }

    $(".page-item_" + currentPage).addClass("active");
  }

  if (currentPage == firstPage && firstPage >= 2) {
    firstPage--;
    lastPage = firstPage + 4;
    $(".pagination").empty();

    for (var _i = firstPage; _i <= lastPage; _i++) {
      var _$page_num_link = $("<a />", {
        "class": "page-link page_number",
        text: _i
      });

      if (_i !== lastPage) {
        var _$page_list_item3 = $("<li />", {
          "class": "page-item page-item_" + _i
        });

        _$page_list_item3.append(_$page_num_link);

        $(".pagination").append(_$page_list_item3);
      } else {
        var _$page_list_item4 = $("<li />", {
          "class": "page-item page-item_" + _i + " page-item_last"
        });

        _$page_list_item4.append(_$page_num_link);

        $(".pagination").append(_$page_list_item4);
      }
    }

    $(".page-item_" + currentPage).addClass("active");
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = renderCardItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var itemKey = _step3.value;
      var newCard = new Foto(itemKey.id, itemKey.path);
      newCard.render();
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
};

FotoArea.prototype.addFoto = function (btn_type, num_type) {
  var btnType = btn_type;
  var numType = num_type;
  if (btnType.includes("page_number")) btnType = "num";
  if (btnType.includes("page_link_next")) btnType = "next";
  if (btnType.includes("page_link_prev")) btnType = "prev";
  var cardCount = 0;
  var allowItems = 24;
  renderCardItems.length = 0;

  if (btnType === "next") {
    cardCount = 0;
    $(".page-item_" + currentPage).removeClass("active");
    currentPage++;

    if (currentPage > cardItemsLength) {
      currentPage = cardItemsLength;
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = allFoto[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var itemKey = _step4.value;

        if (cardCount < allowItems) {
          if (itemKey.id > currentPage * allowItems - allowItems && itemKey.id <= currentPage * allowItems) {
            idCardItems.push(itemKey.id);
            renderCardItems.push(itemKey);
            cardCount++;
            lastId = itemKey.id;
          }
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

    FotoArea.prototype.refreshPhotoList();
  } else if (btnType === "prev") {
    cardCount = 0;
    $(".page-item_" + currentPage).removeClass("active");
    currentPage--;

    if (currentPage < 1) {
      currentPage = 1;
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = allFoto[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _itemKey = _step5.value;

        if (_itemKey.id > currentPage * allowItems - allowItems && _itemKey.id <= currentPage * allowItems) {
          if (cardCount < allowItems) {
            idCardItems.push(_itemKey.id);
            renderCardItems.push(_itemKey);
            cardCount++;
            lastId = _itemKey.id;
          }
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    FotoArea.prototype.refreshPhotoList();
  } else if (btnType === "num") {
    cardCount = 0;
    $(".page-item_" + currentPage).removeClass("active");
    currentPage = Number(numType);
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = allFoto[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _itemKey2 = _step6.value;

        if (_itemKey2.id > currentPage * allowItems - allowItems && _itemKey2.id <= currentPage * allowItems) {
          if (cardCount < allowItems) {
            idCardItems.push(_itemKey2.id);
            renderCardItems.push(_itemKey2);
            cardCount++;
            lastId = _itemKey2.id;
          }
        }
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
          _iterator6["return"]();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    console.log(renderCardItems);
    FotoArea.prototype.refreshPhotoList();
  }
};