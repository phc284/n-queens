// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          count++;
        }
      } 
      if (count > 1) {
        return true;
      } // fix me
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowSize = this.get('n');
      var hasConflict = false;
      for (var i = 0; i < rowSize; i++) {
        if (this.hasRowConflictAt(i)) {
          hasConflict = true;
        }
      }
      return hasConflict; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //declare count variable
      //iterate through each row
        //find the value of the column index
        //add that value to the count variable
      //if count is greater than 1, return true
      // else return false
      var count = 0;
      var boardSize = this.get('n');
      for (var i = 0; i < boardSize; i++) {
        count += this.get(i)[colIndex];
      }
      if (count > 1) {
        return true;
      }  
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardSize = this.get('n');
      var hasColConflict = false;
      for (var i = 0; i < boardSize; i++) {
        if (this.hasColConflictAt(i)) {
          hasColConflict = true;
        }
      }
      return hasColConflict; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //declare count variable
      var count = 0;
      //decalre var for size of board
      var boardSize = this.get('n');
      var columnIndex = majorDiagonalColumnIndexAtFirstRow;
      //iterate through each row
      for (var rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        if (columnIndex < boardSize) {
          if (this.get(rowIndex)[columnIndex] === undefined) {
            count += 0;
          } else {
            //add value of element at input index+1
            count += this.get(rowIndex)[columnIndex];
          }
          columnIndex++;
        }
      }
      //if count variable is greater than 1
      if (count > 1) {
        //return true
        return true;
      }
      //else return false
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //declare var for board size
      var boardSize = this.get('n');
      //declare boolean if there is any major diagonal conflict
      var hasDiagConflict = false;

      //iterate through columns
      for (var j = 2 - boardSize; j < boardSize - 1; j++) {
        //check each major diagonal at column index for conflict
        if (this.hasMajorDiagonalConflictAt(j)) {
          return true;
        }
      }
      // }
      return false; // fixme

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var count = 0;
      var boardSize = this.get('n');
      var columnIndex = minorDiagonalColumnIndexAtFirstRow;
      
      //iterate backwards through first row'
      for (var rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        //if value at non-existing index 
        if (this.get(rowIndex)[columnIndex] === undefined) {
          //add nothing to count
          count += 0;
        } else {
          //else add value of index
          count += this.get(rowIndex)[columnIndex];
        }
        //decrement column index
        columnIndex--;
      }
        
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardSize = this.get('n');
      var hasConflict = false;
      
      for (var i = boardSize + 2; i >= 0; i--) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
