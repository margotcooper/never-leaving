/* Page elements */
var searchBtnEl = document.getElementById('searchBtn');
var searchPhraseBoxEl = document.getElementById('searchPhraseBox');
var restsRadioEl = document.getElementById('restsRadio');
var barsRadioEl = document.getElementById('barsRadio');
var allEventsRadioEl = document.getElementById('allEventsRadio');
var concertRadioEl = document.getElementById('concert');
var sportsRadioEl = document.getElementById('sports');
var dateDivEl = document.getElementById('dateDiv');
var resultsEl = document.getElementById('results');
var changeResultsDateTimeHeader = document.querySelector('#resultsHours h2');

var evtRadioEls = document.querySelectorAll('.evtRadio');

// time/date at top of page
function updateTime() {
    var currentTime = moment().format('MMM Do YYYY');
    //var currentMonth = moment().format("MMMM");
    dateDivEl.textContent = currentTime;
    //currentMonthEl.textContent = currentMonth;
};
setInterval(updateTime, 1000);

restsRadioEl.checked = true;

function searchSeatGeekEvents(){
    changeResultsDateTimeHeader.innerText = 'Date & Time';

    var searchPhrase = searchPhraseBoxEl.value.replace(/ /g, '-');

    // Get checked radio buttons
    for (i = 0; i < evtRadioEls.length; i++){
        if(evtRadioEls[i].checked){
            searchPhrase += '&taxonomies.name=' + evtRadioEls[i].id;
        }
    }//performers.slug=


    var requestUrl = `https://api.seatgeek.com/2/events?q=${searchPhrase}&lat=32.7174202&lon=-117.1627728&client_id=MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4&client_secret=85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8`;
    //console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       //console.log(data.events.length);
       for(var i=0; i < data.events.length; i++){
        console.log(data.events[i]);
        document.querySelectorAll('#resultsNames ul li')[i].innerHTML = data.events[i].title;
        document.querySelectorAll('#resultsAreas ul li')[i].innerHTML = data.events[i].venue.name;
        var eventDate = moment(data.events[i].datetime_utc).format('lll');
        document.querySelectorAll('#resultsHours ul li')[i].innerHTML = eventDate;
       }
    })
  }

searchBtnEl.addEventListener('click',searchAllEvents);//searchSeatGeekEventssearchRestaurantsNearMe

function searchRestaurantsNearMe(){
    changeResultsDateTimeHeader.innerText = 'Hours';
    var searchPhrase = searchPhraseBoxEl.value.replace(/ /g, '-');
    
        if(restsRadioEl.checked){
            //console.log(restsRadioEls[i].id);
            searchPhrase += '&restsRadio';
        }

    //fetch(`https://travel-advisor.p.rapidapi.com/locations/v2/search?query=${searchPhrase}&lang=en_US`, options)//query=${searchPhrase} query=eiffel%20tower
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e1ed986c1msh1ed323ba6ba6ac6p1b75ffjsnc61ea16e78da',
            'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
        }
    }
    
    fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/CA/city/San%20Diego/0?q=fuddruckers', options)
    .then(response => response.json())
    //.then(response => console.log(response))
    .catch(err => console.error(err))

    .then(function (data) {
        //console.log(data.restaurants.length);
        for(var i=0; i < data.restaurants.length; i++){
            //console.log(data.restaurants[i]);
            document.querySelectorAll('#resultsNames ul li')[i].innerHTML = data.restaurants[i].restaurantName;
            document.querySelectorAll('#resultsAreas ul li')[i].innerHTML = data.restaurants[i].address + data.restaurants[i].zipCode;
            restHours = data.restaurants[i].hoursInterval.split('|');
            //console.log(restHours.length);
            for(j = 0; j <= restHours.length; j++){
                document.querySelectorAll('#resultsHours ul li')[j].innerHTML += restHours[j] + "<br>";
            }
            //var eventDate = moment(data.restaurants[i].hoursInterval).format('lll');
            //document.querySelectorAll('#resultsHours ul li')[i].innerHTML = restHours;*/
        }
    })
}

function searchAllEvents(){
    for(var i=0; i < 10; i++){
        document.querySelectorAll('#resultsNames ul li')[i].innerHTML = '';
        document.querySelectorAll('#resultsAreas ul li')[i].innerHTML = '';
        document.querySelectorAll('#resultsHours ul li')[i].innerHTML = '';
    }
    if(allEventsRadioEl.checked){// All events and food/drink
        searchRestaurantsNearMe();
        searchSeatGeekEvents();
        concatEventsAndFood();
    }
    else if(restsRadioEl.checked){// ||barsRadioEl.clicked
        searchRestaurantsNearMe();
    }
    else if(concertRadioEl.checked || sportsRadioEl.checked){
        searchSeatGeekEvents();
    }else{
        console.log('Loading default events');
        searchSeatGeekEvents();
    }
}
function concatEventsAndFood(){
    
}