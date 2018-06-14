class cScore {
    public div: HTMLElement
    private game: Game
    public score: number
    constructor() {
        this.div = document.createElement('score')

        document.body.appendChild(this.div)


    }
    public update() {
        this.score++
        this.div.innerHTML = "Score: " + this.score
        document.cookie = "score=" + this.score
        if(this.score < 0){
            this.score = 0

        }
    }
    public showScore() {

    }
}