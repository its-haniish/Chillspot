/* --- Geral --- */
//Variables
const darkMode = document.querySelector('#darkModeBtn');
let pizzaModal = document.querySelector('.pizzaInfoModal');
let pizzaModalContent = pizzaModal.querySelector('.modalContent');
let key;

let pizzaAmount = 1; //Quantidade de pizzas do modal.
let cart = []; //Carrinho de compras.
let modalKey, pizzaPrice, pizzaPriceFloat;

let subtotal = 0;
let discount = 0;
let total = 0;
let cartModal = document.querySelector(".cart");
let cartVisibility = "hidden";

//Functions
function closePizzaInfoModal() {
    pizzaModal.style.opacity = 0;

    setTimeout(() => {
        pizzaModal.style.display = 'none'
    }, 300)
}


function closeCartModal() {
    cartModal.style.opacity = 0;

    setTimeout(() => {
        cartModal.style.display = 'none'
    }, 300)
}

/* --- Dark Mode ---*/
darkMode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
})

/* --- Close Modal Buttons --- */
document.querySelectorAll('.closeProduct, .mobileCloseModal').forEach((element) => {
    element.addEventListener("click", () => { closePizzaInfoModal() });
});

/* --- Select pizza size --- */
document.querySelectorAll('.pizzaSize').forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector('.pizzaSize.selected').classList.remove('selected');
        element.classList.add('selected');

        /* Set price */
        pizzaPriceFloat = pizzaJson[key].price
        let keyValue = element.getAttribute('data-key');

        switch (Number(keyValue)) {
            case 0:
                pizzaPriceFloat *= .8
                break;
            case 1:
                pizzaPriceFloat *= .9
                break
            default:
                console.log("Erro ao calcular o preço. Key = " + key);
                break;
        }

        pizzaPrice = pizzaPriceFloat.toFixed(2)
        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPrice}€`;

        pizzaAmount = 1;
        document.querySelector('.qntBtn h3').innerHTML = pizzaAmount
    })
})

/* --- Change pizza quantity --- */
document.querySelector(".lessQnt").addEventListener("click", () => {//To decrease pizza amount
    if (pizzaAmount > 1) {
        pizzaAmount--
        let pizzaPriceAct = (pizzaPriceFloat * pizzaAmount).toFixed(2);

        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPriceAct}€`;
        document.querySelector('.qntBtn h3').innerHTML = pizzaAmount
    }
})

document.querySelector(".moreQnt").addEventListener("click", () => {//To increase pizza amount.
    pizzaAmount++
    let pizzaPriceAct = (pizzaPrice * pizzaAmount).toFixed(2);

    pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPriceAct}€`;
    document.querySelector('.qntBtn h3').innerHTML = pizzaAmount
})

/* --- Cart --- */
document.querySelector('.cartIcon').addEventListener("click", () => { //cart eventListener to open modal.
    if (cartVisibility == "visible") {
        cartVisibility = "hidden";
        closeCartModal()
    } else {
        cartModal.style.display = "flex";
        cartModal.style.visibility = "visible";

        cartModal.style.opacity = 0;
        setTimeout(() => {
            cartModal.style.opacity = 1;
        }, 30)
        cartVisibility = "visible";
    }

})

document.querySelector(".addProduct").addEventListener("click", () => { //Add product to cart
    //modalKey = Qual pizza
    //pizzaSize = Tamanho da pizza
    //pizzaAmount = Quantidade de pizzas
    let pizzaSize = parseInt(document.querySelector(".pizzaSize.selected").getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + pizzaSize;
    let key = cart.findIndex(item => item.identifier == identifier);

    // Calculate the price based on the selected size
    let pizzaPriceFloat = pizzaJson[modalKey].price;
    switch (pizzaSize) {
        case 0:
            pizzaPriceFloat *= 0.8;
            break;
        case 1:
            pizzaPriceFloat *= 0.9;
            break;
        default:
            console.log("Error calculating the price. Key = " + key);
            break;
    }

    if (key > -1) {
        cart[key].amount += pizzaAmount;
    } else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            name: pizzaJson[modalKey].name,
            price: pizzaPriceFloat, // Include item price
            size: pizzaSize,
            amount: pizzaAmount
        });
    }

    console.log(cart);
    document.querySelector(".cartIcon span").innerHTML = cart.length;
    document.querySelector(".cartIcon span").style.display = "flex";

    updateCar();
    closePizzaInfoModal();
});


pizzaJson.map((item, index) => { //Fill content div with pizzas info & open modal system.
    let pizzaItem = document.querySelector('.models .pizzaItem').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizzaPrice').innerHTML = `${item.price.toFixed(2)}€`;
    pizzaItem.querySelector('.pizzaImg img').src = item.img;
    pizzaItem.querySelector('.pizzaName').innerHTML = item.name;
    pizzaItem.querySelector('.pizzaDescription').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener("click", e => {
        e.preventDefault();
        closeCartModal();

        key = e.target.closest('.pizzaItem').getAttribute('data-key');
        pizzaPrice = pizzaJson[key].price.toFixed(2);

        pizzaModalContent.querySelector('.pizzaDescription').innerHTML = pizzaJson[key].description;
        pizzaModalContent.querySelector('.pizzaName').innerHTML = pizzaJson[key].name;
        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPrice}€`;
        pizzaModalContent.querySelector('img').src = pizzaJson[key].img;
        pizzaModalContent.querySelector('.priceArea .qntBtn h3').innerHTML = pizzaAmount;

        pizzaModalContent.querySelectorAll('.pizzaSize').forEach((size, sizeIndex) => {
            size.classList.remove('selected');
            if (sizeIndex == 2) size.classList.add('selected');
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        //open modal animation
        pizzaModal.style.display = "flex";
        pizzaModal.style.visibility = "visible";

        pizzaModal.style.opacity = 0;
        setTimeout(() => {
            pizzaModal.style.opacity = 1;
        }, 30)

        pizzaAmount = 1;
        modalKey = key;
    });

    document.querySelector('main .content').append(pizzaItem);
});

function updateCar() { //Update cart function
    /*     document.querySelector('') - Do span do header do mobile*/

    if (cart.length > 0) {
        document.querySelector('.cart .container').innerHTML = '';

        for (let i in cart) {
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
            let cartItem = document.querySelector('.models .cartItem').cloneNode(true);
            let pizzaSizeName;

            subtotal = Math.round(pizzaItem.price * cart[i].amount);

            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = "From Chillspot";
                    console.log()
                    break;
                case 1:
                    pizzaSizeName = "From Cornetto";
                    break;
                case 2:
                    pizzaSizeName = "From Amul";
                    break;
                default:
                    pizzaSizeName = "Erro"
                    console.log("Erro #001")
            }

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cartPizzaName').innerHTML = pizzaItem.name;
            cartItem.querySelector('.pizzaSize').innerHTML = " - " + pizzaSizeName;
            cartItem.querySelector('.cartQuantityArea .showQuantity').innerHTML = cart[i].amount;
            cartItem.querySelector('.cartQuantityArea .removeQuantity').addEventListener("click", () => {

                if (cart[i].amount > 1) {
                    cart[i].amount--;
                } else {
                    console.log(cart);
                    cart.splice(i, 1);
                    console.log(cart);
                }
                updateCar()
            })

            cartItem.querySelector('.cartQuantityArea .addQuantity').addEventListener("click", () => {
                cart[i].amount++;
                updateCar();
            })

            document.querySelector('.cart .container').append(cartItem);
        }

        discount = Math.round(subtotal * 0.1);
        total = subtotal - discount;

        document.querySelector('.cart .finalData .text .subTotal').innerHTML = `Subtotal: ${subtotal.toFixed(2)}€`;
        document.querySelector('.cart .finalData .text .discount').innerHTML = `Desconto: ${discount.toFixed(2)}€`
        document.querySelector('.cart .finalData .text .totalText').innerHTML = `Total: ${total.toFixed(2)}€`

    }
}

const apiBase = "https://chillspot.onrender.com";

/* --- Order Now Button --- */
document.querySelector('#orderNowBtn').addEventListener("click", async () => { // Order Now button eventListener
    const address = document.getElementById("address").value;
    const email = localStorage.getItem("chillspotEmail");
    const time = new Date().getTime()
    console.log("Placing order...");
    if (address === "") {
        return alert("Enter your address to place order.");
    }
    if (email === null) {
        return alert("Login to place order.");
    }
    let itemsArray = [];
    cart.forEach((elem) => {
        itemsArray.push({
            name: elem.name,
            price: elem.price,
            amount: elem.amount,
            address, time
        })
    });
    let response = await fetch(`${apiBase}/place-order`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("chillspotToken"))}`
        },
        body: JSON.stringify({ itemsArray, email })
    })
    let result = await response.json();
    if (result?.msg === "Order placed successfully.") {
        window.location.href = "https://chillspot-phi.vercel.app/history.html";
    } else {
        return alert("Error placing order");
    }
});
