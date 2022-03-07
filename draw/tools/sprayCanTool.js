function SprayCanTool() {
    this.name = 'sprayCanTool'
    this.icon = 'assets/sprayCan.jpg'
    this.description = 'Colour with spray paint effect'

    var points = 13
    var spread = 10
    var slider

    this.draw = function () {
        stroke(_colourP.selectedColour())
        strokeWeight(slider.value())
        if (mouseIsPressed) {
            for (var i = 0; i < points; i++) {
                point(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread))
            }
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
            "<div>Spray Stroke Width: <input id='lineStrokeWidth' type='range' min='1' max='10' step='1'><output id='slideValue'>0</output></div>"
        )

        slider = select('#lineStrokeWidth')
    }
}