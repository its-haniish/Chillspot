const logoutBtn = document.getElementById("logout-btn").addEventListener('click', () => {
    if (localStorage.getItem("chillspotToken") !== null) {
        console.log(localStorage.getItem("chillspotToken"));
        const isLogout = confirm("Are you sure you want to logout?");
        if (isLogout) {
            alert("Logout successfull")
            window.location.href = "./Login & signup/index.html"
        }
    } else {
        window.location.href = "./Login & signup/index.html"
    }
})