const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const ball = document.getElementById("ball")
const scorePlayer1 = document.getElementById("score-player1")
const scorePlayer2 = document.getElementById("score-player2")
const container = document.getElementById("main-container")
const velocidad = 10;
let ballX = container.offsetWidth/2
let ballY = container.offsetHeight/2
let ballSpeedX
let ballSpeedY
let pos1_Y = 0;
let pos2_Y = 0;

const keysPressed = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false,
};

document.addEventListener("keydown", (event) => {
  if (event.key in keysPressed) {
    event.preventDefault(); // evita el scroll
    keysPressed[event.key] = true
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false
  }
});

function gameLoop() {
  const containerHeight = container.offsetHeight
  const playerHeight = player1.offsetHeight
  const maxPosicionY = containerHeight - playerHeight

  // Movimiento del jugador 1
  if (keysPressed.w) pos1_Y -= velocidad
  if (keysPressed.s) pos1_Y += velocidad

  // Movimiento del jugador 2
  if (keysPressed.ArrowUp) pos2_Y -= velocidad
  if (keysPressed.ArrowDown) pos2_Y += velocidad

  // Límites del campo
  pos1_Y = Math.max(0, Math.min(pos1_Y, maxPosicionY))
  pos2_Y = Math.max(0, Math.min(pos2_Y, maxPosicionY))

  // Aplicar posiciones
  player1.style.transform = `translateY(${pos1_Y}px)`
  player2.style.transform = `translateY(${pos2_Y}px)`

  // Bucle continuo
  requestAnimationFrame(gameLoop)
}

gameLoop()
