let btn = document.getElementById('search-btn')

btn.addEventListener('click', fetchWeather)

function handleKeyUp(event) {
  // Проверяем, была ли отпущена клавиша пробела
  if (event.keyCode === 13) {
      // Вызываем событие клика на кнопке
      btn.click();
  }
}

// Добавляем слушатель событий keyup к документу
document.addEventListener('keyup', handleKeyUp);

function fetchWeather () {
    const cityName = document.getElementById('city-input').value;
    const API = '5ddf709696587fc2fd10ef236e914abe'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API}&units=metric&lang=en`
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('No Response From Network'+response.statusText)
        }
        return response.json();
    })
    .then(data =>{
        displayShow(data)
    })
    .catch(error=>{
        console.log('Network Problems'+error)
        document.getElementById('weather-info').innerHTML='<p>404</p>'
    })

}
const displayShow = (data)=>{
    const weatherInfo = document.getElementById('weather-info');
    let cloudy = './cloudy.png'
    let sunny = './sunny.png'
    let mist = './mist.png'
    let description=''
    switch(data.weather[0].description) {
      case 'scattered clouds':
            description=cloudy
            break;
      case 'clear sky':
            description = sunny;
            break;
      case 'broken clouds':
            description = cloudy;
            break;
      case 'mist':
            description = mist;
            break;
      case 'few clouds':
            description = cloudy;
            break;
      case 'overcast clouds':
            description = cloudy;
            break;
      default:
              description = ''; // Handle unknown weather conditions
              break;
    }
    weatherInfo.innerHTML=`
    <div class="card" style="width: 18rem;">
  <img src="${description}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
    <p class="card-text">${data.weather[0].description}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Temperature: ${data.main.temp} °C</li>
    <li class="list-group-item">Feels like: ${data.main.feels_like} °C</li>
    <li class="list-group-item">Wind's speed: ${data.wind.speed} mph</li>
    <li class="list-group-item">Latitude: ${data.coord.lat}</li>
    <li class="list-group-item">Longitude: ${data.coord.lon}</li>

   
  </ul>
  <div class="card-body">
    <a href="#" class="card-link">More</a>
  </div>
</div>
    `
}