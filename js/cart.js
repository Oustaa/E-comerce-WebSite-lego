let productInCart =(localStorage.getItem('cart')=== null)?[]: JSON.parse(localStorage.getItem('cart'));
const productContainer = document.querySelector('#Product__container');

const CartPriceEl = document.querySelector('#Cart-Price');
const TVAEl = document.querySelector('#TVA');
const totalEl = document.querySelector('#total');


let CartPrice = 0;
let TVA = 0;
let total = 0;


function setPrices() {
    CartPrice = productInCart.reduce(function(accumulator, currentValue) {
        return accumulator + (currentValue.item.price * currentValue.quantite);
    }, 0).toFixed(2);

    TVA = CartPrice * 15 / 100;

    total = CartPrice - TVA;


    CartPriceEl.textContent = CartPrice + "$";
    TVAEl.textContent = TVA.toFixed(2) + "$";
    totalEl.textContent = total.toFixed(2) + "$"
}


function setpageIfo() {
    if(localStorage.getItem('cart') !== null){
        productInCart = JSON.parse(localStorage.getItem('cart'));
    }

    if (productInCart.length === 0) {
        productContainer.innerHTML = ` <div class="text-center d-flex flex-column justify-content-center" style="height: 100%;">
                    <h1>Card empty</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut corporis iusto libero maxime! Adipisci, minima consequuntur dolor laboriosam
                        <a class="btn btn-primary" href="../index.html">home</a>
                    </p>
                </div>`
    } else {
        productContainer.innerHTML = ""
        for (let item of productInCart) {
            productContainer.innerHTML += `
                <div class="card p-3">
                    <div class="card-Body">
                        <div class="row">
                            <div class="col-3">
                                <img width="120" src="${item.item.imgs[0]}" alt="">
                            </div>
                            <div class="col-4">
                                <p class="text-muted">${item.item.Category}</p>
                                <h5>${item.item.name}</h5>
                                <p class="text-muted"><em>Quantitie: ${item.quantite}</em> </p>
                            </div>
                            <div class="col-4 d-flex flex-column">
                                <h4 class="right-text">${item.item.price}$</h4>
                                <button data-btn-id="${item.item.id}" onclick="minceFromQuantite(this)" class="btn btn-outline-danger ml-auto mt-auto ">supprimer <i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>
                    </div>
                </div>`
        }
    }
}

function minceFromQuantite(obj) {
    const index = searchWithID(productInCart, obj.dataset.btnId)
    productInCart[index].quantite--;
    if (productInCart[index].quantite <= 0) {
        productInCart.splice(index, 1)
    }
    let localStr = localStorage;
    setPrices();
    localStr.setItem('cart', JSON.stringify(productInCart));
    setpageIfo();
}


function searchWithID(cart, id) {
    for (let item of cart) {
        if (item.item.id == id) {
            return cart.indexOf(item);
        }
    }
}

window.addEventListener('load', setpageIfo)
setPrices()
