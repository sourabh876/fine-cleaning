let total = 0;

function togglebuttons(button) {
    const serviceDiv = button.closest(".services")
    const name = serviceDiv.querySelector(".name").innerText.trim()
    const price = parseInt(serviceDiv.querySelector(".price").dataset.price , 10)


    const additem = serviceDiv.querySelector(".add-item")
    const removeitem = serviceDiv.querySelector(".remove-item")
    const cartList =  document.getElementById("cart-list")
    const totalEl = document.getElementById("total")
    const emptymsg = document.getElementById("empty-msg")

    if(button.classList.contains("add-item")){
        additem.style.display = "none"
        removeitem.style.display = "flex"

        if(cartList.children.length = 1 && emptymsg){
            emptymsg.style.display = "none"
        }

        if(cartList.children.length === 0 && emptymsg){
            emptymsg.style.display = "block"
        }

        //add service to the cart

        const li = document.createElement("li")
        li.innerHTML = `<span class ="item-name">${name}</span> - <span class ="item-price">₹${price}</span>`
        li.setAttribute("data-name", name)
        cartList.appendChild(li)

        //update total

        total += price
        totalEl.textContent = ("₹" + total);
    }else{
        //switch buttons

        removeitem.style.display = "none"
        additem.style.display = "flex"

        //removing of service

        const item = cartList.querySelector(`li[data-name = "${name}"]`)
        if(item) cartList.removeChild(item)


        //price remove

        total -= price
        totalEl.textContent = total
    }

    
 } 

 // get cart summary for email-sending

function getCartSummary() {
    const items = document.querySelectorAll("#cart-list li")
    let summary = "selected service:\n\n"

    items.forEach((li , index) => {
         summary += `${index + 1 }. ${li.textContent}\n`
    })

    const total = document.getElementById("total").textContent;
    summary += `\nTotal Amount: ₹${total}`;
    return summary;
}

function sendEmail(event){

    event.preventDefault()

    const summary = getCartSummary()

    const name = document.querySelector(".name1").value;
    const email = document.querySelector(".email").value;
    const number = document.querySelector(".number").value

    emailjs.send("service_8bhm4u2", "template_3neb8fc",{
        user_name : name,
        user_email : email,
        phone : number,
        message : summary
    }).then(() => {
        alert("Email sent succesfully")
    },(error) => {
        console.error("Email Failed:", error)
        alert("Failed to send email, please try again later")
    })
}

if(sendEmail()){
    window.reload
}