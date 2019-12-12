const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const path =require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express
const publicDirectory = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


//Setup Handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Wheater',
        name: 'Luis Alfredo Aguilar Hernandez'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Acerca de',
        name: 'Luis Alfredo Aguilar Hernandez'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'mensaje de ayuda',
        title : 'Help',
        name: 'Luis Alfredo Aguilar Hernandez'
    })
})

app.get('/wheater',(req,res)=>{

    if(!req.query.address){
        console.log('Proporcionar una ubicacion')
        return res.send({
            error:'You must provide an address'
        })
    }else{
        geocode(req.query.address,(error,data)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            forecast(data.latitude, data.longitud, (error, forecastData) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }

                return res.send({
                    address:req.query.address,
                    forecast:forecastData,
                    data
                })

            
              })
        })
    }

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send(
            {
                error:'you must provide a search term'
            }
        )
    }

    console.log(req.query.search)
    res.send({
        producst:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : 'Help not found - 404',
        errorMsg:'Help article not found',
        origin:'Help source',
        name: 'Luis Alfredo Aguilar Hernandez'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : 'Not Found',
        errorMsg:'Page not found',
        origin:'Main source',
        name: 'Luis Alfredo Aguilar Hernandez'
    })
})

app.listen(port,()=>{
    console.log('Server is up op port: '+port)
})

