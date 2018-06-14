/// <reference path="gameobject.ts"/>

class cEnemy extends GameObject {
    
    private enemyDiv : HTMLElement
    private game: Game


    private speedX: number
    private speedY: number
    
    constructor() {
        super(0,0)
        this.enemyDiv = document.createElement("enemy")
        document.body.appendChild(this.enemyDiv)
        
        this.x = window.innerWidth 
        this.y = Math.random() * (window.innerHeight - 150) + 60
        

        this.speedX = -3 - (Math.random() * 6)
        this.speedY = Math.random() * 6 - 3
    }

    public getRectangle(){
        return this.enemyDiv.getBoundingClientRect()
    }
    
    public kill(){
        this.enemyDiv.remove()
       
    }
    public hitWall(){
        this.speedX *= -1
    }

    public update() : void {
        this.x += this.speedX
        this.y += this.speedY
        
        if( this.y + this.getRectangle().height > (window.innerHeight -60) || this.y < 40) { 
            this.speedY *= -1
        }

        if (this.x > window.innerWidth) {
            this.speedX *= -1
        } 
                        
        this.enemyDiv.style.transform = `translate(${this.x}px, ${this.y}px)` 
    }
}