window.addEventListener("load", function () {

    setTimeout(startPage, 1000);


})

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
var navStatus = true;

document.getElementById("navButton").addEventListener("click", function () {

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
if (winWidth > 480) {

    document.getElementById("main-contact").style.height = winHeight + "px";
} else {

    document.getElementById("main-contact").style.height = "auto";
}

window.onresize = function () {
    if (winWidth > 480) {

        document.getElementById("main-contact").style.height = winHeight + "px";
    } else {

        document.getElementById("main-contact").style.height = "800px";
    }
}

function startPage() {

    document.getElementById("wraper").style.display = "none";
    document.getElementById("main-contact").style.display = "block";
    document.getElementById("map2").style.visibility = "visible";
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
