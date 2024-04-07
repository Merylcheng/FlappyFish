    const fish = document.querySelector('.fish');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    const gameOverModal = document.getElementById('gameOverModal');
    const startModal = document.getElementById('startModal');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const winModal = document.getElementById('winModal');
    const replayButton = document.getElementById('replayButton');
    const continueButton = document.getElementById('continueButton');
    const easyButton = document.getElementById('easyButton');
    const mediumButton = document.getElementById('mediumButton');
    const hardButton = document.getElementById('hardButton');
    
    let fishX = 220 // location of fish on X-axis
    let fishY = 200 //location of fish on Y-axis
    let gravity = 1.5 // can change direction with -=/+=
    let isGameOver = false //check if game is not in a "game over" state.
    let isGameRunning = false; // flag that helps control the game's flow by indicating whether the game is currently running (true) or not (false).
    let gap = 430 //gap size
    let score = 0
    let gameTimerId = setInterval(startGame, 20) 
    let highScore = localStorage.getItem('flappyBirdHighScore') || 0; /*initialise highscore from local*/
    let pipesPassed = 0; // Variable to keep track of pipes passed
    

      easyButton.onclick = function() {
        setDifficulty('easy');
        easyButton.style.backgroundColor = 'orange'
        };

      mediumButton.onclick = function() {
        setDifficulty('medium');
        mediumButton.style.backgroundColor = 'orange'
        };

      hardButton.onclick = function() {
        setDifficulty('hard');
        hardButton.style.backgroundColor = 'orange'
        };

    startModal.style.display = 'block'; // Show the start modal initially

      startButton.onclick = function() {
        startModal.style.display = 'none'; // Hide the start modal
        isGameRunning = true; // This signifies that the game loop setInterval should start game
        document.addEventListener('click', jump)
        gameTimerId = setInterval(startGame, 20); // Start the game loop
        generatePipe(); 
      };

      restartButton.onclick = function() {
        gameOverModal.style.display = "none";
        restartGame(); // Restart the game when Start button is clicked
        document.addEventListener('click', jump);
      }

      replayButton.onclick = function() { //button for winModal share restartGame function
        winModal.style.display = "none";
        restartGame(); // 
        document.addEventListener('click', jump);
      }

      continueButton.onclick = function() {
        winModal.style.display = "none";// Hide the win modal
        isGameRunning = true; // the game loop setInterval should start game
        document.addEventListener('click', jump);
       
    };

function startGame() { //fish drops when game starts
        if (!isGameRunning) return; 
        fishY -= gravity
        fish.style.bottom = fishY + 'px' //add 100px 
        fish.style.left= fishX + 'px'
    }

function jump() {
        if (!isGameRunning) return; 
        if (fishY < 500) fishY += 50 //fish moves up 50 pixels at every jump and stops it from jumping out of top screen
        fish.style.bottom = fishY + 'px'
        console.log(fishY)
    }

    document.addEventListener('keyup', jump)

function generatePipe() {
    if (!isGameRunning || isGameOver) return;
    let pipeX = 500
    let randomHeight = Math.random() *60 //pipe generate from 0 to 60 from the ground
    let pipeY = randomHeight
    const pipe = document.createElement('div')
    const topPipe = document.createElement('div')

    pipe.classList.add('pipe')
    topPipe.classList.add('topPipe')
    
    gameDisplay.appendChild(pipe)
    gameDisplay.appendChild(topPipe)
    pipe.style.left = pipeX + 'px'
    topPipe.style.left =pipeX + 'px'
    pipe.style.bottom = pipeY + 'px'
    topPipe.style.bottom = pipeY + gap + 'px'

    
function movePipe() {
    if (!isGameRunning || isGameOver) return;
    pipeX -=2
    pipe.style.left = pipeX + 'px'
    topPipe.style.left = pipeX + 'px'

        if (pipeX === -60) {
            clearInterval(timerId)
            gameDisplay.removeChild(pipe)
            gameDisplay.removeChild(topPipe)
        }

        if (!pipe.passed && pipeX < fishX - 20) { //Track the number of pipes passed
            pipesPassed++; // 
            if (pipesPassed === 1) { // Show win modal if 3 pipes are passed
                console.log('You win')
                showWinModal(); 
                
            }
            score++; // Increase the score by 1
            console.log('score',score);
            document.querySelector('.score').innerText = 'Score: ' + score; // Update the score display
            pipe.passed = true;
        }
    
        //Conditions of GameOver//
        if (
            pipeX > 220 && pipeX < 280 && fishX === 220 &&
            (fishY < pipeY + 144 || fishY > pipeY + gap -200)||
            (fishY > 570 || fishY < 0) 
        ) {
           
            gameOver()
            clearInterval(timerId)
        }
    }        
    let timerId = setInterval(movePipe, 20)    //creates the movement of pipes
    setTimeout(generatePipe, 3000) //generates the moving pipes
    }

function restartGame() {
        fishY = 200; // Reset bird position
        window.location.reload();
    }

generatePipe();

function updateHighScore() {
    localStorage.setItem('flappyBirdHighScore', highScore);
}

function setDifficulty(level) {
    switch (level) {
        case 'easy':
            gravity = 1; // Decrease gravity for easier gameplay
            
            break;
        case 'medium':
            gravity = 1.5; // Medium gravity
            
            break;
        case 'hard':
            gravity = 4; // Increase gravity for harder gameplay
            
            break;
    }
    difficulty = level;
    console.log(level)
}

function gameOver() { 
    clearInterval(gameTimerId)
    console.log('gameover')
    isGameOver = true
    isGameRunning = false; // pause or stop the game
    document.removeEventListener('click', jump)
    gameOverModal.style.display = 'block'


    if (score > highScore) { // Update high score if necessary
      highScore = score;
      document.querySelector('.high-score-value').innerText = highScore;
      updateHighScore(); // 
      
     }
    //  console.log('highscore' + highScore)
   }

function initHighScore() { // Add this function to initialize the high score display
document.querySelector('.high-score-value').innerText = highScore;
}
initHighScore();


function showWinModal() {
    isGameRunning = false; // Stop the game
    document.removeEventListener('click', jump)
    winModal.style.display = 'block';
}


