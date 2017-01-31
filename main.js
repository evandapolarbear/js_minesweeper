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
  xAxis: 6,
  yAxis: 6,
  bombs: 10,
  board: []
};

//set board to have bombs
function setupBoard() {
  let bombsPlaced = 0;

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
      square.classList.add(i);
      square.classList.add(j);

      square = addSquareListners(square);


      row.appendChild(square);
    }
    domBoard.appendChild(row);
  }
}

function addSquareListners(dom){
  const x = dom.classList[2];
  const y = dom.classList[3];

  dom.addEventListener("click", e => {
    dom.classList.remove("unexplored");

    if(GAME_VARS.board[x][y] === 1){
      dom.classList.add("bomb");
      endGame();
    } else {
      revealSquares(dom, x, y)
    }
  });

  return dom;
}

function endGame() {
  console.log("Game Over");
}

function revealSquares(dom, x, y) {
  let bombsNear = 0;
  const directions = [[-1, -1], [-1, 0], [-1, 1],
                      [0, -1], [0, 1],
                      [1, -1], [1, 0], [1, 1]];

  //Counts Number of nearby Bombs
  directions.forEach(neighbor => {
    let newX = Number(x) + neighbor[0];
    let newY = Number(y) + neighbor[1];

    if(GAME_VARS.board[newX][newY] === 1) {
      bombsNear++;
    }
  });

  console.log(bombsNear);

  //If Nearby Bombs === 0 recures through neighbors and reveal cells else, else add appropriate num class
  // if(bombsNear === 0) {
  //   directions.forEach(neighbor => {
  //     let newX = x + neighbor[0];
  //     let newY = y + neighbor[1];
  //
  //   });
  // }
}


setupBoard();
buildBoardDom();
