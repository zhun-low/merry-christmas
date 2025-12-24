const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let width, height;
let flakes = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// CONFIGURAÇÃO DA NEVE
const flakeCount = 120;

for (let i = 0; i < flakeCount; i++) {
    flakes.push(createFlake());
}

function createFlake() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        wind: Math.random() * 0.5 - 0.25
    };
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.beginPath();

    flakes.forEach(flake => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });

    ctx.fill();
    update();
}

function update() {
    flakes.forEach(flake => {
        flake.y += flake.speed;
        flake.x += flake.wind;

        if (flake.y > height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * width;
        }
    });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();
