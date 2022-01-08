function ShapeTool() {
    this.icon = 'assets/shape.jpg'
    this.name = 'Shape Tool'
    this.description = 'Draw a 2D shape: circle, rectangle (IN PROGRESS)'

    this.draw = function() {
        stroke(colourP.selectedColour())
    }

    this.populateOptions = function() {
        colourP.createPallet()
    }
}