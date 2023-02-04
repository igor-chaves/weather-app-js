const form = document.querySelector('[data-js="form"]')
const dayNightImg = document.querySelector('[data-js="day-night"]')
const weatherIcon = document.querySelector('[data-js="icon"]')
const cityText = document.querySelector('[data-js="city"]')
const weatherText = document.querySelector('[data-js="weather"]')
const temp = document.querySelector('[data-js="temperature"]')

// API - AccuWeather
const APIKey = "m5IgirSuNBEeyyczEJ8KmokldIX8Uu8M"

const getCityURL = city => `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${city}`
const getWeatherUrl = cityKey => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${APIKey}`


getCityInfos = async city => {
   const responseFetchCity = await fetch(getCityURL(city))
   const [responseJsonCity] = await responseFetchCity.json()
   const cityKey = responseJsonCity.Key
   const cityName = responseJsonCity.LocalizedName
   return [cityKey, cityName]
}

insertInfosIntoDOM = async (cityKey, cityName) => {
   // get informations about weather
   const responseFetchWeather = await fetch(getWeatherUrl(cityKey))
   const [responseJsonWeather] = await responseFetchWeather.json()
   
   // insert informations into DOM
   const isDay = responseJsonWeather.IsDayTime
   const icon = responseJsonWeather.WeatherIcon
   const weather = responseJsonWeather.WeatherText
   const temperature = responseJsonWeather.Temperature.Metric.Value
   
   isDay ? dayNightImg.src = `./src/day.svg` : dayNightImg.src = `./src/night.svg`
   weatherIcon.src = `./src/icons/${icon}.svg`
   cityText.textContent = cityName
   weatherText.textContent = weather
   temp.textContent = `${temperature} C`
}

form.addEventListener("submit", async e => {
   e.preventDefault()

   const city = e.target.inputCity.value
   const [cityKey, cityName] = await getCityInfos(city)

   insertInfosIntoDOM(cityKey, cityName)

   e.target.reset()
})
