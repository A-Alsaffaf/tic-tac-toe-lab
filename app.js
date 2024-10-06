/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
// let boxNumber
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const gameBoard = document.querySelector('.board')
const resetBtnEl = document.querySelector("#reset")
/*-------------------------------- Functions --------------------------------*/
const render = () => {
  updateBoard()
  updateMessage()
}

const init = () => {
  console.log('init function works fine!')
  board = ['', '', '', '', '', '', '', '', '']
  turn = 'X'
  winner = false
  tie = false
  render()
}

const updateBoard = () => {
  board.forEach((sqr, index) => {
    squareEls[index].textContent = sqr
  })
}

const updateMessage = () => {
  if (winner === false && tie === false) {
    messageEl.textContent = ` It's player '${turn}' turn`
  } else if (winner === false && tie === true) {
    messageEl.textContent = `It's a TIE !`
  } else {
    messageEl.textContent = `Congrats ${turn}, You have Won`
  }
}

const handleClick = (event) => {
  const squareIndex = event.target.id
  console.log(squareIndex)
  if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
    return
  } else if (winner === true) {
    return
  } else {
    
    placePiece(squareIndex)
    updateBoard()
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    updateMessage()
    
  }
}

const placePiece = (index) => {
  board[index] = turn
  console.log(board[index])
  console.log(board);
  
}

const checkForWinner = () => {
  let a
  let b
  let c
  winningCombos.forEach((combo) => {
    a = combo[0]
    b = combo[1]
    c = combo[2]

    if (board[a] !== "") {
      if (board[a] === board[b]) {
        if (board[a] === board[c]) {
          winner = true
          console.log(winner);
          console.log(turn, "is the winner");
        }
      }
    }
  })
}


const checkForTie = () => {
  if (winner === true) {
    return
  }else if (board.includes("")) {
    console.log("Hey The baord array still contains an empty element");
    tie = false
    console.log("tie is: ",tie);
  }else if (!board.includes("")) {
    tie = true
  }
}

const switchPlayerTurn = () => {
  if (winner === true) {
    return
  }else if (turn === "X") {
    turn = "O" 
  }else if (turn === "O") {
    turn = "X"
  }
}

/*----------------------------- Event Listeners -----------------------------*/
// gameBoard.addEventListener('click', (event) => {
//   handleClick(event)
// })

squareEls.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    handleClick(event)
  })
})

resetBtnEl.addEventListener("click", (event) => {
  init()
})