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
            //elements.push(this.ball);
            return elements;
        }
    }
})();
/**s
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
        this.speed = 7;

    }

    /**doc2 */

    self.Bar.prototype ={
        down:function(){
            this.y += this.speed;

        },
        up: function(){
            this.y -= this.speed;        
        },
        toString: function(){
            return "x: "+ this.x +" y: "+ this.y ;
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

    /**
     * la funcion clean lo que hace es borrar el rectangula anterior
     * this asigna las dimensiones del board-
     */

    self.BoardView.prototype = {

        clean: function(){
            this.context.clearRect(0,0,this.board.width, this.board.height);
        },

        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var el = this.board.elements[i];
                
                draw(this.context, el);
            };
        },
        play: function(){
            this.clean();
            this.draw();
        }
    }


     /**la función draw dibuja a partir del conexto y del elemento
      *  
      */

    function draw(context, element){
               
        switch(element.kind){

            case "rectangle":
                context.fillRect(element.x, element.y, element.width, element.height);
                break;
            case "circle":
                context.beginPath();
                context.arc(element.x, element.y, element.radius,0,7);
                context.fill();
                context.closePath();
                break;   
                         
    
         }
    

    }

})();

var board = new Board(800,400);
var bar = new Bar(20, 100, 40, 100, board);
var bar_2 = new Bar(700, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);
//var ball = new Ball(400, 200, 10, Board);

//  setInterval(main,100); antes de html5

/**
 * se identifican los keycodes de las teclas arriba y abajo
 * 
 */

document.addEventListener("keydown", function(ev){

    ev.preventDefault();

    if(ev.keyCode == 38){
        bar.up();
    }
    else if(ev.keyCode == 40){
        bar.down();
    }
    else if(ev.keyCode == 104){
        bar_2.up();
    }
    else if(ev.keyCode == 98){
        bar_2.down();
    }
    //de ambas formas se puede

    console.log(bar.toString());
    console.log(""+bar_2);

})



/**
 * Manda a llamar la funcion main, se puede omitir windows.
 * puede poner self, es un scope global, se puede accederdesde cualquier parte
 * del script.
 * 
*/
//self.addEventListener("load", main);

/**doc
 * la clase main instancia nuestros objetos y le pasa a la vista el 
 * modelo que es el board.
 */

 window.requestAnimationFrame(controller);


function controller(){

    board_view.play();
    
    window.requestAnimationFrame(controller);


}