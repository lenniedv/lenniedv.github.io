function ColourPalette() {
    this.strokeColorPicker = createColorPicker(color('black'))
    this.fillColorPicker = createColorPicker(color('white'))

    this.selectedColour = function() {
        return this.strokeColorPicker ? this.strokeColorPicker.color() : color('black')
    }

    this.fillColour = function() {
        return this.fillColorPicker ? this.fillColorPicker.color() : color('white')
    }

    this.createPallet = function() {
        this.removePallet()
        if (this.strokeColorPicker == null) {
            select('#picker').html("<div class='picker'>Color: </div>")

            this.strokeColorPicker = createColorPicker(color('black'))
            this.strokeColorPicker.parent(select('.picker'))

            fill(color('black'))
            stroke(color('black'))
        }
    }

    this.createStrokeAndFillPallet = function() {
        this.removePallet()
        if (this.strokeColorPicker == null) {
            select('#picker').html(
                "<div class='picker' id='picker_1'>Stroke Color: </div>" +
                "<div class='picker' id='picker_2'>Fill Color: </div>"
            )

            this.strokeColorPicker = createColorPicker(color('black'))
            this.strokeColorPicker.parent(select('#picker_1'))

            this.fillColorPicker = createColorPicker(color('black'))
            this.fillColorPicker.parent(select('#picker_2'))

            fill(color('black'))
            stroke(color('black'))
        }
    }

    this.removePallet = function() {
        select('#picker').html('')
        if (this.strokeColorPicker != null) {
            this.strokeColorPicker.remove()
            this.strokeColorPicker = null
        }
        if (this.fillColorPicker != null) {
            this.fillColorPicker.remove()
            this.fillColorPicker = null
        }
    }
}