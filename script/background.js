const body = document.querySelector("body");
let IMG_NUMBER = 5;
let InitialNumb = 1;
let paintingNumb=1;


function deleteClass(image){

  //  var target = body.querySelector("bdimage");
    
    
    image.classList.add("fadeimage");
    paintImages(InitialNumb);
    window.setTimeout(function(){remover(image)},3500);
    



}
function remover(image){
   /* let targeta = body.querySelector("img.bdimage");
    */
    const father = image.parentNode;
    father.removeChild(image);
}
function fading(image){
    
    InitialNumb = InitialNumb +1;
    if(InitialNumb > 5)
    {
        InitialNumb =1;
    }
  
    deleteClass(image);
   
    

    

}

function paintImages(numb){

    let image = new Image();
    image.src = `images/${numb}.jpg`;
    
    image.classList.add("bdimage");
    
    body.appendChild(image);
//image.classList.add("fadeImage")
    
    window.setTimeout(function(){ fading(image);},4000);


    

}

function genNumber(){

    let rNumber = Math.floor(Math.random()*(IMG_NUMBER-1)+1);
    return rNumber;
}


function init()
{
    let randomNumber = genNumber();
    paintImages(randomNumber);

}

init();

