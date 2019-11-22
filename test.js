let flyFrom = null;
let flyTo = null;
let fromDate = null;
let toDate = null;
let city = null;

const options = {

    headers: new Headers({
        "user-key": "4d1fd27573b6d91183797cc18f880b5e"
    })
};

function nextPage(){
    $('.locEnter').on('click', function(e){
        flyFrom = $('input[class="search"]').val();
        flyFrom = flyFrom.toUpperCase();
        $('.homePage').hide();
        $('.parameterPage').show();
    });
}

function getParams(){
    $('.params').submit(function(e){
       event.preventDefault();
       flyTo = $('.dest').val();
       flyTo = flyTo.toUpperCase();
       fromDate = $('.from').val();
       toDate = $('.to').val();
       city = $('.city').val();
       $('.parameterPage').hide();
       flightFetcher();
       restaurantFetch(city);
       
          
    })

}


function genericFetch(url, callback){

    fetch(url)
      .then( response => {
        if ( response.ok ){
          return response.json();
        }
  
        throw Error( response.statusText );
      })
      .then( responseJSON => {
        callback( responseJSON );
      });
  
  }

function genericFetchOptions(url, callback){
    const options = {

        headers: new Headers({
            "user-key": "4d1fd27573b6d91183797cc18f880b5e"
        })
    };

    fetch(url,options)
      .then( response => {
        if ( response.ok ){
          return response.json();
        }
  
        throw Error( response.statusText );
      })
      .then( responseJSON => {
        callback( responseJSON );
      });
  
  }

function generateFlightURL(){
    let url = `https://api.skypicker.com/flights?fly_from=city:${flyFrom}&fly_to=city:${flyTo}&partner=picky&curr=USD&currency=USD&date_from=${fromDate}&date_to=${toDate}&conversion=USD&partner_market=US&limit=5`
    return url
}

function displayFlightResults(responseJson){
    for(let i = 0; i < responseJson.data.length; i ++){
        $('.test').hide();
        $('.resultsPage').show();
        $('.resultsPage').find('.flightResults').append(`<a target="blank" href=${responseJson.data[i].deep_link}> ${responseJson.data[i].flyFrom}=>${responseJson.data[i].flyTo} </a>`)
    }
}

  
function flightFetcher(){
      let url = generateFlightURL();
      
      genericFetch(url, displayFlightResults)
  }


function restaurantCityCallback(responseJson){
    console.log('id')
    let id = responseJson.location_suggestions[0].city_id
    
    let url = (`https://developers.zomato.com/api/v2.1/search?entity_id=${id}&entity_type=city&q=food&count=5,options`)

    genericFetchOptions(url, displayRestaurantResults)
}

function displayRestaurantResults(responseJson){
    for(let i = 0; i < 5; i ++){
        console.log(responseJson.restaurants[i])
        $('.resultsPage').find('.restaurantResults').append(`<a target= "blank" href=${responseJson.restaurants[i].restaurant.url}> ${responseJson.restaurants[i].restaurant.name} rating - ${responseJson.restaurants[i].restaurant.user_rating['aggregate_rating']}</a>`)
    }
}

function restaurantFetch(city){
    

    let url = (`https://developers.zomato.com/api/v2.1/locations?query=${city}`)
    

    genericFetchOptions(url, restaurantCityCallback )
}

function domReady(){
    $(nextPage);
    $(getParams);   
}

$(domReady);





