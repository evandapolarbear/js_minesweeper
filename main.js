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
  xAxis: 100,
  yAxis: 100,
  bombs: 5,
  board: [],
  bombIdxs: [],
  directions: [[-1, -1], [-1, 0], [-1, 1],
               [0, -1], [0, 1],
               [1, -1], [1, 0], [1, 1]],
  bombClasses: ['zero', 'one', 'two', 'three', 'four',
                'five', 'six', 'seven', 'eight', 'nine']
};

function endGameLoss() {
  document.getElementById("closing-modal").classList.remove("hidden");
}

function endGameWin(){
  GAME_VARS.bombIdxs.forEach(ele => {
    var x = ele[0];
    var y = ele[1];
    var domELe = document.getElementById(x + '-' + y);

    domELe.classList.remove("flag");
    domELe.classList.add("exposed");

    document.getElementById("close-message").innerHTML = "You Won!";
    document.getElementById("closing-modal").classList.remove("hidden");
  });
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

  console.log(numBombs);
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


//Checks to see if all bombs flagged
function checkForEnd(){
  var bool = GAME_VARS.bombIdxs.every(ele => {
    var x = ele[0];
    var y = ele[1];

    var domEL = document.getElementById(x + '-' + y);

    if(domEL.classList.contains("flag")){
      return true;
    }
  });

  if (bool) {
    endGameWin();
  }
}

//Iffy to set up everything
(function (){
  buildBoardDom();

  //handle click on restart button at end of game
  document.getElementById("restart-button").addEventListener("click", () =>{
    window.location.reload();
  });


  //handle start button click and set up
  document.getElementById("start-button").addEventListener("click", combineSetup);

  //check for all bombs flagged on interval
  setInterval(checkForEnd, 10);

})();
