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
    }
    //var requestUrl = "https://api.seatgeek.com/2/events?lat=32.7174202&lon=-117.1627728&client_id=MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4&client_secret=85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8";
    var requestUrl = "https://api.yelp.com/v3/businesses/search?text=&location=coronado&term=restaurant";//&clientID=fCDe8r_Udq8P1Zrq3i3iWA&apiKey=xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx"
    //geolocation - https://api.seatgeek.com/2/events?lat=32.7174202&lon=-117.1627728
    // San Diego 32.7174202 -117.1627728
    //console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response) {
        //console.log('response');
        return response.json();
    })
    .then(function (data) {
       for(var i=0; i < data.events.length; i++){
        resultsEl.innerHTML += data[i];
            resultsEl.innerHTML += data.events[i].title + ' will be at ' + data.events[i].venue.name + '<br>';
       }
        console.log(data.events);
    })
  }
searchEvents();

/** YELP\\

* Client ID clientID=fCDe8r_Udq8P1Zrq3i3iWA&apiKey=xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx

 * https://api.yelp.com/v3
 * GET https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972
 * https://api.yelp.com/v3/autocomplete?text=location=san diego&term=restaurant
GET https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972
DETAILS GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco
(REVIEWS GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco/reviews
)
Business Search	/businesses/search	Search for businesses by keyword, category, location, price level, etc.

Business Match	/businesses/matches	Find the Yelp business that matches an exact input location. Use this to match business data from other sources with Yelp businesses.

Business Details	/businesses/{id}	Get rich business data, such as name, address, phone number, photos, Yelp rating, price levels and hours of operation.
 /events/{id}
This endpoint returns the detailed information of a Yelp event. You can get the event ID from /events or /events/featured.  GET https://api.yelp.com/v3/events/{id}



 * SeatGeek ClientID: MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4
 * 
 * 
 *Your app secret is 85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8 - copy now as it cannot be retrieved later.

rest.bandsintown.com/events?

virtserver.swaggerhub.com/JCHARLESBERRY_1/sandiegobands/1.0.0

Google Places API??? {https://developers.google.com/maps/documentation/places/web-service/search}
Yelp API  --- GET https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972

Seatgeek API (includes sporting events) - Margot

GET https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972
GET https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972
DETAILS GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco
(REVIEWS GET https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco/reviews
)
Business Search	/businesses/search	Search for businesses by keyword, category, location, price level, etc.

Business Match	/businesses/matches	Find the Yelp business that matches an exact input location. Use this to match business data from other sources with Yelp businesses.

Business Details	/businesses/{id}	Get rich business data, such as name, address, phone number, photos, Yelp rating, price levels and hours of operation.

/events/{id}
This endpoint returns the detailed information of a Yelp event. You can get the event ID from /events or /events/featured.  GET https://api.yelp.com/v3/events/{id}
*/
