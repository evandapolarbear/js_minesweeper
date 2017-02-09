function setupBody(){
  let board = document.getElementById("board");

  board.innerHTML = '';

  board.classList.add("board-margin");

  setupBoard();
  buildBoardDom();
}

//set board to have bombs
function setupBoard() {
  let bombsPlaced = 0;

  GAME_VARS.bombIdxs = [];
  GAME_VARS.board = [];

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
      GAME_VARS.bombIdxs.push([xI, yI]);
      GAME_VARS.board[xI][yI] = 1;
      bombsPlaced++;
    }
  }
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
        endGameLoss();
      } else {
        revealSquares(dom, x, y);
      }
    }
  });

  dom.addEventListener("contextmenu", e =>{
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

function parseAxis(){
  // var x = document.getElementById("x-size").value;
  // var y = document.getElementById("y-size").value;
  //
  // GAME_VARS.xAxis = Number(x);
  // GAME_VARS.yAxis = Number(y);

  GAME_VARS.xAxis = 10;
  GAME_VARS.yAxis = 10;

  var modal = document.getElementById("opening-modal");
  modal.classList.remove("show");
  modal.classList.add("hidden");
}

function setBombs() {
  // var x = GAME_VARS.xAxis;
  // var y = GAME_VARS.yAxis;
  //
  // var numBombs = Math.round((x * y) / 15)
  //
  // if (numBombs < 6){
  //   numBombs = 6;
  // }
  //
  // GAME_VARS.bombs = numBombs;
  GAME_VARS.bombs = 10;
}

function combineSetup() {
  console.log("setup time");

  parseAxis();
  setBombs();
  setupBody();
}
