const historyDiv = document.getElementById("history");
const apiBase = "https://chillspot.onrender.com";

function isTimePassed(timeInMilliseconds) {
    // Get the current time in milliseconds
    const currentTime = Date.now();

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - timeInMilliseconds;

    // Define the time threshold for 15 minutes in milliseconds (15 minutes * 60 seconds * 1000 milliseconds)
    const fifteenMinutesInMilliseconds = 15 * 60 * 1000;

    // Check if the time difference is greater than or equal to 15 minutes
    return timeDifference >= fifteenMinutesInMilliseconds;
}

let getOrdersData = async () => {
    const email = localStorage.getItem("chillspotEmail");
    console.log("Fetching data...");
    let response = await fetch(`${apiBase}/get-orders-by-email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("chillspotToken"))}`
        },
        body: JSON.stringify({ email })
    })
    let result = await response.json();
    console.log(result.orders);
    if (result?.msg) {
        return alert(result.msg);
    }
    const orders = result.orders;
    let str = '';



    orders.forEach(elem => {
        const { name, amount, price, time, address } = elem;
        const status = isTimePassed(time);
        console.log('status:', status);
        console.log('time:', time);

        str += `
    <div class="order">
    <div class="order-content">
        <h2>${name}</h2>
        <p class="status delivered">Amount: ${amount}</p>
        <p class="status delivered">Delivery address: ${address}</p>
        <p class="status delivered">Status: ${status ? "Delivered" : "Pending Delivery"}</p>
        <p class="status delivered">Total: $${price * amount}</p>
    </div>
    </div>
        `
    });

    historyDiv.innerHTML = str;
}

window.addEventListener("onload", getOrdersData())