"use strict"

// dx = -1 and dy = -1 then it moves diagonally up to the left
// dx = 1 and dy = -1 then it moves diagonally up to the right
// dx = -1 and dy = 1 then it moves diagonally down to the left
// dx = 1 and dy = 1 then it moves diagonally down to the right

// Gets the canvas element and puts it into a variable
let c = <HTMLCanvasElement>document.getElementById("myCanvas")
let ctx = <CanvasRenderingContext2D>c.getContext("2d")

class Ball{
    
    radius:number = 10

    // Sets the position to the center of the canvas
    x:number = this.getRandomNumber(50, c.width)
    y:number = this.getRandomNumber(50, c.height)

    // Moves the ball in a random direction between -5 and 5 and speeds it up by 5
    dx:number = this.getRandomNumber(-5, 5) * 2
    dy:number = this.getRandomNumber(-5, 5) * 2

    // Creates a random number generator between two numbers
    getRandomNumber(min:number, max:number){
        
        return Math.random() * (max - min) + min;
    }

    // Creates the balls
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Creates the shape and size of the ball
        ctx.fillStyle = "red"; // Picks the colour of the ball
        ctx.fill(); // Fills the ball with the colour
        ctx.closePath();
    }

    // Moves the balls
    move(){
        // Changes the position of the ball by the dx and dy values
        this.x += this.dx;
        this.y += this.dy;
    }

    // Reverses the direction of the balls
    checkBounce(){
        // Reverses the balls directions if the ball hits the edge of the canvas
        if (this.x < this.radius || this.x > c.width-this.radius){
            
            this.dx=-this.dx
        }
        if (this.y < this.radius || this.y > c.height-this.radius){
            
            this.dy=-this.dy
        }
    }
}

const numBalls = 10
const balls: Ball[] = []

for(let i = 0; i < numBalls ;i++){
    balls.push(new Ball())
}

// Makes the ball infinitely bounce
function cycle(){

    ctx.clearRect(0,0,c.width,c.height)

    for(let i = 0; i < numBalls ;i++){
        balls[i].draw()
        balls[i].move()
        balls[i].checkBounce()
    }

    requestAnimationFrame(cycle)
}

// Repeats the cycle function
cycle()