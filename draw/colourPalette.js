function ColourPalette() {
    this.strokeColorPicker = createColorPicker(color('black'))
    this.fillColorPicker = createColorPicker(color('white'))

    var rememberStrokeColor
    var rememberFillColor

    this.selectedColour = function () {
        return this.strokeColorPicker ? this.strokeColorPicker.color() : rememberStrokeColor
    }

    this.fillColour = function () {
        return this.fillColorPicker ? this.fillColorPicker.color() : rememberFillColor
    }

    this.createPallet = function () {

        rememberStrokeColor = rememberStrokeColor ? rememberStrokeColor : color("black")
        rememberFillColor = rememberFillColor ? rememberFillColor : color("black")

        this.removePallet()
        if (this.strokeColorPicker == null) {
            select('#picker').html("<div class='picker'>Color: </div>")

            this.strokeColorPicker = createColorPicker(rememberStrokeColor)
            this.strokeColorPicker.parent(select('.picker'))

            fill(rememberFillColor)
            stroke(rememberStrokeColor)
        }
    }

    this.createStrokeAndFillPallet = function () {
        rememberStrokeColor = rememberStrokeColor ? rememberStrokeColor : color("black")
        rememberFillColor = rememberFillColor ? rememberFillColor : color("black")

        this.removePallet()
        if (this.strokeColorPicker == null) {
            select('#picker').html(
                "<div class='picker' id='picker_1'>Stroke Color: </div>" +
                "<div class='picker' id='picker_2'>Fill Color: </div>"
            )

            this.strokeColorPicker = createColorPicker(rememberStrokeColor)
            this.strokeColorPicker.parent(select('#picker_1'))

            this.fillColorPicker = createColorPicker(rememberFillColor)
            this.fillColorPicker.parent(select('#picker_2'))

            fill(rememberFillColor)
            stroke(rememberStrokeColor)
        }
    }

    this.removePallet = function () {
        select('#picker').html('')
        if (this.strokeColorPicker != null) {
            rememberStrokeColor = this.strokeColorPicker.color()
            this.strokeColorPicker.remove()
            this.strokeColorPicker = null
        }
        if (this.fillColorPicker != null) {
            rememberFillColor = this.fillColorPicker.color()
            this.fillColorPicker.remove()
            this.fillColorPicker = null
        }
    }
}