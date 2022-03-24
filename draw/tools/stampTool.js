function StampTool() {
    this.icon = 'assets/stamp.jpg'
    this.name = 'Stamp Tool'
    this.description = 'Insert a JPEG/PNG image as a stamp'

    var fileChooser = null
    var imgData = null
    var startSlider = null
    var _rememberShapeWidth

    this.mousePressed = function () {
        if (imgData) {
            loadImage(
                imgData,
                img => {
                    const startSize = startSlider.value()
                    const startX = mouseX - startSize / 2
                    const startY = mouseY - startSize / 2
                    image(img, startX, startY, startSize, startSize)
                },
                error => {
                    alert('Unable to load image: ' + error)
                }
            )
        }
    }

    this.draw = function () {
        select('#slideValue').html(startSlider.value())
        _rememberShapeWidth = startSlider.value()
    }

    this.unselectTool = function () {
        _helpers.clearOptions()
        select('#undoButton').hide()
    }

    this.populateOptions = function () {
        _colourP.removePallet()

        select('.options').html(
            "<div>Image Size: <input id='slider' type='range' min='10' max='200' step='5' value='" +
            _rememberShapeWidth +
            "'><output id='slideValue'>0</output></div></br> <button id='resetButton'>Reset</button>"
        )
        fileChooser = createFileInput(file => {
            if (file.type === 'image') {
                imgData = file.data
            } else {
                alert('Please select an image')
                imgData = null
            }
        })

        select('#picker').html("<div class='picker'></div>")
        fileChooser.parent(select('.picker'))

        startSlider = select('#slider')

        select('#resetButton').mouseClicked(function () {
            this.populateOptions()
            imgData = null
        })
    }
}
