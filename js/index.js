const ArchitectureSection = document.querySelector("#Architecture__Holder");
const CarsSection = document.querySelector("#Cars__Holder");
const MinecraftSection = document.querySelector("#Minecraf__Holder");

function cards(products) {
  let parent;
  if (!products) {
    return;
  }
  for (let product of products) {
    if (product.Category === "LEGO Architectur") {
      parent = ArchitectureSection;
    } else if (product.Category === "LEGO Technic") {
      parent = CarsSection;
    } else {
      parent = MinecraftSection;
    }
    if (parent.childElementCount < 3) {
      parent.innerHTML += `
            <div class="col">
                <a href="./html/Product.html" onclick="setCardIndex(this)" class="card" data-Card-id="${
                  product.id
                }">
                    <img src="${product.imgs[0]}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${
                          product.description[0].slice(0, 65) + "..."
                        }</p>
                    </div>
                    <div class="card-footer">
                        <h5>Price: ${product.price}$</h5>
                    </div>
                </a>
            </div>
        `;
    }
    if (parent.childElementCount === 3) {
      parent.innerHTML += `<a class="plus_item" href="./html/Products.html" onclick="setFilter(this)" class="card border-0 opacity-hover">
                <div style="font-size: 10rem;" class="card-body d-flex justify-content-center align-items-center ">
                    <i class="bi bi-plus-circle"></i>
                </div>
            </a>`;
    }
  }
}

function setFilter(obj) {
  const plusitemsEl = document.querySelectorAll(".plus_item");
  console(plusitemsEl);
  storage.setItem("parent", plusitemsEl.indexOf(obj));
}

async function getProducts() {
  const respons = await fetch("../jsonFiles/Products.json");
  const products = await respons.json();

  localStorage.setItem("Products", JSON.stringify(products));
  cards(products);
}

function setCardIndex(obj) {
  localStorage.setItem("cardIndex", obj.dataset.cardId);
}

getProducts();
