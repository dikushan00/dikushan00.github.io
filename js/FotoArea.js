function FotoArea() {
    Container.call(this);

    this.renderPhotoList();
}

FotoArea.prototype = Object.create(Container.prototype);
FotoArea.prototype.constructor = FotoArea;

let allFoto = []
let idCardItems = []
let renderCardItems = [];
let currentPage = 1;
let lastId;
let cardItemsLength;


FotoArea.prototype.renderPhotoSlider = (path) => {

    let sliderArea = $(".foto_slider");

    let foto_slider_item = $("<div />", {
        class: "foto_slider_item"
    });

    let slider_img = '<img src="' + path + '" alt="Photo">'

    foto_slider_item.append(slider_img);
    sliderArea.append(foto_slider_item);

    $(document).ready(function () {
        $('.foto_slider').slick({
            arrows: true,
            dots: true,
            slidesToShow: 3,
            //autoplay: true,
            speed: 1000,
            autoplaySpeed: 800,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    });
}

FotoArea.prototype.renderPhotoList = () => {

    let cardCount = 0;
    let allowItems = 24;
    let allowSlide = 12;

    var json = new XMLHttpRequest();
    json.open('GET', '../ajax.json', true);
    json.send();
    json.onreadystatechange = function () {
        if (json.readyState === 4 && json.status === 200) {
            console.log("state = 4");
            var cardDB = JSON.parse(json.responseText);

            for (let key of cardDB.foto) {
                allFoto.push(key);
            }

            let photoArea = $('.foto_list');

            let slideArr = [];

            for (let itemKey of allFoto) {
                if (cardCount < allowItems) {
                    if(cardCount < allowSlide){
                        FotoArea.prototype.renderPhotoSlider(itemKey.path)
                    }
                    idCardItems.push(itemKey.id);
                    var newFoto = new Foto(itemKey.id, itemKey.path);
                    newFoto.render();
                    cardCount++;
                }
            }

            let card_area = $(".pag_page");

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

            let maxli = 5;

            for (let i = 1; i <= (cardItemsLength > 5 ? maxli : cardItemsLength); i++) {

                let $page_num_link = $("<a />", {
                    class: "page-link page_number",
                    text: i
                });

                if (i !== 5) {

                    let $page_list_item = $("<li />", {
                        class: "page-item page-item_" + i
                    });

                    $page_list_item.append($page_num_link);
                    $(".pagination").append($page_list_item);
                } else {

                    let $page_list_item = $("<li />", {
                        class: "page-item page-item_" + i + " page-item_last"
                    });

                    $page_list_item.append($page_num_link);
                    $(".pagination").append($page_list_item);
                }
            }

            if (cardItemsLength == 1) {
                $(".page_next").addClass("disabled");
            }
            $(".page-item_" + currentPage).addClass("active");

        } else {
            console.log("state is not 4");
        }
    }


}

FotoArea.prototype.refreshPhotoList = () => {

    let lastPage = $(".page-item_last").text();
    let firstPage = lastPage - 4;

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

        for (let i = lastPage - 4; i <= lastPage; i++) {

            let $page_num_link = $("<a />", {
                class: "page-link page_number",
                text: i
            });

            if (i !== lastPage) {

                let $page_list_item = $("<li />", {
                    class: "page-item page-item_" + i
                });

                $page_list_item.append($page_num_link);
                $(".pagination").append($page_list_item);
            } else {

                let $page_list_item = $("<li />", {
                    class: "page-item page-item_" + i + " page-item_last"
                });

                $page_list_item.append($page_num_link);
                $(".pagination").append($page_list_item);
            }
        }
        $(".page-item_" + currentPage).addClass("active");
    }

    if (currentPage == firstPage && firstPage >= 2) {
        firstPage--;
        lastPage = firstPage + 4;

        $(".pagination").empty();

        for (let i = firstPage; i <= lastPage; i++) {

            let $page_num_link = $("<a />", {
                class: "page-link page_number",
                text: i
            });

            if (i !== lastPage) {

                let $page_list_item = $("<li />", {
                    class: "page-item page-item_" + i
                });

                $page_list_item.append($page_num_link);
                $(".pagination").append($page_list_item);
            } else {

                let $page_list_item = $("<li />", {
                    class: "page-item page-item_" + i + " page-item_last"
                });

                $page_list_item.append($page_num_link);
                $(".pagination").append($page_list_item);
            }
        }
        $(".page-item_" + currentPage).addClass("active");
    }

    for (let itemKey of renderCardItems) {
        let newCard = new Foto(itemKey.id, itemKey.path);
        newCard.render();
    }
}



FotoArea.prototype.addFoto = (btn_type, num_type) => {

    let btnType = btn_type;
    let numType = num_type;

    if (btnType.includes("page_number")) btnType = "num"
    if (btnType.includes("page_link_next")) btnType = "next"
    if (btnType.includes("page_link_prev")) btnType = "prev"

    let cardCount = 0;
    let allowItems = 24;

    renderCardItems.length = 0;

    if (btnType === "next") {
        cardCount = 0;
        $(".page-item_" + currentPage).removeClass("active");
        currentPage++;

        if (currentPage > cardItemsLength) {
            currentPage = cardItemsLength;
        }

        for (let itemKey of allFoto) {
            if (cardCount < allowItems) {
                if (itemKey.id > (currentPage * allowItems - allowItems) && itemKey.id <= currentPage * allowItems) {
                    idCardItems.push(itemKey.id);
                    renderCardItems.push(itemKey);
                    cardCount++;
                    lastId = itemKey.id;
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

        for (let itemKey of allFoto) {
            if (itemKey.id > (currentPage * allowItems - allowItems) && itemKey.id <= currentPage * allowItems) {
                if (cardCount < allowItems) {
                    idCardItems.push(itemKey.id);
                    renderCardItems.push(itemKey);
                    cardCount++;
                    lastId = itemKey.id;
                }
            }
        }

        FotoArea.prototype.refreshPhotoList();

    } else if (btnType === "num") {
        cardCount = 0;
        $(".page-item_" + currentPage).removeClass("active");
        currentPage = Number(numType);

        for (let itemKey of allFoto) {
            if (itemKey.id > (currentPage * allowItems - allowItems) && itemKey.id <= currentPage * allowItems) {
                if (cardCount < allowItems) {
                    idCardItems.push(itemKey.id);
                    renderCardItems.push(itemKey);
                    cardCount++;
                    lastId = itemKey.id;
                }
            }
        }
        console.log(renderCardItems)

        FotoArea.prototype.refreshPhotoList();
    }

};


