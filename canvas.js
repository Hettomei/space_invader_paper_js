val = {
  canvas_x: 640,
  canvas_y: 480,
};


view.viewSize =  new Size(val.canvas_x, val.canvas_y);



var ship = new Ship();
var fire_controller = new FireController();
ship.position = new Point(val.canvas_x / 2, val.canvas_y - 15);

/* event */
function onKeyDown(event) {
  if (event.key == 'space') {

    var fire = new Fire();
    fire.position = ship.position;
    fire_controller.add(fire);

    // Prevent the key event from bubbling
  }

  if (event.key == 'left') {

    ship.position += new Point(-5, 0);

    // Prevent the key event from bubbling
  }else if (event.key == 'right') {
    ship.position += new Point(5, 0);
  }

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

/* Controller */
function FireController(){
  this.list = [];
  this.move_all = function(){
    for(var i = 0; i < this.list.length; i++){
      this.list[i].position += new Point(0, -5);
    }
  };
  this.add = function(fire){
    this.list.push(fire);
  };
}
