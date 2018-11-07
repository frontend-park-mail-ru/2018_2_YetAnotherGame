import BaseView from './BaseView.js';
import Block from "../js/components/block/block.mjs"


export default class GameViewView extends BaseView {
    constructor (el) {
        super(el);
    }

    render () {
        const logo = Block.Create("canvas", {"id": "myCanvas","width":"1024","height":"768"}, [])
        this.el.append(logo)
        var canvas = document.getElementById("myCanvas");

        var car = new Image();

        //car.onload=start;
        var enemy2 = new Image();
        var enemy3 = new Image();
        var enemy4 = new Image();
        var enemy = new Image();
        var enemy21 = new Image();
        //car.onload=start;
        var enemy22 = new Image();
        var enemy23 = new Image();
        var enemy24 = new Image();
        var img = ["../textures/1.png", "../textures/2.png", "../textures/3.png"];
        var ctx = canvas.getContext("2d");
        var background = new Image();


        // Make sure the image is loaded first otherwise nothing will draw.


        var paddleHeight = 50;
        var paddleWidth = 50;
        var paddleX = (canvas.width - paddleWidth) / 2;
        var paddleY = (canvas.height) - 50;
        var x = 0;
        var x2 = canvas.width;
        var y = canvas.height - 300;
        var dx = 1;
        var dx2 = 1;
        var dy = -2;
        // var ballRadius = 10;
        var rightPressed = false;
        var leftPressed = false;
        var upPressed = false;
        var downPressed = false;
        var tick = 0
        var level = 1

        function drawPaddle() {

            ctx.drawImage(car, paddleX, paddleY);


            car.src = img[0];
            // ctx.beginPath();
            // ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
            // ctx.fillStyle = "#0095DD";
            // ctx.fill();
            // ctx.closePath();
        }

        function drawrect() {
            x += dx;
            x2 -= dx
            ctx.drawImage(enemy, x, y);
            enemy.src = img[1];
            ctx.drawImage(enemy2, x - 200, y);

            enemy2.src = img[1];

            ctx.drawImage(enemy3, x - 400, y);


            enemy3.src = img[1];

            ctx.drawImage(enemy4, x - 600, y);


            enemy4.src = img[1];


            ctx.drawImage(enemy21, x2, y + 150);
            enemy21.src = img[2];
            ctx.drawImage(enemy22, x2 + 200, y + 150);

            enemy22.src = img[2];

            ctx.drawImage(enemy23, x2 + 400, y + 150);


            enemy23.src = img[2];

            ctx.drawImage(enemy24, x2 + 600, y + 150);


            enemy24.src = img[2];


            ctx.drawImage(enemy, x, y - 250);
            enemy.src = img[1];
            ctx.drawImage(enemy2, x - 200, y - 250);

            enemy2.src = img[1];

            ctx.drawImage(enemy3, x - 400, y - 250);


            enemy3.src = img[1];

            ctx.drawImage(enemy4, x - 600, y-250);


            enemy4.src = img[1];
            //x += dx;


            //y += dy;
        }

        function draw() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(background,0,0);


            background.src = "../textures/4.png";
            ctx.font = "30px Arial";
            ctx.fillStyle = "#ff0000";
            ctx.fillText("level: " +level,20,40);
            ctx.fillText("score: "+tick,20,100);
            //drawBall();

            if (x >= 1600) {
                //debugger
                x = 0
                x2 = canvas.width;
                // tick=0
            }
            console.log(x)
            drawrect();
            drawPaddle();
            //setInterval(drawrect, 50);
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 && paddleY > y)) {
                alert("Конец игры. Ваш счет - " + tick);
                paddleX = (canvas.width - paddleWidth) / 2;
                paddleY = (canvas.height) - 50;
                tick = 0
                document.location.reload();
            }
            if (((paddleX > x2 && paddleX < x2 + 60) || (paddleX > x2 + 200 && paddleX < x2 + 60 + 200) || (paddleX > x2 + 400 && paddleX < x2 + 60 + 400) || (paddleX > x2 + 600 && paddleX < x2 + 60 + 600)) && (paddleY < y + 60 + 150 && paddleY > y + 150)) {
                alert("Конец игры. Ваш счет - " + tick);
                paddleX =(canvas.width - paddleWidth) / 2;
                paddleY = (canvas.height) - 50;
                document.location.reload();
            }
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 - 250 && paddleY > y - 250)) {
                alert("Конец игры. Ваш счет - " + tick);
                paddleX = (canvas.width - paddleWidth) / 2;
                paddleY = (canvas.height) - 50;
                document.location.reload();
            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 1;
            }
            else if (leftPressed && paddleX > 0) {
                paddleX -= 1;
            }

            else if (upPressed) {
                paddleY -= 1;
                // y-=dy
                tick++

            }
            else if (downPressed && paddleY < canvas.height - paddleHeight) {
                paddleY += 1;
            }
            if (paddleY === 0) {
                paddleY = (canvas.height);
                y = Math.floor(Math.random() * canvas.height) + 100;
                level++
            }
        }

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = true;
            }
            else if (e.keyCode === 37) {
                leftPressed = true;
            }
            else if (e.keyCode === 38) {
                upPressed = true;
            }
            else if (e.keyCode === 40) {
                downPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = false;
            }
            else if (e.keyCode === 37) {
                leftPressed = false;
            }
            else if (e.keyCode === 38) {
                upPressed = false;
            }
            else if (e.keyCode === 40) {
                downPressed = false;
            }
        }

        setInterval(draw, 1);
    }
}
