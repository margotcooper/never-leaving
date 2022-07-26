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
            searchPhrase += '&' + evtCkboxEls[i].id;
        }
    }

    console.log(searchPhrase);

}
