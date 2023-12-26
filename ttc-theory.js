const BOARD_SIZE = 3;

// Game Functionality
function GameBoard() {
    this.board = [["","",""],["","",""],["","",""]];
    this.GameFinished = function(board) {
        // Column Check//
       for (let i  = 0; i < BOARD_SIZE; i++) {
            let checker = new Set();
            for (let j = 0; j < BOARD_SIZE; j++) {
                checker.add(this.board[i][j])
                if (checker.size == 2){
                    break;
                }
            }
            if (checker.size != 2 && !checker.has("")) {
                return [...checker][0] + " Won!";
            }
        }

        //Row Check//
        for (let j  = 0; j < BOARD_SIZE; j++) {
            let checker = new Set();
            for (let i = 0; i < BOARD_SIZE; i++) {
            checker.add(this.board[i][j])
                if (checker.size == 2){
                break;
                }
            }
            if (checker.size != 2 && !checker.has("")) {
            return [...checker][0] + " Won!";
            }
        }
        //Diagonal Check
        let left_diag = new Set([this.board[0][0],this.board[1][1],this.board[2][2]])
        let right_diag = new Set([this.board[2][0],this.board[1][1],this.board[0][2]])
        if (left_diag.size != 2 && !left_diag.has("")) {
            return [...left_diag][0] + " Won!";
        }
        if (right_diag.size != 2 && !right_diag.has("")) {
            return [...right_diag][0] + " Won!";
        }
        return null;
    };
}

function Player(name,board) {
    this.name = name; //Determines if X or O
    this.board = board;
    this.Move = function(row,col) {
        if (this.board[row][col] == "") {
            this.board[row][col] = this.name
            return true;
        }
        return false;
    };
}



function Game(e) {
    //Game Needs To Store A GameBoard
    this.current_game = new GameBoard();
    //Game Needs To Store Two Players
    this.player1;
    this.player2;
    switch (e.target.innerHTML.toUpperCase()) {
        case "O":
            this.player1 = new Player("O",this.current_game.board);
            this.player2 = new Player("X",this.current_game.board);
            break;
        default:
            this.player1 = new Player("X",this.current_game.board);
            this.player2 = new Player("O",this.current_game.board);
            break;
    }
    this.PrintBoard = function() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            console.log(this.current_game.board[i])
        }
    }
}

//Event Listeners For Blocks

let current_game;
let player1_turn = true;

const buttons = document.querySelectorAll("#choice");
buttons.forEach(function(btn) {
    btn.addEventListener('click', (e) => {
        current_game = new Game(e);
        game_running = true;
    },{once:true});
});

const cells = document.querySelectorAll(".cell");
cells.forEach(function(cell) {
    console.log(cell.target);
    cell.addEventListener("click", (e) => {
        let row = cell["dataset"]["row"];
        let col = cell["dataset"]["col"];
        if (player1_turn) {
            if (current_game.player1.Move(row,col)) {
                player1_turn = false;
                e.target.innerHTML = current_game.player1.name;
            }
        }
        else {
            if (current_game.player2.Move(row,col)) {
                player1_turn = true;
                e.target.innerHTML = current_game.player2.name;
            }
        }
        let Game_Board = current_game.current_game;
        if (Game_Board.GameFinished() != null) {
        let div_result = document.createElement("div");
        const main_body = document.querySelector(".main-body");
        div_result.innerHTML = Game_Board.GameFinished();
        main_body.append(div_result);
        }
        
    })
})

