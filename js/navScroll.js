const nav = document.querySelector("header");
const menu = document.querySelector("#menu");
const logo = document.querySelector(".icon-logo-menu");

function handleScroll() {
    const scroll = window.scrollY;

    if (scroll > 100 && window.innerWidth > 813) {
        nav.style.height = "100px";
        nav.style.width = "100%";
        nav.style.zIndex = "1";
        menu.style.zIndex = "2";
        logo.style.margin = "30px 0 0 30px";
        nav.style.background = "black";
    } else if (scroll < 100 && window.innerWidth > 813){
        nav.style.height = "0";
    } else {
        nav.style.height = "inherit";
    }
}

window.onscroll = handleScroll;