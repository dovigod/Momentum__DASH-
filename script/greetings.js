/// this file is about overall input/ ouput of greeting section

//divide & conquer Method

const form = document.querySelector(".js__form"),  //default:: display none
       input = form.querySelector("input"), //default:: display none
       greeting = document.querySelector(".js__greetings"); //default:: display none

       //일단 변수 할당
const USER_LS = "currentUser",
    SHOWING_CN="showing";  
//  
function saveName(text){  //  function for saving data in localstorage
    localStorage.setItem(USER_LS,text);
}


function paintGreeting(text){    // text section for greetings
    form.classList.remove(SHOWING_CN);
    greeting.innerHTML = `Hello! ${text}`;    
    greeting.classList.add(SHOWING_CN);
    
    

}

function addSubmit(event){   // gets the input val then calls text section
  event.preventDefault();  // 입력시 발생한 이벤트는 버블같이 상위 도큐멘트 까지 올라가서 새로고침 이벤트를 수행하는데 이걸 방지
    const currentValue = input.value;

    paintGreeting(currentValue);   //'5'
    saveName(currentValue);    //'5'

}

function askForName(){      // section for displaying input form
    form.classList.add(SHOWING_CN);
    form.addEventListener('submit',addSubmit);   //'4'
}

function loadName(){      // '2'
    const currentName = localStorage.getItem(USER_LS);
    if(currentName ===null){
        askForName();    //'3'

    }else{
        paintGreeting(currentName);   //'3'
    }

}


function init(){     /// '1'
    loadName();  
}

init();

