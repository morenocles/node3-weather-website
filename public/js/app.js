//console.log('Client side javascript file is loaded')

/*
fetch('http://puzzle.mead.io/puzzle').then((reponse)=>{
    reponse.json().then((data)=>{
        console.log(data)
    })
})
*/

const wehaterform= document.querySelector('form')
const search= document.querySelector('input')
const error=document.querySelector('#errroMsg')
const mesaage=document.querySelector('#message')
const wheaterP=document.querySelector('#weather')
const temperature=document.querySelector('#temperature')
const weatherTomorrow=document.querySelector('#tomorrowWeather')

wehaterform.addEventListener('submit',(e)=>{

    e.preventDefault()

    mesaage.textContent='Loading ...'
    wheaterP.textContent=''
    temperature.textContent=''
    weatherTomorrow.textContent=''

    const location= search.value

    fetch('/wheater?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mesaage.textContent=''
                error.textContent=data.error
            }else{
                console.log(data)
                error.textContent=''
                mesaage.innerHTML='<b>Ciudad: </b>'+data.data.location
                wheaterP.innerHTML='<b>Pronostico Actual: </b>'+data.forecast.placename
                temperature.innerHTML='<b>Temperatura: </b>'+data.forecast.temperature
                weatherTomorrow.innerHTML='<b>Pronostico mañana: </b>'+data.forecast.weatherTomorrow
            }
        })
    })

   
})