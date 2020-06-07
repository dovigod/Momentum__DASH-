const forma= document.querySelector(".js_todo"), // 할당과정
    inputa = forma.querySelector("input"),
    toDoList = document.querySelector("ul");

const TODOS_LS = 'todos';  // key의 이름은 todos가 될것

let toDosArray = [];


function handleSpanEvent(event){
    event.preventDefault();
    const currentColor = event.target.style.color;
    if(currentColor === "blue")
    {
        event.target.style.color = "";
    }
    else{
        event.target.style.color = "blue";
    }
}


///유용한 툴  == > console.dir(event.target);
function deleteButton(event){
    const btn = event.target
    const li = btn.parentNode;

    toDoList.removeChild(li);

    const cleanedTodos = toDosArray.filter(function(toDo){
        return toDo.id !== parseInt(li.id);       ///toDo.id 는 int형인데 li.id 는 string 이므로 형 맞추기
    });

    toDosArray = cleanedTodos;
    saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDosArray));   ///웹에는 자바스크립트 데이터를 저장 못함 다 스트링으로 바꿈 그래서 스트링 형태로 변환해야해
}

function handleSubmit(event){       //이벤트 핸들러,,,,  'currentvalue'에 내가 입력한 값을 할당후, 함수 호출하여 인자를 줌, 그리고 빈칸으로 만들기
    event.preventDefault();
    const currentvalue= inputa.value;
   
    addToDoList(currentvalue);
    inputa.value ="";
    
}
function addToDoList(text){   ///text의 값은 current value

    const li = document.createElement("li");  //li클래스를 만든다
    const delbtn = document.createElement("button");  //버튼 클래스를 만든다  
    const span = document.createElement("span");
    const newID = toDosArray.length+1;
    const defalutStatus = "no";
    const toDoObj = {
        text : text,
        id : newID,
        isFin: defalutStatus
        
    };

    delbtn.innerText = "❌";  //버튼 값에 x를 
    delbtn.style.background = "none";
    delbtn.style.border = 0;
    li.style.textDecoration = "none";
    delbtn.classList.add("buttonCss");
    span.classList.add("todoSpanCss");
    delbtn.addEventListener("click",deleteButton);


    span.innerText = text;   // span값으로 current val 입력
    li.appendChild(span);  // li클래스의 자식클래스로 span과 버튼을 붙임
    li.appendChild(delbtn);
    li.id = newID;
    toDoList.appendChild(li);  //ul밑에 li를 붙여줌
    toDosArray.push(toDoObj);


    span.addEventListener("click",handleSpanEvent);
    saveToDos();


}
function loadToDo(){    //local storage에 저장형태가 string 형태이므로 다시 오브젝트화 시킬 필요가 있다. 
    const todos = localStorage.getItem(TODOS_LS);   //여기까지 스트링 형태야!  // JSON = javascript object notification 데이터를 전달할때 js가 이용할수 있도록 오브젝트화 하는것
    
    if(todos !== null)
    {
        const parsedToDos = JSON.parse(todos);

        parsedToDos.forEach(function(todoss){
            addToDoList(todoss.text);
        })
     
    }
}
function init(){
    
    loadToDo();
    addEventListener("submit",handleSubmit);
}

init();


