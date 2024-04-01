document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')


    let birdLeft = 220
    let birdBottom = 100 
    let gravity = 2
    let isGameOver = false
    let gap = 450


    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left= birdLeft + 'px'

    }

    let gameTimerId = setInterval(startGame, 20) 

    // function control(event) {
    //     if (event.keyCode ===   32) {
    //         jump()
    //     }
    // }
    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    
    document.addEventListener('keyup', jump)

function generatePipe() {
    let pipeLeft = 500
    let randomHeight = Math.random() * 60
    let pipeBottom = randomHeight
    const pipe = document.createElement('div')
    const topPipe = document.createElement('div')

    if (!isGameOver) {
        pipe.classList.add('pipe')
        topPipe.classList.add('topPipe')
    }
    gameDisplay.appendChild(pipe)
    gameDisplay.appendChild(topPipe)
    pipe.style.left = pipeLeft + 'px'
    topPipe.style.left =pipeLeft + 'px'
    pipe.style.bottom = pipeBottom + 'px'
    topPipe.style.bottom = pipeBottom + gap + 'px'

    
    function movePipe() {
        pipeLeft -=2
        pipe.style.left = pipeLeft + 'px'
        topPipe.style.left = pipeLeft + 'px'
        if (pipeLeft === -60) {
            clearInterval(timerId)
            gameDisplay.removeChild(pipe)
            gameDisplay.removeChild(topPipe)
        }
        //Conditions of GameOver//
        if (
            pipeLeft > 220 && pipeLeft < 280 && birdLeft === 220 &&
            (birdBottom < pipeBottom + 153 || birdBottom > pipeBottom + gap -220 )||
            birdBottom === 0 
        ){
        gameOver()
        clearInterval(timerId)
    }
    }

    let timerId = setInterval(movePipe, 20)
    setTimeout(generatePipe, 3000)
}

generatePipe()

function gameOver() {
    clearInterval(gameTimerId)
    console.log('gameover')
    isGameOver = true
    document.removeEventListener('keyup', jump)
}

})