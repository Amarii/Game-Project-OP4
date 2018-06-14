class Ball {
    
    private div : HTMLElement
  //  
    public x : number
    public y : number
    public height: number = 22
    public width: number = 28
    public xSpeed: number
    private ySpeed: number
    public Nscore: number
    
    constructor() {
      //  
        this.div = document.createElement("ball")
        document.body.appendChild(this.div)
//
        this.Nscore = 0
        this.x = window.innerWidth
        this.y = Math.random() * window.innerHeight - 90
        this.xSpeed = Math.random() * 10 + 1
        this.ySpeed = 0
    }
    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
    

    
    public hitPaddle(){
        this.xSpeed *= -1
    }
    public update() : void {
        this.x = this.x + this.xSpeed
        this.y = this.y + this.ySpeed
         if(this.x > window.innerWidth){
 this.xSpeed *= -1

 //
 

 
         }
        else if(this.x < 0) {
            this.xSpeed *= -1
        }
        if(this.y > window.innerHeight){
            this.ySpeed *= -1
        }
        else if(this.y < 0){
            this.ySpeed *= -1
        }
        // if(this.y > window.innerHeight){
        //      this.ySpeed *= -1
        //  }

      //  console.log("X = " + this.x, "Y = " + this.y )
        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}