function ColourPalette() {
    this.picker = createColorPicker(color('black'))

    this.selectedColour = function() {
        return this.picker.color()
    }

    this.createPallet = function() {
        if (this.picker == null) {
            select('#picker').html("<div class='picker'>Color Picker: </div>")
            this.picker = createColorPicker(color('black'))
            fill(color('black'))
            stroke(color('black'))
            this.picker.parent(select('.picker'))
        }
    }

    this.removePallet = function() {
        if (this.picker != null) {
            this.picker.remove()
            select('#picker').html('')
            this.picker = null
        }
    }

    this.setup = function() {
        this.createPallet()
    }

    this.setup()
}