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

/*restsRadioEl.addEventListener('change',includeInSearch);
barsRadioEl.addEventListener('change',includeInSearch);
eventsRadioEl.addEventListener('change',includeInSearch);
concertsRadioEl.addEventListener('change',includeInSearch);
sportsRadioEl.addEventListener('change',includeInSearch);
*/
//resultsEl.addEventListener('click',searchForEvent);

//var searchOptions = [];

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

    //console.log(searchPhrase);
    // const options = {
    //     /*method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //         //'Content-Type': 'application/x-www-form-urlencoded',
    //         'X-RapidAPI-Key': '68a3d9693emsh0f1020f9f4d7360p19256bjsnec143679533f',
    //         'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    //     },
    //     body:
    //         '{"query":"chiang mai","updateToken":""}'
        
    //     //mode: 'no-cors'*/
    // };
    
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
            console.log(data.restaurants[i]);
            document.querySelectorAll('#resultsNames ul li')[i].innerHTML = data.restaurants[i].restaurantName;
            document.querySelectorAll('#resultsAreas ul li')[i].innerHTML = data.restaurants[i].address + data.restaurants[i].zipCode;
            //var eventDate = moment(data.restaurants[i].hoursInterval).format('lll');
            document.querySelectorAll('#resultsHours ul li')[i].innerHTML = data.restaurants[i].hoursInterval;
        }
    })
}
//concertsRadioEl
//sportsRadioEl
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




//searchRestaurantsAndBars();

/*console.log(requestUrl);
            searchPhrase += '&' + 
            console.log(searchPhrase);
        }
    }
    //var requestUrl = "https://api.seatgeek.com/2/events?lat=32.7174202&lon=-117.1627728&client_id=MjgwNTI3ODN8MTY1ODgwNDk2Ny40MzUwODQ4&client_secret=85b20bc2aa3ec76141297b33f744b07b992ea1cfdcd7fabbc802e2057bae02b8";
    //var requestUrl = URL(string:"https://api.yelp.com/v3/businesses/search?text=&location=coronado&term=restaurant");
    //&clientID=fCDe8r_Udq8P1Zrq3i3iWA
    //&apiKey=xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx"
    // Authorization HTTP header value as Bearer API_KEY
    //"Authorization: Bearer <YOUR API KEY>"
    //geolocation - https://api.seatgeek.com/2/events?lat=32.7174202&lon=-117.1627728
    // San Diego 32.7174202 -117.1627728
    //console.log(requestUrl);
    //let apiKey = "your_api_key"
    //var url = URL(string: "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972");
    //var request = URLRequest(url: url);
    //var requestUrl = "https://api.yelp.com/v3/businesses/search?location=coronado";
    //var request = URLRequest(requestUrl, requestUrl)
    //request.addValue("Bearer \xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx", forHTTPHeaderField: "Authorization");
    //const data = {text: "restaurant"};
    /*fetch(requestUrl)/*, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx',
            'Accept': 'application/json, text/plain, /'
=======
    var requestUrl = "https://api.yelp.com/v3/businesses/search?location=coronado";
    //var request = URLRequest(requestUrl, requestUrl)
    //request.addValue("Bearer \xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx", forHTTPHeaderField: "Authorization");
    //const data = {text: "restaurant"};
    fetch(requestUrl, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer xPeUTskMuMC-scLgkWv4DwxwPfi9f9jiSlKeVQoLIoLYLFF_FLJ8nIhu19ChnP9fSjDnh_tnLQhHpfZpvWKhD6bNmsNLA4Bk_Q-_47BOI7gRcB73AO7g_YR5NLfgYnYx',
            //'Accept': 'application/json, text/plain, */
            //'Access-Control-Allow-Origin': 'http://localhost',
            //'Content-Type': 'application/x-www-form-urlencoded'
            //'Content-Type': 'application/json;charset=utf-8',
            //'Cache-Control': 'private'
        //},
        //body: JSON.stringify(data),
        //mode: 'no-cors',
        //cache: 'default',

    //}

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
    })
    .then(function (response) {
        console.log(response);
        return response => JSON();
    })
    .then(function (data) {
       for(var i=0; i < data.length; i++){
        console.log(data[i]);
        resultsEl.innerHTML += data[i];
            resultsEl.innerHTML += 'test completed';//data.events[i].title + ' will be at ' + data.events[i].venue.name + '<br>';
       }
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












// let yelpAPI = require('yelp-api');

// // Create a new yelpAPI object with your API key
// let apiKey = 'YOUR_API_KEY';
// let yelp = new yelpAPI(apiKey);

// // Set any parameters, if applicable (see API documentation for allowed params)
// let params = [{ location: 'San Diego' , category: 'restaurant'}];

// // Call the endpoint
// yelp.query('businesses/search', params)
// .then(data => {
//   // Success
//   console.log(data);
// })
// .catch(err => {
//   // Failure
//   console.log(err);
// });