
class Player {
    position: { x: number; y: number }
    velocity: { x: number; y: number }
    width: number
    height: number
    image: HTMLImageElement
    rotation: number
    opacity: number
    constructor(imgsrc, wichPlayer, taille, y ) {
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1

        const image = new Image()
        image.src = imgsrc
        image.onload = () => {
            const scale = taille
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            if (!this.position) {
                this.position = {
                    x: (canvas.width / 5 ) * wichPlayer - this.width / 2,
                    y: canvas.height - y
                }
            }
        }
    }
    draw() {
        // c.fillStyle = 'red'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.save()
        c.globalAlpha = this.opacity
        c.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
                )   
        c.restore()
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x +=  this.velocity.x
        }
        
    }
}
