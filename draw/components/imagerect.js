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
        rect(x, y, width, height);
        if (imageData[this.ref]) {
            image(imageData[this.ref], x, y, width, height);
        }
    }

    this.IsInBorder = function (mouseX, mouseY) {
        return ((mouseX > x) && (mouseX < x + width) &&
            (mouseY > y) && (mouseY < y + height));
    }
}