const express =  require('express')
const path = require('path')
const hbs = require('hbs')
app=express()

const geocode = require('./geocode')
const forcast = require('./forcast')


const viewpath = path.join(__dirname,'/templates/views')
const partialspath = path.join(__dirname,'/templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialspath)

app.get('',(req,res) => {
    
    //res.render('k')
    //res.render('help')
    res.render('index',{
        title: 'know your city temprature by selecting the weather option ',
        name: 'Harsh'
    })
})

app.get('/about',(req,res) =>{
     res.render('about',{
         title : 'About Weather API ',
         name: 'Harsh Guglani'
     })
})

app.get('/help',(req,res) =>{
    geocode(req.query.address,(error,data ={}) => {
        forcast(data.latitude,data.longitude,(error,forcastdata) =>{
            res.render('help',{
                title: 'weather',
                forcast: forcastdata,
                location: data.location,
                address: req.query.address
        })
    })
})

    // res.render('help',{
    //     helptext : 'this is helpfull text',
    //     title: 'help',
    //     name : 'Harsh'
    // })
})

app.get('/weather',(req,res) =>{
    if (!req.query.address){
        return res.render('weather',{
            title : 'Opps: please provide the address in query string. eg- http://localhost:3000/weather?address="LOCATION"'
        })
    }
    else {
        geocode(req.query.address,(error,data ={}) => {
            if (error){
                res.send({error})
            }
            else{
                forcast(data.latitude,data.longitude,(error,forcastdata) =>{
                    if(error){
                        res.send({error})
                    }
                    else{
                        res.render('weather',{
                            title: 'weather',
                            forcast: forcastdata,
                            location: data.location,
                            address: req.query.address
                        })
                        
                    }
                })
            }
        })
    }
})

app.get('*',(req,res) => {
    res.render('404',{
        title :'404',
        name : 'Harsh',
        errorMessage : 'Page not found'
    })
})
console.log('client side ')
app.listen(3000,() => {
    console.log('server running')
})