"use strict";

const containerEl = document.querySelector(".container");
let playerTxt = document.querySelector(".message");
let restartbtns = document.querySelectorAll(".restartbtn");
let boxes = document.querySelectorAll(".box");


const O_TXT = "O";
const X_TXT = "X";

let currentPlayer = O_TXT;
let spaces = Array(9).fill(null);

// Start Game
const startGame = () => {
    boxes.forEach((box, index) => {
        box.id = index; // Set id to match index
        box.addEventListener("click", boxClicked);
    });
};

function boxClicked(e) {
    const id = e.target.id;

    // Check id
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        // Winner logic
        if (playerHasWon() !== false) {
            playerTxt.innerHTML = `Congratulations Player ${currentPlayer}` ;
            let winnerIndicator = playerHasWon();

            winnerIndicator.forEach(
                (box) => (boxes[box].style.backgroundColor = "#f4d03f"),
            );
            containerEl.classList.add('success');
            document.querySelector('.model p').style.display = 'block';

            return;
        }

        // Check for draw
        if (spaces.every(space => space !== null)) {
            playerTxt.innerHTML = "It's a Draw! Play Again...";   
            document.querySelector('.model p').style.display = 'none';
            containerEl.classList.add('success');
            return;
        }

        currentPlayer = currentPlayer === X_TXT ? O_TXT : X_TXT;
    }
}

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function playerHasWon() {
    for (const condition of winningCombination) {
        let [a, b, c] = condition;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

restartbtns.forEach(btn => btn.addEventListener('click', restartGame));

function restartGame() {
    spaces.fill(null);

    boxes.forEach((box) => {
        box.innerHTML = "";
        box.style.backgroundColor = "";     
    });

    playerTxt.innerHTML = "Tic Tac Toe";
    currentPlayer = O_TXT;
    containerEl.classList.remove("success");
}

startGame();
