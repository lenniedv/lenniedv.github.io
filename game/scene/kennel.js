function Kennel(x, y) {
    this.x_pos = x;
    this.y_pos = y;
    this.isReached = false;

    this.draw = function() {

        fill(rgba(154,112,71,1),rgba(154,112,71,1),rgba(154,112,71,1));
	    rect(this.x_pos, this.y_pos , 200, 30);
	
	    fill(rgba(164,116,73,1),rgba(164,116,73,1),rgba(164,116,73,1));
	    rect(this.x_pos, this.y_pos - 30 , 200, 30);
	
	    fill(rgba(154,112,71,1),rgba(154,112,71,1),rgba(154,112,71,1));
	    rect(this.x_pos, this.y_pos - 60 , 200, 30);
	
	    fill(rgba(164,116,73,1),rgba(164,116,73,1),rgba(164,116,73,1));
	    rect(this.x_pos, this.y_pos - 90 , 200, 30);
	
	    fill(rgba(154,112,71,1),rgba(154,112,71,1),rgba(154,112,71,1));
	    rect(this.x_pos, this.y_pos - 120 , 200, 30);

	    // roof
	    fill(rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1));
	    strokeWeight(30);

	    triangle(
		    this.x_pos + 100, this.y_pos - 200,
		    this.x_pos - 10, this.y_pos - 121,
		    this.x_pos + 210, this.y_pos - 121
	    );

	    noStroke();

	    if (this.isReached) {
		    fill(101,69,41);
	    }
	    else {
		    fill(rgba(10,5,0,1),rgba(10,5,0,1),rgba(10,5,0,1));
	    }

	    ellipse(this.x_pos + 101, this.y_pos - 20 , 46, 46);
	    rect(this.x_pos + 76, this.y_pos - 25 , 50, 55);

    	// windows
        fill(rgba(238,224,175,1),rgba(238,224,175,1),rgba(238,224,175,1));
	    rect(this.x_pos + 20, this.y_pos - 100 , 50, 50);
	    fill(rgba(238,224,175,1),rgba(238,224,175,1),rgba(238,224,175,1));
	    rect(this.x_pos + 140, this.y_pos - 100 , 50, 50);
    }

    this.check = function(x, y) {
        if (!this.isReached) {
            this.isReached = dist(x, y, this.x_pos, this.y_pos) < 20;
            if (this.isReached) {
                this.draw();
            }
        }
    }
}