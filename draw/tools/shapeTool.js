function ShapeTool() {
    this.icon = 'assets/shape.jpg'
    this.name = 'Shape Tool'
    this.description = 'Draw a 2D shape'

    var strokeWeightSlider
    var shapeOptions
    var inputWidth
    var inputHeight
    var trianglePoints

    this.draw = function() {
        stroke(colourP.selectedColour())
        fill(colourP.fillColour())
        strokeWeight(strokeWeightSlider.value())
    }

    this.mousePressed = function() {
        const width = parseInt(inputWidth.value())
        const height = parseInt(inputHeight.value())
        if (shapeOptions.value() == 'Circle') {
            drawCircle(width)
        } else if (shapeOptions.value() == 'Rectangle') {
            drawRectangle(width, height)
        } else if (shapeOptions.value() == 'Triangle') {
            drawTriangle()
        }
    }

    this.unselectTool = function() {
        trianglePoints = []
        select('.options').html('')
        select('#undoButton').hide()
    }

    this.populateOptions = function() {
        trianglePoints = []
        colourP.createStrokeAndFillPallet()
        select('.options').html(
            "<div id='shapeOptions'>Shape: </div> <br/> " +
            "<div id='lineStrokeWeight'>Line Stroke Weight: </div> <br/>" +
            "<div id='inputWidth'>Width: </div> <br/> <div id='inputHeight'>Height: </div>"
        )
        shapeOptions = createSelect()
        shapeOptions.option('-- Select Shape --')
        shapeOptions.option('Circle')
        shapeOptions.option('Rectangle')
        shapeOptions.option('Triangle')
        shapeOptions.parent(select('#shapeOptions'))

        strokeWeightSlider = createSlider(1, 10, 1, 1)
        strokeWeightSlider.parent(select('#lineStrokeWeight'))

        inputWidth = createInput(20)
        inputHeight = createInput(50)
        inputWidth.parent(select('#inputWidth'))
        inputHeight.parent(select('#inputHeight'))
    }

    // Private Functions
    function drawCircle(width) {
        ellipse(mouseX, mouseY, width)
    }

    function drawRectangle(width, height) {
        rect(mouseX, mouseY, width, height)
    }

    function drawTriangle() {
        console.log('trianglePoints.length: ', trianglePoints.length)
        if (trianglePoints.length == 3) {
            const x1 = trianglePoints[0].x
            const y1 = trianglePoints[0].y
            const x2 = trianglePoints[1].x
            const y2 = trianglePoints[1].y
            const x3 = trianglePoints[2].x
            const y3 = trianglePoints[2].y
            triangle(x1, y1, x2, y2, x3, y3)
            trianglePoints = []
        } else {
            trianglePoints.push({ x: mouseX, y: mouseY })
            point(mouseX, mouseY)
            if (trianglePoints.length == 3) drawTriangle()
        }
    }
}