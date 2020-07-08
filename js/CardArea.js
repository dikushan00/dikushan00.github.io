function CardArea(idCardArea) {
    Container.call(this, idCardArea);

    this.countCard = 0; //Общее количество товаров
    this.renderCardList();
}

CardArea.prototype = Object.create(Container.prototype);
CardArea.prototype.constructor = CardArea;

var cardItems = [];
var allCardItems = [];
var idCardItems = [];

CardArea.prototype.renderCardList = function () {

    var json = new XMLHttpRequest();
    json.open('GET', '../ajax.json', true);
    json.send();
    json.onreadystatechange = function () {
        if (json.readyState === 4 && json.status === 200) {
            console.log("state = 4");
            var cardDB = JSON.parse(json.responseText);

            //////////////////////////////////////////

            var card_area = $(".wts_list");

            let cardCount = 0;

            if($("body").attr("class").includes("wts")) {
                let cardCount = 0;

                for (var itemKey of cardDB.wts) {
                    allCardItems.push(itemKey);
                }

                for (var itemKey of allCardItems) {
                    if (cardCount < 6) {
                        idCardItems.push(itemKey.id);
                        var newCard = new Card("wts", itemKey.id, itemKey.title, itemKey.photo, itemKey.link, itemKey.price, itemKey.HType, itemKey.stars, itemKey.review);
                        newCard.render();
                        cardCount++;
                    }
                }
            }  else if($("body").attr("class").includes("wtg")){
                let cardCount = 0;

                for (var itemKey of cardDB.wtg) {
                    allCardItems.push(itemKey);
                }

                for (var itemKey of allCardItems) {
                    if (cardCount < 8) {
                        idCardItems.push(itemKey.id);
                        var newCard = new Card("wtg", itemKey.id, itemKey.title, itemKey.photo, itemKey.link, itemKey.price, itemKey.HType, itemKey.stars, itemKey.review);
                        newCard.render();
                        cardCount++;
                    }
                }
            }
            else if($("body").attr("class").includes("event")){
                let cardCount = 0;

                for (let itemKey of cardDB.event) {
                    allCardItems.push(itemKey);
                }

                for (let itemKey of allCardItems) {
                    if (cardCount < 8) {
                        idCardItems.push(itemKey.id);
                        var newCard = new Card("event", itemKey.id, itemKey.title, itemKey.photo, itemKey.link, itemKey.date, itemKey.place, '', '');
                        newCard.render();
                        cardCount++;
                    }
                }
            }

        } else {
            console.log("status is not 4");
        }
    };
};

CardArea.prototype.add = function (type) {
    let card_type = type.split("_")[2];

    let cardCount = 0;
    let allowItems;
    if(card_type == "wtg" || card_type == "event"){
        allowItems = 8;
    } else if(card_type == "wts" || card_type == "wte"){
        allowItems = 6;
    }

    for (let itemKey of allCardItems) {
        let boolId = false;
        if (cardCount < allowItems) {
            for (idKEy of idCardItems) {

                if (itemKey.id == idKEy) {
                    boolId = true;
                }
            }
            if (boolId == false) {
                idCardItems.push(itemKey.id);
                if (card_type !== 'event') {
                    let newCard = new Card(card_type, itemKey.id, itemKey.title, itemKey.photo, itemKey.link, itemKey.price, itemKey.HType, itemKey.stars, itemKey.review);
                    newCard.render();
                } else{
                    let newCard = new Card(card_type, itemKey.id, itemKey.title, itemKey.photo, itemKey.link, itemKey.date, itemKey.place, '', '');
                    newCard.render();
                }
                cardCount++;
            }
            if(allCardItems.length == idCardItems.length){
                $(".more_card").remove();
            }
        }
    }


};

CardArea.prototype.refresh = function () {
    var CardArea_area = $(".view_content");
    CardArea_area.empty();
    this.renderItemList();
};
