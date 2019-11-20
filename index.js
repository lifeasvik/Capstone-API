
let flyFrom = null;
let flyTo = null;
let fromDate = null;
let toDate = null;
let limit = 5;

function nextPage(){
    $('.locEnter').on('click', function(e){
        flyFrom = $('input[class="search"]').val();
        $('.homePage').hide();
        $('.parameterPage').show();
    });
}

function getParams(){
    $('.params').submit(function(e){
       event.preventDefault();
       flyTo = $('.dest').val();
       fromDate = $('.from').val();
       toDate = $('.to').val();
       $('.parameterPage').hide();
       $('.resultsPage').show();
       generateFlights();
        
    })

}

function generateFlights(){
    let url = generateURL();
    fetch(`${url}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    
}

function test(){
    $('.test').on('click',function(e){
        event.preventDefault();
        generateFlights();
    })
}

function displayResults(responseJson){
    for(let i = 0; i < responseJson.data.length; i ++){
        $('.test').hide();
        $('.resultsPage').append(`<p>${responseJson.data[i].flyFrom}=>${responseJson.data[i].flyTo}<a target="blank" href=${responseJson.data[i].deep_link}> here! </a></p>`)
    }
}

function generateURL(){
    let url = `https://api.skypicker.com/flights?fly_from=city:${flyFrom}&fly_to=city:${flyTo}&partner=picky&currency=USD&date_from=${fromDate}&date_to=${toDate}&conversion=USD&partner_market=US&limit=5`
    return url
}










function domReady(){
    $(nextPage);
    $(getParams);
    $(test);

}

$(domReady);