window.addEventListener("load", function () {

    setTimeout(startPage, 1000);
    setTimeout(imgPos, 2000);
    setTimeout(sectionShow, 1500);
})

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
var navStatus = true;

document.getElementById("navButton").addEventListener("click", function(){
    
    showRespNav();
})

function showRespNav() {

    if (navStatus == true) {

        document.getElementById("respNav").style.height = "auto";

        navStatus = false;
    } else {

        document.getElementById("respNav").style.height = "0";

        navStatus = true;

    }


}

if (winWidth > 480){

    document.getElementById("main-about").style.height = winHeight + "px";
}else {
    
    document.getElementById("main-about").style.height = "auto";
}

function imgPos() {
    if(winWidth > 768){
    document.getElementById("gpsImg").style.right = "30px";
    }else {
        document.getElementById("gpsImg").style.right = "10px";        
    }
}

function sectionShow() {
    
    document.getElementById("section-1").style.opacity = 1;
}


function startPage() {

    document.getElementById("wraper").style.display = "none";
    document.getElementById("main-about").style.display = "block";
    document.getElementById("footer").style.display = "block";

}

function navWrapOver(event) {

    var id = event.target.id;
    var divId = "nw" + id.slice(1);
    document.getElementById(divId).style.height = "50px";
    document.getElementById(divId).style.borderBottom = "2px solid #f200c9";
    var activeDiv = document.getElementsByClassName("active");
    activeDiv[0].style.height = "50px";
    activeDiv[0].style.borderBottom = "2px solid #f200c9";
}

function navWrapOut(event) {

    var id = event.target.id;
    var divId = "nw" + id.slice(1);
    document.getElementById(divId).style.height = "0";
    document.getElementById(divId).style.borderBottom = "0";
    var activeDiv = document.getElementsByClassName("active");
    activeDiv[0].style.height = "50px";
    activeDiv[0].style.borderBottom = "2px solid #f200c9";
}