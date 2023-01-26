const recomendationContainer = document.querySelector('#recomendation');


const products = JSON.parse(localStorage.getItem('Products'))
const currentPRoductCaticoryIndex = localStorage.getItem('cardIndex');
const currentPRoductCaticory = products[currentPRoductCaticoryIndex].Category;

for (let product of products) {
    if (product.Category === currentPRoductCaticory && product.name !== products[currentPRoductCaticoryIndex].name && recomendationContainer.childElementCount <= 3) {
        recomendationContainer.innerHTML += `
            <div class="col">
                <a href="./Product.html" onclick="setCardIndex(this)" class="card" data-Card-id="${product.id}">
                    <img src="${product.imgs[0 ]}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description[0].slice(0,65) + "....."}</p>
                    </div>
                    <div class="card-footer">
                        <h5>Price: ${product.price}$</h5>
                    </div>
                </a>
            </div>
        `;
    }
}

function setCardIndex(obj) {
    const storage = localStorage;
    storage.setItem('cardIndex', obj.dataset.cardId);
}