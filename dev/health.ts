class health {
    public div: HTMLElement
    public health: number = 300
    constructor() {
        this.div = document.createElement('health')
        document.body.appendChild(this.div)
        this.div.innerHTML = "HP"

    }
}