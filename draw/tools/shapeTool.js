function ShapeTool() {
    this.icon = 'assets/shape.jpg'
    this.name = 'Shape Tool'
    this.description = 'Draw a 2D shape'

    var strokeWidthSlider
    var shapeOptions
    var inputWidth
    var inputHeight
    var trianglePoints

    this.draw = function () {
        stroke(_colourP.selectedColour())
        fill(_colourP.fillColour())
        strokeWeight(strokeWidthSlider.value())
        select('#slideValue').html(strokeWidthSlider.value())
    }

    this.mousePressed = function () {
        const width = ToInt("Width", inputWidth.value())
        const height = ToInt("Height", inputHeight.value())
        if (width == -1 || height == -1) return;
        if (shapeOptions.value() == 'Circle') {
            drawCircle(width)
        } else if (shapeOptions.value() == 'Rectangle') {
            drawRectangle(width, height)
        } else if (shapeOptions.value() == 'Triangle') {
            drawTriangle()
        }
    }

    this.unselectTool = function () {
        trianglePoints = []
        _helpers.clearOptions();
        select('#undoButton').hide()
    }

    this.populateOptions = function () {
        trianglePoints = []
        _colourP.createStrokeAndFillPallet()
        select('.options').html(
            "<div id='shapeOptions'>Shape: </div> <br/> " +
            "<div>Line Stroke Width: <input id='lineStrokeWidth' type='range' min='1' max='10' step='1'><output id='slideValue'>0</output></div> <br/>" +
            "<div id='inputWidth'>Width: </div> <br/> <div id='inputHeight'>Height: </div>"
        )
        shapeOptions = createSelect()
        shapeOptions.option('-- Select Shape --')
        shapeOptions.option('Circle')
        shapeOptions.option('Rectangle')
        shapeOptions.option('Triangle')
        shapeOptions.parent(select('#shapeOptions'))

        strokeWidthSlider = select('#lineStrokeWidth')

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

    function ToInt(description, value) {
        try {
            const result = parseInt(value)
            if (result < 0) {
                alert(description + " must be numeric greater than zero")
                return -1
            }
            return result
        }
        catch {
            alert("Number must be numeric");
            return -1
        }
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