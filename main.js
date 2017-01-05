console.log("main.js loaded");

class Pvector{
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
    }
    add(pToAdd){
        this.x += pToAdd.x;
        this.y += pToAdd.y
    }
    sub(pToSub){
        this.x -= pToSub.x;
        this.y -= pToSub.y;
    }
    multiply(numToMult){
        this.x *= numToMult;
        this.y *= numToMult; 
    }
    divide(numToDiv){
        this.x /= numToDiv;
        this.y /= numToDiv;
    }
    magnitude(){
        return sqrt((this.x * this.x) + (this.y * this.y))
    }
    normalize(){
        var mag = this.magnitude();
        this.divide(mag);
    }
    get(){
        return(new Pvector(this.x, this.y));
    }

}
    function subVectors(PvectorM, PvectorN){
        return new Pvector(PvectorM.x-PvectorN.x, PvectorM.y-PvectorN.y);
    }

class Mover{
    constructor({x_,y_, vx, vy, ax, ay, mass_, topSpeed}){
        this.location = new Pvector(x_, y_);
        this.velocity = new Pvector(vx, vy);
        this.acceleration = new Pvector(0, 0);
        this.mass = mass_;
        this.topSpeed = topSpeed;
    }
    display(){
        stroke(0);
        fill(175);
        ellipse(this.location.x, this.location.y, this.mass*3, this.mass*3);
    }
    update(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.multiply(0);
        

        //pushing away from the mouse
    }
    checkForWalls(){
        if(this.location.x > width){
            this.velocity.x *= -1;
        }else if(this.location.x < 0){
            this.velocity.x *= -1;
        }

        if(this.location.y > height){
            this.velocity.y *=-1;
        }else if(this.location.y < 0){
            this.velocity.y *=-1;
        }
    }
    limit(max){
        if(this.velocity.magnitude() > this.topSpeed){
            this.velocity.normalize();
            this.velocity.multiply(this.topSpeed);
        }
    }
    applyForce(forceToAdd){
        var force = forceToAdd.get();
        force.divide(this.mass);
        this.acceleration.add(force);

    }
}

var ball;
var ballArr;

function setup(){
    background(255);
    var config = {
        apiKey: "AIzaSyAZodbztfznL2m-GychnIoUUM1eTtLfhgY",
        authDomain: "testproject-46fa0.firebaseapp.com",
        databaseURL: "https://testproject-46fa0.firebaseio.com",
        storageBucket: "testproject-46fa0.appspot.com",
        messagingSenderId: "895774418380"
    };
    firebase.initializeApp(config);

    createCanvas(innerWidth, innerHeight);
    ballArr = [];

    
    
    
}
var t = 0;
function draw(){
    t++;
    if(mouseIsPressed){
        var moveInfo = {
        x_: mouseX,
        y_: mouseY,
        vx: 0,
        vy: 0,
        ax: random(-0.01,0.01),
        ay: random(-0.01,0.01),
        mass_: random(1,2),
        topSpeed: random(11),
        }
    var ref = firebase.database().ref('ballArr');
    ref.push(moveInfo);
    ballArr.push(new Mover(moveInfo));
    }
    for(var i = 0; i < ballArr.length; i++){
        var wind = new Pvector(random(-1,1),0);
        var gravity = new Pvector(0,0.1*ballArr[i].mass);
        ballArr[i].applyForce(wind);
        ballArr[i].applyForce(gravity);
        ballArr[i].display();
        ballArr[i].update();
        ballArr[i].checkForWalls();
        ballArr[i].limit();
    }
}