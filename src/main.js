/**
 * Se engloban en funciones globales para evitar tener funciones
 * flotando en memoria.
 * las funciones anonimas tambien se utilizan para declarar objetos.
 * 
 */

(function(){

    /**doc1
     * estoes un modelo del tablero y su prototipo
     */
    self.Board = function(width, height){
        this.width = width;
        this.height = height;
        this.playing = false;
        this.game_over = false;
        this.bars = [];
        this.ball = null;
    }    

    self.Board.prototype = {
        get elements(){
            var elements = this.bars;
            elements.push(this.ball);
            return elements;
        }
    }


})();
    /**se define la funcion anonuma para las barras
     * recibe 4 parámetros y es tipo rectangulo.
     */
(function(){
    self.Bar = function(x,y,width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";          
    }

    /**doc2 */
    self.Bar.prototype ={
        down:function(){

        },
        up: function(){

        }
    }
})();


 /**doc 
  * esto es una vista
 */
(function(){
    self.BoardView = function(canvas,board){

        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.context = canvas.getContext("2d");
                
    }

    self.BoardView.prototype = {
        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                
                draw(this.context, el);
            };
        }
    }


     /**la función draw dibuja a partir del conexto y del elemento
      *  
      */

    function draw  (context, element){

        if(element !== null && element.hasOwnProperty("kind")){
            switch(element.kind){
                case "rectangle":
                    context.fillRect(element.x, element.y, element.width, element.height)
                    break;
                case "ball":
                context.fillRect(element.x, element.y, element.width, element.height)

                
        
            }
        }

    }

})();

/**
 * Manda a llamar la funcion main, se puede omitir windows.
 * puede poner self, es un scope global, se puede accederdesde cualquier parte
 * del script.
 * 
*/
self.addEventListener("load", main);

/**doc
 * la clase main instancia nuestros objetos y le pasa a la vista el 
 * modelo que es el board.
 */
function main(){
    var board = new Board(800,400);
    var bar = new Bar(20, 100, 40, 100, board);
    var bar = new Bar(700, 100, 40, 100, board);

    var canvas = document.getElementById('canvas');
    var board_view = new BoardView(canvas, board);
    board_view.draw();
     


}