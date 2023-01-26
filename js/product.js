const thumnilImgs = document.querySelectorAll('.Thumbnil');
const mainImg = document.querySelector(".big__Img");
const category = document.querySelector(".Category");
const productName = document.querySelector(".Name");
const price = document.querySelector('.price');
const onStock = document.querySelector('#onStock');
const Specifite = document.querySelector('#Specifite');
const commentsHolder = document.querySelector('#Comments');

const date = new Date();

// Add to card 
let CardItems = []
const quantiteEL = document.querySelector("#quantite");
let quantite = 0;

//card btns
const cardBtns = document.querySelectorAll('.card-btns');

const storage = localStorage;
let index = localStorage.getItem('cardIndex');
const Products = JSON.parse(localStorage.getItem('Products'));
const product = Products[index];

const bgImage = document.querySelector('.big__Img');

function ShowImg(index, imgs) {
    bgImage.attributes = imgs[index];
}

function ShowImg(obj) {
    let imgSrc = obj.querySelector('img').src;
    bgImage.src = imgSrc;
}

function setProductContent() {
    document.title = product.Category + " | " + product.name

    for (let i in thumnilImgs) {
        thumnilImgs[i].src = product.imgs[i];
    }
    bgImage.setAttribute('src', product.imgs[0])
    productName.textContent = product.name;
    category.textContent = product.Category;
    price.textContent = "Price: " + product.price + "$";

    if (!product.onStock) {
        onStock.classList.remove('alert-success');
        onStock.classList.add('alert-danger');
        onStock.textContent = "Not In Stock"
    } else {
        onStock.classList.add('alert-success');
        onStock.classList.remove('alert-danger');
        onStock.textContent = "On Stock"
    }

    for (let i of product.specifite) {
        Specifite.appendChild(creatElemnt('li', i, null));
    }
    commentsHolder.appendChild(creatComent(product.comments));

}


function creatElemnt(type, content, classes) {
    const element = document.createElement(type);
    element.textContent = content;
    if (classes !== null) {
        for (let el of classes) {
            element.classList.add(el);
        }
    }
    return element;
}


function creatComent(Comments) {
    let CommentsFrag = document.createDocumentFragment()
    for (let i of Comments) {
        let comment = `<div class="card mt-2">
                        <div class="card-header">
                            <div class="row ">
                                <div class="col width-content">
                                    <img src="../Imgs/avatar.png" width="60px" alt="">
                                </div>
                                <div class="col">
                                    <h5>user Name</h5>
                                    <p>${i.creatAt}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>${i.comment}</p>
                        </div>
                    </div>`;
        commentsHolder.innerHTML += comment;
    }

    return CommentsFrag;
}


function addCommetn() {
    const commentInput = document.querySelector('#comment_Input');

    if (commentInput.value !== "") {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        let comment = `<div class="card mt-2">
                        <div class="card-header">
                            <div class="row ">
                                <div class="col width-content">
                                    <img src="../Imgs/avatar.png" width="60px" alt="">
                                </div>
                                <div class="col">
                                    <h5>user Name</h5>
                                    <p>${yyyy}/${mm}/${dd}</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>${commentInput.value}</p>
                        </div>
                    </div>`;
        product.comments.push({
            img: "../imgs/avatar.png",
            userName: "User Name",
            creatAt: `${yyyy}/${mm}/${dd}`,
            comment: commentInput.value,
        });
        commentsHolder.innerHTML += comment;
        commentInput.value = "";
    }
}

function changeContent() {
    let index = localStorage.getItem('cardIndex');
    const product = Products[index];
}

function setQuantiteVAlue() {
    quantiteEL.textContent = quantite;
}

function addQuantite() {
    if (quantiteInCard() + quantite < product.quantiteOnStock) {
        quantite++;
        if (quantite > product.quantiteOnStock) {
            quantite = product.quantiteOnStock;
        }
        setQuantiteVAlue();
    } else {
        document.querySelector('#outOfStock').style.display = "block";
    }
}

function minecQuantite() {
    quantite--;
    if (quantite < 0) {
        quantite = 0;
    }
    setQuantiteVAlue();
}

function addToCart() {
    let order = {
        item: {},
        quantite: 0
    }

    if (localStorage.getItem("cart") !== null) {
        CardItems = JSON.parse(localStorage.getItem('cart'));
    }

    if (quantite !== 0) {
        const exist = testExistance(Products[index], CardItems);
        if (exist === -1) {
            order.item = Products[index];
            order.quantite = quantite;
            CardItems.push(order);
            additem();
        } else {
            CardItems[exist].quantite += quantite;
        }
        quantite = 0;
        setQuantiteVAlue();
        storage.setItem("cart", JSON.stringify(CardItems));

    }
}


function testExistance(cardItemToAdd, card) {
    if (card.length === 0) {
        return -1;
    }
    for (let i of card) {
        if (i.item.id === cardItemToAdd.id) {
            return card.indexOf(i)
        }
    }
    return -1;
}

const quantiteInCard = () => {
    const cardItems = JSON.parse(localStorage.getItem('cart'));
    const currentItemId = localStorage.getItem('cardIndex');
    if (cardItems === null) return 0;
    for (let item of cardItems) {
        if (item.item.id == currentItemId) {
            return item.quantite;
        }
    }
    return 0;
}


// Programe Pricipale
setProductContent();
setQuantiteVAlue();
if (!product.onStock) {
    cardBtns.forEach(btn => {
        btn.classList.toggle('hide')
    });
}