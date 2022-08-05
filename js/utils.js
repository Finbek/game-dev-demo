function rectangularCollision({rectangle1, rectangle2, left}){
	if((rectangle1.attackBox.position.y+rectangle1.attackBox.height>=rectangle2.position.y &&
	rectangle1.attackBox.position.y<=rectangle2.position.y+rectangle2.height)==false) return false
	if(left){
		return (rectangle1.attackBox.position.x+rectangle1.attackBox.width<=rectangle2.position.x+rectangle2.width && 
					rectangle1.attackBox.position.x>=rectangle2.position.x)
	}
	else 
		return (rectangle1.attackBox.position.x+rectangle1.attackBox.width>=rectangle2.position.x && 
	rectangle1.attackBox.position.x<=rectangle2.position.x+rectangle2.width)
	


}
function endGame(){
	clearTimeout(timerId)
	if (player.health===enemy.health) {
		document.querySelector("#displayResult").innerHTML = 'Tie'
	}
	else {
		document.querySelector("#displayResult").innerHTML = (enemy.health>player.health ? 'Player 2' : 'Player 1')+' won!'
	}
	document.querySelector("#displayResult").style.display = 'flex'
}

let timer = 60
let timerId;

function decreaseTimer() {
	if(timer>0){
		timer-=1
		document.querySelector("#timer").innerHTML= timer
		timerId = setTimeout(decreaseTimer, 1000)
	}
	if(timer===0){
		endGame()
	}

}