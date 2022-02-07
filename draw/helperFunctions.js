function HelperFunctions() {
    var previousState = null

    //event handler for the clear button event. Clears the screen
    select('#clearButton').mouseClicked(function () {
        background(255, 255, 255)
        //call loadPixels to update the drawing state
        //this is needed for the mirror tool
        loadPixels()
    })

    //event handler for the save image button. saves the canvsa to the
    //local file system.
    select('#saveImageButton').mouseClicked(function () {
        saveCanvas('myPicture', 'jpg')
    })

    select('#undoButton').mouseClicked(function () {
        if (previousState) {
            background(255)
            image(previousState, 0, 0, width, height)
            select('#undoButton').hide()
            previousState = null
        }
    })

    this.mousePressedOnCanvas = function (canvas) {
        return (
            mouseX > canvas.elt.offsetLeft &&
            mouseX < canvas.elt.offsetLeft + canvas.width &&
            mouseY > canvas.elt.offsetTop &&
            mouseY < canvas.elt.offsetTop + canvas.height - 200
        )
    }

    this.saveState = function () {
        previousState = get()
        select('#undoButton').show()
        select("#undoButton").style("")
    }
}