function EraserTool() {
    this.icon = 'assets/eraser.jpg'
    this.name = 'Eraser Tool'
    this.description = 'The Eraser'

    var strokeWidthSlider
    var previousMouseX = -1
    var previousMouseY = -1

    this.draw = function () {
        stroke(color('white'))
        strokeWeight(strokeWidthSlider.value())
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

    this.populateOptions = function () {
        colourP.removePallet()
        select('#undoButton').hide()

        select('.options').html("<div id='lineStrokeWidth'>Width: </div> <br/>")

        strokeWidthSlider = createSlider(1, 50, 1, 1)
        strokeWidthSlider.parent(select('#lineStrokeWidth'))
    }
}