//global variables that will store the toolbox colour palette
//amnd the helper functions
var toolbox = null
var colourP = null
var helpers = null
var canvas = null

function setup() {
    //create a canvas to fill the content div from index.html
    canvasContainer = select('#content')
    canvas = createCanvas(canvasContainer.size().width, canvasContainer.size().height)
    canvas.parent('content')

    //create helper functions and the colour palette
    helpers = new HelperFunctions()
    colourP = new ColourPalette()

    //create a toolbox for storing the tools
    toolbox = new Toolbox()

    //add the tools to the toolbox.
    toolbox.addTool(new EraserTool())
    toolbox.addTool(new FreehandTool())
    toolbox.addTool(new LineToTool())
    toolbox.addTool(new mirrorDrawTool())
    toolbox.addTool(new SprayCanTool())
    toolbox.addTool(new ShapeTool())
    toolbox.addTool(new StampTool())
    toolbox.addTool(new MovieTool())
    background(255)
    select('#undoButton').hide()
}

function draw() {
    if (toolbox.selectedTool.hasOwnProperty('draw')) {
        toolbox.selectedTool.draw()
    }
}

function mousePressed() {
    if (toolbox.selectedTool.hasOwnProperty('mousePressed')) {
        if (helpers.mousePressedOnCanvas(canvas)) {
            helpers.saveState()
            toolbox.selectedTool.mousePressed()
        }
    }
}