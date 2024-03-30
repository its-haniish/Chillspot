const signupBtn = document.getElementById("signupBtn");
const signupEmail = document.getElementById('signup-email');
const signupPass = document.getElementById("signup-pass");
const signupMobile = document.getElementById("signup-mobile");

const loginBtn = document.getElementById("login-btn");
const loginEmail = document.getElementById("login-email");
const loginPass = document.getElementById("login-pass");

signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = {
        email: signupEmail.value,
        password: signupPass.value,
        mobile: signupMobile.value,
    }
    let response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    let result = await response.json();
    if (result?.msg === "Account created successfully :)") {
        localStorage.setItem("chillspotToken", JSON.stringify(result.token))
        window.location.href = "../index.html"
    }
    return alert(result.msg)
})

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const user = {
        email: loginEmail.value,
        password: loginPass.value
    };
    let response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    let result = await response.json();
    if (result?.msg === "Login successfull") {
        localStorage.setItem("chillspotToken", JSON.stringify(result.token));
        window.location.href = "../index.html"
    }
    return alert(result.msg);
});

