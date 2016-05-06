// Call function getNextMove(player, coord)
// player = 'computer' or 'human'
// coord is an element in [0,1,2,3,4,5,6,7,8]
// The function returns an element in [0,1,2,3,4,5,6,7,8]
// as the computer's next move, 'computer', 'human', or 'tie'



var app = {
    // playerX goes first
    playerX : 'computer',
    playerO : 'human',
    playerXMoves : [],
    playerOMoves : [],
    board : [],
    gameState: 'continue',
    wins : [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],

    move: function(player, coord) {
        // error handling to check if the position has already been filled
        if (this.board.indexOf(coord) > -1)
        {
            return {
                error: 1,
                message: 'Position already filled'
            }
        }
        this._updateBoard(player, coord);
        var nextMove = app._getNextMove(app._otherPlayer(player))[0];
        if (!isNaN(nextMove))
            this._updateBoard(this._otherPlayer(player), nextMove);
        return {move: nextMove};
    },

    _updateBoard: function(player, coord) {
        this.board.push(coord);
        if (player == app.playerX)
            this.playerXMoves.push(coord);
        else
            this.playerOMoves.push(coord);
    },

    _undoBoard: function(player, coord) {
        this.board.pop();
        if (player == app.playerX)
            this.playerXMoves.pop();
        else
            this.playerOMoves.pop();
    },

    _otherPlayer: function(player) {
        if (player == app.playerX)
            return app.playerO;
        else
            return app.playerX;
    },

    _isSubArray: function(winningCombo, playerMoves) {
        for(var i = 0; i < winningCombo.length; i++) {
            if (playerMoves.indexOf(winningCombo[i]) == -1)
                return false;
        }
        return true;
    },

    _getBoardStatus: function() {
        for(var i = 0; i < this.wins.length; i++) {
            if (this._isSubArray(this.wins[i], this.playerXMoves))
                return app.playerX;
            else if (this._isSubArray(this.wins[i], this.playerOMoves))
                return app.playerO;
        }
        if (this.board.length == 9)
            return 'tie';
        else
            return 'continue';
    },

    _getAvailableMoves: function() {
        return [0,1,2,3,4,5,6,7,8].filter(function(elem) {
            return app.board.indexOf(elem) == -1;
        });
    },

    // _getNextMove() utilizes the minimax algorithm
    _getNextMove: function(player) {
        this.gameState = this._getBoardStatus()
        if(this.gameState == this.playerX)
            return [this.playerX, 1];
        else if (this.gameState == this.playerO)
            return [this.playerO, -1];
        else if (this.gameState == 'tie')
            return ['tie', 0];
        else {
            var best = null;
            var nextMove = null;
            var availableMoves = app._getAvailableMoves();

            for(var i = 0; i < availableMoves.length; i++) {
                this._updateBoard(player, availableMoves[i]);
                result = this._getNextMove(app._otherPlayer(player));
                var score = result[1];
                this._undoBoard(player);

                if(best == null || (player == app.playerX && score > best) ||
                  (player == app.playerO && score < best)) {
                    best = score;
                    nextMove = availableMoves[i];
                }
                // Below exits the for loop as soon as a player makes a move that
                // gives it its best possible score
                if((player == app.playerX && best == 1) ||
                    (player == app.playerO && best == -1)){
                    break;
                }
            }
            return [nextMove, best];
        }
    }
}



////
// FOR TESTING PURPOSES
//
// console.log(app.move('human', 4));
// console.log(app.board, app.playerOMoves, app.playerXMoves);
// console.log(app.move('human', 1));
// console.log(app.board, app.playerOMoves, app.playerXMoves);
// console.log(app.move('human', 6));
// console.log(app.board, app.playerOMoves, app.playerXMoves);
// console.log(app.move('human', 5));
// console.log(app.board, app.playerOMoves, app.playerXMoves);
// console.log(app.move('human', 8));
// console.log(app.board, app.playerOMoves, app.playerXMoves);

console.log(app.move('computer', 4));
console.log(app.board, app.playerOMoves, app.playerXMoves);
console.log(app.move('computer', 4));
console.log(app.board, app.playerOMoves, app.playerXMoves);
console.log(app.move('computer', 1));
console.log(app.board, app.playerOMoves, app.playerXMoves);
console.log(app.move('computer', 6));
console.log(app.board, app.playerOMoves, app.playerXMoves);
console.log(app.move('computer', 5));
console.log(app.board, app.playerOMoves, app.playerXMoves);
console.log(app.move('computer', 8));
console.log(app.board, app.playerOMoves, app.playerXMoves);
