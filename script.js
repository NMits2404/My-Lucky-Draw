const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];
const statusText = document.getElementById('status');
const drawBtn = document.getElementById('drawBtn');

// The pool of numbers (e.g., Participant IDs 001 to 999)
let participants = Array.from({length: 100}, (_, i) => (i + 1).toString().padStart(3, '0'));

function pullLever() {
    if (participants.length === 0) {
        statusText.innerText = "NO MORE NUMBERS!";
        return;
    }

    drawBtn.disabled = true;
    statusText.innerText = "SPINNING...";

    // Pick the winner from the list
    const winnerIndex = Math.floor(Math.random() * participants.length);
    const winningNumber = participants[winnerIndex];
    
    // Remove winner from pool so they don't win twice
    participants.splice(winnerIndex, 1);

    // Start rolling animation for each reel one by one
    reels.forEach((reel, i) => {
        setTimeout(() => {
            startRolling(reel, winningNumber[i], i === 2);
        }, i * 800); // 800ms delay between each reel stopping
    });
}

function startRolling(reel, finalDigit, isLast) {
    let count = 0;
    const interval = setInterval(() => {
        reel.innerHTML = `<div class="number">${Math.floor(Math.random() * 10)}</div>`;
        count++;
        
        // Stop after a certain number of random jumps
        if (count > 20) {
            clearInterval(interval);
            reel.innerHTML = `<div class="number" style="color: #ef4444">${finalDigit}</div>`;
            
            if (isLast) {
                statusText.innerText = "JACKPOT!";
                drawBtn.disabled = false;
                recordWinner();
            }
        }
    }, 50);
}

function recordWinner() {
    const list = document.getElementById('winnerList');
    const fullNum = reels.map(r => r.innerText).join('');
    const li = document.createElement('li');
    li.innerText = `Winner: #${fullNum}`;
    li.style.color = "#22c55e";
    list.prepend(li);
}