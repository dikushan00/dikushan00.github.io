function Card(id, title, price, type, stars, photo, review, link) {
    Container.call(this, id);
    this.title = title;
    this.price = price;
    this.type = type;
    this.id = id;
    this.photo = photo;
    this.stars = stars;
    this.review = review;
    this.link = link;
}

Card.prototype = Object.create(Container.prototype);
Card.prototype.constructor = Card;

Card.prototype.render = function () {
    var cardType = $(this.type);
    
    var $card_area = $(".stay_list");

    var $cardContainer = $('<div />', {
        class: 'views-row views-row-first'
    });
    
    var $cardContainer_1= $('<div />', {
        class: 'views-field views-field-nothing'
    });
    
    var $cardContainer_2= $('<span />', {
        class: 'field-content'
    });
    
    var $cardContainer_3= $('<div />', {
        class: 'row'
    });
    
    var $cardImgContainer= $('<div />', {
        class: 'col-md-4 col-xs-12 blo_imghei'
    });
    
    var $img = $('<img />', {
        class: 'img-responsive stay_img',
        src: this.photo,
        width: "280",
        height: "222",
        alt: "Hotel"
    });

    var $cardContent = $('<div />', {
        class: 'col-md-5 zg_block',
        "data-id": this.id,
        "data-price": this.price
    });
    
    var $cardContentIn = '<a href="../tmp/gostevye-doma.html" typeof="skos:Concept" property="rdfs:label skos:prefLabel">' + this.type + '</a><div class="zg_hotel"><a href="' + this.link + '">' + this.title + '</a></div><img src="../img/' + this.stars + '.png "><div class="kolvo">' + this.review + ' отзывов</div><p><img style="margin-top: -5px; margin-right: 5px;" src="../img/nakarte.png">Посмотреть на карте</p>';

    var $cardPrice = '<div class="col-md-3 cena_block"><div class="cena_hotel"><p>Цена от: <span>' + this.price + '</span>тенге</p></div></div>';

    var $cardBtn = $('<a />', {
        class: 'rmenu_content_item_btn',
        'data-id': this.id,
        text: 'Add to card'
    });

    //Создаем иерархию элементов
    $cardImgContainer.append($img);
    $cardContent.append($cardContentIn);
    $cardContainer_3.append($cardImgContainer);
    $cardContainer_3.append($cardContent);
    $cardContainer_3.append($cardPrice);
    $cardContainer_2.append($cardContainer_3);
    $cardContainer_1.append($cardContainer_2);
    $cardContainer.append($cardContainer_1);
    $card_area.append($cardContainer);
};