function Player(x, y) {
    this.x_pos = x;
    this.y_pos = y;
    this.isLeft = false;
	this.isRight = false;
	this.isFalling = false;
	this.isPlummeting = false;
    this.stopCharacterFlag = false;
    this.freezeCount = 0;
    this.freezeFlag = false;

    this.stopCharacter = function() {
        this.stopCharacterFlag = true;
    }

    this.start = function() {
        this.stopCharacterFlag = false;
    }

    this.freeze = function(frameCount) {
        this.freezeCount = frameCount + 200;
        this.freezeFlag = true;
    }

    this.check = function(state, sounds, y, height, frameCount, restartGame) {
        if (frameCount > this.freezeCount) {
            this.freezeCount = 0;
            this.x_pos += 10;
            this.freezeFlag = false;
        }

        if (y > height) {
            if (state.getLives() > 0) {
                state.looseLive();
                if (state.getLives() > 0) {
                    sounds.lost.play();
                    restartGame();
                }
            }
        }
        return state;
    }
        
    this.draw = function(x, y) {
        if (this.stopCharacterFlage) return;

        this.x_pos = x;
        this.y_pos = y;    

        if (this.isLeft && this.isFalling) {
            this.jumpLeft();
        }
        else if (this.isRight && this.isFalling) {
            this.jumpRight();
        }
        else if (this.isLeft) {
            this.walkLeft();
        }
        else if (this.isRight) {
            this.walkRight();
        }
        else if (this.isFalling || this.isPlummeting) {
            this.jumpFaceForward();
        }
        else {
            this.frontFacing();
        }
    }

    this.frontFacing = function() {
        
        console.log(this.freezeFlag);

        if (this.freezeFlag == true) {
            stroke(color("blue"));
            strokeWeight(2);
        }
        else {
            stroke(color("black"));
            strokeWeight(0.5);
        }
    
        //head
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 36, 20, 20);
    
        //left eye
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 40, 2, 2);
        //right eye
        ellipse(this.x_pos + 3, this.y_pos - 40, 2, 2);
    
        //face
        fill(rgba(152, 101, 42, 1), rgba(152, 101, 42, 1), rgba(152, 101, 42, 1));
        ellipse(this.x_pos, this.y_pos - 32, 15, 10);
    
        //nose
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos, this.y_pos - 36, 3, 3);
    
        //mouth
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos, this.y_pos - 32, 5, 0.5);
    
        //left ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos - 11, this.y_pos - 36, 8, 20);
        //right ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos + 11, this.y_pos - 36, 8, 20);
    
        //bodthis.y_pos
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 15, 20, 23);
    
        //left front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 17, 10, 14);
        //right front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 17, 10, 14);
    
        //left back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 2, 10, 10);
        //right back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 2, 10, 10);
    
        noStroke();
    }
    
    this.jumpFaceForward = function() {
        if (this.freezeFlag == true) {
            stroke(color("blue"));
            strokeWeight(2);
        }
        else {
            stroke(color("black"));
            strokeWeight(0.5);
        }

        //head
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 55, 20, 20);
    
        //left eye
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 58, 2, 2);
        //right eye
        ellipse(this.x_pos + 3, this.y_pos - 58, 2, 2);
    
        //face
        fill(rgba(152, 101, 42, 1), rgba(152, 101, 42, 1), rgba(152, 101, 42, 1));
        ellipse(this.x_pos, this.y_pos - 50, 15, 10);
    
        //nose
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos, this.y_pos - 53, 3, 3);
    
        //mouth
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos, this.y_pos - 49, 5, 0.5);
    
        //left ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos - 11, this.y_pos - 58, 8, 20);
        //right ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos + 11, this.y_pos - 58, 8, 20);
    
        //bodthis.y_pos
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 34, 20, 23);
    
        //left front leg jump
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 36, 7, 20);
    
        //right front leg jump
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 36, 7, 20);
    
        //left back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 6, this.y_pos - 15, 9, 20);
        //right back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 6, this.y_pos - 15, 9, 20);
    
        noStroke();
    }
    
    this.walkLeft = function() {
        if (this.freezeFlag == true) {
            stroke(color("blue"));
            strokeWeight(2);
        }
        else {
            stroke(color("black"));
            strokeWeight(0.5);
        }
    
        //head
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 36, 20, 20);
    
        //left eye
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 40, 2, 2);
        //right eye
        ellipse(this.x_pos + 3, this.y_pos - 40, 2, 2);
    
        //face
        fill(rgba(152, 101, 42, 1), rgba(152, 101, 42, 1), rgba(152, 101, 42, 1));
        ellipse(this.x_pos, this.y_pos - 32, 15, 10);
    
        //nose
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 5, this.y_pos - 36, 3, 3);
    
        //mouth
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 32, 5, 0.5);
    
        //left ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos - 11, this.y_pos - 36, 8, 20);
        //right ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos + 11, this.y_pos - 36, 8, 20);
    
        //bodthis.y_pos
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 15, 20, 23);
    
        //left front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 17, 10, 14);
        //right front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 17, 10, 14);
    
        //left back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 2, 10, 10);
        //right back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 2, 13, 13);
    
        noStroke();
    }
    
    this.walkRight = function() {
        if (this.freezeFlag == true) {
            stroke(color("blue"));
            strokeWeight(2);
        }
        else {
            stroke(color("black"));
            strokeWeight(0.5);
        }
    
        //head
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 36, 20, 20);
    
        //left eye
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 40, 2, 2);
        //right eye
        ellipse(this.x_pos + 3, this.y_pos - 40, 2, 2);
    
        //face
        fill(rgba(152, 101, 42, 1), rgba(152, 101, 42, 1), rgba(152, 101, 42, 1));
        ellipse(this.x_pos, this.y_pos - 32, 15, 10);
    
        //nose
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos + 5, this.y_pos - 36, 3, 3);
    
        //mouth
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos + 3, this.y_pos - 32, 5, 0.5);
    
        //left ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos - 11, this.y_pos - 36, 8, 20);
        //right ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos + 11, this.y_pos - 36, 8, 20);
    
        //bodthis.y_pos
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 15, 20, 23);
    
        //left front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 17, 10, 14);
        //right front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 17, 10, 14);
    
        //left back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 2, 13, 13);
        //right back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 10, this.y_pos - 2, 10, 10);
    
        noStroke();
    }
    
    this.jumpLeft = function() {
        if (this.freezeFlag == true) {
            stroke(color("blue"));
            strokeWeight(2);
        }
        else {
            stroke(color("black"));
            strokeWeight(0.5);
        }
    
        //head
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 55, 20, 20);
    
        //left eye
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 59, 2, 2);
        //right eye
        ellipse(this.x_pos + 3, this.y_pos - 59, 2, 2);
    
        //face
        fill(rgba(152, 101, 42, 1), rgba(152, 101, 42, 1), rgba(152, 101, 42, 1));
        ellipse(this.x_pos, this.y_pos - 51, 15, 10);
    
        //nose
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 5, this.y_pos - 55, 3, 3);
    
        //mouth
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 51, 5, 0.5);
    
        //left ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos - 11, this.y_pos - 55, 8, 20);
        //right ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos + 11, this.y_pos - 66, 8, 20);
    
        //bodthis.y_pos
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 35, 20, 23);
    
        //left front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 40, 8, 15);
        //right front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 7, this.y_pos - 34, 8, 15);
    
        //right back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 8, this.y_pos - 18, 10, 15);
        //left back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 5, this.y_pos - 18, 9, 20);
    
        noStroke();
    }
    
    this.jumpRight = function() {
        if (this.freezeFlag == true) {
            stroke(color("blue"));
            strokeWeight(2);
        }
        else {
            stroke(color("black"));
            strokeWeight(0.5);
        }
    
        //head
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 55, 20, 20);
    
        //left eye
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos - 3, this.y_pos - 59, 2, 2);
        //right eye
        ellipse(this.x_pos + 3, this.y_pos - 59, 2, 2);
    
        //face
        fill(rgba(152, 101, 42, 1), rgba(152, 101, 42, 1), rgba(152, 101, 42, 1));
        ellipse(this.x_pos, this.y_pos - 51, 15, 10);
    
        //nose
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos + 5, this.y_pos - 55, 3, 3);
    
        //mouth
        fill(rgba(5, 5, 5, 1), rgba(5, 5, 5, 1), rgba(5, 5, 5, 1));
        ellipse(this.x_pos + 3, this.y_pos - 51, 5, 0.5);
    
        //left ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos - 11, this.y_pos - 66, 8, 20);
        //right ear
        fill(rgba(101, 67, 33, 1), rgba(101, 67, 33, 1), rgba(101, 67, 33, 1));
        ellipse(this.x_pos + 11, this.y_pos - 55, 8, 20);
    
        //bodthis.y_pos
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos, this.y_pos - 35, 20, 23);
    
        //left front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 10, this.y_pos - 34, 8, 15);
        //right front leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 7, this.y_pos - 40, 8, 15);
    
        //right back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos + 8, this.y_pos - 18, 9, 20);
        //left back leg
        fill(rgba(133, 87, 35, 1), rgba(133, 87, 35, 1), rgba(133, 87, 35, 1));
        ellipse(this.x_pos - 5, this.y_pos - 18, 10, 15);
    
        noStroke();
    }    
}