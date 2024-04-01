const apiBase = "https://chillspot.onrender.com";
const signupBtn = document.getElementById("signupBtn");
const signupEmail = document.getElementById('signup-email');
const signupPass = document.getElementById("signup-pass");
const signupMobile = document.getElementById("signup-mobile");
var user = {};

const loginBtn = document.getElementById("login-btn");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");

const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpInpDiv = document.getElementById("otpInpDiv");
const otpInp = document.getElementById("otpInp");

const code = Math.floor(Math.random() * 10000);

sendOtpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    user.email =signupEmail.value;
    user.password = signupPass.value;
    user.mobile = signupMobile.value;

    console.log("Sending email to", user.email);
    const subject = "!! Chillspot Verification !!";
    const msg = `Your verification code joining chillspot is ${code}.`;

    let response = await fetch(`${apiBase}/sendEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, subject, msg })
    })
    let result = await response.json();
    if (result?.msg === "Message sent successfully") {
        sendOtpBtn.style.display = "none";
        otpInpDiv.style.display = "block";
    } else {
        alert("Failed to send the code.")
    }
})

signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = {
        email: signupEmail.value,
        password: signupPass.value,
        mobile: signupMobile.value,
    }
    
    if (code !== +otpInp.value) {
        return alert("Invalid code.")
    }

    let response = await fetch(`${apiBase}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    let result = await response.json();
    if (result?.msg === "Account created successfully :)") {
        localStorage.setItem("chillspotEmail", JSON.stringify(user.email))
        localStorage.setItem("chillspotToken", JSON.stringify(result.token))
        window.location.href = "../index.html"
    } else {
        return alert(result.msg)
    }
})

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    user.email = loginEmail.value;
    user.password = password: loginPass.value;

    let response = await fetch(`${apiBase}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    let result = await response.json();
    if (result?.msg === "Login successfull") {
        localStorage.setItem("chillspotEmail", JSON.stringify(user.email))
        localStorage.setItem("chillspotToken", JSON.stringify(result.token));
        window.location.href = "../index.html"
    } else {
        return alert(result.msg);
    }
});

