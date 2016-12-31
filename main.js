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

}

class Mover{
    constructor(x_,y_, vx, vy, ax, ay, topSpeed){
        this.location = new Pvector(x_, y_);
        this.velocity = new Pvector(vx, vy);
        this.acceleration = new Pvector(ax, ay);
        this.topSpeed = topSpeed;
    }
    display(){
        stroke(0);
        fill(175);
        ellipse(this.location.x, this.location.y, 16, 16);
    }
    update(){
        this.location.add(this.velocity);
        this.velocity.add(this.acceleration);
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
}

var ball;


function setup(){
    createCanvas(innerWidth, innerHeight);
    ball = new Mover(1,1, 3, -4, 0.1, 0.001, 13);
    background(0);
}

function draw(){
    ball.display();
    ball.update();
    ball.checkForWalls();
    ball.limit();
}