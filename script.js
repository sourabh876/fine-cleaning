let total = 0;

function togglebuttons(button) {
  const serviceDiv = button.closest(".services");
  const name = serviceDiv.querySelector(".name").innerText.trim();
  const price = parseInt(serviceDiv.querySelector(".price").dataset.price, 10);

  const additem = serviceDiv.querySelector(".add-item");
  const removeitem = serviceDiv.querySelector(".remove-item");
  const cartList = document.getElementById("cart-list");
  const totalEl = document.getElementById("total");
  const emptymsg = document.getElementById("empty-msg");

  if (button.classList.contains("add-item")) {
    // switch buttons
    additem.style.display = "none";
    removeitem.style.display = "flex";

    // add service to the cart
    const li = document.createElement("li");
    li.innerHTML = `<span class="item-name">${name}</span> - <span class="item-price">₹${price}</span>`;
    li.setAttribute("data-name", name);
    cartList.appendChild(li);

    // hide empty message after adding
    if (emptymsg) {
      emptymsg.style.display = "none";
    }

    // update total
    total += price;
    totalEl.textContent = "₹" + total;
  } else {
    // switch buttons
    removeitem.style.display = "none";
    additem.style.display = "flex";

    // removing service
    const item = cartList.querySelector(`li[data-name="${name}"]`);
    if (item) cartList.removeChild(item);

    // update total
    total -= price;
    if (total < 0) total = 0;
    totalEl.textContent = "₹" + total;

    // show empty message if cart is empty after removal
    if (cartList.children.length === 1 && emptymsg) {
      emptymsg.style.display = "flex";
    }
  }

  console.log("emptymsg:", !!emptymsg, emptymsg);
console.log("cartList children (count):", cartList.children.length);
console.log("any li left:", !!cartList.querySelector("li"));

}

// get cart summary for email-sending
function getCartSummary() {
  const items = document.querySelectorAll("#cart-list li");
  let summary = "Selected services:\n\n";

  items.forEach((li, index) => {
    summary += `${index + 1}. ${li.textContent}\n`;
  });

  // totalEl already contains the currency symbol, so use it directly
  const totalText = document.getElementById("total").textContent || "₹0";
  summary += `\nTotal Amount: ${totalText}`;
  return summary;
}

function sendEmail(event) {
  if (event && event.preventDefault) event.preventDefault();

  const summary = getCartSummary();

  const name = document.querySelector(".name1").value;
  const email = document.querySelector(".email").value;
  const number = document.querySelector(".number").value;

  emailjs.send("service_8bhm4u2", "template_3neb8fc", {
    user_name: name,
    user_email: email,
    phone: number,
    message: summary
  }).then(() => {
    alert("Email sent successfully");
  }, (error) => {
    console.error("Email Failed:", error);
    alert("Failed to send email, please try again later");
  });
}

// Remove the incorrect immediate call:
// if (sendEmail()) {
//   window.reload
// }
