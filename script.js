let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

renderProducts();
renderCart();

// Producten inladen
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img width="100%" src="${product.image}" alt="${product.name}">
      <div class="details">
        <h3>${product.name}</h3>
        <p>€${product.price}</p>
        <button onclick="addToCart(${product.id})" class="checkout">Voeg toe</button>
      </div>
    `;
    productList.appendChild(div);
  });
}

// Product toevoegen
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  cart.push(product);
  total += product.price;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Winkelmand tonen
function renderCart() {
  const cartList = document.getElementById("cart");
  const cartCount = document.getElementById("cart-count");

  if (cartList) {
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
      let div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div class="title-price-x">
          <div class="title-price">
            <p>${item.name}</p>
            <span class="cart-item-price">€${item.price}</span>
          </div>
          <i class="bi bi-x-lg" onclick="removeFromCart(${index})"></i>
        </div>
      `;
      cartList.appendChild(div);
    });
    document.getElementById("total").textContent = total;
  }

  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Verwijderen
function removeFromCart(index) {
  const removed = cart.splice(index, 1)[0];
  total -= removed.price;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
