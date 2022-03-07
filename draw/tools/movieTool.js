function MovieTool() {
    this.icon = 'assets/movie.jpg'
    this.name = 'Gif Me'
    this.description = 'Create a GIF animation'

    const State = {
        INIT: "Init",
        PLAY: "Play"
    }

    var _images = []
    var _imageData = []
    var _currentAnimationPosition = 0
    var _frameRateSlider
    var _currentState = State.INIT
    var _demoMode = false

    this.draw = function () {
        noFill()
        if (_currentState == State.INIT) {
            drawFrames();
        }
        else if (_currentState == State.PLAY) {
            animateLoop();
        }
    }

    this.populateOptions = function () {
        _colourP.removePallet()
        _helpers.clearCanvas()
        _helpers.clearOptions();
        _canvas.drop(gotFile);
        setupOptions()
        setupFrames()

        // Testing
        //dummyImages();
    }

    this.unselectTool = function () {
        _helpers.clearOptions();

    }

    function setupOptions() {
        select('.options').html(
            "<div>Frame Rate: <input id='slider' type='range' min='1' max='10' step='1' value='5'><output id='slideValue'>0</output></br></br>" +
            "<image id='playButton' class='playButton' src='assets/play.png' title='Play'></image></br></br>" +
            "<button id='demoButton'>Demo</button>" +
            "</div>"
        )

        _frameRateSlider = select('#slider')
        _frameRateSlider.input(startAnimation);
        select('#slideValue').html(_frameRateSlider.value())

        select('#playButton').mouseClicked(function () {
            _currentState = State.PLAY
            startAnimation()
        })

        select('#demoButton').mouseClicked(function () {
            if (_demoMode) {
                select('#demoButton').html("Demo")
                _helpers.clearCanvas()
                _imageData = []
                _currentState = State.INIT
            }
            else {
                select('#demoButton').html("Clear")
                demoImages()
            }
            _demoMode = !_demoMode
        })
    }

    function gotFile(file) {
        if (file.type === 'image') {
            var imageRect = _images.find(x => x.IsInBorder(mouseX, mouseY));
            if (imageRect) {
                _imageData[imageRect.ref] = file.data
            }
        } else {
            alert('Please select an image');
        }
    }

    function setupFrames() {
        var xPos = 100;
        var yPos = 100;
        var index = 0;
        for (var y = 0; y < 2; y++) {
            for (var x = 0; x < 6; x++) {
                var currentImage = new ImageRect(index, xPos, yPos, 200, 200);
                _images.push(currentImage);
                xPos += 220;
                index++;
            }
            yPos += 250;
            xPos = 100;
        }
    }

    function drawFrames() {
        for (var i = 0; i < _images.length; i++) {
            var currentImage = _images[i];
            currentImage.draw(_imageData);
        }
    }

    function startAnimation() {
        select('#slideValue').html(_frameRateSlider.value())
        if (_currentState == State.INIT) return;

        _currentAnimationPosition = 0
        _helpers.clearCanvas();
        frameRate(_frameRateSlider.value())
    }

    function animateLoop() {
        _helpers.clearCanvas();
        if (_currentAnimationPosition < _imageData.length) {
            if (_imageData[_currentAnimationPosition]) {
                if ("string" == typeof _imageData[_currentAnimationPosition]) {
                    loadImage(
                        _imageData[_currentAnimationPosition],
                        img => {
                            image(img, 0, 0)
                        },
                        error => {
                            alert('Unable to load image: ' + error)
                        }
                    )
                }
                else {
                    image(_imageData[_currentAnimationPosition], 0, 0)
                }
                _currentAnimationPosition++
            }
        } else {
            _currentAnimationPosition = 0
        }
    }

    function recordAnimation() {
        createLoop(_canvas, {
            framesPerSecond: 2,
            duration: 3,
            gif: {
                render: false,
                open: false,
                download: false,
                options: {
                    repeat: -1
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