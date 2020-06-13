function Basket(idBasket) {
    Container.call(this, idBasket);

    this.countGoods = 0; //Общее количество товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров

    //Получаем все товары, при созаднии корзины
    this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;


Basket.prototype.loadBasketItems = function () {
    var appendId = '#' + this.id + '_items';

    $.get({
        url: './basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            //            var $basketData = $('<div />', {
            //                id: 'basket_data'
            //            });
            //            console.log(data);
            //            this.countGoods = data.basket.length;
            //            this.amount = data.amount;
            //
            //            $basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            //            $basketData.append('<p>Общая сумма: ' + this.amount + '</p>');
            //
            //            $basketData.appendTo(appendId);

            for (var itemKey in data.basket) {
                this.basketItems.push(data.basket[itemKey]);
            }
        }
    });

};

console.log(this.basketItems);
