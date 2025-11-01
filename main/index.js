const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const ball = document.getElementById("ball")
const score1 = document.getElementById("score1")
const score2 = document.getElementById("score2")
const container = document.getElementById("main-container")

const velocidad = 10
const initialBallSpeed = 5
const maxBallAngleSpeed = 6 // velocidad vertical máxima al rebotar (ángulo máximo)

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

function checkWinAndReset() {
    if (scoreP1 === 10 || scoreP2 === 10) {
        scoreP1 = 0
        scoreP2 = 0
        score1.textContent = scoreP1
        score2.textContent = scoreP2
        // Aseguramos que los colores vuelvan a blanco al reiniciar
        score1.style.color = "white"
        score2.style.color = "white"
        resetBall()
    }
}

function gameLoop() {
    const containerHeight = container.offsetHeight
    const containerWidth = container.offsetWidth
    const playerHeight = player1.offsetHeight
    const maxPosicionY = containerHeight - playerHeight // Límite inferior para las paletas
    const maxBallY = containerHeight - ball.offsetHeight // Límite inferior para la bola

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

    // --- CORRECCIÓN DE COLISIÓN VERTICAL (CLAMPS Y REBOTE) ---
    // Rebote en el borde superior
    if (ballY <= 0) {
        ballY = 0
        ballSpeedY *= -1
    }
    // Rebote en el borde inferior
    else if (ballY + ball.offsetHeight >= containerHeight) {
        ballY = containerHeight - ball.offsetHeight
        ballSpeedY *= -1
    }
    // -----------------------------------------------------------

    ball.style.left = `${ballX}px`
    ball.style.top = `${ballY}px`

    // Lógica de GOL
    if (ballX <= 0) {
        scoreP2++
        score2.textContent = scoreP2
        checkWinAndReset()
        resetBall()
    } else if ((ballX + ball.offsetWidth) >= containerWidth) {
        scoreP1++
        score1.textContent = scoreP1
        checkWinAndReset()
        resetBall()
    }

    const ballRect = ball.getBoundingClientRect()
    const p1Rect = player1.getBoundingClientRect()
    const p2Rect = player2.getBoundingClientRect()

    // --- COLISIÓN CON JUGADOR 1 (IZQUIERDA) ---
    if (ballSpeedX < 0 &&
        ballRect.left <= p1Rect.right &&
        ballRect.right >= p1Rect.left &&
        ballRect.top <= p1Rect.bottom &&
        ballRect.bottom >= p1Rect.top) {

        ballSpeedX = Math.abs(ballSpeedX) // rebota hacia la derecha

        // ⚙️ Cálculo del ángulo de rebote
        const paddleCenter = p1Rect.top + p1Rect.height / 2
        const ballCenter = ballRect.top + ballRect.height / 2
        const hitPosition = (ballCenter - paddleCenter) / (p1Rect.height / 2) // (-1 a 1)
        ballSpeedY = hitPosition * maxBallAngleSpeed
    }

    // --- COLISIÓN CON JUGADOR 2 (DERECHA) ---
    if (ballSpeedX > 0 &&
        ballRect.right >= p2Rect.left &&
        ballRect.left <= p2Rect.right &&
        ballRect.top <= p2Rect.bottom &&
        ballRect.bottom >= p2Rect.top) {

        ballSpeedX = -Math.abs(ballSpeedX) // rebota hacia la izquierda

        // ⚙️ Cálculo del ángulo de rebote
        const paddleCenter = p2Rect.top + p2Rect.height / 2
        const ballCenter = ballRect.top + ballRect.height / 2
        const hitPosition = (ballCenter - paddleCenter) / (p2Rect.height / 2) // (-1 a 1)
        ballSpeedY = hitPosition * maxBallAngleSpeed
    }

    // Lógica de color del marcador
    if (scoreP1 < scoreP2) {
        score1.style.color = "red"
        score2.style.color = "white"
    } else if (scoreP2 < scoreP1) {
        score2.style.color = "red"
        score1.style.color = "white"
    } else {
        score1.style.color = "white"
        score2.style.color = "white"
    }

    requestAnimationFrame(gameLoop)
}

resetBall()
gameLoop()
