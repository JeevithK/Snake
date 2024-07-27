let gameboard = document.getElementById("gameboard");
let context = gameboard.getContext('2d');
let scoretext = document.getElementById("scoreval");

let inc = document.querySelector(".inc");
let dec = document.querySelector(".dec");
let incdec = document.querySelector(".incdecerror");

let paused = false;
let delay = 500;
const minDelay = 200;
const delayIncrement = 200;

inc.addEventListener("click", function() {
    if (delay > minDelay && delay > 100) {
        incdec.innerHTML = "";
        delay -= delayIncrement;
    } else {
        incdec.innerHTML = "This is the minimum delay you can set!";
    }
});

dec.addEventListener("click", function() {
    if (delay >= 700) {
        incdec.innerHTML = "This is the maximum delay you can set!";
    } else {
        delay += delayIncrement;
        incdec.innerHTML = "";
    }
});



let score = 0;
const width = gameboard.width;
const height = gameboard.height;
let active = true;
let started = false;
let gameLoopInterval = null;

let foodx;
let foody;
const unit = 10;

let xvel = 10;
let yvel = 0;

let snake = [
    { x: unit * 5, y: unit * 0 },
    { x: unit * 4, y: unit * 0 },
    { x: unit * 3, y: unit * 0 },
    { x: unit * 2, y: unit * 0 },
    { x: unit * 1, y: unit * 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", keyp);
startgame();

function startgame() {
    context.fillStyle = "#212121";
    context.fillRect(0, 0, width, height);
    
    createfood();
    displayfood();
    drawsnake();
}

function clearb() {
    context.fillStyle = "#212121";
    context.fillRect(0, 0, width, height);
}

function createfood() {
    foodx = Math.floor(Math.random() * width / 10) * 10;
    foody = Math.floor(Math.random() * height / 10) * 10;
}

function displayfood() {
    context.fillStyle = "red";
    context.fillRect(foodx, foody, unit, unit);
}

document.getElementById("refreshButton").addEventListener("click", function() {
    location.reload();
});

function drawsnake() {
    context.fillStyle = "lightblue";
    context.strokeStyle = "#212121";
    snake.forEach((ele) => {
        context.fillRect(ele.x, ele.y, unit, unit);
    });
}

function movesnake() {
    const head = { x: snake[0].x + xvel, y: snake[0].y + yvel };
    snake.unshift(head);

    if (foodx === snake[0].x && foody === snake[0].y) {
        createfood();
        score++;
        scoretext.textContent = score;
        
    } else {
        snake.pop();
    }
}

function nextt() {
    if (active) {
        if (!paused) {
            gameLoopInterval = setTimeout(() => {
                clearb();
                displayfood();
                movesnake();
                drawsnake();
                checkgame();
                nextt();
            }, delay);
        }
    } else {
        clearb();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        fetchls(score);
        context.fillText("Gameover!!!", width / 2, height / 2);
    }
}

function checkgame() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= width):
        case (snake[0].y < 0):
        case (snake[0].y >= height):
            active = false;
            clearTimeout(gameLoopInterval);
            break;
    }
}

function keyp(e) {
    if (e.keyCode === 32) {
        if (active) {
            paused = !paused;
            if (!paused) {
                nextt();
            } else {
                clearTimeout(gameLoopInterval);
            }
        }
        return;
    }

    if (!started) {
        started = true;
        nextt();
    }

    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;

    switch (true) {
        case (e.keyCode == left && xvel != unit):
            xvel = -unit;
            yvel = 0;
            break;
        case (e.keyCode == right && xvel != -unit):
            xvel = unit;
            yvel = 0;
            break;
        case (e.keyCode == up && yvel != unit):
            xvel = 0;
            yvel = -unit;
            break;
        case (e.keyCode == down && yvel != -unit):
            xvel = 0;
            yvel = unit;
            break;
    }
}


function fetchls(score)
{
    let fetchedscore=JSON.parse(localStorage.getItem("score")|| "[]");
    fetchedscore.push(score);

    localStorage.setItem("score",JSON.stringify(fetchedscore));

    console.log(localStorage.getItem("score"));

}

