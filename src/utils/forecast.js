const request=require('request')

const forectast = (latitude,longitude,callback)=>{

    const url='https://api.darksky.net/forecast/dfc3f30dab6431ce3fb148076d4c29d3/'+latitude+','+longitude+'?lang=es'

    request({
            url,
            json:true},
            (error,{body})=>{
        if(error){
            callback('No se puede conectar con el servicio \n'+error,undefined)
        }else if(body.error){
            callback('ERROR: '+body.error)
        }else{
            callback(undefined,{
                placename : body.daily.data[0].summary,
                temperature : body.currently.temperature,
                Rainchance :  body.currently.precipProbability
                }
            )
        }
    })
}

module.exports=forectast