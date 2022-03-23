function MovieTool() {
    this.icon = 'assets/movie.jpg'
    this.name = 'GIFy Tool'
    this.description =
        'Create your own GIF animation. Upload your motionless pictures in the blocks, set frame rate, and press play!'

    // Set image size
    const SIZE = {
        width: 200,
        height: 200
    }

    const State = {
        INIT: 'Init',
        PLAY: 'Play'
    }

    var _images = []
    var _imageData = []
    var _currentAnimationPosition = 0
    var _frameRateSlider
    var _currentState = State.INIT
    var _demoMode = false
    var _recordButton
    var _repeatAnimation

    this.draw = function () {
        noFill()
        if (_currentState == State.INIT) {
            drawFrames()
        } else if (_currentState == State.PLAY) {
            animateLoop()
        }
    }

    this.populateOptions = function () {
        _colourP.removePallet()
        _helpers.clearCanvas()
        _helpers.clearOptions()
        _helpers.clearPicker()
        _canvas.drop(gotFile)
        setupOptions()
        setupFrames()
    }

    this.unselectTool = function () {
        _helpers.clearOptions()
        _helpers.clearCanvas()
        _helpers.clearPicker()
    }

    function setupOptions() {
        select('#picker').html(
            "<image id='playButton' class='playButton' src='assets/play.png' title='Play'></image>" +
            "<image id='recordButton' class='recordButton' src='assets/record.png' title='Start Recording'></image>"
        )

        select('.options').html(
            "<div>Frame Rate: <input id='slider' type='range' min='1' max='10' step='1' value='5'><output id='slideValue'>0</output></br></br>" +
            "Repeat: <input id='repeat' type='checkbox' checked='true'></br></br > " +
            "<button id='demoButton'>Demo</button> " +
            "<button id='resetButton'>Reset</button>" +
            '</div>'
        )

        select('#playButton').mouseClicked(function () {
            setState()
            startAnimation()
        })

        select('#recordButton').mouseClicked(function () {
            recordAnimation()
        })

        _recordButton = select('#recordButton')
        _recordButton.hide()

        _repeatAnimation = select('#repeat')

        _frameRateSlider = select('#slider')
        _frameRateSlider.input(startAnimation)
        select('#slideValue').html(_frameRateSlider.value())

        select('#demoButton').mouseClicked(function () {
            if (_demoMode) {
                select('#demoButton').html('Demo')
                clear()
            } else {
                select('#demoButton').html('Clear')
                demoImages()
            }
            _demoMode = !_demoMode
        })

        select('#resetButton').mouseClicked(function () {
            if (confirm('Sure you wish to reset and start from new?')) {
                demoMode = false
                stopAnimation()
                clear()
            }
        })
    }

    function clear() {
        _helpers.clearCanvas()
        _imageData = []
        _currentState = State.INIT
    }

    function setState() {
        if (_currentState == State.INIT) {
            if (_imageData.length >= 3) {
                _currentState = State.PLAY
                _recordButton.show()
                select('#playButton').attribute('src', 'assets/stop.png')
            } else {
                alert('Not enough pictures uploaded. A minimum of 3 pictures are required.')
            }
        } else if (_currentState == State.PLAY) {
            stopAnimation()
        }
    }

    function stopAnimation() {
        _currentState = State.INIT
        _helpers.clearCanvas()
        _recordButton.hide()
        select('#playButton').attribute('src', 'assets/play.png')
    }

    function gotFile(file) {
        if (file.type === 'image') {
            var imageRect = _images.find(x => x.IsInBorder(mouseX, mouseY))
            if (imageRect) {
                loadImage(
                    file.data,
                    img => {
                        _imageData[imageRect.ref] = img
                    },
                    error => {
                        alert('Unable to load image: ' + error)
                    }
                )
            }
        } else {
            alert('Please select an image')
        }
    }

    function setupFrames() {
        var xPos = 100
        var yPos = 100
        var index = 0
        for (var y = 0; y < 2; y++) {
            for (var x = 0; x < 6; x++) {
                var currentImage = new ImageRect(index, xPos, yPos, SIZE.width, SIZE.height)
                _images.push(currentImage)
                xPos += 220
                index++
            }
            yPos += 250
            xPos = 100
        }
    }

    function drawFrames() {
        for (var i = 0; i < _images.length; i++) {
            var currentImage = _images[i]
            currentImage.draw(_imageData)
        }
    }

    function startAnimation() {
        select('#slideValue').html(_frameRateSlider.value())
        if (_currentState == State.INIT) return

        _currentAnimationPosition = 0
        _helpers.clearCanvas()
        frameRate(_frameRateSlider.value())
    }

    function animateLoop() {
        _helpers.clearCanvas()
        if (_currentAnimationPosition < _imageData.length) {
            if (_imageData[_currentAnimationPosition]) {
                image(_imageData[_currentAnimationPosition], 0, 0, SIZE.width, SIZE.height)
                _currentAnimationPosition++
            }
        } else if (_repeatAnimation.checked()) {
            _currentAnimationPosition = 0
        } else {
            stopAnimation()
        }
    }

    function recordAnimation() {
        _recordButton.hide()
        createLoop(_canvas, {
            framesPerSecond: 2,
            duration: 3,
            gif: {
                render: false,
                open: false,
                download: true,
                options: {
                    repeat: _repeatAnimation.checked() ? 0 : -1,
                    width: SIZE.width,
                    height: SIZE.height
                }
            }
        })
    }

    function demoImages() {
        _imageData = []
        _imageData.push(loadImage('../samples/animation/mm_01.png'))
        _imageData.push(loadImage('../samples/animation/mm_02.png'))
        _imageData.push(loadImage('../samples/animation/mm_03.png'))
        _imageData.push(loadImage('../samples/animation/mm_04.png'))
        _imageData.push(loadImage('../samples/animation/mm_05.png'))
        _imageData.push(loadImage('../samples/animation/mm_06.png'))
        _imageData.push(loadImage('../samples/animation/mm_07.png'))
        _imageData.push(loadImage('../samples/animation/mm_08.png'))
        _imageData.push(loadImage('../samples/animation/mm_09.png'))
        _imageData.push(loadImage('../samples/animation/mm_10.png'))
        _imageData.push(loadImage('../samples/animation/mm_11.png'))
        _imageData.push(loadImage('../samples/animation/mm_12.png'))
    }
}
