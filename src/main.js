/**
 * Se engloban en funciones globales para evitar tener funciones
 * flotando en memoria 
 * 
 */

(function(){

    /**doc */
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;

    }
    /**doc */
    self.Board.prototype = {

        get elements(){
            var elements = this.bars;
            elements.push(ball);
            return elements;
            
        }

    }

})();

 /**doc */
(function(){
    self.BoardView = function(canvas,board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.context = canvas.getContext("2d");
                
    }
})();

/**
 * Manda a llamar la funcion main, se puede omitir windows.
 * puede poner self, es un scope global, se puede accederdesde cualquier parte
 * del script.
 * 
*/
window.addEventListener("load", main);

/**doc */
function main(){
    var board = new Board(800,400);
    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas, board);

}