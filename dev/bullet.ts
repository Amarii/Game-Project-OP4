/// <reference path="gameobject.ts"/>

class bullet extends GameObject {

    public speed: number

    protected div: HTMLElement
    constructor(x: number, y: number, speed: number) {
        super(x, y)
        this.x = x
        this.y = y
        this.speed = speed
        this.div = document.createElement("bullet")
        document.body.appendChild(this.div)

    }

    draw() {

        //console.log(123)
    }
    public kill() {
        this.div.remove()

    }


    update() {
        this.x = this.x + this.speed
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
}