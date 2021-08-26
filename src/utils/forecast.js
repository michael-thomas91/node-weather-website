const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fd1796cf01ada41b585695f34fb62783&query=' + latitude + ',' + longitude +'&units=f'

    request({ url, json: true }, (error, { body }) =>{
        if (error) {
            callback('Unable to connect to internet!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. Humidity is ${body.current.humidity}% and there is a ${body.current.precip}% chance of rain.`,)
        }
    })
}

module.exports = forecast