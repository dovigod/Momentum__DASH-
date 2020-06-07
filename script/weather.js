const COORDINATION = "coords";
const API_KEY="b8073670c0f44fc3a0db2f8529e82757";
const WEATHER_BOX = document.querySelector(".js-weather");
const WEATHER = WEATHER_BOX.querySelector(".js-today");


function getWeather(lat,long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`).then(function(data){
        return data.json();
    }).then(function(response){
        //console.log(response);
        const degree = response.main.temp;
        const location = response.name;
        const weatherToday = response.weather[0].main;
      
    
        WEATHER.innerText  = `${degree}ºC, ${location} , ${weatherToday}`;
        
    });

   

    ///기본으로 캘빈 온도라 섭씨로 바꾸기 위해 url에 units = metric  넣기!!!
    /// then 같은 경우, 앞에 데이터가 완전히 불러와지면 실행됨.
    ///data.json 을통해 자바스크립트 오브젝트를 부르는것
    /// data.json시 랜더링 때매 시간이 걸림. 그래서 then을 한번 더 사용하므로써, 자동으로 완료후 출력 요청
}


function saveCords(coordsOBJ){

    
    localStorage.setItem(COORDINATION,JSON.stringify(coordsOBJ));

}



function handleGeoError(position){
    console.log("Cant find position");
}

function handleGeoSuccess(position){
   // console.log(position);
   position.enableHighAccuracy = true;
   console.dir(position); 
   const latitude = position.coords.latitude;
   console.log(latitude);
   
   const longitude = position.coords.longitude;
   const coordsOBJ = {
       latitude,//latitude = latitude,
       longitude//longitude = longitude
   }
   saveCords(coordsOBJ);
   getWeather(latitude,longitude);
   
}

function askForCoords(){
  
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
   
}

function loadCoordinate(){
    const loadedCords = localStorage.getItem(COORDINATION);
    if(loadedCords === null)
    {
         askForCoords();
    }
    else{
        const parsedCords = JSON.parse(loadedCords);
        const parsedLat = parsedCords.latitude;
        const parsedLong = parsedCords.longitude;
        getWeather(parsedLat,parsedLong);
    }
}

function init(){
    loadCoordinate();
}
//b8073670c0f44fc3a0db2f8529e82757 my api key
init();
