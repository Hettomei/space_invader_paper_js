val = {
  canvas_x: 640,
  canvas_y: 480,
};

view.viewSize =  new Size(val.canvas_x, val.canvas_y);

var ship = new Ship();
var fire_controller = new FireController(ship);
ship.position = new Point(val.canvas_x / 2, val.canvas_y - 15);

var alien_controller = new AlienController();
alien_controller.generate(20, 3);
/* event */
function onMouseMove(event) {
  // Whenever the user moves the mouse, move the path
  // to that position:
  ship.position.x = event.point.x;
  if(ship.position.x < 20){
    ship.position.x = 20;
  }else if(ship.position.x > val.canvas_x - 20){
    ship.position.x = val.canvas_x - 20;
  }
}

function onMouseUp(event) {
  fire_controller.new_fire();
}

function onKeyDown(event) {
  if (event.key == 'space') {
    fire_controller.new_fire();
  }

  if (event.key == 'left') {
    ship.position += new Point(-5, 0);
  }

  if (event.key == 'right') {
    ship.position += new Point(5, 0);
  }

  // Prevent the key event from bubbling
  return false;
}

function onFrame(event) {
  fire_controller.move_all();
  alien_controller.move_all();
}
/* entity */

function Fire(){
  this.fire = new Path();

  this.fire.fillColor = 'red';

  this.fire.add(new Point(0, 15));
  this.fire.add(new Point(3, 0));
  this.fire.add(new Point(6, 15));

  return this.fire;
}

function Ship(){
  this.ship = new Path();

  this.ship.strokeColor = 'black';

  this.ship.add(new Point(0, 30));
  this.ship.add(new Point(10, 0));
  this.ship.add(new Point(20, 30));
  this.ship.add(new Point(30, 0));
  this.ship.add(new Point(40, 30));

  this.ship.closed = true;

  return this.ship;
}

function Alien(){
  this.alien = new Path();

  this.alien.strokeColor = 'green';

  this.alien.add(new Point(0, 10));
  this.alien.add(new Point(4, 0));
  this.alien.add(new Point(8, 10));
  this.alien.add(new Point(6, 20));
  this.alien.add(new Point(4, 10));
  this.alien.add(new Point(2, 20));
  this.alien.closed = true;

  return this.alien;
}

/* Controller */
function FireController(ship){
  this.list = [];
  this.ship = ship;
  this.LEFT = 0;
  this.RIGHT = 1;
  this.side = this.LEFT;

  this.move_all = function(){
    for(var i = 0; i < this.list.length; i++){
      this.list[i].position += new Point(0, -10);
    }
  };

  this.add = function(fire){
    this.list.push(fire);
  };

  this.new_fire = function(){
    var fire = new Fire();
    if(this.side === this.LEFT){
      fire.position = this.ship.position + new Point(-10, -10);
      this.side = this.RIGHT;
    }else{
      fire.position = this.ship.position + new Point(10, -10);
      this.side = this.LEFT;
    }
    this.add(fire);
  }
}
function AlienController(){
  this.list = [];

  this.UP     = new Point(0, -1);
  this.BOTTOM = new Point(0, 1);
  this.LEFT   = new Point(-1, 0);
  this.RIGHT  = new Point(1, 0);

  this.go_to = this.RIGHT;
  this.last_position = null; // usefull to know were we are during the move

  this.generate = function(count_row, count_line){
    for(var i = 0; i< count_row; i++){
      for(var j = 0; j< count_line; j++){
        var alien = new Alien();
        alien.position = new Point(i * 20 + 10, j * 30 + 10);
        this.list.push(alien);
      }
    }
  }
  this.move_all = function(){

    this.check_and_change_go_to();

    for(var i = 0; i < this.list.length; i++){
      this.list[i].position += this.go_to;
    }

  };

  this.check_and_change_go_to = function(){

    this.last_position = this.list[this.list.length - 1].position.x;
    if(this.last_position > val.canvas_x - 20){
      this.go_to = this.LEFT;
    }else if(this.list[0].position.x < 20){
      this.go_to = this.RIGHT;
    }
  };

}
