

class PlayScreen {

    private div: HTMLElement
    private enemy: cEnemy[] = []
    private player: cPlayer
    private bullet: bullet[] = []
    private game: Game
    private health: health
    public score: cScore
    private spaceKey: number = 0
    public finalScore: number[]
    private timer: number = 0


    constructor(g: Game) {
        this.game = g
       

       
        this.player = new cPlayer(1)
        this.finalScore = this.game.highscore
        this.health = new health
        this.score = new cScore
        this.spaceKey = 32
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        this.score.score = 0
        for (var i = 0; i < 20; i++) {
            this.enemy.push(new cEnemy())
        }

    }


    public update(): void {
if(this.enemy.length < 4){
    console.log(123)
}

        this.timer++
        if (this.timer == 60) {
            this.enemy.push(new cEnemy())
            this.timer = 0
        }

        for (let b of this.bullet) {
            if (b.x > 1980) {
                this.bullet.splice(0, 1)
                if (this.bullet.length > 0) {
                    this.bullet[0].kill()

                }
            }
            for (let i = 0; i < this.enemy.length; i++) {
                if (this.checkCollision(b.getRectangle(), this.enemy[i].getRectangle())) {
                    this.enemy[i].kill()
                    this.enemy.splice(this.enemy.length, 1)
                }
            }

            b.update()

        }


        for (var p of this.enemy) {
            // ball hits player
            if (this.checkCollision(p.getRectangle(), this.player.getRectangle())) {
                this.health.health = this.health.health - 10
                this.health.div.style.width = this.health.health + "px"
                // console.log(this.game.health)
                this.player.hitPuppy()
                if (this.health.health == 0) {
                    this.finalScore.push(this.score.score)
                    console.log("highscore" + this.finalScore)
                    this.game.showGameoverScreen(this.score.score, this.finalScore)
                }
            }
            if (this.checkCollision(p.getRectangle(), this.player.getRectangle())) {
                //    this.game.showGameoverScreen()
            }

            // ball leaves the screen: gameover!
            if (p.getRectangle().left < 0) {
                p.hitWall()
            }


            p.update()
        }

        this.player.update()
        this.score.update()


    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spaceKey:
                this.bullet.push(new bullet(this.player.x + 55, this.player.y + 39, 10))

                break



        }
    }

}