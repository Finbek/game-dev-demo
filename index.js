const canvas = document.querySelector('canvas')
const c= canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
var gameid;

c.fillRect(0, 0, canvas.width, canvas.height)

	const gravity = 0.7


const player = new Fighter({
	position :{
		x:50, 
		y:0
	}, 
	velocity : {
		x:0,
		y:1
	},
	color: 'blue',
	scale: 2.5,
	offset: {
		x:215,
		y:157
	},
	imageSrc: './img/samuraiMack/Idle.png',
	framesMax:8,
	sprites: {
		idle: {
			imageSrc: './img/samuraiMack/Idle.png',
			framesMax:8,
		},
		idleLeft: {
			imageSrc: './img/samuraiMack/Left/Idle.png',
			framesMax:8,
		},
		runLeft: {
			imageSrc: './img/samuraiMack/Left/Run.png',
			framesMax:8,
		},
		run: {
			imageSrc: './img/samuraiMack/Run.png',
			framesMax:8,
		},
		jump: {
			imageSrc: './img/samuraiMack/Jump.png',
			framesMax:2,
		},
		jumpLeft: {
			imageSrc: './img/samuraiMack/Left/Jump.png',
			framesMax:2,
		},
		fall:{
			imageSrc: './img/samuraiMack/Fall.png',
			framesMax:2,
		},
		fallLeft:{
			imageSrc: './img/samuraiMack/Left/Fall.png',
			framesMax:2,
		},
		attack1: {
			imageSrc: './img/samuraiMack/Attack1.png',
			framesMax:6,
		},
		attack1Left: {
			imageSrc: './img/samuraiMack/Left/Attack1.png',
			framesMax:6,
		},
		takeHit: {
			imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
			framesMax:4,
		},
		takeHitLeft: {
			imageSrc: './img/samuraiMack/Left/Take Hit - white silhouette.png',
			framesMax:4,
		},
		death: {
			imageSrc: './img/samuraiMack/Death.png',
			framesMax:6,
		},
		deathLeft: {
			imageSrc: './img/samuraiMack/Left/Death.png',
			framesMax:6,
		}

	},
	attackBox: {
		offset:{
			x:82, 
			y:50
		},
		width: 150,
		height:50,
		flipChange: 20
	}
})

const background = new Sprite({
	position: {
		x:0,
		y:0
	},
	imageSrc: './img/background.png'
})

const shop = new Sprite({
	position: {
		x:600,
		y:130
	},
	imageSrc: './img/shop.png',
	scale: 2.75,
	framesMax:6
})
const enemy = new Fighter({
	position : {
		x:924, 
		y:0
	}, 
	velocity : {
		x:0,
		y:1
	}, 
	color: 'red',
	scale: 2.5,
	offset: {
		x:215,
		y:162
	},
	imageSrc: './img/kenji/Idle.png',
	framesMax:4,
	sprites: {
		idle: {
			imageSrc: './img/kenji/Idle.png',
			framesMax:4,
		},
		run: {
			imageSrc: './img/kenji/Run.png',
			framesMax:8,
		},
		jump: {
			imageSrc: './img/kenji/Jump.png',
			framesMax:2,
		},
		fall:{
			imageSrc: './img/kenji/Fall.png',
			framesMax:2,
		},
		attack1: {
			imageSrc: './img/kenji/Attack1.png',
			framesMax:4,
		},
		takeHit: {
			imageSrc: './img/kenji/Take hit.png',
			framesMax:3,
		},
		death: {
			imageSrc: './img/kenji/Death.png',
			framesMax:7,
		},
		idleLeft: {
			imageSrc: './img/kenji/Left/Idle.png',
			framesMax:4,
		},
		runLeft: {
			imageSrc: './img/kenji/Left/Run.png',
			framesMax:8,
		},
		jumpLeft: {
			imageSrc: './img/kenji/Left/Jump.png',
			framesMax:2,
		},
		fallLeft:{
			imageSrc: './img/kenji/Left/Fall.png',
			framesMax:2,
		},
		attack1Left: {
			imageSrc: './img/kenji/Left/Attack1.png',
			framesMax:4,
		},
		takeHitLeft: {
			imageSrc: './img/kenji/Left/Take hit.png',
			framesMax:3,
		},
		deathLeft: {
			imageSrc: './img/kenji/Left/Death.png',
			framesMax:7,
		}
	},
	attackBox: {
		offset:{
			x:-190, 
			y:50
		},
		width: 150,
		height:50,
		flipChange: 20
	}
})

enemy.draw()
player.draw()

const key = {
	a: {
		pressed: false,

	},
	d: {
		pressed: false,
		
	},
	ArrowRight: {
		pressed:false,
	},
	ArrowLeft: {
		pressed:false,
	}
}

decreaseStartTimer()

decreaseTimer()

function animate(){
	gameid = window.requestAnimationFrame(animate)
	
	background.update()
	shop.update()
	c.fillStyle = 'rgba(255,255,255, 0.15)'
	c.fillRect(0,0, canvas.width, canvas.height)
	player.update()
	enemy.update()
	
	player.velocity.x = 0
	if(key.a.pressed && player.lastKey=='a'){
		player.velocity.x = -5
		player.Left(true)
		player.run()	
	}
	else if (key.d.pressed && player.lastKey=='d'){
		player.velocity.x = 5
		player.Left(false)
		player.run()	
	}
	else{
		player.idle()
	}
	

	if(player.velocity.y<0){
		player.jumpSprite()
	}
	if(player.velocity.y>0){
		player.fall()
	}

	enemy.velocity.x = 0
	if(key.ArrowRight.pressed && enemy.lastKey=='ArrowRight'){
		enemy.velocity.x = 5
		enemy.Left(true)
		enemy.run()

	}
	else if (key.ArrowLeft.pressed && enemy.lastKey=='ArrowLeft'){
		enemy.velocity.x = -5
		enemy.Left(false)
		enemy.run()

	}
	else{ 
		enemy.idle()
	}
	if(enemy.velocity.y<0){
		enemy.jumpSprite()
	}
	if(enemy.velocity.y>0){
		enemy.fall()
	}



	

	//detect collision
	if(player.isAttacking){
		if(player.isLeft===false && rectangularCollision({rectangle1:player, rectangle2:enemy,left:false}) && player.framesCurrent===4)	
			{
				player.isAttacking = false
				enemy.takeHit()
				gsap.to("#enemyHealth", {width:enemy.health+'%', borderRadius: '20px 0px 0px 20px'})
			}
		if(player.isLeft && rectangularCollision({rectangle1:player, rectangle2:enemy, left: true}) && player.framesCurrent===2){
			player.isAttacking = false
			enemy.takeHit()
			gsap.to("#enemyHealth", {width:enemy.health+'%', borderRadius: '20px 0px 0px 20px'})
		}
	}
	
	if(player.isAttacking && player.framesCurrent===4 && player.isLeft==false){
		player.isAttacking = false
	}

	if(player.isAttacking && player.framesCurrent===2 && player.isLeft){
		player.isAttacking = false
	}

	if(enemy.isAttacking){
		if(enemy.isAttacking && rectangularCollision({rectangle1:enemy, rectangle2:player, left: false}) &&  enemy.framesCurrent===1){
			player.takeHit()
			enemy.isAttacking = false
			gsap.to("#playerHealth", {width:player.health+'%', borderRadius: '0px 20px 20px 0px'})
		}
		if(enemy.isAttacking && rectangularCollision({rectangle1:enemy, rectangle2:player, left: true}) &&  enemy.framesCurrent===3){
			player.takeHit()
			enemy.isAttacking = false
			gsap.to("#playerHealth", {width:player.health+'%', borderRadius: '0px 20px 20px 0px'})
		}
	}	
	if(enemy.isAttacking && enemy.framesCurrent===1 && player.isLeft===false){
		enemy.isAttacking = false
	}
	if(enemy.isAttacking && enemy.framesCurrent===3 && player.isLeft){
		enemy.isAttacking = false
	}
	
	if(enemy.health<=0 || player.health<=0) 
		{	
			endGame()
		}

}

animate()

window.addEventListener('keydown', (event) => {
	if(startGame===false) return
	switch (event.key){
		case 'd':
			key.d.pressed = true
			player.lastKey = 'd'
			break
		case 'a':
			key.a.pressed = true
			player.lastKey = 'a'
			break
		case 'w':
			player.jump()
			break
		case ' ':
			player.attack()
			break
		case 'ArrowRight':
			key.ArrowRight.pressed = true
			enemy.lastKey = 'ArrowRight'
			break
		case 'ArrowLeft':
			key.ArrowLeft.pressed = true
			enemy.lastKey = 'ArrowLeft'
			break
		case 'ArrowUp':
			enemy.jump()
			break
		case 'ArrowDown':
			enemy.attack()
			break
			
	}
})

window.addEventListener('keyup', (event) => {
	if(startGame===false) return
	switch (event.key){
		case 'd':
			key.d.pressed = false
			break
		case 'a':
			key.a.pressed = false
			break
		case 'ArrowRight':
			key.ArrowRight.pressed = false
			break
		case 'ArrowLeft':
			key.ArrowLeft.pressed = false
			break

	}
})