import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"


export default class GameView extends BaseView {
    constructor(el) {
        super(el)
    }

    start() {
        this.render()
    }

    stop() {
        clearInterval(this.timer, 1)
    }

    renderGameOver() {
        const gameOverBlock = Block.Create("div", {"id": "game_over"}, ["gameover__block"])
        const gameOverText = Block.Create("div", {}, ["gameover__text"], "GAME OVER")
        const restartButton = Block.Create("div", {"id": "restart"}, ["button"], "Try again")
        const exitButton = Block.Create("a", {"href": "menu", "data-href": "menu"}, ["button"], "Back to main menu")

        gameOverBlock
            .append(gameOverText)
            .append(restartButton)
            .append(exitButton)
        this.el.append(gameOverBlock)

        this.stop()

        const restart = document.getElementById("restart")
        restart.addEventListener("click", () => {
            this.el.clear()
            this.render()
        })
    }

    render() {
        this.el.clear()

        if (document.getElementById("game_over")) {
            const el = document.getElementById("game_over")
            el.parentNode.removeChild(el)
        }

        const canv=Block.Create("canvas", {"id": "myCanvas" }, [])
        let canvas
		let ctx
        let k1
        let k2
        let mousePos
		this.el.append(canv)
        canvas = document.getElementById('myCanvas');
		let paddleHeight = 50
		let paddleWidth = 50
		let paddleX = (canvas.width - paddleWidth) / 2
		let paddleY = (canvas.height) - 50
			if (canvas.getContext) {
				ctx = canvas.getContext("2d");


				resizeCanvas();
			}

		function getTouchPos(canvasDom, touchEvent) {
			var rect = canvasDom.getBoundingClientRect();
			if(touchEvent.touches[0]!==undefined){
			return {

				x: touchEvent.touches[0].clientX - rect.left,
				y: touchEvent.touches[0].clientY - rect.top}
			}
		}
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener('orientationchange', resizeCanvas, false);


		function resizeCanvas() {
		    k1=canvas.width / window.innerWidth;
		    k2=canvas.height / window.innerHeight;
		    if(k1===k2&&k1===0){
		        k1=1
                k2=1
            }

			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			paddleY=paddleY/k2
			paddleX=paddleX/k1
		}




       // let canvas = document.getElementById("myCanvas")
        let car = new Image()
        let enemy2 = new Image()
        let enemy3 = new Image()
        let enemy4 = new Image()
        let enemy = new Image()
        let enemy21 = new Image()
        let enemy22 = new Image()
        let enemy23 = new Image()
        let enemy24 = new Image()
        let img = ["../../img/textures/1.png", "../../img/textures/2.png", "../../img/textures/3.png"]

        let background = new Image()


        let x = 0
        let x2 = canvas.width
        let y = canvas.height - 300
        let dx = 1
        let rightPressed = false
        let leftPressed = false
        let upPressed = false
        let downPressed = false
        let tick = 0
        let level = 1

        function drawPaddle() {
            ctx.drawImage(car, paddleX, paddleY)
            car.src = img[0]
        }

        function drawrect() {
            x += dx
            x2 -= dx
            ctx.drawImage(enemy, x, y)
            enemy.src = img[1]
            ctx.drawImage(enemy2, x - 200, y)
            enemy2.src = img[1]
            ctx.drawImage(enemy3, x - 400, y)
            enemy3.src = img[1]
            ctx.drawImage(enemy4, x - 600, y)
            enemy4.src = img[1]
            ctx.drawImage(enemy21, x2, y + 150)
            enemy21.src = img[2]
            ctx.drawImage(enemy22, x2 + 200, y + 150)
            enemy22.src = img[2]
            ctx.drawImage(enemy23, x2 + 400, y + 150)
            enemy23.src = img[2]
            ctx.drawImage(enemy24, x2 + 600, y + 150)
            enemy24.src = img[2]
            ctx.drawImage(enemy, x, y - 250)
            enemy.src = img[1]
            ctx.drawImage(enemy2, x - 200, y - 250)
            enemy2.src = img[1]
            ctx.drawImage(enemy3, x - 400, y - 250)
            enemy3.src = img[1]
            ctx.drawImage(enemy4, x - 600, y - 250)
            enemy4.src = img[1]
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
           // ctx.drawImage(background, 0, 0)
            //background.src = "../../img/textures/4.png"
			ctx.fillStyle="#000000";
			ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.font = "30px Arial"
            ctx.fillStyle = "#ff0000"
            ctx.fillText("level: " + level, 20, 40)
            ctx.fillText("score: " + tick, 20, 100)
            if (x >= 1600) {
                x = 0
                x2 = canvas.width
            }
            //console.log(x)
            drawrect()
            drawPaddle()
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 && paddleY > y)) {
                this.renderGameOver()
                // gameOverBlock.deleteClass("gameover__block_hide")
                // alert("Конец игры. Ваш счет - " + tick)

                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
                tick = 0
				leftPressed = false
				rightPressed = false
				upPressed = false
				downPressed = false
				level=0

            }
            if (((paddleX > x2 && paddleX < x2 + 60) || (paddleX > x2 + 200 && paddleX < x2 + 60 + 200) || (paddleX > x2 + 400 && paddleX < x2 + 60 + 400) || (paddleX > x2 + 600 && paddleX < x2 + 60 + 600)) && (paddleY < y + 60 + 150 && paddleY > y + 150)) {
				// alert("Конец игры. Ваш счет - " + tick)
                this.renderGameOver()

                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
				leftPressed = false
				rightPressed = false
				upPressed = false
				downPressed = false
				level=0

            }
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 - 250 && paddleY > y - 250)) {
				// alert("Конец игры. Ваш счет - " + tick)
                this.renderGameOver()

                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50

				leftPressed = false
				rightPressed = false
				upPressed = false
				downPressed = false
				level=0

            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 1
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 1
            } else if (upPressed) {
                paddleY -= 1
                tick++

            } else if (downPressed && paddleY < canvas.height - paddleHeight) {
                paddleY += 1
            }
            if (paddleY === 0) {
                paddleY = (canvas.height)
                y = Math.floor(Math.random() * canvas.height) + 100
                level++
            }
        }

        document.addEventListener("keydown", keyDownHandler, false)
        document.addEventListener("keyup", keyUpHandler, false)
		canvas.addEventListener("touchstart", function (a) {
			mousePos = getTouchPos(canvas, a);
			console.log(mousePos)
            if(mousePos.x>0&&mousePos.x<30){
				leftPressed=true
            }
			if(mousePos.x>canvas.width-30&&mousePos.x<canvas.width){
				rightPressed=true
			}
			if(mousePos.y>canvas.height-30&&mousePos.y<canvas.height){
				upPressed=true
			}
		})
		canvas.addEventListener("touchend", function (a) {
			mousePos = getTouchPos(canvas, a);
			console.log(mousePos)

				leftPressed=false


				rightPressed=false


				upPressed=false

		})
        function keyDownHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = true
            } else if (e.keyCode === 37) {
                leftPressed = true
            } else if (e.keyCode === 38) {
                upPressed = true
            } else if (e.keyCode === 40) {
                downPressed = true
            }
        }

        function keyUpHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = false
            } else if (e.keyCode === 37) {
                leftPressed = false
            } else if (e.keyCode === 38) {
                upPressed = false
            } else if (e.keyCode === 40) {
                downPressed = false
            }
        }
        this.timer = setInterval(draw.bind(this), 1)
    }
}
