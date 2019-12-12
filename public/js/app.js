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

wehaterform.addEventListener('submit',(e)=>{

    e.preventDefault()

    mesaage.textContent='Loading ...'
    wheaterP.textContent=''
    temperature.textContent=''

    const location= search.value

    fetch('/wheater?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                mesaage.textContent=''
                error.textContent=data.error
            }else{
                console.log(data)
                error.textContent=''
                mesaage.textContent='Ciudad: '+data.data.location
                wheaterP.textContent='Pronostico: '+data.forecast.placename
                temperature.textContent='Temperatura: '+data.forecast.temperature
            }
        })
    })

   
})