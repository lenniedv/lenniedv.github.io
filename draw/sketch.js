//global variables that will store the _toolbox colour palette
//amnd the helper functions
var _toolbox = null
var _colourP = null
var _helpers = null
var _canvas = null

function setup() {
    //create a canvas to fill the content div from index.html
    const canvasContainer = select('#content')
    _canvas = createCanvas(canvasContainer.size().width, canvasContainer.size().height)
    _canvas.parent('content')

    //create helper functions and the colour palette
    _helpers = new HelperFunctions()
    _colourP = new ColourPalette()

    //create a _toolbox for storing the tools
    _toolbox = new Toolbox()

    //add the tools to the _toolbox.
    _toolbox.addTool(new EraserTool())
    _toolbox.addTool(new FreehandTool())
    _toolbox.addTool(new LineToTool())
    _toolbox.addTool(new mirrorDrawTool())
    _toolbox.addTool(new SprayCanTool())
    _toolbox.addTool(new ShapeTool())
    _toolbox.addTool(new StampTool())
    _toolbox.addTool(new MovieTool())
    background(255)
    select('#undoButton').hide()
}

function draw() {
    if (_toolbox.selectedTool.hasOwnProperty('draw')) {
        _toolbox.selectedTool.draw()
    }
}

function mousePressed() {
    if (_toolbox.selectedTool.hasOwnProperty('mousePressed')) {
        _helpers.saveState()
        _toolbox.selectedTool.mousePressed()
    }
}