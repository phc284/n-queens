/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// var something = function (board, solutions, row, column, count) {
//   var boardSize = this.get('n');
//   for (; row < boardSize; row++) {
//     //iterate through the column
//     for (; column < boardSize; column++) {
//       //toggle the index on
//       board.togglePiece(row, column);
//       //check if there are row or column conflicts  
//       if (board.hasAnyColConflicts() || board.hasAnyRowConflicts()) {
//         //if true, toggle the index off
//         board.togglePiece(row, column);
//       }
//     }
//   }

//   var solutionFound = solutions.reduce(function(acc, item) {
//     if (JSON.stringify(board) === JSON.stringify(item)) {
//       acc = true;
//     }
//   }, false);
//   if (!solutionFound) {
//     solutions.push(board);
//     count++;
//   }

//   something(board, solutions, row + 1, column, count);

// };


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  //instantiate a new board
  var rookBoard = new Board({'n': n});
  var boardSize = n;
  var solution = rookBoard.rows(); //fixme
  
  // //iterate through each value of row
  // for (var row = 0; row < boardSize; row++) {
  //   //iterate through the column
  //   for (var column = 0; column < boardSize; column++) {
  //     //toggle the index on
  //     rookBoard.togglePiece(row, column);
  //     //check if there are row or column conflicts  
  //     if (rookBoard.hasAnyColConflicts() || rookBoard.hasAnyRowConflicts()) {
  //       //if true, toggle the index off
  //       rookBoard.togglePiece(row, column);
  //     }
  //   }
  // }
  var solutionFinder = function(board, i = 0, j = 0) {
    // var i = 0; //row
    // var j = 0; //column

    if (i < boardSize) {
      board.togglePiece(i, j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i, j);
        solutionFinder(board, i, j + 1);
      } else {
        solutionFinder(board, i + 1, 0);
      }
    }
  };

  solutionFinder(rookBoard);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  if (n === 0) {
    return 1;
  }

  var solutionCount = n * this.countNRooksSolutions(n - 1); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  //if we add a 1 anywhere other than [0,0] or [0,1] on the first row, the function will always add a 1 to [1,0]
  //we want to figure out how to keep the 1 in the first row, but change where the 1 is on the second row
  //if the solution does not work.


  var queenBoard = new Board({'n': n});
  var solution = queenBoard.rows(); //fixme
  var boardSize = n;

  // //if board size is 2 or 3, there is no solution
  // var inner = function (board, row, column) {
  //   var toggled = [];
  //   //iterate through each value of row
  //   for (var i = row; i < boardSize; i++) {
  //     //if row is greater than 0, want j to equal 0
  //     if (i > 0) {
  //       var j = 0;
  //     } else {
  //       var j = column;
  //     }
  //     //iterate through the column
  //     for ( ;j < boardSize; j++) {
  //       //toggle the index on
  //       board.togglePiece(i, j);
  //       //push the row value pair to toggled array
  //       toggled.push([i, j]);
  //       //check if there are row or column conflicts  
  //       if (board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()) {
  //         //if true, toggle the index off
  //         board.togglePiece(i, j);
  //         //remove the pair from toggled array
  //         toggled.pop();
  //       }
  //     }
  //   }

  //   if (boardSize === toggled.length) {
  //     return;
  //   } else {
  //     //clearing board back to zeros
  //     toggled.forEach(function (item) {
  //       board.togglePiece(item[0], item[1]);
  //     });
  //     //console.log(JSON.stringify(board));
  //     inner(board, row, column + 1);
  //   }
  // };
  // //When calling inner and column is greater than zero, column in loop will always start at 1,2,3,etc....... instead of 0
  // //debugger;
  // inner(queenBoard, 0, 0);
  if (n === 2 || n === 3) {
    var solutionBoard = new Board ({'n': n});
    return solution = solutionBoard.rows();
  }

  var solutionFinder = function(board, i = 0, j = 0) {
    // var i = 0; //row
    // var j = 0; //column

    if (i < boardSize) {
      board.togglePiece(i, j);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(i, j);
        solutionFinder(board, i, j + 1);
      } else {
        solutionFinder(board, i + 1, 0);
      }
    }
  };

  solutionFinder(queenBoard);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var inner = function (rows) {
    if (rows === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(rows, i);
      if (!board.hasAnyQueensConflicts()) {
        inner(rows + 1);
      }
      board.togglePiece(rows, i);
    }
  };

  inner(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
