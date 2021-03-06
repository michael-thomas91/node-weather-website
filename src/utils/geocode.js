
const request = require('request')
const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoibWlrZXRob21hczEyMzQiLCJhIjoiY2tzcWZpdDdoMGNpMzJ1bXZmYmNicW11cCJ9.y77Sy-_44C_HqD_siyesuA&limit=1'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to internet!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
