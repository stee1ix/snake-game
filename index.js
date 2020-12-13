function init() {
    canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
	cellSize = 66;
	gameOver = false;
	score = 0;

	foodImg = new Image();
	foodImg.src = './burger.png';
	
	trophy = new Image();
	trophy.src = './trophy.png';
	
	
	food = getRandomFood();

    snake = {
        init_len: 5,
        color: 'blue',
        cells: [],
        direction: 'right',

        createSnake: function() {
            for (let i = this.init_len; i > 0; i--) {
                this.cells.push({x: i, y: 0});
            }
        },

        drawSnake: function() {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cellSize, this.cells[i].y*cellSize, cellSize-3, cellSize-3);
            }
		},
		
		updateSnake: function() {
			let headX = this.cells[0].x;
			let headY = this.cells[0].y;

			//if the snake has eaten food then increase length of the snake and generate new food object
			if (headX == food.x && headY == food.y) {
				console.log('Food Eaten');
				food = getRandomFood();
				score++;
			}
			else {
				this.cells.pop();
			}

			let nextX, nextY;

			if (this.direction == 'right') {
				nextX = headX + 1;
				nextY = headY;
			}
			else if (this.direction == 'left') {
				nextX = headX - 1;
				nextY = headY;
			}
			else if (this.direction == 'down') {
				nextX = headX;
				nextY = headY + 1;
			}
			else if (this.direction == 'up') {
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX, y: nextY});

			//prevent snake from going out
			let lastX = Math.round(W/cellSize);
			let lastY = Math.round(H/cellSize);

			if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY) {
				gameOver = true;
			}

		}
	};
	
	snake.createSnake();
	
	//Event Listener on the DOM
	function keyPressed(e) {
		if (e.key == 'ArrowRight') {
			snake.direction = 'right';
		}
		else if (e.key == 'ArrowLeft') {
			snake.direction = 'left';
		}
		else if (e.key == 'ArrowDown') {
			snake.direction = 'down';
		}
		else if (e.key == 'ArrowUp') {
			snake.direction = 'up';
		}
		console.log(snake.direction); 
	}
	
	document.addEventListener('keydown', keyPressed);
}

function draw() {
	pen.clearRect(0 ,0, W, H);
	snake.drawSnake();
	
	pen.fillStyle = food.color;
	pen.drawImage(foodImg, food.x*cellSize, food.y*cellSize, cellSize, cellSize);
	
	pen.drawImage(trophy, 25, 39, cellSize, cellSize);
	pen.fillStyle = 'black';
	pen.font = '30px Ariel';
	pen.fillText(score, 50, 70);

}

function update() {	
	snake.updateSnake();
	
}

function getRandomFood() {
	let foodX = Math.round(Math.random()*(W - cellSize)/cellSize);
	let foodY = Math.round(Math.random()*(H - cellSize)/cellSize);

	let food = {
		x: foodX,
		y: foodY,
		color: 'red'
	};

	return food;
}

function gameLoop() {
	if (gameOver == true) {
		clearInterval(f);
		alert('Game Over!');
		return;
	}

    draw();
    update();
}

init();
let f = setInterval(gameLoop, 100);
