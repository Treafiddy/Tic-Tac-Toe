let board = ["", "", "", "", "", "", "", "", ""];
let counter = 1;
let turnCounter = document.getElementById("turnCounter");
let resetBoard = document.getElementById("reset");
let resetScore = document.getElementById("resetScore");
const score = document.getElementById("playerScore");
const scoreBox = document.getElementById("scoreBox");
resetBoard.addEventListener("click", resetGame);
resetScore.addEventListener("click", restartScore);

function displayBoard(){
   let boardStateStr = JSON.stringify(board);
   let boardState = localStorage.setItem("boardState", boardStateStr);
   let currentBoardStr = localStorage.getItem("boardState");
   let currentBoard = JSON.parse(currentBoardStr);
   console.log(typeof(currentBoardStr));
   
   for (let i = 0; i < 9; i++){
      document.getElementById(`box${i}`).textContent =  currentBoard[i]; 
   }
}

function playerMove(event){
   const box = event.target.id;
   const index = parseInt(box.replace("box", ""));
   counter++;
   
   if (event.target.textContent !== ""){
      alert("Invalid move.");
      counter -= 1;
   } else {
      
      if (counter % 2){
         turnCounter.textContent = "Player 1's Turn."
      // splice(start, deleteCount, item1)
         board.splice(index, 1, "O");
         displayBoard();
         checkWin("O");
         
      } else {
         turnCounter.textContent = "Player 2's Turn."
      // splice(start, deleteCount, item1)
         board.splice(index, 1, "X");
         displayBoard();
         checkWin("X");  
      }
   }
   
}

const winCombination = [ 
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

function checkWin(player){
   for (let i = 0; i < winCombination.length; i++){
      let winCounter = 0;
      for (let z = 0; z < winCombination[i].length; z++){
         if (board[winCombination[i][z]] === player){
            winCounter++;
            if (winCounter === 3){
               turnCounter.textContent = `${player} wins!`; 
               //logs the win into local storage
               let currentWins = localStorage.getItem(player);
               currentWins = parseInt(currentWins);
               let newWin = currentWins +1;
               localStorage.setItem(player, newWin);
               console.log(newWin);  
               scoreBoard();
                    
            }    
         } else {
            winCounter = 0;
            
         }
      } 
   }
   let isBoardFull = (currentValue) => currentValue != "";
   if(board.every(isBoardFull) == true){
      alert("It's a draw!");
      resetGame();
   }
}

function resetGame() {
   turnCounter.textContent = "Player 1's Turn."
   board = ["", "", "", "", "", "", "", "", ""];
   counter = 1;
   displayBoard();
}

function restartScore(){
   localStorage.setItem("X", 0);
   localStorage.setItem("O", 0);
   scoreBoard();
}

function scoreBoard(){
   let player1 = localStorage.getItem("X");
   let player2 = localStorage.getItem("O");
   score.textContent = "";
   score.append(`Player 1: ${player1}  Player 2: ${player2}`);
}


 function startOfGame() {
   let boardSave = localStorage.getItem("boardState")
   if(boardSave == ""){
      displayBoard();
   }
 }

 startOfGame();
// //function if localstorage isn't empty display board 
// //call the function 





