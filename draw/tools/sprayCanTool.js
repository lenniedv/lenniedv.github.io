function SprayCanTool() {
    this.name = 'sprayCanTool'
    this.icon = 'assets/sprayCan.jpg'
    this.description = 'Colour with spray paint effect'

    var points = 13
    var spread = 10
    var slider

    this.draw = function() {
        stroke(colourP.selectedColour())
        strokeWeight(slider.value())
        if (mouseIsPressed) {
            for (var i = 0; i < points; i++) {
                point(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread))
            }
        }
    }

    this.unselectTool = function() {
        select('.options').html('')
    }

    this.populateOptions = function() {
        colourP.createPallet()
        select('.options').html("<div id='options'>Spray Stroke Weight: </div>")
        slider = createSlider(1, 10, 1, 1)
        slider.parent(select('#options'))
    }
}