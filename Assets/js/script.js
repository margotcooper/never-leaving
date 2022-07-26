/* Page elements */
var searchBtnEl = document.getElementById('searchBtn');
var searchPhraseBoxEl = document.getElementById('searchPhraseBox');
var restsCkboxEl = document.getElementById('restsCkbox');
var barsCkboxEl = document.getElementById('barsCkbox');
var eventsCkboxEl = document.getElementById('eventsCkbox');
var concertsCkboxEl = document.getElementById('concertsCkbox');
var sportsCkboxEl = document.getElementById('sportsCkbox');
var dateDivEl = document.getElementById('dateDiv');
var resultsEl = document.getElementById('results');

searchBtnEl.addEventListener('click',searchEvents);

var evtCkboxEls = document.querySelectorAll('.evtCkbox');

/*restsCkboxEl.addEventListener('change',includeInSearch);
barsCkboxEl.addEventListener('change',includeInSearch);
eventsCkboxEl.addEventListener('change',includeInSearch);
concertsCkboxEl.addEventListener('change',includeInSearch);
sportsCkboxEl.addEventListener('change',includeInSearch);
*/

//resultsEl.addEventListener('click',searchForEvent);

//var searchOptions = [];

function searchEvents(){

    // get search phrase
    var searchPhrase = searchPhraseBoxEl.value;
    
    //second, get checked checkboxes
    for (i=0; i < evtCkboxEls.length; i++){
        if(evtCkboxEls[i].checked){
            //console.log(evtCkboxEls[i].id);
            searchPhrase += '&' + 
    console.log(searchPhrase);

}
    var requestUrl = "https://api.seatgeek.com/2/events?lat=32.7174202&lon=-117.1627728&client_id=MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4&client_secret=85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8";
    //geolocation - https://api.seatgeek.com/2/events?lat=32.7174202&lon=-117.1627728
    // San Diego 32.7174202 -117.1627728
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
       for(var i=0; i < data.events.length; i++){
           resultsEl.innerHTML += data.events[i].title + ' will be at ' + data.events[i].venue.name + '<br>';
       }
        console.log(data.events);
    })
}
searchEvents();

/**
 * SeatGeek ClientID: MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4
 * 
 * 
 *Your app secret is 85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8 - copy now as it cannot be retrieved later.
*/
/*
rest.bandsintown.com/events?
*/
/**
virtserver.swaggerhub.com/JCHARLESBERRY_1/sandiegobands/1.0.0

*/
/**
Google Places API??? {https://developers.google.com/maps/documentation/places/web-service/search}
Yelp API  --- GET https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972

Bandsintown API {https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0} -Margot
Bars API {https://www.barzz.net/api.php} 
Seatgeek API (includes sporting events) - Margot
*/
includes sporting events) - Margot
*/
ncludes sporting events) - Margot
*/
