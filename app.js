function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item, price) {
  let cart = getCart();
  let gst = price * 0.13;
  let final = price + gst;
  cart.push({ name: item, base: price, gst: gst, final: final });
  saveCart(cart);
  alert(item + " added to cart!");
}

function loadCart() {
  let cart = getCart();
  let cartDiv = document.getElementById("cart-items");
  let totalDiv = document.getElementById("total");
  if (!cartDiv) return;

  cartDiv.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item) => {
    let div = document.createElement("div");
    div.textContent = `${item.name} - Base: ₹${item.base} | GST: ₹${item.gst.toFixed(2)} | Final: ₹${item.final.toFixed(2)}`;
    cartDiv.appendChild(div);
    grandTotal += item.final;
  });

  if (grandTotal > 0) {
    let discount = 0;
    if (grandTotal > 500) {
      discount = grandTotal * 0.1;
      grandTotal -= discount;
    }
    totalDiv.textContent = `Grand Total: ₹${grandTotal.toFixed(2)} (Discount: ₹${discount.toFixed(2)})`;
  } else {
    totalDiv.textContent = "Your cart is empty!";
  }
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
}

window.onload = loadCart;
