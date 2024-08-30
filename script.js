const main = document.querySelector("main");
const header = document.querySelector("header");
let elmnt = null;
let dragged = null;
let amountElements = 2;
let classDrag = "element";
let positions = null;
let newX = null;
let newY = null;
let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
let draggedElement = null;
let colors = ["red","blue"];
let  userText = document.querySelector("#userText");
let cards = null;
let selecionados = [];
let keyWordsSize = ["preencher tudo na vertical","preencher tudo na horizontal","vertical","preencher","esticar","aumentar para baixo","aumentar para cima", "topo","baixo"];
let keyWordsStyle = ["mudar o fundo","colocar bordar","colocar sombreado"];
let keyWordsColor = ["preto","azul","amarelo","rosa","roxo","vermelho","laranja"];
let cout = 1;
let randomColor = [1,2,3];
let color = [0, 0, 0];
let found = null;

function pickRandomColor(){
    for(let i = 0; i < 3; i++){
        let choiceRandom = Math.floor(Math.random()*randomColor.length);
        let index = randomColor.splice(choiceRandom,1);
        console.log(index-1);
        color[index-1] = Math.floor(Math.random()*(71)+30);
    }
    randomColor = [1,2,3]
    console.log(color);
}

function returnColor(color){
    switch(color){
        case "preto" || "preta":
            return "black"; 
        case "vermelho" || "vermelha":
            return "red";
        case "amarelo":
            return "yellow";
        case "rosa":
            return "pink";
        case "roxo":
            return "purple";
        case "laranja":
            return "orange";
        case "azul":
            return "blue";
    }
}

function returnSize(size){
    switch(size){
        case "preencher tudo na vertical":
            return ["height","100%"];
        case "preencher tudo na horizontal":
            return ["width","100%"];
        case "topo":
            return ["top",0];
        case "baixo":
            return ["bottom","0px"];
        
    }
}

// document.addEventListener('mousedown', function(event){
//     console.log(event.target.classList[0]);
//     if(event.target.classList[0] === "card") event.target.onmousedown = dragMouseDown;
// })

// function closeDragElement() {
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }

// function elementDrag(e, pos1,pos2,pos3,pos4) {
//     e = e || window.event;
//     e.preventDefault();
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     e.target.style.top = (e.target.offsetTop - pos2) + "px";
//     e.target.style.left = (e.target.offsetLeft - pos1) + "px";
//   }



// function dragMouseDown(e) {
//     let pos1 = pos2 = pos3 = pos4 = 0;
//     e = e || window.event;
//     e.preventDefault();
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = function(){
//         closeDragElement(e);
//     };
//     document.onmousemove = function(){
//         elementDrag(e,pos1,pos2,pos3,pos4);
//     }
//   }



function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // Calcula a nova posição
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Define a nova posição do elemento arrastado
    if (draggedElement) {
        draggedElement.style.top = (draggedElement.offsetTop - pos2) + "px";
        draggedElement.style.left = (draggedElement.offsetLeft - pos1) + "px";
    }
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Armazena o elemento que está sendo arrastado
    draggedElement = e.target;
    // Armazena a posição inicial do cursor
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
}

function createDiv(){
    pickRandomColor();
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.innerHTML = `${cout}`;
    div.classList.add("card");
    div.classList.add(`${classDrag}${cout}`);
    div.onmousedown = dragMouseDown;
    elmnt = div;
    main.appendChild(div);
    div.appendChild(p);
    p.classList.add("numeration");
    div.style.backgroundColor = `rgb(${color[0]},${color[1]}, ${color[2]})`;
    cards = document.querySelectorAll(".card");
    cout++;
}

function removeClassCard(){
    for(let card of cards){
        let cardNumber = Number(card.classList[1].slice(7,card.classList[1].length));
        let id = new RegExp(String.raw`ID=${cardNumber}\b`,'i');
        console.log(userText.value.match(id));
        if(!userText.value.match(id)){
            if(card.childNodes[0].classList.contains("foundedNumber")) card.childNodes[0].classList.remove("foundedNumber");
        }
    }
}

function userInput(){
    let regEx = /ID=\w+/ig;
    found = userText.value.match(regEx);
    console.log(found);
    if(found){
        for(let founded of found){
            if(Number(founded[founded.length-1])){
                let divNumber = Number(founded.slice(3,founded.length));
                console.log(divNumber);
                
                for(let card of cards){
                    let cardNumber = Number(card.classList[1].slice(7,card.classList[1].length));
                    if(cardNumber === divNumber){
                        card.childNodes[0].classList.add("foundedNumber");
                        if(!selecionados.includes(card.classList[1])) selecionados.push(card.classList[1]);
                    }else{
                        removeClassCard();
                    }
                }
            }
        }
    }else{
        removeClassCard();
    }
}



userText.addEventListener("keypress", (e) => {
    if(e.code === "Enter"){
        let newColor = null;
        let newSize = null;
        for(let color of keyWordsColor){
            let regExColor = new RegExp(String.raw`${color}`,"i");
            let choiceColor = userText.value.match(regExColor);
            if(choiceColor){
                console.log(found);
                newColor = returnColor(color);
                break;
            }
        }
        for(let size of keyWordsSize){
            let regExSize = new RegExp(String.raw`${size}`,"i");
            let choiceSize = userText.value.match(regExSize);
            if(choiceSize){
                newSize = returnSize(size);
                break;
            }
        }
        for(let selecionado of selecionados){
            let element = document.querySelector(`.${selecionado}`);
            if(newColor){
                element.style.backgroundColor = `${newColor}`;
            }
            if(newSize){
                console.log(newSize);
                if(newSize[0] === "width"){
                    element.style.width = `${newSize[1]}`;
                    element.style.left = "0px";
                }
                if(newSize[0] === "height"){
                    element.style.height = `${newSize[1]}`;
                    element.style.top = "0px";
                }
                if(newSize[0] === "top"){
                    element.style.top = `${newSize[1]+header.offsetHeight}px`;
                }
                if(newSize[0] === "bottom"){
                    console.log("teste");
                    element.style.bottom = `${newSize[1]}`;
                }
            }
        }
        userText.value = "";
        removeClassCard();
    }
})

