function ImageRect(ref, x, y, width, height) {

    this.ref = ref;

    var x = x;
    var y = y;
    var width = width;
    var height = height;

    this.draw = function (imageData) {
        strokeWeight(2);
        stroke(51);
        noFill();
        if (imageData[this.ref]) {
            if ("string" == typeof imageData[this.ref]) {
                loadImage(
                    imageData[this.ref],
                    img => {
                        image(img, x, y, width, height)
                    },
                    error => {
                        alert('Unable to load image: ' + error)
                    }
                )
            }
            else {
                image(imageData[this.ref], x, y, width, height);
            }
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