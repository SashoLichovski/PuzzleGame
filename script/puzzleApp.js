// Home page buttons
let levels = document.getElementById(`levels`);
levels.className = `hide`;

let playBtn = document.getElementById(`play`);
    playBtn.onclick = function(){
        levels.className = `show`;
    }

let hideBtn = document.getElementById(`hideLevels`);
    hideBtn.onclick = function(){
        levels.className = `hide`;
    }

let effect = document.getElementById(`eff`);
effect.className = `hide`;
let buttonContainer = document.getElementById(`buttons`);

// Registration
let modalSaveBtn = document.getElementById(`formBtn`);

let userArr = [];

function user(name, lastname, email){
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}

let message = document.getElementById(`registration`);
message.className = `hide`;

modalSaveBtn.onclick = function(){

    let nameInput = document.getElementById(`nameInput`);
    let nameValue = nameInput.value;
    
    let lastnameInput = document.getElementById(`lastnameInput`);
    let lastnameValue = lastnameInput.value;

    let emailInput = document.getElementById(`emailInput`);
    let emailValue = emailInput.value;

    if (nameInput.value == `` || lastnameInput.value == ``) {
        let message = document.createElement(`div`);
        message.innerText = `Please enter Firstname and Lastname !`;
        message.className = `message messageText`;
        message.style.marginTop = `2%`;
        document.getElementById(`bo`).appendChild(message);

        let register = document.getElementById(`registerBtn`);
        let register2 = register.cloneNode(true);
        register2.style.marginLeft = `15px`;
        register2.innerText = `Go back`;
        message.appendChild(register2);

        register2.onclick = function(){
            message.remove();
        }
    } else {
        userArr.push( new user(nameValue, lastnameValue, emailValue) );
        message.className = `message`;
    }

    nameInput.value = ``;
    lastnameInput.value = ``;
    emailInput.value = ``;
}

let home = document.getElementById(`homeBtn`);
home.onclick = function(){
    effect.className = `hide`;
}

let home2 = document.getElementById(`homeBtn2`);
home2.onclick = function(){
    message.className = `hide`;
}

// Functions
// Swap classes
function swapTiles(cell1,cell2) {
    let swap = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = swap;
}

// Shuffle cells
function shuffle(level,no) {
    for (let row = 1; row <= no; row++) { 
        for (let column = 1; column <= no; column++) { 
            let row2=Math.floor(Math.random()*no + 1); 
            let column2=Math.floor(Math.random()*no + 1); 
            swapTiles(level+row+column,level+row2+column2); 
        } 
    } 
}

// Moving cells
function clickTile(row,column,level,tile,id) {
    let cell = document.getElementById(id+row+column);
    let cName = cell.className;
    if (cName!=tile) { 
        // check for right
        if (column<level) {
            if ( document.getElementById(id+row+(column+1)).className==tile) {
                swapTiles(id+row+column,id+row+(column+1));
                return;
            }
        }
        // check for left
        if (column>1) {
            if ( document.getElementById(id+row+(column-1)).className==tile) {
                swapTiles(id+row+column,id+row+(column-1));
                return;
            }
        }
        // check for top
        if (row>1) {
            if ( document.getElementById(id+(row-1)+column).className==tile) {
                swapTiles(id+row+column,id+(row-1)+column);
                return;
            }
        }
        // check for bottom
        if (row<level) {
            if ( document.getElementById(id+(row+1)+column).className==tile) {
                swapTiles(id+row+column,id+(row+1)+column);
                return;
            }
        } 
    }
}

// Sorting puzzle
function sort(level,id,clas){
    tile = 1;  
    for (let row = 1; row <= level; row++) {
        for (let column = 1; column <= level; column++){
            document.getElementById(id+row+column).className = (clas+tile)
            tile++;
        }
    }  
}

// Check if puzzle is solved
function check(level,tiles,id,clas){
    tile = 1;  
    for (let row = 1; row <= level; row++) {
        for (let column = 1; column <= level; column++){
            if (document.getElementById(id+row+column).className == (clas+tile)) {
                tile++; 
            }    
        }
    }
    if(tile == tiles){
        let container = document.getElementById(`container`);
        unDisableButtons();
        container.remove();
        effect.className = `pyro`;
        timer.className = `hide`;
        if (userArr.length >= 1) {
            if(buttonContainer.childElementCount == 3){
                tableButton();
            }
            displayScore(clas);
        }
        resetTimer();
    } else {
        let notFinishedMessage = document.createElement(`div`);
        notFinishedMessage.className = `message messageText`;
        notFinishedMessage.innerText = `You are not finished! Try harder.`;
        let body = document.getElementById(`bo`);
        body.appendChild(notFinishedMessage);
        let btn = document.createElement(`button`);
        btn.className = `btn btn-dark`;
        btn.innerText = `Go back`;
        btn.style.marginLeft = `20px`;
        notFinishedMessage.appendChild(btn);
        btn.onclick = function(){
            notFinishedMessage.remove();
        }
    }
}

// Creating new button if registered
function tableButton(){
    let newButton = document.createElement(`button`);
    newButton.id = `scoreBtn`
    newButton.className = `btn btn-outline-success`;
    newButton.innerText = `View scores`;
    buttonContainer.appendChild(newButton);
}

// Creating puzzle
function generatePuzzle(paramImgLevel, paramLevel, paramClass, lastTile){
    let body = document.getElementById(`bo`);
    let container = document.createElement(`div`);
    container.className = `showPuzzleContainer`;
    container.id = `container`;
    body.appendChild(container);

    let puzzleContainer = document.createElement(`div`);
    puzzleContainer.style.background = `rgba(59, 59, 59, 0.74)`;
    puzzleContainer.id = `puz`;
    container.appendChild(puzzleContainer);
    
    let puzzle = document.createElement(`div`);
    puzzle.className = `puzzle`;
    puzzle.style.display = `table`;
    puzzleContainer.appendChild(puzzle);

    let imageContainer = document.createElement(`div`);
    imageContainer.className = 'hide';
    imageContainer.style.padding = `5px`;
    container.appendChild(imageContainer);

    let image = document.createElement(`div`);
    image.style.height = `100%`;
    image.style.backgroundImage = `url('./images/${paramImgLevel}.jpg')`;
    image.style.backgroundRepeat = `round`;
    imageContainer.appendChild(image);
    
    let no = 0;
    for (let row = 1; row <= paramLevel; row++) {

        let tr = document.createElement(`div`);
        tr.style.display = `table-row`;
        puzzle.appendChild(tr);
        
        for (let column = 1; column <= paramLevel; column++) {
            no++
            let td = document.createElement(`div`);
            tr.appendChild(td);
            td.id = `shCell`+row+column;
            td.className = paramClass + no;
            td.onclick = function(){
                clickTile(row,column,paramLevel,lastTile,"shCell");
            }    
        }
    }
    let btnContainer = document.createElement(`div`);
    btnContainer.style.display = `flex`;
    btnContainer.style.justifyContent = `space-around`;
    puzzleContainer.appendChild(btnContainer);   

    let shuffleBtn = document.createElement(`button`);
    shuffleBtn.className = `btn btn-success btn-sm`;
    shuffleBtn.innerText = `Suffle`;
    shuffleBtn.style.margin = `8px`;
    btnContainer.appendChild(shuffleBtn);
        shuffleBtn.onclick = function(){
            shuffle(`shCell`,paramLevel);
        }

    let sortBtn = document.createElement(`button`);
    sortBtn.className = `btn btn-success btn-sm`;
    sortBtn.innerText = `Sort`;
    sortBtn.style.margin = `8px`;
    btnContainer.appendChild(sortBtn);
        sortBtn.onclick = function(){
            sort(paramLevel,`shCell`,paramClass);
        }
        sortBtn.onmouseover = function(){
            let message = document.createElement(`div`);
            message.className = `popup`;
            message.innerText = `You don't really win like this...`;
            message.style.color = `black`
            message.id = `m`
            btnContainer.appendChild(message);
        }
        sortBtn.onmouseout = function(){
            let remove = document.getElementById(`m`);
            remove.remove();
        }

    let viewImage = document.createElement(`button`);
    viewImage.className = `btn btn-info btn-sm`;
    viewImage.innerText = `View image`;
    viewImage.style.margin = `8px`;
    btnContainer.appendChild(viewImage);
        viewImage.onclick = function(){
            // image.className = `showImage`;
            imageContainer.className = `showImage`;
        }

    let hideImage = document.createElement(`button`);
    hideImage.className = `btn btn-info btn-sm`;
    hideImage.innerText = `Hide image`;
    hideImage.style.margin = `8px`;
    btnContainer.appendChild(hideImage);
        hideImage.onclick = function(){
            imageContainer.className = `hide`;
        }

    let finishBtn = document.createElement(`button`);
    finishBtn.className = `btn btn-success btn-sm`;
    finishBtn.innerText = `Finish`;
    finishBtn.style.margin = `8px`
    btnContainer.appendChild(finishBtn);
        finishBtn.onclick = function(){
            check(paramLevel,(no+1),`shCell`,paramClass);
        }
     
    let closeBtn = document.createElement(`button`);
    closeBtn.className = `btn btn-dark btn-sm`;
    closeBtn.innerText = `Close`;
    closeBtn.style.margin = `8px`;
    btnContainer.appendChild(closeBtn);
        closeBtn.onclick = function(){
            unDisableButtons();
            container.remove();
            resetTimer();
            timer.className = `hide`;
            levels.className = `show`;
        }
        // while (container.className = `showPuzzleContainer`) {
        //     scoreBtn.disabled = true;
        // }
    disableButtons();
}

// Disable buttons
let aboutBtn = document.getElementById(`aboutBtn`);
let registerBtn = document.getElementById(`registerBtn`);
function disableButtons(){
    playBtn.disabled = true;
    aboutBtn.disabled = true;
    registerBtn.disabled = true;
}

// Undisable buttons
function unDisableButtons(){
    playBtn.disabled = false;
    aboutBtn.disabled = false;
    registerBtn.disabled = false;
}

// Timer
let timer = document.getElementById(`timer`);
timer.className = `hide`;
let myTime;
function setTimer(sec){
    if(userArr.length >= 1){
        let mins = document.createElement(`span`);
        mins.id = `minutes`;
        timer.appendChild(mins);
        let dots = document.createElement(`div`);
        dots.innerText = `:`;
        dots.id = `dots`
        timer.appendChild(dots);
        let secs = document.createElement(`span`);
        secs.id = `seconds`;
        timer.appendChild(secs);
        // sec = 0;
        function pad ( val ) { return val > 9 ? val : "0" + val; }
        myTime = setInterval( function(){
            $("#seconds").html(pad(++sec%60));
            $("#minutes").html(pad(parseInt(sec/60,10)));
        }, 1000);
        timer.className = `timer`;
    }
}
function resetTimer(){
    clearInterval(myTime);
    let min = document.getElementById(`minutes`);
    let sec = document.getElementById(`seconds`);
    let dots = document.getElementById(`dots`);
    dots.remove();
    min.remove()
    sec.remove();
}

// Saving score and displaying table
let scoreContainer = document.getElementById(`scores`);
scoreContainer.className = `hide`;

function displayScore(y){
    
    let minScore = document.getElementById(`minutes`);
    let minScoreValue = minScore.innerText;
    let secScore = document.getElementById(`seconds`);
    let secScoreValue = secScore.innerText;
    let dots = document.getElementById(`dots`);
    let dotsValue = dots.innerText;
    
    let scoreBtn = document.getElementById(`scoreBtn`);
    scoreBtn.onclick = function(){
        scoreContainer.className = `showScore`;
        disableButtons();
    }
    let closeTable = document.getElementById(`closeTable`);
    closeTable.onclick = function(){
        scoreContainer.className = `hide`;
        unDisableButtons();
    }
    if(scoreContainer.childElementCount == 1){

        let newTable = document.createElement(`table`);
        newTable.id = `newTable`
        scoreContainer.appendChild(newTable);
    
        let tableBody = document.createElement(`tbody`);
        tableBody.id = `tableBody`
        newTable.appendChild(tableBody);
    
        let rowHead = document.createElement(`tr`);
        tableBody.appendChild(rowHead);
    
        let hName = document.createElement(`th`);
        hName.innerText = `Name`; 
        hName.className = `headInfo`;
        rowHead.appendChild(hName);
    
        let hLastname = document.createElement(`th`);
        hLastname.innerText = `Lastname`;
        hLastname.className = `headInfo`;
        rowHead.appendChild(hLastname);
    
        let hLevel = document.createElement(`th`);
        hLevel.innerText = `Level`;
        hLevel.className = `headInfo`;
        rowHead.appendChild(hLevel);
    
        let hScore = document.createElement(`th`);
        hScore.innerText = `Time`;
        hScore.className = `headInfo`;
        rowHead.appendChild(hScore);
    }

    let parent = document.getElementById(`tableBody`);

    let userInfoRow = document.createElement(`tr`);
    tableBody.appendChild(userInfoRow);

    let userName = document.createElement(`td`);
    userName.className = `userInfo`;
    userName.innerText = userArr[userArr.length - 1].name;
    userInfoRow.appendChild(userName);

    let userLastname = document.createElement(`td`);
    userLastname.className = `userInfo`;
    userLastname.innerText = userArr[userArr.length - 1].lastname;
    userInfoRow.appendChild(userLastname);

    let userLevel = document.createElement(`td`);
    userLevel.className = `userInfo levels`;
    if(y == `tile`){
        userLevel.innerText = `Easy`;
    } else if(y == `mTile`){
        userLevel.innerText = `Medium`;
    } else if(y == `hTile`){
        userLevel.innerText = `Hard`;
    }
    userInfoRow.appendChild(userLevel);

    let userScore = document.createElement(`td`);
    userScore.className = `userInfo scores`;
    userScore.innerText = minScoreValue+dotsValue+secScoreValue;
    userInfoRow.appendChild(userScore);
}

function tableButton(){
    let newButton = document.createElement(`button`);
    newButton.id = `scoreBtn`
    newButton.className = `btn btn-outline-success`;
    newButton.innerText = `View scores`;
    buttonContainer.appendChild(newButton);
}

// Calling functions on level buttons
let easyBtn = document.getElementById(`levelEasy`);
easyBtn.onclick = function(){
    generatePuzzle(`easy`,3,`tile`,`tile9`);
    shuffle(`shCell`,3);
    setTimer(0);
    levels.className = `hide`;
}

let mediumBtn = document.getElementById(`levelMedium`);
mediumBtn.onclick = function(){
    generatePuzzle(`medium`,4,`mTile`,`mTile16`);
    shuffle(`shCell`,4);
    setTimer(0);
    levels.className = `hide`;
}

let hardBtn = document.getElementById(`levelHard`);
hardBtn.onclick = function(){
    generatePuzzle(`hard`,5,`hTile`,`hTile25`);
    shuffle(`shCell`,5);
    setTimer(0);
    levels.className = `hide`;
}


