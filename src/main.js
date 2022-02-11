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
        this.playing = false;
    }    

    self.Board.prototype = {
        get elements(){
            var elements = this.bars.map(function(bar){return bar;});
            elements.push(this.ball);
            return elements;
        }
    }
})();
/**s
 */

(function(){
    self.Ball = function(x,y,radius,board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.board = board;
        this.direction = 1;
        this.speed_y = 0;
        this.speed_x = 3;
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI/12;

        this.speed = 3;

        board.ball = this;
        this.kind = "circle";
    }
    self.Ball.prototype = {

        move: function(){

            this.x += (this.speed_x * this.direction);

            this.y += (this.speed_y);
        },
        get width(){
            return this.radius*2;

        },
        get height(){
            return this.radius*2;

        },

        collision: function(bar){
            //verifica si hay colisión con una barra q recibe como paremetro.
            var relative_intersect_y = (bar.y + (bar.height/2))-this.y;

            var normalized_intersect_y = relative_intersect_y / (bar.height/2);

            this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;

            this.speed_y = this.speed * -Math.sin(this.bounce_angle);
            this.speed_x = this.speed * Math.cos(this.bounce_angle);

            if(this.x > (this.board.width/2)) this.direction = -1;
            else this.direction = 1;

        }
    }



})();


(function(){
    self.Bar = function(x,y,width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangle";
        this.speed = 15;

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


        check_collisions: function(){
            for (var index = this.board.bars.length - 1; index >= 0 ; index--) {
                var bar = this.board.bars[index];
                if(hit(bar, this.board.ball)){
                    this.board.ball.collision(bar);
                }
                
            };
             

        },
        
        play: function(){
            if(this.board.playing){
                this.clean();
                this.draw();
                this.check_collisions();
                this.board.ball.move();
            }
        }
    }

    function hit(a,b){
        //revisa si a colisiona con b.
        var hit = false;
        //colisiones horizontales
        if(b.x + b.width >= a.x && b.x < a.x + a.width){
            //colisiones verticales.
            if(b.y + b.height >= a.y && b.y < a.y + a.height)
                hit = true;
        }
        //colision de a con b
        if(b.x <= a.x && b.x + b.width >= a.x + a.width){
            if( b.y <= a.y && b.y + b.height >= a.y + a.height)
            hit = true;     
    
        }
        //colisiones de b con a
        if(a.x <= b.x && a.x + a.width >=b.x + b.width){
            if(a.y <=b.y && a.y + a.height >= b.y + b.height)
            hit = true;
        }
        return hit;


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
var ball = new Ball(400, 200, 10, board);

var line = new Bar(1, 1, 800, 2, board);
var line = new Bar(1, 399, 800, 2, board);


//  ANTES SE UTILIZABA setInterval(main,100); antes de html5

/**
 * se identifican los keycodes de las teclas arriba y abajo
 * 
 */

document.addEventListener("keydown", function(ev){

    if(ev.keyCode === 38){
        ev.preventDefault();
        bar.up();
    }
    else if(ev.keyCode === 40){
        ev.preventDefault();

        bar.down();
    }
    else if(ev.keyCode === 104){
        ev.preventDefault();
        bar_2.up();
    }
    else if(ev.keyCode === 98){
        ev.preventDefault();
        bar_2.down();
    }
    else if(ev.keyCode === 32){
        ev.preventDefault();
        board.playing = !board.playing;
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



 board_view.draw();


 window.requestAnimationFrame(controller);

 setTimeout(function(){
    ball.direction = -1;


 },1000);

function controller(){

    board_view.play();
    
    requestAnimationFrame(controller);


}