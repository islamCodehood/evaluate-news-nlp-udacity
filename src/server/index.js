var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();
const app = express()
app.use(cors())
var https = require('follow-redirects').https;
var fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getCoordinates = async (city) => {
    const url = encodeURI(`http://api.geonames.org/searchJSON?style=full&maxRows=1&name_startsWith=${city}&username=${process.env.GEONAMES_USERNAME}`);
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.geonames[0].lat)
        return {
            lat: json.geonames[0].lat,
            lng: json.geonames[0].lng
        };
    } catch (error) {
        console.log(error)
    }
}

const getWeather = async (lat, lng, daysBeforeTravel) => {
    try {
        const url = encodeURI(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`);
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.data)
            return json.data[0];
        // if (daysBeforeTravel <= 7) {
        //     const url = encodeURI(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`);
        //     const response = await fetch(url);
        //     const json = await response.json();
        //     return {high_temp: json.data[0].high_temp, low_temp: json.data[0].low_temp};

        // } else {
        //     const url = encodeURI(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERBIT_API_KEY}`);
        //     const response = await fetch(url);
        //     const json = await response.json();
        //     console.log(json.data[0].high_temp)

        //     return {high_temp: json.data[0].high_temp, low_temp: json.data[0].low_temp};
        // }
    } catch (error) {
        console.log(error)
    }
    
}

const getCityImage = async (city) => {
    const url = encodeURI(`https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${city}&image_type=photo`);
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.hits[0].webformatURL)

        return json.hits[0].webformatURL;
    } catch (error) {
        console.log(error)
    }
}

app.post('/data',  async (req, res) => {
    const { city, daysBeforeTravel } = req.body;
    const coordinates = await getCoordinates(city)
    const weather = await getWeather(coordinates.lat, coordinates.lng, daysBeforeTravel)
    const image = await getCityImage(city)
    console.log({ image, weather: {highTemp: weather.high_temp, lowTemp : weather.low_temp, description: weather.weather.description} })
    return res.send({ image, weather: {highTemp: weather.high_temp, lowTemp : weather.low_temp, description: weather.weather.description} })
})

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8030, function () {
    console.log('Example app listening on port 8030!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


