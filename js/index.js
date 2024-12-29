let api = "1a0d5b370f8c4962a1e184427242612";
let search = document.getElementById("search");
let input = document.getElementById("input");
let weatherInformayion = document.getElementById("weatherInformayion");
let hourWheathr = document.getElementById("hourWeather")
let WeatherDays = document.getElementById("WeatherDays");




function weatherData(city) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=1a0d5b370f8c4962a1e184427242612&q=${city}&days=4&aqi=no&alerts=no`;

    fetch(url)
        .then((response) => {
            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            return response.json();
        })
        .then((data) => {
            let weatherHtml = `
        <div class="border-bottom border-info d-flex justify-content-between align-items-center">
          <p id="day">${new Date(data.location.localtime).toLocaleDateString("en-US", { weekday: "long" })}</p>
          <p id="date">${new Date(data.location.localtime).toLocaleDateString()}</p>
        </div>
        
          <h1 class="mt-3">${data.location.name}</h1>
          <h5 class="mt-2 fs-5">${data.location.region}</h5>
          <p class="fs-1 mt-2">${data.current.temp_c}°C<img src="https:${data.current.condition.icon}" alt="Weather Icon"></p>
          <p class="fs-5 text-info" id="Weather">${data.current.condition.text}</p>
          <p class="fs-5" id="humidity">Humidity: ${data.current.humidity}%</p>
          <p class="fs-5" id="windSpeed">Wind Speed: ${data.current.wind_kph} <i class="fa-solid fa-wind"></i> km/h</p>
        
      `;
            weatherInformayion.innerHTML = weatherHtml;







            let hourlyHtml = data.forecast.forecastday[0].hour.slice(0, 12).map((hour, index) => `
            <div class="swiper-slide text-center text-light">
                <p class="mt-3"><img src="https:${hour.condition.icon}" alt="Weather Icon" class="img-fluid"></p>
                <p class="fw-bold fs-5">${hour.time.split(" ")[1]}</p>
                <p class="text-info fs-4">${hour.temp_c}°C</p>
                <p class="fs-5" id="humidity"><i class="fa-solid fa-water"></i> ${hour.humidity}%</p>
                <p class="text-warning"><i class="fa-solid fa-wind"></i> ${hour.wind_kph} km/h </p>
            </div>
        `).join("");

            hourWheathr.innerHTML = hourlyHtml;



            let futcherWeather = data.forecast.forecastday.slice(1).map((day, index) => `
            <div class="col-12 col-md-4 ">
                <div class=" bg-secondary text-light card mt-5 shadow-lg border-info border-2 rounded-3">
                    <div class="fs-5  card-header border-bottom border-info border-2 text-center" id="date${index + 1}">
                        ${new Date(day.date).toLocaleDateString()}
                    </div>
                    <div class="card-body ">
                        <div id="temp${index + 1}" class="temperature-icon d-flex flex-column align-items-center">
                            <img src="https:${day.day.condition.icon}" alt="Weather Icon">
                            <p class="fw-bold fs-2 text-info">${day.day.avgtemp_c}°C</p>
                        </div>
                        <div id="conditions${index + 1}" class="conditions text-center">
                            <p class="fw-bold">${day.day.condition.text}</p>
                            <p class="fs-5 text-warning fw-bold"><i class="fa-solid fa-wind"></i> ${day.day.maxwind_kph} kph</p>
                            <p class="fw-bold">Humidity: ${day.day.avghumidity}%</p>
                        </div>
                    </div>
                </div>
            </div>
            `).join("");

            WeatherDays.innerHTML = futcherWeather;



        })

}


weatherData("Cairo");

search.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = input.value.trim();


    if (!city.match(/^[a-zA-Z\s]+$/)) {
        alert("Please enter a valid city name.");
        return;
    }

    if (city) {
        weatherData(city);
        input.value = "";
    } else {
        alert("Please enter a city name.");
    }
});




var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});