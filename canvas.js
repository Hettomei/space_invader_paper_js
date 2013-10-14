val = {
  canvas_x: 640,
  canvas_y: 480,
};

view.viewSize =  new Size(val.canvas_x, val.canvas_y);

var ship = new Ship();
var fire_controller = new FireController(ship);
ship.position = new Point(val.canvas_x / 2, val.canvas_y - 15);

var alien = new Alien();
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
