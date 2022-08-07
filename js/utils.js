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

let timer = 60
let timerId;
let startTimer = 5
let startGame = false
const object  = document.querySelector("#displayResult")

function endGame(){
	clearTimeout(timerId)
	if (player.health===enemy.health) {
		object.innerHTML = 'Tie'
	}
	else {
		object.innerHTML = (enemy.health>player.health ? 'Kenji' : 'Mack')+' won!'
	}
	object.style.display = 'flex'	
	setTimeout(()=>{
		object.innerHTML = "Reload the page"
		cancelAnimationFrame(gameid);
	}
		, 2000);

	
}


function decreaseStartTimer() {
	if(startTimer>0){
		startTimer-=1
		document.querySelector("#displayResult").innerHTML= startTimer
		object.style.display = 'flex'
		timerId = setTimeout(decreaseStartTimer, 1000)
	}
	if(startTimer===0){
		document.querySelector("#displayResult").innerHTML= "Fight"
		setTimeout(()=>{
			object.style.display = 'none'
			startGame = true}, 1000)
	}

}


function decreaseTimer() {
	if(timer>0){
		if(startGame===true) timer-=1
		document.querySelector("#timer").innerHTML= timer
		timerId = setTimeout(decreaseTimer, 1000)
	}
	if(timer===0){
		endGame()
	}

}

function restart(){
	timer = 60
	player
}