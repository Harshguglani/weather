const request = require('request')

const forcast = (lat,long,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=4eed92b7d79d71ef79d3f3e3f3d36956&query=" + lat + "," + long + "&units=m"
    //console.log('lat +' + lat) 
    request({url,json: true},(error,response)=>{
        if(error){
            callback("unable to connect",undefined)
        }
        else if(response.body.error){
            callback('unable to find location',undefined)
        }
        else {
            //console.log(response.body.current)
            callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. it feels like "  + response.body.current.feelslike + " degrres out there")
        }
    })
}

module.exports = forcast 