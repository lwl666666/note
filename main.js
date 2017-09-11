var score = 0 ;
var grids = new Array();
var hasMoved = new Array();

$(document).ready(function(){
	debugger;	
	newgame();
	$("#newgame").on("click",function(){
		debugger;
		newgame();
	});
	$(document).keydown(function(event){
		switch(event.keyCode){
			case 37:
				if(moveLeft()){
					setTimeout("randomNumber()",200);
				}
				setTimeout("isGameOver()",200);
				break;
			case 38:
				if(moveUp()){
					setTimeout("randomNumber()",200);
				}
				setTimeout("isGameOver()",200);
				break;
			case 39:
				if(moveRight()){
					setTimeout("randomNumber()",200);
				}
				setTimeout("isGameOver()",200);
				break;
			case 40:
				if(moveDown()){
					setTimeout("randomNumber()",200);
				}
				setTimeout("isGameOver()",200);
				break;
		}
	})
});
function isGameOver(){
	debugger;
	if(nospace() && !canMove()){
		alert("you are lose");
	}
}
function canMove(){
	debugger;
	return canMoveLeft()||canMoveRight()||canMoveUp()||canMoveDown();
}
function newgame(){
	debugger;
	score = 0;
	updateHighestScore();
	init();
	randomNumber();
	randomNumber();
}
function init(){
	debugger;
	for(var i=0;i<4;i++){
		grids[i] = new Array();
		hasMoved[i] = new Array();
		for(var j=0;j<4;j++){
			grids[i][j] = 0 ;
			hasMoved[i][j] = false;
			$("#grid_"+i+"_"+j).css("left",getleft(j));
			$("#grid_"+i+"_"+j).css("top",getTop(i));
		}
	}
	update();
}
function getleft(i){
	return 20+120*i;
}
function getTop(j){
	return 20+120*j;
}
function update(){
	debugger
	$(".number").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			hasMoved[i][j] = false;
			$(".grid_container").append("<div class='number' id='number_"+i+"_"+j+"'></div>")
			number = $("#number_"+i+"_"+j);
			if(grids[i][j] ==0){
				number.css("left",getleft(j)+50);
				number.css("top",getTop(i)+50);
				number.css("width",0);
				number.css("height",0);

			}else{
				if(grids[i][j] >= 1024){
					number.css("font-size","40px")
				}
				number.css("left",getleft(j));
				number.css("top",getTop(i));
				number.css("width","100px");
				number.css("height","100px");
				number.css("background-color",showNumberColor(grids[i][j]))
				number.text(grids[i][j]);

			}
		}
	}
	updateScore();
}
function showNumberColor(number){
	debugger;
	var color = "";
	switch(number){
		case 2:
			color="#94c79d";
			break;
		case 4:
			color="#5dc06c";
			break;
		case 8:
			color="#4ecb83";
			break;
		case 16:
			color="#18683a";
			break;
		case 32:
			color="#d19d9d"
			break;
		case 64:
			color="#d15252"
			break;
		case 128:
			color="#e52222"
			break;
		case 256:
			color="#b1b8f8"
			break;
		case 512:
			color="#838ef4"
			break;
		case 1024:
			color="#0bb84c"
			break;	
		default:
			break;
	}
	return color;
}
function randomNumber(){
	debugger
	var time = 0;
	if(nospace()){
		return false;
	}
	randomX = Math.floor(Math.random()*4);
	randomY = Math.floor(Math.random()*4);
	while(time<32){
		if(grids[randomX][randomY]==0){
			break;
		}
		randomX = Math.floor(Math.random()*4);
		randomY = Math.floor(Math.random()*4);
		time++;
	}
	if(time == 32){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(grids[i][j]==0){
					randomX=i;
					randomY=j;
					break;
				}
			}
		}
	}
	grids[randomX][randomY] = Math.random()<0.5?2:4;
	showNumber(randomX,randomY,grids[randomX][randomY]);

}
function nospace(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(grids[i][j]==0){
				return false;
			}
		}
	}
	return true;
}
function showNumber(i,j,randomNumber){
	var numbercell = $("#number_"+i+"_"+j);
	numbercell.text(randomNumber);
	numbercell.css("background-color",showNumberColor(randomNumber));
	numbercell.animate({
		width:"100px",
		height:"100px",
		top:getTop(i),
		left:getleft(j)
	},50);
}
function moveLeft(){
	debugger;
	if(!canMoveLeft()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(grids[i][j]!=0){
				for(var k=0;k<j;k++){
					if(grids[i][k]==0 && hasNoHorizontalBlock(i,k,j)){
						grids[i][k] = grids[i][j];
						grids[i][j] = 0;
						moveAnimation(i,j,i,k);
						continue;						
					}
					if(grids[i][k] == grids[i][j] && hasNoHorizontalBlock(i,k,j) && !hasMoved[i][k]){
						grids[i][k] += grids[i][j];
						score += grids[i][k];
						grids[i][j] = 0;
						hasMoved[i][k] = true;
						moveAnimation(i,j,i,k);
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()",200);
	return true;
}
function moveRight(){
	debugger;
	if(!canMoveRight()){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=3;j>=0;j--){
			if(grids[i][j]!=0){
				for(var k=4;k>j;k--){
					if(grids[i][k]==0 && hasNoHorizontalBlock(i,j,k)){
						grids[i][k] = grids[i][j];
						grids[i][j] = 0;
						moveAnimation(i,j,i,k);
						continue;						
					}
					if(grids[i][k] == grids[i][j] && hasNoHorizontalBlock(i,j,k) && !hasMoved[i][k]){
						grids[i][k] += grids[i][j];
						score += grids[i][k];
						grids[i][j] = 0;
						hasMoved[i][k] = true;
						moveAnimation(i,j,i,k);
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()",200);
	return true;

}
function moveUp(){
	debugger;
	if(!canMoveUp()){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=0;i<4;i++){
			if(grids[i][j]!=0){
				for(var k=0;k<i;k++){
					if(grids[k][j]==0 && hasNoVerticalBlock(j,k,i)){
						grids[k][j] = grids[i][j];
						grids[i][j] = 0;
						moveAnimation(i,j,k,j);
						continue;						
					}
					if(grids[k][j] == grids[i][j] && hasNoVerticalBlock(j,k,i) && !hasMoved[k][j]){
						grids[k][j] += grids[i][j];
						score += grids[k][j];
						grids[i][j] = 0;
						hasMoved[k][j] = true;
						moveAnimation(i,j,k,j);
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()",200);
	return true;

}
function moveDown(){
	debugger;
	if(!canMoveDown()){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=3;i>=0;i--){
			if(grids[i][j]!=0){
				for(var k=3;k>i;k--){
					if(grids[k][j]==0 && hasNoVerticalBlock(j,i,k)){
						grids[k][j] = grids[i][j];
						grids[i][j] = 0;
						moveAnimation(i,j,k,j);
						continue;						
					}
					if(grids[k][j] == grids[i][j] && hasNoVerticalBlock(j,i,k) && !hasMoved[k][j]){
						grids[k][j] += grids[i][j];
						score += grids[k][j];
						grids[i][j] = 0;
						hasMoved[k][j] = true;
						moveAnimation(i,j,k,j);
						continue;
					}
				}
			}
		}
	}
	setTimeout("update()",200);
	return true;
}
function hasNoHorizontalBlock(row,col1,col2){
	debugger;
	for(var i=col1+1;i<col2;i++){
		if(grids[row][i]!=0){
			return false;
		}
	}
	return true;
}
function hasNoVerticalBlock(col,row1,row2){
	debugger;
	for(var i=row1+1;i<row2;i++){
		if(grids[i][col]!=0){
			return false;
		}
	}
	return true;
}
function canMoveLeft(){
	debugger;
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(grids[i][j]!=0){
				if(grids[i][j-1]==0 || grids[i][j]==grids[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(){
	debugger
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(grids[i][j]!=0){
				if(grids[i][j+1]==0 || grids[i][j]==grids[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;

}
function canMoveUp(){
	debugger;
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(grids[i][j]!=0){
				if(grids[i-1][j]==0 || grids[i][j]==grids[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(){
	debugger;
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(grids[i][j]!=0){
				if(grids[i+1][j]==0 || grids[i][j]==grids[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveAnimation(fromRow,fromCol,toRow,toCol){
	debugger;
	var numberCell = $("#number_"+fromRow+"_"+fromCol);
	numberCell.animate({
		left:getleft(toCol),
		top:getTop(toRow)
	},200);
}
function updateScore(){
	debugger;
	$("#score").text(score);
	updateHighestScore();

}
function updateHighestScore(){
	debugger;
	if(!localStorage.getItem("highestScore")){
		localStorage.setItem("highestScore", 0);
		return;
	}else{
		if(localStorage.getItem("highestScore")<score){
			localStorage.setItem("highestScore", score);
		}
	}
	$("#highestScore").text(localStorage.getItem("highestScore"));
}