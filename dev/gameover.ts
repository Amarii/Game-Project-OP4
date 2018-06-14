
class GameOver {

    private div: HTMLElement
    private game: Game
    private playscreen: PlayScreen
    private score: number[]
    private highscore: HTMLElement



    constructor(g: Game, score: number, highscore: number[]) {
        this.game = g
        for(let i = 0; i < highscore.length; i++){
        localStorage.setItem( JSON.stringify(i) , JSON.stringify(highscore[i]));
       // alert
        
       
    }
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", () => this.splashClicked())
        this.div.innerHTML = "GAME OVER YOUR SCORE: " + score + "<br>" + " TRY AGAIN?"
        highscore.sort(function (a, b) { return b - a })
        this.highscore = document.createElement("ul")
        document.body.appendChild(this.highscore)
        this.highscore.innerHTML = "HighScore: "
        for (let i = 0; i < 5; i++) {
            this.highscore = document.createElement("ul")
            document.body.appendChild(this.highscore)

            this.highscore.innerHTML = (i + 1) + ": " + highscore[i];
        }

    }


    public update() {

    }

    private splashClicked() {
        this.game.showPlayScreen()
    }
}