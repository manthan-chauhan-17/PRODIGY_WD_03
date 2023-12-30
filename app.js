let cells = document.querySelectorAll('.cell');
let restartButton = document.getElementById('restart');
let statusText = document.querySelector('.status');
let options = ['','','','','','','','',''];

const winCondition = [
    [0,1,2],[3,4,5],[6,7,8],       // Horizontal
    [0,3,6],[1,4,7],[2,5,8],       // Vertical
    [0,4,8],[2,4,6]                // Diagonal 
]

let currentPlayer = 'X';
let gameActive = false;

initializeGame();

function initializeGame(){
    cells.forEach( cell => cell.addEventListener('click' , cellClicked));
    restartButton.addEventListener('click' , restartGame);
    statusText.innerHTML = currentPlayer + "'s turn";
    gameActive = true;
}

function cellClicked(){
    let index = this.getAttribute('data-index');

    if (options[index] !== "" && gameActive ) {
        return;
    }

    updateCell(this , index);
    checkWinner();
}
function updateCell(cell , index){
    options[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
}
function changePlayer(){
    if (currentPlayer == 'X') {
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    statusText.innerHTML = currentPlayer + "'s turn";
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0 ; i < winCondition.length ; i++){

        let condition = winCondition[i];
        
        let cellA = options[condition[0]];
        let cellB = options[condition[1]];
        let cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.innerHTML = currentPlayer + " Wins !!";
        gameActive = false;
    }
    else if (!options.includes("")) {
        statusText.innerHTML = "Draw !!";
        gameActive = false;
    }
    else{
        changePlayer();
    }
}   
function restartGame(){
    currentPlayer = "X";
    options = ['','','','','','','','',''];
    cells.forEach(cell => cell.textContent = "");
}