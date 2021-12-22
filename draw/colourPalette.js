function ColourPalette() {
    this.picker = createColorPicker(color('black'))

    this.selectedColour = function() {
        return this.picker.color()
    }

    this.setup = function() {
        fill(color('black'))
        stroke(color('black'))
        this.picker.position(200, 5)
    }
    this.setup()
}