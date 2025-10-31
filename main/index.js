const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const ball = document.getElementsByClassName("ball")
const scorePlayer1 = document.getElementsByClassName("score-player1")
const scorePlayer2 = document.getElementsByClassName("score-player2")
const container = document.getElementsByClassName("main-container")
const velocidad = 10
let pos1_Y = 0
let pos2_Y = 0
const keysPressed = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false
}


document.addEventListener("keydown", (event) => {
  if (event.key in keysPressed) {
    event.preventDefault() //EVITA QUE LA PÁGINA HAGA SCROLL
    keysPressed[event.key] = true
  }
})

document.addEventListener("keyup", (event) => {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false
  }
})

function gameLoop() {
  
  if (keysPressed.w) {
    pos1_Y -= velocidad
  }
  if (keysPressed.s) {
    pos1_Y += velocidad
  }

  if (keysPressed.ArrowUp) {
    pos2_Y -= velocidad
  }
  if (keysPressed.ArrowDown) {
    pos2_Y += velocidad
  }

  const containerHeight = container.offsetHeight
  const playerHeight = player1.offsetHeight
  

  const maxPosicionY = containerHeight - playerHeight


  // Comprobamos Jugador 1
  if (pos1_Y < 0) {
    pos1_Y = 0
  }
  if (pos1_Y > maxPosicionY) {
    pos1_Y = maxPosicionY 
  }

  // Comprobamos Jugador 2
  if (pos2_Y < 0) {
    pos2_Y = 0
  }
  if (pos2_Y > maxPosicionY) {
    pos2_Y = maxPosicionY
  }

  player1.style.transform = `translateY(${pos1_Y}px)`
  player2.style.transform = `translateY(${pos2_Y}px)`

  // Vuelve a llamar a esta función en el próximo frame
  // Esto crea un bucle infinito y fluido (60fps)
  requestAnimationFrame(gameLoop)
}

gameLoop()



