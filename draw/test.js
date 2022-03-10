function setup() {
    createCanvas(400, 400)
    fill(0)
    frameRate(30)
    createLoop({ duration: 3, gif: true })
}

function draw() {
    background(255)
    translate(width / 2, height / 2)
    const radius = height / 3
    const x = cos(animLoop.theta) * radius
    const y = sin(animLoop.theta) * radius
    ellipse(x, y, 50, 50)
}