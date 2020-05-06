const container = document.querySelector("section.grid-container");
const blackButton = document.querySelector(".black");
const darkenButton = document.querySelector(".darken");
const randomColorButton = document.querySelector(".random-color");
const newGridButton = document.querySelector(".new-grid");
const cleanButton = document.querySelector(".clean");

let _blackInkChange = grid => {
    grid.target.style.opacity = 1;
    grid.target.style.background = "black";
}


let _darkeningInkChange = box => {
    let opacity = Number(box.target.style.opacity);
    if(opacity < 1){
        box.target.style.opacity = opacity + 0.1;
        box.target.style.background = "black";
    }

    if(opacity == 1){
        if(box.target.style.background == "black none repeat scroll 0% 0%" || box.target.style.background == "black"){
            return;
        }else{
            box.target.style.opacity = 0.1;
            box.target.style.background = "black";
        }
    }
     
    
}

let _randomInkChange = grid =>{
    grid.target.style.opacity = 1;
    grid.target.style.background = getrandomColor();
}


function createGrid (rows, columns){
    removeOldGrid();
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-columns', columns);
    let cell;
    for(let i = 0; i < (rows * columns); i++){
        cell = document.createElement('div');
        cell.setAttribute("class", "grid-item");
        container.append(cell);
    }
}

createGrid(10, 10);


/******Black*****/

function blackInk(){
    removeDarkenEvent();
    removeRandomEvent();
    let cells = document.querySelectorAll(".grid-item");
    
    cells.forEach(cell => {
        cell.addEventListener("mouseover", _blackInkChange);
    })
    
}




/********Darken Color*******/
function darkeningInk(){
    removeBlackEvent();
    removeRandomEvent();
    let cells = document.querySelectorAll(".grid-item");
    cells.forEach(cell =>{
        cell.addEventListener("mouseover", _darkeningInkChange);
    });
}



/*********Random Color*********/
function randomColorInk(){
    removeBlackEvent();
    removeDarkenEvent();

    let cells = document.querySelectorAll(".grid-item");
    cells.forEach(cell => {
        cell.addEventListener("mouseover", _randomInkChange);
    })
}

/*****Random color generator***/
function getrandomColor(){
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let color = `rgb(${red}, ${green}, ${blue})`;
    return color;
}




/***********clean grid**********/
function cleanGrid(){
    let allGridItems = Array.from(document.querySelectorAll(".grid-item"))
    allGridItems.forEach(item => {
        item.style["background"] = "white";
        item.style.opacity = 1;
    });
}


/********create new grid*******/
function createNewGrid(){
    cleanGrid();
    let newGrid = prompt("How many rows and columns do you want?", 20);
    if(newGrid == null || newGrid == undefined || newGrid == 0){
        alert("Sorry, not a value so the default would be used");
        createGrid(10, 10);
    }else{
        createGrid(newGrid, newGrid);
    }
}


function removeOldGrid(){
    let grids = document.querySelectorAll(".grid-item");
    grids.forEach(grid =>{
        console.log(grid.className)
        container.removeChild(grid);
    })
}



/*********Event Removal*********/

function removeBlackEvent(){
    let cells = document.querySelectorAll(".grid-item");

    cells.forEach(cell => {
        cell.removeEventListener("mouseover", _blackInkChange);
    });
}

function removeRandomEvent(){
    let cells = document.querySelectorAll(".grid-item");

    cells.forEach(cell => {
        cell.removeEventListener("mouseover", _randomInkChange);
    });
}

function removeDarkenEvent(){
    let cells = document.querySelectorAll(".grid-item");

    cells.forEach(cell => {
        cell.removeEventListener("mouseover", _darkeningInkChange);
    });
}


blackButton.addEventListener('click', blackInk);
darkenButton.addEventListener('click', darkeningInk);
randomColorButton.addEventListener('click', randomColorInk);
cleanButton.addEventListener('click', cleanGrid);
newGridButton.addEventListener('click', createNewGrid);
