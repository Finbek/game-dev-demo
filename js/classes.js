class Sprite {
	constructor({position, imageSrc, scale=1, framesMax=1, offset = {x:0, y:0}}){
		this.position = position
		this.height = 150
		this.width = 50
		this.image = new Image()
		this.image.src = imageSrc
		this.scale = scale
		this.framesMax = framesMax
		this.framesCurrent=0
		this.framesElapsed =0
		this.framesHold =5
		this.offset = offset
		this.isLeft = false
	}
	draw(){
		c.drawImage(this.image, 
				this.framesCurrent*(this.image.width/this.framesMax),
				0, 
				this.image.width/this.framesMax, 
				this.image.height, 
				this.position.x-this.offset.x, 
				this.position.y-this.offset.y, 
				(this.image.width/this.framesMax)*this.scale, 
				this.image.height*this.scale)
	}
	animateFrames(){
		this.framesElapsed++
		if(this.framesElapsed%this.framesHold===0){
			if(this.framesCurrent+1<this.framesMax) this.framesCurrent+=1
			else this.framesCurrent=0
		}
	}
	animateFramesLeft(){
		this.framesElapsed++
		if(this.framesElapsed%this.framesHold===0){
			if(this.framesCurrent-1>=0) this.framesCurrent-=1
			else this.framesCurrent=this.framesMax-1
		}
	}
	update(){
		this.draw()
		this.animateFrames()
		
	}
}

class Fighter extends Sprite{
	constructor({position, 
		velocity, 
		color,
		imageSrc, 
		scale=1, 
		framesMax=1, 
		offset={x:0, y:0}, 
		sprites,
		attackBox= {offset: {}, width:undefined, height: undefined}}){
		super({position, imageSrc, scale,framesMax, offset})
		this.velocity = velocity
		this.height = 150
		this.width = 50
		this.color= color
		this.lastKey
		this.attackBox = {
			position: {
				x:this.position.x+this.width/2,
				y: this.position.y
			},
			offset:attackBox.offset,
			height: attackBox.height,
			width: attackBox.width,
			flipChange: attackBox.flipChange
		}
		this.state = 'idle'
		this.isAttacking = false
		this.canJump =true
		this.health = 100
		this.sprites=  sprites
		for (const sprite in this.sprites){
			sprites[sprite].image = new Image()
			sprites[sprite].image.src =sprites[sprite].imageSrc
		}
	}

	update(){

		this.draw()

		if((this.state==='death' && this.framesCurrent===this.framesMax-1) ||  (this.state==='deathLeft' && this.framesCurrent===0))
			{ if(this.position.y+this.height+this.velocity.y>=canvas.height-96){
					this.velocity.y = 0
					this.position.y = 330
			}
				else this.velocity.y+=gravity
				return
			}
		if(this.isLeft) this.animateFramesLeft()
		else this.animateFrames()

		if(this.state!='idle' && this.state!='idleLeft') 
		this.attackBox.position.x = this.position.x+this.width/2+this.attackBox.offset.x
		this.attackBox.position.y = this.position.y+this.attackBox.offset.y
		
			// c.fillStyle = this.color
			// c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
		
		if(this.position.y+this.height+this.velocity.y>=canvas.height-96){
			this.velocity.y = 0
			this.position.y = 330
		}
		else this.velocity.y+=gravity

		if(this.position.y+this.velocity.y<=0){
			this.velocity.y = 1
		}

		if(this.position.x+this.width+this.velocity.x>=canvas.width ||this.position.x+this.velocity.x<0){
			this.velocity.x = 0
		}
		// this.attackBox.position.x = this.position.x+Math.abs(this.position.x-this.width)/2
		// this.attackBox.position.y = this.position.y+Math.abs(this.position.y-this.height)/2
		this.position.x+=this.velocity.x
		this.position.y+=this.velocity.y


		
	}

	Left(side){
		if(this.isLeft!=side){
			this.attackBox.offset.x = -this.attackBox.offset.x+this.attackBox.flipChange
			this.attackBox.width = -this.attackBox.width 
			this.isLeft = side
		}
	}
	jump(){
		if(this.canJump){
			this.canJump = false
			this.velocity.y-=16;
			setTimeout(()=>{this.canJump= true}, 300)
		}
	}

	jumpSprite(){
		if(this.isLeft) this.switchSprite('jumpLeft')
		else this.switchSprite('jump')
	}
	takeHit(){
		this.health-=10
		this.switchSprite('takeHit')
		if(this.health<=0){
			if(this.isLeft) 
				this.switchSprite('deathLeft')
			else
				this.switchSprite('death')
		}
		else{
			if(this.isLeft) 
				this.switchSprite('takeHitLeft')
			else this.switchSprite('takeHit')
		}
	}

	attack(){
		if(this.isLeft){
			this.switchSprite('attack1Left') 
		}
		else this.switchSprite('attack1')
		this.isAttacking = true
	}

	idle(){
		if(this.isLeft) this.switchSprite('idleLeft') 
		else this.switchSprite('idle')
	}
	
	fall(){
		if(this.isLeft) this.switchSprite('fallLeft')
		else this.switchSprite('fall')
	}

	run(){
		if(this.isLeft) this.switchSprite('runLeft')
		else this.switchSprite('run')
	}
	switchSprite(sprite){

		if(this.state==sprite || this.state=='death'|| this.state=='deathLeft') return
		if(sprite !='death' && sprite!='deathLeft'){
			if(this.state=='attack1' && this.framesCurrent<this.framesMax-1) return 
			if(this.state=='attack1Left' && this.framesCurrent>0) return
			if(this.state=='takeHit' && this.framesCurrent<this.framesMax-1) return
			if(this.state=='takeHitLeft' && this.framesCurrent>0) return

		}
		this.image =this.sprites[sprite].image
		this.framesMax = this.sprites[sprite].framesMax
		if(this.isLeft){
			this.framesCurrent=this.framesMax-1
		}
		else this.framesCurrent=0
		this.state = sprite
	}
	
}