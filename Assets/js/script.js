/* Page elements */
var searchBtnEl = document.getElementById('searchBtn');
var searchPhraseBoxEl = document.getElementById('searchPhraseBox');
var restsRadioEl = document.getElementById('restsRadio');
var barsRadioEl = document.getElementById('barsRadio');
var allEventsRadioEl = document.getElementById('allEventsRadio');
var concertRadioEl = document.getElementById('concert');
var sportsRadioEl = document.getElementById('sports');
var dateDivEl = document.getElementById('dateDiv');

var resultsTable = document.getElementById('results');
var changeResultsDateTimeHeader = document.querySelector('#resultsHours');

var evtRadioEls = document.querySelectorAll('.evtRadio');

// time/date at top of page
function updateTime() {
    var currentTime = moment().format('MMM Do YYYY');
    dateDivEl.textContent = currentTime;
};
setInterval(updateTime, 1000);

restsRadioEl.checked = true;

function searchSeatGeekEvents(){
    changeResultsDateTimeHeader.innerText = 'Date & Time';

    var searchPhrase = searchPhraseBoxEl.value.replace(/ /g, '-');

    // Get checked radio buttons
    for (i = 0; i < evtRadioEls.length; i++){
        if (allEventsRadioEl.checked == true){
            searchPhrase += '&taxonomies.name=sports&taxonomies.name=concert';
        }else if(evtRadioEls[i].checked){
            searchPhrase += '&taxonomies.name=' + evtRadioEls[i].id;
        }

    }//performers.slug=


    var requestUrl = `https://api.seatgeek.com/2/events?q=${searchPhrase}&lat=32.7174202&lon=-117.1627728&client_id=MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4&client_secret=85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8`;
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        
        for(var i=0; i < data.events.length; i++){
            var tableRow = document.createElement('tr');
            var titleTableCol = document.createElement('td');
            titleTableCol.textContent = data.events[i].title;
            var venueTableCol = document.createElement('td');
            venueTableCol.textContent = data.events[i].venue.name;
            var dateTableCol = document.createElement('td');
            var eventDate = moment(data.events[i].datetime_utc).format('lll');
            dateTableCol.textContent = eventDate;
            tableRow.appendChild(titleTableCol);
            tableRow.appendChild(venueTableCol);
            tableRow.appendChild(dateTableCol);
            resultsTable.appendChild(tableRow);
       }
    })
  }

searchBtnEl.addEventListener('click',searchAllEvents);

function searchRestaurantsNearMe(){
    changeResultsDateTimeHeader.innerText = 'Hours';
    var searchPhrase = searchPhraseBoxEl.value.replace(/ /g, '-');
    
        if(restsRadioEl.checked){
            searchPhrase += '&restsRadio';
        }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e1ed986c1msh1ed323ba6ba6ac6p1b75ffjsnc61ea16e78da',
            'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
        }
    }
    
    fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/CA/city/San%20Diego/0', options)
    .then(response => response.json())
    .catch(err => console.error(err))

    .then(function (data) {
        for(var i=0; i < data.restaurants.length; i++){
            
            var tableRow = document.createElement('tr');
            var titleTableCol = document.createElement('td');
            titleTableCol.textContent = data.restaurants[i].restaurantName;
            var venueTableCol = document.createElement('td');
            venueTableCol.textContent = data.restaurants[i].address + ' ' + data.restaurants[i].zipCode;
            
            var dateTableCol = document.createElement('td');
            //var eventDate = moment(data.events[i].datetime_utc).format('lll');

            var restHours = data.restaurants[i].hoursInterval.split('|');
            for(j = 0; j < restHours.length; j++){

                dateTableCol.innerHTML += restHours[j] + "<br>";
            }
            tableRow.appendChild(titleTableCol);
            tableRow.appendChild(venueTableCol);
            tableRow.appendChild(dateTableCol);
            resultsTable.appendChild(tableRow);
            //var eventDate = moment(data.restaurants[i].hoursInterval).format('lll');
            //document.querySelectorAll('#resultsHours ul li')[i].innerHTML = restHours;*/
        }
    })
}

function searchAllEvents(){
    resultsTable.replaceChildren;
    if(allEventsRadioEl.checked){// All events and food/drink
        searchRestaurantsNearMe();
        searchSeatGeekEvents();
        concatEventsAndFood();
    }
    else if(restsRadioEl.checked){
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