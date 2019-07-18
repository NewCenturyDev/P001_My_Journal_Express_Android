/* 이용약관 모달창 */

var eula = document.getElementById("eula1");
var privercy = document.getElementById("eula2");

function showeula(){
    eula.style.display = "block";
    return;
}

function showprivercy(){
    privercy.style.display = "block";
    return;
}

function closemodal(){
    eula.style.display = "none";
    privercy.style.display = "none";
    return;
}