window.addEventListener("load", function () {

    setTimeout(startPage, 500);
})

//Declaring global variables
var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
var lat;
var lng;
var map;
var locations = [];
var locationAllowed = false;
var searchClicked = false;
var x = 1;
var navStatus = true;

//Adding event listenres to HTML elements
document.getElementById("navButton").addEventListener("click", function(){
    
    showRespNav();
})

document.getElementById("coffee").addEventListener("click", function () {

    document.getElementById("wraper").style.display = "block";
    getVenues(this.id);
    if (locationAllowed == true) {
        setTimeout(function () {

            document.getElementById("wraper").style.display = "none";
            $('html, body').animate({
                scrollTop: $("#result").offset().top
            }, 1000);
        }, 1000);
    }

})

document.getElementById("restaurants").addEventListener("click", function () {

    document.getElementById("wraper").style.display = "block";
    getVenues(this.id);
    if (locationAllowed == true) {
        setTimeout(function () {

            document.getElementById("wraper").style.display = "none";
            $('html, body').animate({
                scrollTop: $("#result").offset().top
            }, 1000);
        }, 1000);
    }

});

document.getElementById("hotel").addEventListener("click", function () {

    document.getElementById("wraper").style.display = "block";
    getVenues(this.id);
    if (locationAllowed == true) {
        setTimeout(function () {

            document.getElementById("wraper").style.display = "none";
            $('html, body').animate({
                scrollTop: $("#result").offset().top
            }, 1000);
        }, 1000);
    }
});

document.getElementById("gas").addEventListener("click", function () {

    document.getElementById("wraper").style.display = "block";
    getVenues(this.id);
    if (locationAllowed == true) {
        setTimeout(function () {

            document.getElementById("wraper").style.display = "none";
            $('html, body').animate({
                scrollTop: $("#result").offset().top
            }, 1000);
        }, 1000);
    }
});

//Showing and hiding navigation for mobile and tablet devices, when clicked on nav button
function showRespNav() {

    if (navStatus == true) {

        document.getElementById("respNav").style.height = "auto";

        navStatus = false;
    } else {

        document.getElementById("respNav").style.height = "0";

        navStatus = true;
    }
}

//Show and hide button(scroll to top), when scroled more then 60% of the Main div
window.onscroll = function () {

    var topScr = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    var imgTop = document.getElementById("toTop");
    var showPos = winHeight - (winHeight * 0.4);
    var result = document.getElementById("result");

    if (topScr > showPos) {
        if (searchClicked == true) {
            result.style.opacity = "1";
        }
        imgTop.style.visibility = "visible";
    } else {
        imgTop.style.visibility = "hidden";
    }

}


//Example of recursion -- Changing color of 3 paragraphs one by one with timeout
//function will stop executing when color is changed on third paragraph 
function parChangeColor(x) {

    if (x > 3) {
        return;
    } else {
        var id = "par" + x;
        var par = document.getElementById(id);
        par.style.color = "#f200c9";
        if (x > 1) {

            var y = x - 1;
            var id2 = "par" + y;
            var par2 = document.getElementById(id2);
            par2.style.color = "black";
        }
    }
    var z = x + 1;
    setTimeout(function () {
        parChangeColor(z)
    }, 1500)
}
//end

//showing content of web when all elements are loaded
function startPage() {

    document.getElementById("wraper").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("result").style.display = "block";
    document.getElementById("footer").style.display = "block";
    document.getElementById("facts").style.display = "block";

    getLocation();

}

if (winWidth > 480) {

    document.getElementById("main").style.height = winHeight + "px";
}

//Geting the user location
function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(onPositionReceived, locationNotReceived)
    }
}

//If user position is recived, retriving user current address using AJAX to get information from Google Map API
function onPositionReceived(position) {

    setTimeout(function () {
        parChangeColor(x)
    }, 1000);

    locationAllowed = true;

    lat = position.coords.latitude;
    lng = position.coords.longitude;
    createMap();

    var baseAdressUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    var keyUrl = "&key=AIzaSyBaMfxx125qpDcCXkY96DgEHsZTVPVKnY8";
    var fullUrl = baseAdressUrl + lat + "," + lng + keyUrl;

    $.ajax({
        url: fullUrl,
        success: function (result) {

            var adr = result.results[0].formatted_address;
            document.getElementById("currentAdress").innerHTML = "Your current location:";
            document.getElementById("writeAdress").innerHTML = adr;
        }
    });
}

function locationNotReceived() {

}

window.onresize = function () {

    var winHeightResize = window.innerHeight;
    if (winWidth > 480) {
        document.getElementById("main").style.height = winHeightResize + "px";
    }
}

//Adding effects to navigation menu
function navWrapOver(event) {

    var id = event.target.id;
    var divId = "nw" + id.slice(1);
    document.getElementById(divId).style.height = "50px";
    document.getElementById(divId).style.borderBottom = "2px solid #f200c9";
    var activeDiv = document.getElementsByClassName("active");
    activeDiv[0].style.height = "50px";
    activeDiv[0].style.borderBottom = "2px solid #f200c9";
}

//Adding effects to navigation menu
function navWrapOut(event) {

    var id = event.target.id;
    var divId = "nw" + id.slice(1);
    document.getElementById(divId).style.height = "0";
    document.getElementById(divId).style.borderBottom = "0";
    var activeDiv = document.getElementsByClassName("active");
    activeDiv[0].style.height = "50px";
    activeDiv[0].style.borderBottom = "2px solid #f200c9";
}

//Function called when clicked on one of categories(Caffee Shops, Restaurants, Hotels or Gas Stations), and 
//accesing to Forusquare api service to display data about searched places
function getVenues(id) {

    if (locationAllowed == true) {

        $("#list").empty();
        searchClicked = true;
        document.getElementById("result").style.height = "auto";

        var keyWord;
        var radioButton = document.getElementsByName("radius");

        for (var i = 0; i < radioButton.length; i++) {

            if (radioButton[i].checked) {

                var radioValue = radioButton[i].value;
                break;
            }
        }
        switch (id) {

            case "coffee":
                keyWord = "coffee,cafe";
                break;
            case "restaurants":
                keyWord = "food";
                break;
            case "hotel":
                keyWord = "hotel,motel";
                break;
            case "gas":
                keyWord = "gasstation";
                break;
        }
        var url = generateUrl(keyWord);
        $.ajax({
            url: url,
            success: function (result) {

                var venues = result.response.venues;
                console.log(venues);

                for (i in venues) {
                    var venueAddress;
                    var venueId = venues[i].id;
                    var venueName = venues[i].name;
                    var venueDistance = venues[i].location.distance;
                    if (venues[i].location.address == undefined) {
                        venueAddress = "Not available."
                    } else {
                        venueAddress = venues[i].location.address;
                    }

                    var lt = venues[i].location.lat;
                    var ln = venues[i].location.lng;


                    if (venueDistance <= radioValue) {

                        writeElements(venueName, venueAddress, venueDistance, venueId, lt, ln);
                    }

                }
            }
        });
    } else if (locationAllowed == false) {

        alert("In order tu use this service please allow this app tu use your location.Please refresh the page and confirm location.");
        document.getElementById("wraper").style.display = "none";
        return;
    }
}

//Creating algorithm for URL to access Foursquare API service for retriving URL of the venue images, based on venue ID
function getImgUrlById(id) {
    var imageUrl;

    var urlId = "?client_id=PSRFP4DXVPQ0G41Z5NBS4MCXL0D4ZDPZQO33MOZI2XU5MDXG";
    var urlSecret = "&client_secret=FN2WLPVMQRDKSA4RDH3YR2EUQREZAEB0SYW2DYOLKS0C21I5";
    var date = new Date().toISOString().slice(0, 10);
    var vDate = date.replace("-", "").replace("-", "");
    var v = "&v=" + vDate;
    var urlBasePhoto = "https://api.foursquare.com/v2/venues/";
    var urlPhoto = urlBasePhoto + id + "/photos" + urlId + urlSecret + v;

    $.ajax({
        async: false,
        url: urlPhoto,
        success: function (result) {

            if (result.response.photos.count == 0) {

                imageUrl = "images/No_Image_Available.jpg";

            } else {

                var pref = result.response.photos.items[0].prefix;
                var suff = result.response.photos.items[0].suffix;
                var size = "original";

                imageUrl = pref + size + suff;
            }
        }
    })
    return imageUrl;
}

//Generating URL based on the searched key word
function generateUrl(keyWord) {

    var urlBase = "https://api.foursquare.com/v2/venues/search";
    var urlId = "?client_id=PSRFP4DXVPQ0G41Z5NBS4MCXL0D4ZDPZQO33MOZI2XU5MDXG";
    var urlSecret = "&client_secret=FN2WLPVMQRDKSA4RDH3YR2EUQREZAEB0SYW2DYOLKS0C21I5";
    var date = new Date().toISOString().slice(0, 10);
    var vDate = date.replace("-", "").replace("-", "");
    var v = "&v=" + vDate;
    var ll = "&ll=" + lat + "," + lng;
    var limit = "&limit=12";
    var query = "&query=" + keyWord;
    var url = urlBase + urlId + urlSecret + v + ll + limit + query;

    return url;
}

//Constructor function for creating object
function SaveLocations(itemName, itemId, itemLat, itemLng) {
    this.itemName = itemName;
    this.itemId = itemId;
    this.itemLat = itemLat;
    this.itemLng = itemLng
}

//Showing full size image of venue in iframe
function showIframe() {
    var container = document.getElementById("container");
    var imgWrap = document.getElementById("imgWrap");

    var contWidth = container.offsetWidth;
    document.getElementById("iframeDiv").style.display = "block";
    document.getElementById("iframe_id").style.visibility = "visible";
    document.getElementById("close").style.visibility = "visible";
    document.getElementById("iframe_id").style.width = contWidth + "px";
    document.getElementById("imgWrap").style.width = contWidth + "px";
}

function closeIframe() {
    document.getElementById("iframe_id").style.visibility = "hidden";
    document.getElementById("close").style.visibility = "hidden";
}

//Function for dynamic creation of HTML elements
function writeElements(itemName, address, distance, id, lt, ln) {

    var imgUrl = getImgUrlById(id);
    var newLocation = new SaveLocations(itemName, id, lt, ln);
    locations.push(newLocation);

    var listDiv = document.getElementById("list");

    var itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item");
    listDiv.appendChild(itemDiv);

    var mapImg = document.createElement("img");
    mapImg.setAttribute("class", "mapImg");
    mapImg.setAttribute("id", id);
    mapImg.title = "Show location on Map";
    mapImg.setAttribute("src", "images/google-maps.png");
    mapImg.setAttribute("alt", "google map icon");
    itemDiv.appendChild(mapImg);

    mapImg.addEventListener("click", function () {
        createMarker(this.id);
        $('html, body').animate({
            scrollTop: $("#map").offset().top
        }, 1000);
    })

    var nameH2 = document.createElement("h2");
    nameH2.setAttribute("class", "placeName");
    nameH2.innerHTML = itemName;
    itemDiv.appendChild(nameH2);

    var aboutDiv = document.createElement("div");
    aboutDiv.setAttribute("class", "aboutPlace");
    itemDiv.appendChild(aboutDiv);

    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info");
    aboutDiv.appendChild(infoDiv);

    var pAddress = document.createElement("p");
    pAddress.setAttribute("class", "adress");
    pAddress.innerHTML = "Address: " + address;
    infoDiv.appendChild(pAddress);

    var pDistance = document.createElement("p");
    pDistance.setAttribute("class", "distance");
    pDistance.innerHTML = "Distance: " + distance + "m";
    infoDiv.appendChild(pDistance);

    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "placeImg");
    aboutDiv.appendChild(imgDiv);

    var link = document.createElement("a");
    link.setAttribute("onclick", "showIframe()")
    link.setAttribute("href", imgUrl);
    link.setAttribute("target", "imgFrame");
    imgDiv.appendChild(link);

    var placeImage = document.createElement("img");
    placeImage.setAttribute("class", "placeImg");
    placeImage.setAttribute("src", imgUrl);
    placeImage.setAttribute("alt", "Image of place");
    link.appendChild(placeImage);
}

//Creating Google map based on user location
function createMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 13,

    });
    var marker1 = new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng
        },
        map: map,
        animation: google.maps.Animation.DROP,
        title: 'Your location!'

    });

}

//function for dynamic creation of Google Map Markers, based on location of choosen venues
function createMarker(id) {

    for (var i in locations) {

        if (locations[i].itemId == id) {

            var lat2 = locations[i].itemLat;
            var lng2 = locations[i].itemLng;
            var venueTitle = locations[i].itemName;
        }
    }

    var marker2 = new google.maps.Marker({
        position: {
            lat: lat2,
            lng: lng2
        },
        map: map,
        animation: google.maps.Animation.DROP,
        title: venueTitle,
        icon: "images/marker.png"

    });
}

function backToTop() {

    $('html, body').animate({
        scrollTop: $("#main").offset().top
    }, 1000);
}
