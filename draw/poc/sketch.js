var _images = []
var _imageData = []

function setup() {
    const c = createCanvas(1024, 576);
    c.drop(gotFile);

    var x = 10;
    var y = 10;
    for (var i = 0; i < 3; i++) {
        var currentImage = new ImageRect(i, x, y, 100, 100);
        _images.push(currentImage);
        x += 120;
    }
}

function draw() {
    for (var i = 0; i < 3; i++) {
        var currentImage = _images[i];
        currentImage.draw();
    }
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

function ImageRect(ref, x, y, width, height) {

    this.ref = ref;

    var x = x;
    var y = y;
    var width = width;
    var height = height;

    this.draw = function () {
        strokeWeight(2);
        stroke(51);
        noFill();
        if (_imageData[this.ref]) {
            loadImage(
                _imageData[this.ref],
                img => {
                    image(img, x, y, width, height)
                },
                error => {
                    alert('Unable to load image: ' + error)
                }
            )
        }
        else {
            rect(x, y, width, height);
        }
    }

    this.IsInBorder = function (mouseX, mouseY) {
        return ((mouseX > x) && (mouseX < x + width) &&
            (mouseY > y) && (mouseY < y + height));
    }
}