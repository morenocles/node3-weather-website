const request=require('request')

const geocode=(address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibW9yZW5vY2xlcyIsImEiOiJjangzaWdiN3YwMXp1NDNxa3I3cWpsdHp1In0.BRljSvagUVeJGtZcccngZQ&limit=1'

    request({
        url,
        json:true
    },(error,{body})=>{
        if(error){
            callback('No se puede conectar con el servicio de mapas box',undefined)
        }else if(body.features.length === 0){
            callback('No se encontraron resultados con el termino proporcionado ')
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitud: body.features[0].center[0],
                location: body.features[0].place_name           
            })
        }
    })
}

module.exports=geocode