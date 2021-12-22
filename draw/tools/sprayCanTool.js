function SprayCanTool() {
    this.name = 'sprayCanTool'
    this.icon = 'assets/sprayCan.jpg'
    this.description = 'Colour with spray paint effect'

    var points = 13
    var spread = 10

    this.draw = function() {
        stroke(colourP.selectedColour())
        if (mouseIsPressed) {
            for (var i = 0; i < points; i++) {
                point(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread))
            }
        }
    }
}