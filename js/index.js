async function getProducts() {
  console.log("test test");
  const request = new XMLHttpRequest();
  const storage = localStorage;

  request.open("GET", "./jsonFiles/Products.json", true);

  request.onload = function () {
    if (request.status === 200) {
      const products = request.response;
      storage.setItem("Products", products);
    }
  };
  request.send();
}

function setCardIndex(obj) {
  const storage = localStorage;
  storage.setItem("cardIndex", obj.dataset.cardId);
}

getProducts();
