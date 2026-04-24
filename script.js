:root {
    --gold: #f59e0b;
    --bg: #0f172a;
    --red: #ef4444;
}

body {
    background-color: var(--bg);
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    overflow: hidden;
}

.machine-body {
    display: flex;
    align-items: center;
    gap: 40px;
    background: #334155;
    padding: 40px;
    border-radius: 20px;
    border: 8px solid #475569;
    position: relative;
}

.slot-window {
    display: flex;
    gap: 15px;
    background: #000;
    padding: 20px;
    border-radius: 10px;
    border: 4px solid var(--gold);
}

.reel {
    width: 100px;
    height: 130px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.number { font-size: 80px; font-weight: bold; color: #000; }

/* LEVER STYLES */
.lever-system {
    position: relative;
    width: 60px;
    height: 200px;
}

.lever-track {
    position: absolute;
    left: 25px;
    width: 10px;
    height: 100%;
    background: #1e293b;
    border-radius: 5px;
}

.lever-arm {
    position: absolute;
    left: 22px;
    top: 0;
    width: 16px;
    height: 120px;
    background: #94a3b8;
    border-radius: 8px;
    transform-origin: bottom center;
    transition: transform 0.1s ease-out;
    cursor: grab;
    z-index: 5;
}

.lever-ball {
    position: absolute;
    top: -30px;
    left: -12px;
    width: 40px;
    height: 40px;
    background: var(--red);
    border-radius: 50%;
    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.5), 0 0 10px var(--red);
}

.lever-arm:active { cursor: grabbing; }

/* SIDEBAR & TITLE */
.title { color: var(--gold); text-align: center; margin-bottom: 20px; }
.winners-sidebar { width: 220px; background: rgba(0,0,0,0.4); padding: 20px; border-radius: 10px; margin-left: 50px; height: 400px; overflow-y: auto; }
