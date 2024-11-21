const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
const restartBtn = document.querySelector('#restartBtn');

let player = 'X';
let isPauseGame = false;
let isGameStart = false;

const inputCells = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Add click event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
});

function tapCell(cell, index) {
    if (cell.textContent === '' && !isPauseGame) {
        isGameStart = true;
        updateCell(cell, index);
        if (!checkWinner()) {
            if (inputCells.every(cell => cell !== '')) {
                declareDraw();
            } else {
                changePlayer();
            }
        }
    }
}

function updateCell(cell, index) {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player === 'X') ? '#1892EA' : '#A737FF';
}

function changePlayer() {
    player = (player === 'X') ? 'O' : 'X';
}

function checkWinner() {
    for (const [a, b, c] of winConditions) {
        if (inputCells[a] === player &&
            inputCells[b] === player &&
            inputCells[c] === player) {
            declareWinner([a, b, c]);
            return true;
        }
    }
    return false; // No winner found
}

function declareWinner(winningIndices) {
    titleHeader.textContent = `${player} Wins!`;
    localStorage.setItem('winner' , player);
    isPauseGame = true;

    winningIndices.forEach((index) => {
        cells[index].style.background = '#2A2343';
    });

    restartBtn.style.visibility = 'visible';
}

function declareDraw() {
    titleHeader.textContent = 'It\'s a Draw!';
    isPauseGame = true;
    
    let countdown = 10;
    restartBtn.style.visibility = 'hidden'; // Hide the restart button
    const timer = setInterval(() => {
        countdown--;
        titleHeader.textContent = `It's a Draw! Restarting in ${countdown} seconds...`;
        if (countdown <= 0) {
            clearInterval(timer);
            restartGame();
        }
    }, 1000);
}

function restartGame() {
    restartBtn.style.visibility = 'hidden';
    inputCells.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = '';
    });
    isPauseGame = false;
    isGameStart = false;
    titleHeader.textContent = 'Choose';
}

// Restart button click event
restartBtn.addEventListener('click', () => {
    restartGame();
});
