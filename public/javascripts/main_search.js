var login = document.getElementById('login');
var register = document.getElementById('register');

function logIn() {
    location.href = "/login";
}

function signUp() {
    location.href = "/register";
}

login.addEventListener("click", logIn);
register.addEventListener("click", signUp);