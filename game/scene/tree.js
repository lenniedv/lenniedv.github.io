function Tree(x, y) {
    this.x_pos = x;
    this.y_pos = y;

    this.draw = function() {
        // tree stamp
	    fill(rgba(88, 58, 29, 1), rgba(88, 58, 29, 1), rgba(88, 58, 29, 1));
	    rect(this.x_pos, this.y_pos, 18, 55);

	    // first level
	    fill(0, 100, 0);
	    triangle(this.x_pos - 20, this.y_pos,
		    this.x_pos + 40, this.y_pos,
		    this.x_pos + 10, this.y_pos - 100);

	    fill(0, 128, 0);
	    triangle(this.x_pos + 10, this.y_pos - 150, // top  
		    this.x_pos - 20, this.y_pos - 50, // left 
		    this.x_pos + 40, this.y_pos - 50); // right

	    fill(34, 139, 34);
	    triangle(this.x_pos + 10, this.y_pos - 180,
		    this.x_pos - 20, this.y_pos - 100,
		    this.x_pos + 40, this.y_pos - 100);
    }
}