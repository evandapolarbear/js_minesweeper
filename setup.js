//set board to have bombs
function setupBoard() {
  let bombsPlaced = 0;
  let test = [];

  for (let i = 0; i < GAME_VARS.xAxis; i++) {
    let row = [];
    for (let j = 0; j < GAME_VARS.yAxis; j++) {
      row.push(0);
    }
    GAME_VARS.board.push(row);
  }

  while (bombsPlaced < GAME_VARS.bombs) {
    let xI = Math.floor(Math.random() * GAME_VARS.xAxis);
    let yI = Math.floor(Math.random() * GAME_VARS.yAxis);

    if (GAME_VARS.board[xI][yI] === 0) {
      test.push([xI, yI]);
      GAME_VARS.board[xI][yI] = 1;
      bombsPlaced++;
    }
  }
  console.log(test);
}

//create board dom elemets
function buildBoardDom(){
  let domBoard = document.getElementById('board');

  for (let i = 0; i < GAME_VARS.xAxis; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < GAME_VARS.yAxis; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("unexplored");
      square.setAttribute("id", i + "-" + j);

      square = addSquareListners(square);


      row.appendChild(square);
    }
    domBoard.appendChild(row);
  }
}

function addSquareListners(dom){
  const x = dom.id[0];
  const y = dom.id[2];

  dom.addEventListener("click", e => {
    if(dom.classList.contains("unexplored")){
      dom.classList.remove("unexplored");

      if(GAME_VARS.board[x][y] === 1){
        dom.classList.add("bomb");
        endGame();
      } else {
        revealSquares(dom, x, y);
      }
    }
  });

  dom.addEventListener("contextmenu", e =>{
    console.log(e);
    e.preventDefault();
    if(dom.classList.contains("unexplored")){
      dom.classList.remove("unexplored");
      dom.classList.add("flag");
    } else if (!dom.classList.contains("unexpored")){
      dom.classList.remove("flag");
      dom.classList.add("unexplored");
    }
  });

  return dom;
}
