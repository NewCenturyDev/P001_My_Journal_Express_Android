var myinfo = document.getElementsByClassName("myinfo")[0];
var sub = document.getElementsByClassName("sub")[0];
var lettle = document.getElementsByClassName("lettle")[0];
var idout = document.getElementsByClassName("idout")[0];
var modalcomeon = document.getElementsByClassName("modalcomeon")[0];
var plettle = document.getElementsByClassName("plettle")[0];
var modalcomeout = document.getElementsByClassName("modalcomeout")[0];
var profile = document.getElementById('profile');
var logout = document.getElementById('logout');

function myDisplay(){
    console.log(myinfo.style.display);
    if(myinfo.style.display=='none'){
        myinfo.style.display = 'flex';
        sub.style.display = 'none';
        lettle.style.display = 'none';
        idout.style.display = 'none';
    }
}

function subDisplay(){
    console.log(sub.style.display);
    if(sub.style.display=='none'){
        sub.style.display = 'block';
        myinfo.style.display = 'none';
        lettle.style.display = 'none';
        idout.style.display = 'none';
    }
}

function letDisplay(){
    console.log(lettle.style.display);
    if(lettle.style.display=='none'){
        lettle.style.display = 'block';
        myinfo.style.display = 'none';
        sub.style.display = 'none';
        idout.style.display = 'none';
    }
}

function idDisplay(){
    console.log(idout.style.display);
    if(idout.style.display=='none'){
        idout.style.display = 'block';
        myinfo.style.display = 'none';
        sub.style.display = 'none';
        lettle.style.display = 'none';
    }
}

function modalDisplay(){
    console.log(plettle.style.display);
    if(plettle.style.display=="none"){
        plettle.style.display = 'block';
    }
}

function modalnoneDisplay(){
    console.log(plettle.style.display);
    if(plettle.style.display =="block"){
        plettle.style.display = 'none';
    }
}

function goProfile() {
    location.href = "/contents";
}

function logOut() {
    alert('로그아웃 되었습니다!');
    location.href = "/logout";
}


modalcomeon.addEventListener("click", modalDisplay);
modalcomeout.addEventListener("click", modalnoneDisplay);
profile.addEventListener("click", goProfile);
logout.addEventListener("click", logOut);