/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  //instantiate a new board
  var rookBoard = new Board({'n': n});
  var boardSize = n;
  var solution = rookBoard.rows(); //fixme
  
  //iterate through each value of row
  for (var row = 0; row < boardSize; row++) {
    //iterate through the column
    for (var column = 0; column < boardSize; column++) {
      //toggle the index on
      rookBoard.togglePiece(row, column);
      //check if there are row or column conflicts  
      if (rookBoard.hasAnyColConflicts() || rookBoard.hasAnyRowConflicts()) {
        //if true, toggle the index off
        rookBoard.togglePiece(row, column);
      }
    
    }
  }
      
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var queenBoard = new Board({'n': n});
  var solution = queenBoard.rows(); //fixme
  var boardSize = n;

  //if board size is 2 or 3, there is no solution
  // if (boardSize === 2 || boardSize === 3) {
  //   return [];
  // }
  var inner = function (board, row, column) {
    var toggled = [];
    //iterate through each value of row
    for (var row = row; row < boardSize; row++) {
      //iterate through the column
      for (var column = column; column < boardSize; column++) {
        //toggle the index on
        board.togglePiece(row, column);
        toggled.push([row, column]);
        //check if there are row or column conflicts  
        if (board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
          //if true, toggle the index off
          board.togglePiece(row, column);
          toggled.pop();
        }
      }
    }

    if (boardSize === toggled.length) {
      return;
    } else {
      //clearing board back to zeros
      toggled.forEach(function (item) {
        board.togglePiece(item[0], item[1]);
      });
      console.log(JSON.stringify(board));
      inner(queenBoard, row, column + 1);
    }
  };
  //need helper function that adds all pieces on board
    //call this function somewhere in recursive function to see if it equals n
    //if it doesn't equal n, then recurse
  //call recursive function
  inner(queenBoard, 0, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
