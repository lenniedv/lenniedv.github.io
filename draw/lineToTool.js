function LineToTool() {
  // Icon and title use in the left side menu
  this.icon = "assets/lineTo.jpg";
  this.name = "LineTo";

  // Line start x, y position
  var startMouseX = -1;
  var startMouseY = -1;

  // Indicate if stop dragging and should place the line
  var drawing = false;

  this.draw = function () {
    // When mouse is presssed after the first drawing cycle then set the start x, y positions
    // from current mouseX, mouseY position.

    // Now as the user drag the mouse we draw from the start x, y to the
    // distance mouse position.

    // When user release the mouse we draw the line on the canvas from start to end
    // then reset the start x, y positions.
    if (mouseIsPressed) {
      if (startMouseX == -1) {
        startMouseX = mouseX;
        startMouseY = mouseY;
        drawing = true;
        loadPixels();
      } else {
        updatePixels();
        line(startMouseX, startMouseY, mouseX, mouseY);
      }
    } else if (drawing) {
      drawing = false;
      startMouseX = -1;
      startMouseY = -1;
    }
  };
}
