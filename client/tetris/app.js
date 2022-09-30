document.addEventListener('DOMContentLoaded',() => {
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const ScoreDisplay = document.querySelector('#score')
  const StartBtn = document.querySelector('#start-button')
  const width = 10;
  let nextRandom = 0

//Tetrominoes

  const lTetromino = [
      [1, width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
  ]
  const zTetromino = [
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1],
      [0, width, width + 1, width * 2 + 1],
      [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

  const tTetromino = [
      [1, width, width + 1, width + 2],
      [1, width + 1, width + 2, width * 2 + 1],
      [width, width + 1, width + 2, width * 2 + 1],
      [1, width, width + 1, width * 2 + 1]
    ]

  const oTetromino = [
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1],
      [0, 1, width, width + 1]
    ]

  const iTetromino = [
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3],
      [1, width + 1, width * 2 + 1, width * 3 + 1],
      [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

//Ramdon Selection
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRotation]

//draw the first rotation
  function draw(){
      current.forEach(index => {
          squares[currentPosition+index].classList.add('tetromino')
      })
  }
  
//undraw the tet
  function undraw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

//interval
  timerId = setInterval(moveDown, 1000)

//freeze
function freeze(){
  if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      
    random = nextRandom
    nextRandom = Math.floor(Math.random() * theTetrominoes.length)
    current = theTetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
    displayShape()
  }
}  

//keyCode
  function control(e){
    if(e.keyCode === 37){
      moveLeft()
    }else if(e.keyCode === 38 ){
      rotate()
    }else if(e.keyCode === 39){
      moveRight()
    }else if(e.keyCode === 40){
      moveDown()
    }

  }
  document.addEventListener('keyup', control)
//key movement
  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -= 1

    if(current.some(index => 
      squares[currentPosition + index].classList.contains('taken'))){
        currentPosition += 1  
    }
    draw()
  }

  function moveRight(){
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    
    if(!isAtRightEdge) currentPosition += 1

    if(current.some(index => 
      squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -= 1  
    }
    draw()
  }

  function moveDown(){
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  function rotate(){
    undraw()
    currentRotation ++
    if(currentRotation === current.length){ //turn it back 0 if it gets to 4
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()
  }

//show up next
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0

  //no rotation
const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth*2+1, 2],
  [0, displayWidth, displayWidth+1, displayWidth*2+1],
  [1, displayWidth, displayWidth+1, displayWidth+2],
  [0, 1, displayWidth, displayWidth+1],
  [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
]
  //display
function displayShape(){
  displaySquares.forEach(squares => {
    squares.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach(index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}



















})