function FreehandTool() {
    //set an icon and a name for the object
    this.icon = 'assets/freehand.jpg'
    this.name = 'freehand'
    this.description = 'Draw with freehand pencil'

    //to smoothly draw we'll draw a line from the previous mouse location
    //to the current mouse location. The following values store
    //the locations from the last frame. They are -1 to start with because
    //we haven't started drawing yet.
    var previousMouseX = -1
    var previousMouseY = -1
    var slider = null

    this.draw = function () {
        fill(_colourP.selectedColour())
        stroke(_colourP.selectedColour())
        strokeWeight(slider.value())
        //if the mouse is pressed
        if (mouseIsPressed) {
            //check if they previousX and Y are -1. set them to the current
            //mouse X and Y if they are.
            if (previousMouseX == -1) {
                previousMouseX = mouseX
                previousMouseY = mouseY
            }
            //if we already have values for previousX and Y we can draw a line from
            //there to the current mouse location
            else {
                line(previousMouseX, previousMouseY, mouseX, mouseY)
                previousMouseX = mouseX
                previousMouseY = mouseY
            }
        }
        //if the user has released the mouse we want to set the previousMouse values
        //back to -1.
        //try and comment out these lines and see what happens!
        else {
            previousMouseX = -1
            previousMouseY = -1
        }

        select('#slideValue').html(slider.value())
    }

    this.unselectTool = function () {
        _helpers.clearOptions();
    }

    this.populateOptions = function () {
        _colourP.createPallet()
        select('#undoButton').hide()
        select('.options').html(
            "<div>Line Stroke Width: <input id='lineStrokeWidth' type='range' min='1' max='10' step='1'><output id='slideValue'>0</output></div>"
        )

        slider = select('#lineStrokeWidth')
    }
}