const leverBall = document.getElementById('leverBall');
const leverArm = document.getElementById('leverArm');
const statusText = document.getElementById('status');
const reels = [document.getElementById('reel1'), document.getElementById('reel2'), document.getElementById('reel3')];

let participants = Array.from({length: 100}, (_, i) => (i + 1).toString().padStart(3, '0'));
let isPulling = false;
let isSpinning = false;

// LEVER LOGIC
leverBall.addEventListener('mousedown', (e) => {
    if (isSpinning) return;
    isPulling = true;
});

window.addEventListener('mousemove', (e) => {
    if (!isPulling) return;

    // Calculate pull distance (capped at 90 degrees)
    let pullAmount = Math.min(Math.max(e.movementY * 2, 0), 90); 
    leverArm.style.transform = `rotateX(${pullAmount}deg)`;

    // Trigger point
    if (pullAmount >= 80) {
        triggerSpin();
    }
});

window.addEventListener('mouseup', () => {
    if (!isPulling) return;
    isPulling = false;
    // Snap back animation
    leverArm.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    leverArm.style.transform = `rotateX(0deg)`;
    setTimeout(() => leverArm.style.transition = "none", 400);
});

function triggerSpin() {
    if (isSpinning) return;
    isSpinning = true;
    isPulling = false;
    
    statusText.innerText = "GOOD LUCK!";
    
    const winnerIndex = Math.floor(Math.random() * participants.length);
    const winningNumber = participants[winnerIndex];
    participants.splice(winnerIndex, 1);

    reels.forEach((reel, i) => {
        setTimeout(() => {
            animateReel(reel, winningNumber[i], i === 2);
        }, i * 1000);
    });
}

function animateReel(reel, finalDigit, isLast) {
    let count = 0;
    const interval = setInterval(() => {
        reel.innerHTML = `<div class="number">${Math.floor(Math.random() * 10)}</div>`;
        count++;
        if (count > 25) {
            clearInterval(interval);
            reel.innerHTML = `<div class="number" style="color: #ef4444">${finalDigit}</div>`;
            if (isLast) {
                isSpinning = false;
                statusText.innerText = "JACKPOT!";
                recordWinner(reels.map(r => r.innerText).join(''));
            }
        }
    }, 60);
}

function recordWinner(num) {
    const list = document.getElementById('winnerList');
    const li = document.createElement('li');
    li.style.padding = "5px 0";
    li.style.borderBottom = "1px solid #444";
    li.innerHTML = `<span style="color:#22c55e">#${num}</span> - Win!`;
    list.prepend(li);
}