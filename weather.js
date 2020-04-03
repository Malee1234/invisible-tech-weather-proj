
const locations=["London","Paris","New York"];
const  postalCode=["GB","FR","USA"];
const apikey="82310ae4dc0ba0f135f3f3aaf1d36672";
function weatherBalloon( cityName ) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + apikey)  
  .then(function(resp) {
     return resp.json() 
    }) // Convert data to json
  .then(function(data) {
    
    drawWeather(data);
  })
  .catch(function() {
    // catch any errors
  });
}

window.onload = function() {
  // weatherBalloon( 'London' );
  const index=0;
  locations.forEach(myFunction); 
  function myFunction(item, index) 
  { 

      console.log(item); 
      weatherBalloon(item);
  }
}

function drawWeather( d ) {
	const celcius = Math.round(parseFloat(d.main.temp)-273.15);
	const fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  const unix_timestamp=d.dt;  //getting timezone of city
  const formattedTime = calcTime(d.name,d.timezone/3600);
  
  /** This block is only to display  weather of last city in the array */
  document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('location').innerHTML = d.name;
  document.getElementById('time').innerHTML =formattedTime; 
  /** */
  /**All the cities weather will be shown in console */
  console.log(d.name+','+d.weather[0].description+','+celcius + '°C ,'+formattedTime);
  
}

function calcTime(city, offset) {
  const dtc = new Date();
  const utc = dtc.getTime() + (dtc.getTimezoneOffset() * 60000);
  const newdate = new Date(utc + (3600000*offset));
  return newdate.toLocaleString();
}