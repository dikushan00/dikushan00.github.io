window.onscroll = function showHeader() {
    var menu_1 = document.querySelector(".nav");
    var menu_2 = document.querySelector(".predmety");
    if(window.pageYOffset > 200){
        menu_1.classList.add('menu_fixed');
    } else{
        menu_1.classList.remove('menu_fixed');
    }
}