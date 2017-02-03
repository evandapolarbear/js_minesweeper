var icons = {
  blank: 'http://i.imgur.com/HM1e3Tbb.jpg',
  pressed: 'http://i.imgur.com/bGT8xGEb.jpg',
  exposedBomb: 'http://i.imgur.com/pTJ8Swhb.jpg',
  explodedBomb: 'http://i.imgur.com/UFmXprFb.jpg',
  flag: 'http://i.imgur.com/nLPvW15b.jpg',
  // Index is # of adjacent bombs
  bombs: [
    'http://i.imgur.com/Flqdqi1b.jpg', // 0
    'http://i.imgur.com/bM8oExob.jpg', // 1
    'http://i.imgur.com/bQKSbqYb.jpg', // 2
    'http://i.imgur.com/5jNcEeVb.jpg', // 3
    'http://i.imgur.com/BnxjHgHb.jpg', // 4
    'http://i.imgur.com/RaFrMYcb.jpg', // 5
    'http://i.imgur.com/GlwQOy0b.jpg', // 6
    'http://i.imgur.com/8ngsVa8b.jpg', // 7
    'http://i.imgur.com/lJ8P1wab.jpg'  // 8
  ]
};

let GAME_VARS = {
  xAxis: 50,
  yAxis: 50,
  bombs: 5,
  board: [],
  directions: [[-1, -1], [-1, 0], [-1, 1],
               [0, -1], [0, 1],
               [1, -1], [1, 0], [1, 1]],
  bombClasses: ['zero', 'one', 'two', 'three', 'four',
                'five', 'six', 'seven', 'eight', 'nine']
};

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

function endGame() {
  document.getElementById("closing-modal").classList.remove("hidden");
}

//counts bombs nearby
function countBombs(dom, x, y) {
  let bombsNear = 0;

  forSurroundings(x, y,(newX, newY) => {
    if (GAME_VARS.board[newX][newY] === 1){
      bombsNear++;
    }
  });

  return bombsNear;
}

//adds a class to squares next to bombs and
//recursively checks squares with no neighbor bombs
function revealSquares(dom, x, y){
  let numBombs = countBombs(dom, x, y);

  dom.classList.remove('unexplored');

  if (numBombs === 0) {
    forSurroundings(x, y, (newX, newY) => {
      let newDom = document.getElementById(newX+'-'+newY);
      if (newDom.classList.contains("unexplored")){
        revealSquares(newDom, newX, newY);
      }
    });
  }

  dom.classList.add(GAME_VARS.bombClasses[numBombs]);
}

//function to make sure new pos exits on board
function squareExists(x, y) {
  return (x >= 0 && y >= 0 && x < GAME_VARS.xAxis && y < GAME_VARS.yAxis);
}

//takes a cb and applies it to all existing surrounding squares
function forSurroundings(x, y, cb){
  for(var i = 0; i < GAME_VARS.directions.length; i++){
    let newX = Number(x) + GAME_VARS.directions[i][0];
    let newY = Number(y) + GAME_VARS.directions[i][1];

    if(squareExists(newX, newY)){
      cb(newX, newY);
    }
  }
}

function setupBody(){
  document.getElementById("board").innerHTML = '';
  setupBoard();
  buildBoardDom();
}

//Iffy to set up everything
(function (){
  setupBoard();
  buildBoardDom();

  document.getElementById("restart-button").addEventListener("click", () =>{

    setupBody();
  });

  document.getElementById("start-button").addEventListener("click", () =>{
    var x = document.getElementById("x-size").value;
    var y = document.getElementById("y-size").value;

    GAME_VARS.xAxis = Number(x);
    GAME_VARS.yAxis = Number(y);

    var modal = document.getElementById("opening-modal");
    modal.classList.remove("show");
    modal.classList.add("hidden");

    setupBody();
  });

})();
