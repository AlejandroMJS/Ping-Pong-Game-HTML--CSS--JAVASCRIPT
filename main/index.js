const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const ball = document.getElementById("ball")
const score1 = document.getElementById("score1")
const score2 = document.getElementById("score2")
const container = document.getElementById("main-container")

const velocidad = 10
const initialBallSpeed = 5

let pos1_Y = 0
let pos2_Y = 0
let ballX = container.offsetWidth / 2 - ball.offsetWidth / 2
let ballY = container.offsetHeight / 2 - ball.offsetHeight / 2
let ballSpeedX
let ballSpeedY
let scoreP1 = 0
let scoreP2 = 0

const keysPressed = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false,
}

document.addEventListener("keydown", (event) => {
    if (event.key in keysPressed) {
        event.preventDefault()
        keysPressed[event.key] = true
    }
})

document.addEventListener("keyup", (event) => {
    if (event.key in keysPressed) {
        keysPressed[event.key] = false
    }
})

function resetBall() {
    ballX = container.offsetWidth / 2 - ball.offsetWidth / 2
    ballY = container.offsetHeight / 2 - ball.offsetHeight / 2

    let direction = Math.random() > 0.5 ? 1 : -1
    ballSpeedX = initialBallSpeed * direction
    ballSpeedY = (Math.random() - 0.5) * initialBallSpeed
}

function gameLoop() {
    const containerHeight = container.offsetHeight
    const containerWidth = container.offsetWidth
    const playerHeight = player1.offsetHeight
    const maxPosicionY = containerHeight - playerHeight

    if (keysPressed.w) pos1_Y -= velocidad
    if (keysPressed.s) pos1_Y += velocidad
    if (keysPressed.ArrowUp) pos2_Y -= velocidad
    if (keysPressed.ArrowDown) pos2_Y += velocidad

    pos1_Y = Math.max(0, Math.min(pos1_Y, maxPosicionY))
    pos2_Y = Math.max(0, Math.min(pos2_Y, maxPosicionY))

    player1.style.transform = `translateY(${pos1_Y}px)`
    player2.style.transform = `translateY(${pos2_Y}px)`

    ballX += ballSpeedX
    ballY += ballSpeedY

    ball.style.left = `${ballX}px`
    ball.style.top = `${ballY}px`

    if (ballY <= 0) {
    ballSpeedY = -ballSpeedY
    ballY = 0 // Forzamos la posición justo en el límite superior
}

// Colisión Inferior
if ((ballY + ball.offsetHeight) >= containerHeight) {
    ballSpeedY = -ballSpeedY
    ballY = containerHeight - ball.offsetHeight // Forzamos la posición justo en el límite inferior
}

    if (ballX <= 0) {
        scoreP2++
        score2.textContent = scoreP2
        resetBall()
    } else if ((ballX + ball.offsetWidth) >= containerWidth) {
        scoreP1++
        score1.textContent = scoreP1
        resetBall()
    }
    
    const ballRect = ball.getBoundingClientRect()
    const p1Rect = player1.getBoundingClientRect()
    const p2Rect = player2.getBoundingClientRect()
    
    if (ballSpeedX < 0 && 
        ballRect.left <= p1Rect.right && 
        ballRect.right >= p1Rect.left && 
        ballRect.top <= p1Rect.bottom && 
        ballRect.bottom >= p1Rect.top) {
            ballSpeedX = -ballSpeedX
    }
    
    if (ballSpeedX > 0 && 
        ballRect.right >= p2Rect.left && 
        ballRect.left <= p2Rect.right && 
        ballRect.top <= p2Rect.bottom && 
        ballRect.bottom >= p2Rect.top) {
            ballSpeedX = -ballSpeedX
    }

    

    requestAnimationFrame(gameLoop)
}

resetBall()
gameLoop()