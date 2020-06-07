const clockContainer = document.querySelector(".js__clock") , clockTitle = document.querySelector("h1");

function getTime(){
    const getdate= new Date();
    const hour = getdate.getHours();
    const minute = getdate.getMinutes();
    const sec = getdate.getSeconds();



    clockTitle.innerText = `${hour < 10 ? `0${hour}`: `${hour}` }:${minute < 10 ? `0${minute}`: `${minute}`}:${sec <10 ? `0${sec}`:`${sec}`}`
   
}

function init(){
  getTime();
}

setInterval(init,1000);