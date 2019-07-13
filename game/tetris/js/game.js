function App(){
	var canvas = document.getElementById('container');
	this.ctx = canvas.getContext('2d');

	this.cols = 10;
	this.rows = 25;

	this.shape = [
		[1, 1, 1, 1],
		[1, 1, 0, 0,
		 1, 1],
		[1, 1, 1, 0,
		 1],
		[1, 1, 1, 0,
		 0, 0, 1],
		[1, 1, 0, 0,
		 0, 1, 1],
		[0, 1, 1, 0,
		 1, 1],
		[0, 1, 0, 0,
		 1, 1, 1]
	]
	this.colors = ['#88D5E5', '#8bc34a', '#733baf', '#ffcf56', '#2196f3', '#607d8b', '#ff7105'];

	this.currentX = 4;
	this.currentY = 0;
	this.pos = {
		x : 0,
		y : 0
	}

	this.current = [];
	this.board = [];
	this.lose = false;
	this.score = 0;
}

App.prototype.init = function(){
	for(var y = 0; y < app.rows; y++){
		app.board[y] = [];
		for(var x = 0; x < app.cols; x++){
			app.board[y][x] = 0;
		}
	}
	app.newShape();

	setInterval(function(){
		document.getElementById('score').innerHTML = app.score;
		app.move();
	}, 500);
}

App.prototype.render = function(){
	var canvas = document.getElementById('container');
	var w = canvas.width;
	var h = canvas.height;

	app.block_width = w/app.cols;
	app.block_height = h/app.rows;
	
	this.ctx.clearRect(0, 0, w, h);  
	this.ctx.strokeStyle = "#000";
	for(var x = 0; x < app.cols; ++x){
		for (var y = 0 ; y < app.rows; ++y){
			if(app.board[y][x]){
				this.ctx.fillStyle = app.colors[app.board[y][x] - 1];
				app.drawBlock(x, y);
			}
		}
	}

	this.ctx.strokeStyle = '#000';
	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x){
			if(app.current[y][x]){
				this.ctx.fillStyle = app.colors[app.current[y][x] - 1];
				app.drawBlock(app.currentX + x, app.currentY + y);
			}
		}
	}
}

App.prototype.rotate = function(current){
	var newCurrent = []
	for(var y = 0; y < 4; ++y){
		newCurrent[y] = []
		for(var x = 0; x < 4; ++x){
			newCurrent[y][x] = app.current[3 - x][y];
		}
	}

	return newCurrent;
}

App.prototype.drawBlock = function(x, y){
	this.ctx.fillRect(app.block_width * x, app.block_height * y, app.block_width, app.block_height);
	this.ctx.strokeRect(app.block_width * x, app.block_height * y, app.block_width, app.block_height);
}

App.prototype.newShape = function(){
	var choose = Math.floor(Math.random() * app.shape.length);
	var shape = app.shape[choose];

	app.current = [];

	for(var y = 0; y < 4; ++y){
		app.current[ y ] = [];
		for(var x = 0; x < 4; ++x){
			var i = 4 * y + x;
			if(typeof shape[i] != 'undefined' && shape[i]){
				app.current[y][x] = choose + 1;
			}else{
				app.current[y][x] = 0;
			}
		}
	}

	app.currentY = 0;
	app.currentX = 4;
}

App.prototype.clearRows = function(){
	for (var y = app.rows - 1; y >= 0; --y){
		var isFilled = true;
		for(var x = 0; x < app.cols; ++x){
			if(app.board[y][x] == 0){
				isFilled = false;
				break;
			}
		}
		if(isFilled){
			for(var yy = y; yy > 0; --yy){
				for(var x = 0; x < app.cols; ++x){
					app.board[yy][x] = app.board[yy - 1][x];
				}
			}
			app.score+=20;

			++y;
		}
	}
}

App.prototype.validate = function(offsetX, offsetY, newCurrent){
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	offsetX = app.currentX + offsetX;
	offsetY = app.currentY + offsetY;
	newCurrent = newCurrent || app.current;

	for(var y = 0; y < 4; ++y){
		for(var x = 0; x < 4; ++x){
			if(newCurrent[y][x]){
				if(typeof app.board[y + offsetY] == 'undefined'
					|| typeof app.board[y + offsetY][x + offsetX] == 'undefined'
					|| app.board[y + offsetY][x + offsetX]
					|| x + offsetX < 0
					|| y + offsetY >= app.rows
					|| x + offsetX >= app.cols){

					if(offsetY == 0) app.lose = true;
					return false;
				}
			}
		}
	}

	return true;
}

App.prototype.move = function(){
	if(app.lose == true){
		window.location.replace('index.html');
	}

	if(app.validate(0, 1)){
		app.currentY++;
	}else{
		for(var y = 0; y < 4; ++y){
			for(var x = 0; x < 4; ++x){
				if(app.current[y][x]){
					app.board[y + app.currentY][x + app.currentX] = app.current[y][x];
				}
			}
		}
		app.clearRows();
		app.newShape();
	}

	app.render();
}

App.prototype.handleKey = function(key){
	switch(key){
		case 'ArrowLeft' :
			if(app.validate(-1)){
				app.currentX--;
			}
			break;
		case 'ArrowRight' :
			if(app.validate(1)){
				app.currentX++;
			}
			break;
		case 'ArrowDown' :
			if(app.validate(0, 1)){
				app.currentY++;
			}
			break;
		case ' ' :
			var rot = app.rotate(app.current);
			if(app.validate(0, 0, rot)){
				app.current = rot;
			}
			break;
	}

	app.render();
}

window.onkeydown = function(e){
	app.handleKey(e.key);
}