/// <reference path="gameobject.ts"/>

class cPlayer extends GameObject {

    private div: HTMLElement
    private game: Game
    private bullet: bullet
    private downkey: number
    private upkey: number
    private leftkey: number
    private rightkey: number

    private downSpeed: number = 0
    private upSpeed: number = 0
    private leftSpeed: number = 0
    private rightSpeed: number = 0
    private aKey: number = 0
    private dKey: number = 0
    private sKey: number = 0
    private wKey: number = 0

  

 

    constructor(xp: number) {
        super(0,0)
        this.div = document.createElement("player")
        document.body.appendChild(this.div)

        //   this.health = health
        this.upkey = 87
        this.downkey = 83
        this.leftkey = 65
        this.rightkey = 68
        this.wKey = 38
        this.sKey = 40
        this.aKey = 37
        this.dKey = 39

        this.x = xp
        this.y = 200

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
    public hitPuppy() {

    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 10
                break
            case this.downkey:
                this.downSpeed = 10
                break
            case this.leftkey:
                this.leftSpeed = 10
                break
            case this.rightkey:
                this.rightSpeed = 10
                break
            case this.wKey:
                this.upSpeed = 10
                break
            case this.sKey:
                this.downSpeed = 10
                break
            case this.aKey:
                this.leftSpeed = 10
                break
            case this.dKey:
                this.rightSpeed = 10


        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
            case this.leftkey:
                this.leftSpeed = 0
                break
            case this.rightkey:
                this.rightSpeed = 0
                break
            case this.wKey:
                this.upSpeed = 0
                break
            case this.sKey:
                this.downSpeed = 0
                break
            case this.aKey:
                this.leftSpeed = 0
                break
            case this.dKey:
                this.rightSpeed = 0
                break
        }
    }

    public update() {
        let newY = this.y - this.upSpeed + this.downSpeed
        let newX = this.x - this.leftSpeed + this.rightSpeed
        // als de paddle binnen beeld blijft, dan ook echt updaten
        if (newY > -10 && newY + 100 < window.innerHeight) this.y = newY

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`

        if (newX > 0 && newX + 100 < window.innerWidth) this.x = newX

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

}