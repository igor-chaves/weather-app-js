const form = document.querySelector('[data-js="form"]')
const dayNightImg = document.querySelector('[data-js="day-night"]')
const weatherIcon = document.querySelector('[data-js="icon"]')
const cityText = document.querySelector('[data-js="city"]')
const weatherText = document.querySelector('[data-js="weather"]')
const temp = document.querySelector('[data-js="temperature"]')

// API - AccuWeather
const APIKey = "oRQCO0JvEOgqUhZbSyBASGVyKXhAYALr"

const getCityURL = city => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${city}`
const getWeatherUrl = cityKey => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${APIKey}`

form.addEventListener("submit", async e => {
   e.preventDefault()

   const city = e.target.inputCity.value

   // get informations about the city
   const responseFetchCity = await fetch(getCityURL(city))
   const [responseJsonCity] = await responseFetchCity.json()
   const cityKey = responseJsonCity.Key

   // get informations about weather
   const responseFetchWeather = await fetch(getWeatherUrl(cityKey))
   const [responseJsonWeather] = await responseFetchWeather.json()
   const isDay = responseJsonWeather.IsDayTime
   const icon = responseJsonWeather.WeatherIcon
   const weather = responseJsonWeather.WeatherText
   const temperature = responseJsonWeather.Temperature.Metric.Value

   console.log(responseJsonWeather)
   console.log(isDay, icon, weather, temperature)


   isDay ? dayNightImg.src = `./src/day.svg` : dayNightImg.src = `./src/night.svg`
   weatherIcon.src = `./src/icons/${icon}.svg`
   cityText.textContent = responseJsonCity.LocalizedName
   weatherText.textContent = weather
   temp.textContent = `${temperature} C`

   e.target.reset()
})
