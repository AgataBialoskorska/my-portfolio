// ------------------------------------------------- WEATHER API
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = 'JmFwcGlkPTE5Yjc1MWQzOTZmYzA3ZDQxM2QyZjVlZGQzMjMwOGQ2'
const API_UNITS = '&units=metric'

const prepareDOMElements = () => {
	const inputBtn = document.querySelector('.wBtn')
	const cityName = document.querySelector('.cityName')
	const weatherIcon = document.querySelector('.weatherIcon')
	const temperature = document.querySelector('.temperature')
	const humidity = document.querySelector('.humidity')
	const wind = document.querySelector('.wind')
	const tempFeel = document.querySelector('.tempFeel')
	const sunset = document.querySelector('.sunset')
	const description = document.querySelector('.description')
	return {
		inputBtn,
		cityName,
		weatherIcon,
		temperature,
		humidity,
		wind,
		tempFeel,
		sunset,
		description,
	}
}

const getRandomCity = async () => {
	try {
		const res = await axios.get('./forAPI/city.list.json')
		const cities = res.data
		const number = Math.floor(Math.random() * cities.length)
		const randomCity = cities[number].name
		const country = cities[number].country
		return { randomCity, country }
	} catch (error) {
		console.error('Ups, something went wrong:', error)
	}
}

const getWeather = async () => {
	const {
		cityName,
		temperature,
		humidity,
		wind,
		tempFeel,
		sunset,
		description,
	} = prepareDOMElements()
	try {
		const { randomCity, country } = await getRandomCity()
		const URL = API_LINK + randomCity + atob(API_KEY) + API_UNITS
		const res = await axios.get(URL)
		const temp = res.data.main.temp
		const hum = res.data.main.humidity
		const win = res.data.wind.speed
		const temFeel = res.data.main.feels_like
		const sun = res.data.sys.sunset
		const weatherDes = res.data.weather[0].description
		cityName.textContent = `${res.data.name}, ${country}`
		temperature.textContent = Math.floor(temp) + '℃'
		humidity.textContent = hum + '%'
		wind.textContent = win + ' km/h'
		tempFeel.textContent = `${Math.floor(temFeel)}℃`
		sunset.textContent = localeSunset(sun, 'UTC') + ' (UTC)'
		description.textContent = weatherDes
	} catch (error) {
		console.error('Ups, something went wrong:', error)
	}
}

const localeSunset = (sun, timeZone) => {
	return new Date(sun * 1000).toLocaleTimeString('default', {
		timeZone,
		timeStyle: 'short',
	})
}

prepareDOMElements().inputBtn.addEventListener('click', getWeather)

getWeather()
// setInterval(() => {
// 	getWeather()
// }, 30000)

// ------------------------------------------------- DISNEY API

let numberCharacter
let image
let pName
let pFilms
const API_LINK_D = 'https://api.disneyapi.dev/character/'

const getDOMElements = () => {
	image = document.querySelector('.image')
	pName = document.querySelector('.nameOfDisney')
	pFilms = document.querySelector('.disneyFilms')
	return { image, pName, pFilms }
}

const getRandomNum = () => {
	numberCharacter = Math.floor(Math.random() * (7526 - 6 + 1) + 6)
}
const getDisney = () => {
	const URL_D = API_LINK_D + numberCharacter
	//console.log(URL_D);
	axios
		.get(URL_D)
		.then(res => {
			//console.log(res.data.data);
			const charImage = res.data.data.imageUrl
			const charName = res.data.data.name
			const charFilms = res.data.data.films.join(', ')
			const charTvShows = res.data.data.tvShows.join(', ')
			let filmsString = charFilms ? `Films: ${charFilms}<br>` : ''
			let tvShowsString = charTvShows ? `TV Shows: ${charTvShows}<br>` : ''

			if (!charFilms && !charTvShows) {
				pFilms.classList.add('hide')
			} else {
				pFilms.classList.remove('hide')
			}
			image.setAttribute('src', charImage)
			pName.innerHTML = `Name: ${charName}`
			pFilms.innerHTML = `${filmsString}${tvShowsString}`
		})
		.catch(() => {
			const warningD = 'Sorry, URL not found, already looking for another one.'
			console.log(warningD)
		})
}
getDOMElements()
getRandomNum()
getDisney()

setInterval(() => {
	getRandomNum()
	getDisney()
}, 30000)