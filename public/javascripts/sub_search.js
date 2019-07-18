var profile = document.getElementById('profile');
var logout = document.getElementById('logout');
var people = document.getElementById('people');

function goProfile() {
    location.href = "/profile";
}
function logOut() {
    alert('로그아웃 되었습니다!');
    location.href = "/";
}
function goPeople() {
    location.href = "/sub_search";
}

profile.addEventListener("click", goProfile);
logout.addEventListener("click", logOut);
people.addEventListener("click", goPeople);