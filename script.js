let isPulling = false;
let isSpinning = false;
let startY = 0;
const leverArm = document.getElementById('leverArm');
const leverBall = document.getElementById('leverBall');
const winnerList = document.getElementById('winnerList');

// Number Pool
let participants = Array.from({length: 100}, (_, i) => (i + 1).toString().padStart(3, '0'));

leverBall.addEventListener('mousedown', (e) => {
    if (isSpinning) return;
    isPulling = true;
    startY = e.clientY;
    leverArm.style.transition = "none";
});

window.addEventListener('mousemove', (e) => {
    if (!isPulling) return;
    let deltaY = e.clientY - startY;
    let rotation = Math.min(Math.max(deltaY / 1.5, 0), 90);
    leverArm.style.transform = `rotateX(${rotation}deg)`;
    if (rotation >= 85) triggerSpin();
});

window.addEventListener('mouseup', () => {
    isPulling = false;
    leverArm.style.transition = "transform 0.5s cubic-bezier(0.5, 1.5, 0.5, 1)";
    leverArm.style.transform = `rotateX(0deg)`;
});

function triggerSpin() {
    if (isSpinning) return;
    isSpinning = true;
    isPulling = false;
    
    document.getElementById('status').innerText = "SPINNING...";

    const winner = participants[Math.floor(Math.random() * participants.length)];
    const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

    reels.forEach((reel, i) => {
        setTimeout(() => {
            let count = 0;
            let timer = setInterval(() => {
                reel.innerText = Math.floor(Math.random() * 10);
                count++;
                if (count > 20 + (i * 5)) {
                    clearInterval(timer);
                    reel.innerText = winner[i];
                    reel.style.color = "#ff3333";
                    if (i === 2) {
                        isSpinning = false;
                        document.getElementById('status').innerText = "WINNER: #" + winner;
                        logWinner(winner);
                    }
                }
            }, 50);
        }, i * 600);
    });
}

function logWinner(num) {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color:#aaa">${new Date().toLocaleTimeString()}</span> - <strong>#${num}</strong>`;
    winnerList.prepend(li);
}