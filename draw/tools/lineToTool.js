//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the
//pixel array.
function LineToTool() {
    this.icon = 'assets/lineTo.jpg'
    this.name = 'LineTo'
    this.description = 'Draw a line from one point to another'

    var startMouseX = -1
    var startMouseY = -1
    var drawing = false
    var slider = null

    //draws the line to the screen
    this.draw = function () {
        stroke(_colourP.selectedColour())
        strokeWeight(slider.value())
        select('#lineStrokeWidthValue').html(slider.value())

        //only draw when mouse is clicked
        if (mouseIsPressed) {
            //if it's the start of drawing a new line
            if (startMouseX == -1) {
                startMouseX = mouseX
                startMouseY = mouseY
                drawing = true
                //save the current pixel Array
                loadPixels()
            } else {
                //update the screen with the saved pixels to hide any previous
                //line between mouse pressed and released
                updatePixels()
                //draw the line
                line(startMouseX, startMouseY, mouseX, mouseY)
            }
        } else if (drawing) {
            //save the pixels with the most recent line and reset the
            //drawing bool and start locations
            loadPixels()
            drawing = false
            startMouseX = -1
            startMouseY = -1
        }
    }

    this.unselectTool = function () {
        _helpers.clearOptions();
    }

    this.populateOptions = function () {
        _colourP.createPallet()
        select('#undoButton').hide()
        select('.options').html(
            "<div>Line Stoke Width: <input id='lineStrokeWidth' type='range' min='1' max='10' step='1'><output id='lineStrokeWidthValue'></output></div>"
        )

        slider = select('#lineStrokeWidth')
    }
}