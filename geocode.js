const request = require('request')
const geocode = (address,callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaGFyc2hndWdsYW5pIiwiYSI6ImNrYzN4OWs0ZjAyYzcyeW51czZ3OTU5NHIifQ.HRmpN4LNnN6NpenBG5hgHw&limit=1'
    request({url,json:true},(error,response) =>{
        if(error) {
            callback('unable to connectg',undefined)
        }
        else if (response.body.features.length ===0 ){
            callback('unable to find , try another location',undefined)
        }
        else {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode