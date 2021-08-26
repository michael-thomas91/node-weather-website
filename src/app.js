// import modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// create instance of express
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config.
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to be served
app.use(express.static(publicDirPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael Thomas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Michael Thomas'
    })
})

app.get('/help', (req, res) => {
    res.render('help',  {
        helpMessage: 'This page should be helpful...',
        title: 'Help',
        name: 'Michael Thomas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'You must provide a location!'
        })
    }
    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }) 
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }
            res.send({ 
                forecast: forecastData,
                location: location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Thomas',
        fourOhFourMessage: 'Ooof broh, 404. Help article not found.'
    })
})
// 404 page route, this needs to be last 
app.get('*',  (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Thomas',
        fourOhFourMessage: 'Ooof broh, 404. Page not found.'
    })
})

app.listen(port, () => {
    console.log('server listening on port ' + port)
})
