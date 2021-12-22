function EraserTool() {
    this.icon = 'assets/eraser.jpg'
    this.name = 'Eraser Tool'
    this.description = 'Erase mistakes'

    var previousMouseX = -1
    var previousMouseY = -1

    this.draw = function() {
        stroke(color('white'))
        strokeWeight(10)
        if (mouseIsPressed) {
            if (previousMouseX == -1) {
                previousMouseX = mouseX
                previousMouseY = mouseY
            } else {
                line(previousMouseX, previousMouseY, mouseX, mouseY)
                previousMouseX = mouseX
                previousMouseY = mouseY
            }
        } else {
            previousMouseX = -1
            previousMouseY = -1
        }
    }
}