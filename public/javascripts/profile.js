var myinfo = document.getElementsByClassName("myinfo")[0];
var sub = document.getElementsByClassName("sub")[0];
var lettle = document.getElementsByClassName("lettle")[0];
var idout = document.getElementsByClassName("idout")[0];
var button1 = document.getElementsByClassName("button b1 1")[0];
var button2 = document.getElementsByClassName("button b1 2")[0];
var button3 = document.getElementsByClassName("button b1 3")[0];
var button4 = document.getElementsByClassName("button b1 4")[0];
var modalcomeon = document.getElementsByClassName("modalcomeon")[0];
var plettle = document.getElementsByClassName("plettle")[0];
var modalcomeout = document.getElementsByClassName("modalcomeout")[0];

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

button1.addEventListener("click", myDisplay);
button2.addEventListener("click", subDisplay);
button3.addEventListener("click", letDisplay);
button4.addEventListener("click", idDisplay);
modalcomeon.addEventListener("click", modalDisplay);
modalcomeout.addEventListener("click", modalnoneDisplay);