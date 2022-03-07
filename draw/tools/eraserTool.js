function EraserTool() {
    this.icon = 'assets/eraser.jpg'
    this.name = 'Eraser Tool'
    this.description = 'The Eraser'

    var strokeWidthSlider
    var previousMouseX = -1
    var previousMouseY = -1

    this.draw = function() {
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

        select('#lineStrokeWidthValue').html(strokeWidthSlider.value())
    }

    this.populateOptions = function() {
        _colourP.removePallet()
        select('#undoButton').hide()

        select('.options').html(
            "<div>Width: <input id='lineStrokeWidth' type='range' min='1' max='50' step='1'><output id='lineStrokeWidthValue'></output></div>"
        )

        strokeWidthSlider = select('#lineStrokeWidth')
    }
}