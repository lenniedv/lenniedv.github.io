function StampTool() {
    this.icon = 'assets/stamp.jpg'
    this.name = 'Stamp Tool'
    this.description = 'Insert a JPEG/PNG image as a stamp'

    var fileChooser = null
    var imgData = null
    var startSlider = null

    this.draw = function() {
        if (mouseIsPressed) {
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
    }

    this.unselectTool = function() {
        select('.options').html('')
    }

    this.populateOptions = function() {
        colourP.removePallet()
        select('.options').html(
            "<div id='slider'>Image Size: </div><br/><button id='resetButton'>Reset</button>"
        )
        fileChooser = createFileInput(file => {
            if (file.type === 'image') {
                imgData = file.data
            } else {
                imgData = null
            }
        })

        select('#picker').html("<div class='picker'></div>")
        fileChooser.parent(select('.picker'))

        startSlider = createSlider(5, 100, 50, 5)
        startSlider.parent('#slider')

        select('#resetButton').mouseClicked(function() {
            imgData = null
        })
    }
}