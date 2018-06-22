
# CMTTHE01-4-Game
Link voor een demo
- https://amarii.github.io/Game-Project-OP4/

# Checklist
- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [ ] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [x] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [ ] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 


# Toelichting OOP principes
## Classes
In mijn game maak ik gebruik van Classes, Classes zijn onderdelen die samen deel uit maken van een groter geheel, classes zijn blauwdrukken van componenten, op deze manier hoef je code voor een 2e component niet nog een keer te schrijven

Hier een voorbeeld van een kleine class die ik gemaakt heb voor mijn game:
```
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
```

## Encapsulation

Encapsulation is om properties af te schermen of juist openbaar te maken, bij andere Classes,
door een Public voor de properties te zetten kan iedereen van buiten die Class deze property ook bekijken en aanpassen
Door middel van een protected kunnen alleen classes die overerven bij deze properties
en als laatst is er Private op deze manier kan alleen de Class waar de property staat de property gebruiken.
Hier een voorbeeld:

```
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
        super()
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
```
## Inheritance
Inheritance is het overerven van methods en properties, hierdoor voorkom je dubbele code.
als voorbeeld uit mijn game hebben zowel de bullets als de speler een x en y coordinaten en een update functie deze hoef je met inheritance niet appart in beide classes aan te maken

Hieronder een voorbeeld : 
```
class GameObject {

    public x: number;
    public y: number;


   // private div: HTMLElement;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }



    update() {

    }
}
```
```
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
```

# Klassendiagram

![umlgame-master](https://github.com/Amarii/Game-Project-OP4/blob/master/Untitled%20Diagram.png)


# Peer reviews
### PeerReview Joey Lim https://github.com/ZsZJ/CMTTHE01-4-Game

- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het
        op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan

### Extra opdrachten 

- [x] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [ ] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [x] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

## Mijn feedback
Marleen heeft echt als een gek aan deze game gewerkt, de game ziet er extreem goed verzorgd uit en de gameplay is ook best wel verslavend, de game was de eerste keren dat ik speelde nog vrij makkelijk, dit heeft hij ondertussen al weer aangepast waardoor het spel een echte uitdaging is.
