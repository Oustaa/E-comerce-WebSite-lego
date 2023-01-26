const cartNav = document.querySelector('#cart-nav');

const cart = JSON.parse(localStorage.getItem('cart'));

let cartItemsCount = (cart === null) ? -1 : cart.length - 1;

function additem() {
    cartItemsCount++;
    cartNav.textContent = cartItemsCount;
}

window.addEventListener('load', additem)