/// <reference path="playscreen.ts"/>

class Game {


    private currentscreen: any
    private score: number
    private test: string
    private parsedtest
    public highscore: number[] = []

    constructor() {
        
        for(let i = 0; i < 5; i++){
        
        if(window.localStorage){
            this.test = localStorage.getItem( "" + i)
        this.parsedtest = JSON.parse(this.test)
            
        }
        this.highscore.push(this.parsedtest)
            
        }
        this.currentscreen = new StartScreen(this)
        this.gameLoop()
    }

    private gameLoop(): void {
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public showPlayScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new PlayScreen(this)
    }

    public showGameoverScreen(score: number, highscore: number[]) {
        this.score = score
        this.highscore = highscore
        document.body.innerHTML = ""
        this.currentscreen = new GameOver(this, score, highscore)
    }
    public showStartScreen() {
        document.body.innerHTML = ""
        this.currentscreen = new StartScreen(this)
    }

}


window.addEventListener("load", () => new Game())