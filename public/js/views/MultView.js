import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"
import Form from "../components/form/form.mjs"


export default class MultView extends BaseView {
	constructor(el) {
		super(el)
	}

	render() {
		this.el.clear()
		const loader = Block.Create("div", {"id": "load", "class": "loader"}, [])
		this.el.append(loader)

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min
		}

		var rand = 0
		const address = ["https", "https:"].includes(location.protocol) ?
			`wss://127.0.0.1:9090/ws` :
			`ws://127.0.0.1:9090/ws`


		let ws = new WebSocket(address)

		console.log(`WebSocket on address ${address} opened`)
		ws.onopen = function () {
			rand = getRandomInt(1, 1234)
			ws.send(JSON.stringify({
				"type": "newPlayer",
				"payload": {
					"username": rand.toString()

				}
			}))
		}
		var wsSend = function (data) {
			if (!ws.readyState) {
				setTimeout(function () {
					wsSend(data)
				}, 100)
			} else {
				ws.send(data)
			}
		}

		const logo = Block.Create("canvas", {
			"id": "myCanvas",
			"width": "1024",
			"height": "768",

		}, [])


		this.el.append(logo)

		const signIn = window.chatFields
		const signInSection = Block.Create("section", {"data-section-name": "sign_in"}, [])
		const header = Block.Create("h1", {}, [], "Чат")
		const form = new Form(signIn)
		const header2 = Block.Create("h1", {"id": "kek"}, [], "Переписка")
		signInSection
			.append(header)
			.append(form)
			.append(header2)
		this.el.append(signInSection)
		form.onSubmit(
			function (formdata) {
				wsSend(JSON.stringify({
					"type": "Chat",
					"payload": {
						"author": rand.toString(),
						"message": formdata.text.value.toString(),

					}
				}))

			}
		)
		let onload = 0
		let canvas = document.getElementById("myCanvas")
		canvas.style.background = "url('../../img/textures/4.png')"
		let car = new Image()
		let enemy2 = new Image()
		let enemy3 = new Image()
		let enemy4 = new Image()
		let enemy = new Image()
		let enemy21 = new Image()
		let enemy22 = new Image()
		let enemy23 = new Image()
		let enemy24 = new Image()
		let enemy5 = new Image()
		let img = ["../../img/textures/1.png", "../../img/textures/2.png", "../../img/textures/3.png", , "../../img/textures/5.png"]
		let ctx = canvas.getContext("2d")
		let background = new Image()
		var msg = undefined
		let paddleHeight = 50
		let paddleWidth = 50
		let xenemy = (canvas.width - paddleWidth) / 2
		let yenemy = (canvas.height) - 50
		let paddleX = (canvas.width - paddleWidth) / 2
		let paddleY = (canvas.height) - 50
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
		var msg2
		var mes = null
		let game = this.el

		function drawPaddle() {
			ctx.drawImage(car, paddleX, paddleY)
			car.src = img[0]
		}

		function drawenemy() {
			if (parseInt(yenemy) !== parseInt(paddleY)) {
				ctx.drawImage(enemy5, xenemy, yenemy)
				enemy5.src = img[4]
				//
				//	console.log(yenemy, paddleY)
			}
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


			ws.onmessage = function (msgevent) {
				msg = JSON.parse(msgevent.data)
				//console.log(msg)
				if (msg !== undefined) {
					if (msg.Message !== null) {

						const newp = document.createElement("p")
						if (parseInt(msg.Message.author) !== rand) {
							newp.innerHTML = "Противник: "+msg.Message.message
						}
					else{
								newp.innerHTML = "Вы: "+msg.Message.message
						}
						let text = document.getElementById("kek")
						text.appendChild(newp)

					}

					if (msg.Players !== null && (parseInt(msg.Players[0].Username)) !== rand) {

						msg2 = msg.Players[0].Score
						xenemy = msg.Players[0].Position.X
						yenemy = msg.Players[0].Position.Y

					} else if (msg.Players !== null && (parseInt(msg.Players[1].Username)) !== rand) {

						msg2 = msg.Players[1].Score

						xenemy = msg.Players[1].Position.X
						yenemy = msg.Players[1].Position.Y

					}
				}

				// message received, do something
			}


			if (msg === undefined) {

				return
			}
			if (onload === 0) {
				document.getElementById("load").remove()
			}
			onload = 1
			ctx.font = "30px Arial"
			ctx.fillStyle = "#ff0000"
			ctx.fillText("level: " + level, 20, 40)
			ctx.fillText("score: " + tick, 20, 100)
			ctx.fillText("enemy score: " + msg2, 20, 160)
			if (x >= 1600) {
				x = 0
				x2 = canvas.width
			}
			//console.log(x)
			drawrect()
			drawPaddle()
			drawenemy()

			if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 && paddleY > y)) {
                alert("Конец игры. Ваш счет - " + tick)
                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
				tick = 0
				level = 0
                upPressed = false
                downPressed = false
                leftPressed = false
                rightPressed = false

     //document.location.reload()
            }
            if (((paddleX > x2 && paddleX < x2 + 60) || (paddleX > x2 + 200 && paddleX < x2 + 60 + 200) || (paddleX > x2 + 400 && paddleX < x2 + 60 + 400) || (paddleX > x2 + 600 && paddleX < x2 + 60 + 600)) && (paddleY < y + 60 + 150 && paddleY > y + 150)) {
                alert("Конец игры. Ваш счет - " + tick)
                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
				tick = 0
				level = 0
                upPressed = false
                downPressed = false
                leftPressed = false
                rightPressed = false


                //document.location.reload()

            }
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 - 250 && paddleY > y - 250)) {
                alert("Конец игры. Ваш счет - " + tick)
                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
                //document.location.reload()
                tick = 0
				level = 0
                upPressed = false
                downPressed = false
                leftPressed = false
                rightPressed = false


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
			wsSend(JSON.stringify({
				"type": "Info",
				"payload": {
					"score": tick.toString(),
					"x": paddleX.toString(),
					"y": paddleY.toString()
				}
			}))
		}


		document.addEventListener("keydown", keyDownHandler, false)
		document.addEventListener("keyup", keyUpHandler, false)

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

		setInterval(draw, 5)
	}
}
