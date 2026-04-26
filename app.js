let gameseq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;
let btns = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function checkAns(idx) {
    if (gameseq[idx] === userSeq[idx]) {
        if (gameseq.length === userSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let currScore = level - 1;   

        if (currScore > highScore) {
            highScore = currScore;
        }

        h2.innerHTML = `Game Over! Level: ${currScore} <br> HighScore: ${highScore} <br> Press any key to start`;

        document.body.style.backgroundColor = "red";
        setTimeout(() => (document.body.style.backgroundColor = "white"), 150);

        reset();
    }
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameFlash(randomBtn);
    gameseq.push(randomColor);
}

function btnPress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function reset() {
    gameseq = [];
    userSeq = [];
    level = 0;
    started = false;
}
