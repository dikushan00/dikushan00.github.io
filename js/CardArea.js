function CardArea(idCardArea) {
    Container.call(this, idCardArea);

    this.countCard = 0; //Общее количество товаров
    //this.cardItems = []; //Массив для хранения товаров

    //Получаем все товары, при созаднии корзины
    this.renderCardList();
}

CardArea.prototype = Object.create(Container.prototype);
CardArea.prototype.constructor = CardArea;

var cardItems = [];
var allCardItems = [];
var idCardItems = [];

CardArea.prototype.renderCardList = function (count) {
    var json = new XMLHttpRequest();
    json.open('GET', '../ajax.json', true);
    json.send();
    json.onreadystatechange = function () {
        if (json.readyState === 4 && json.status === 200) {
            console.log("state = 4");
            var cardDB = JSON.parse(json.responseText);
            console.log(cardDB.wts[1].HType);

            //////////////////////////////////////////


            var card_area = $(".stay_list");

            var index = 0;

            for (var itemKey of cardDB.wts) {
                allCardItems.push(itemKey);
            }

            var cardCount = 0;

            for (var itemKey of allCardItems) {
                if (cardCount < 6) {
                    idCardItems.push(itemKey.id);
                    var newCard = new Card(itemKey.id, itemKey.title, itemKey.price, itemKey.HType, itemKey.stars, itemKey.photo, itemKey.review, itemKey.link);
                    newCard.render();
                    cardCount++;
                }
            }

        } else {
            console.log("status is not 4");
        }
    };
};

CardArea.prototype.add = function () {
    var cardCount = 0;
    for (var itemKey of allCardItems) {
        var boolId = false;
        if (cardCount < 6) {
            for (idKEy of idCardItems) {

                if (itemKey.id == idKEy) {
                    boolId = true;
                }
            }
            if (boolId == false) {
                idCardItems.push(itemKey.id);
                var newCard = new Card(itemKey.id, itemKey.title, itemKey.price, itemKey.HType, itemKey.stars, itemKey.photo, itemKey.review, itemKey.link);
                newCard.render();
                cardCount++;
            }
        }
    }

};

CardArea.prototype.refresh = function () {
    var CardArea_area = $(".view_content");
    CardArea_area.empty();
    this.renderItemList();
};
