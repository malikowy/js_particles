var canvas = document.querySelector(".dots");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var ctx = canvas.getContext("2d");
var MAX_PARTICLES = Math.floor((canvas.width/canvas.height)*100);
var particles = [];

var create = function (options) {
    options = options || {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
    if (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    var alpha = Math.random();

    var p = {
        x: options.x,
        y: options.y,
        xVel: (Math.random() - 0.5),
        yVel: (Math.random() - 0.5),
        radius: Math.random() * 20,
        color: "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
    };

    particles.push(p);
};

var draw = function (p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
};

var fade = function (p) {
    p.radius *= 0.99;
};

var move = function (p) {
    p.x += p.xVel;
    p.y += p.yVel;
};

var loop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    create();
    particles.forEach(function (p) {
        fade(p);
        move(p);
        draw(p);
    });
    window.requestAnimationFrame(loop);
};

canvas.addEventListener('click', function (ev) {
    for (var i = 0; i < 50; i++) {
        create({
            x: ev.clientX,
            y: ev.clientY
        });
    }
});

loop();