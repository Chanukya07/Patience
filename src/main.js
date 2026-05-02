/* ==========================================
   PATIENCE.exe — Stage Controller
   ========================================== */

import './style.css';

// ── State ──────────────────────────────────
const state = {
  startTime: Date.now(),
  currentStage: 1,
};

// ── Utilities ──────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function switchStage(from, to) {
  const fromEl = document.getElementById(`stage-${from}`);
  const toEl = document.getElementById(`stage-${to}`);
  if (fromEl) fromEl.classList.remove('active');
  if (toEl) toEl.classList.add('active');
  state.currentStage = to;
}

function animateProgress(fillEl, pctEl, target, duration) {
  return new Promise((resolve) => {
    const start = parseFloat(fillEl.style.width) || 0;
    const diff = target - start;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(start + diff * progress);
      fillEl.style.width = `${current}%`;
      if (pctEl) pctEl.textContent = `${current}%`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(tick);
  });
}

function addBootLine(container, text, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'log-line';
      line.innerHTML = `> ${text}`;
      container.appendChild(line);
      container.scrollTop = container.scrollHeight;
      resolve();
    }, delay);
  });
}

function typeTextInto(element, text, speed = 60) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

// ── ASCII Art Frames (Globe) ───────────────
const globeFrames = [
  `
     .-""""""-.
   .'  ______  '.
  /  .'      '.  \\
 |  /  .::::.  \\  |
 | |  :::::::   | |
 |  \\  '::::'  /  |
  \\  '.______.'  /
   '._________ .'
     '-......-'`,
  `
     .-""""""-.
   .'  ______  '.
  /  .'      '.  \\
 |  /   ::::.  \\  |
 | |   :::::::  | |
 |  \\   '::::'  /  |
  \\  '.______.'  /
   '._________ .'
     '-......-'`,
  `
     .-""""""-.
   .'  ______  '.
  /  .'      '.  \\
 |  /    :::.  \\  |
 | |    ::::::  | |
 |  \\    ':::'  /  |
  \\  '.______.'  /
   '._________ .'
     '-......-'`,
  `
     .-""""""-.
   .'  ______  '.
  /  .'      '.  \\
 |  /     ::.  \\  |
 | |     :::::  | |
 |  \\     '::'  /  |
  \\  '.______.'  /
   '._________ .'
     '-......-'`,
];

// ── Random Hex Code Generator ──────────────
function randomHex(length) {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateCodeLine() {
  const patterns = [
    () => `0x${randomHex(8)}  MOV  R${Math.floor(Math.random() * 16)}, 0x${randomHex(4)}`,
    () => `[${randomHex(4)}:${randomHex(4)}]  CMP  PATIENCE_LEVEL, 0x${randomHex(2)}`,
    () => `>> VERIFY  INTEGRITY_CHECK  ADDR:0x${randomHex(8)}  ...OK`,
    () => `SCAN  0x${randomHex(8)}-${randomHex(8)}  STATUS: CLEAN`,
    () => `AUTH  MODULE  ${randomHex(6)}  KEY:${randomHex(12)}  VALID`,
    () => `DECRYPT  BLOCK  #${Math.floor(Math.random() * 9999)}  SHA:${randomHex(16)}`,
    () => `[CORE ${Math.floor(Math.random() * 8)}]  THREAD ${Math.floor(Math.random() * 256)}  ACTIVE`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)]();
}

// ── Confetti Generator ─────────────────────
function generateConfetti(container, count) {
  const colors = ['#FF006E', '#00F5FF', '#39FF14', '#FFB800', '#FF6B6B', '#C77DFF', '#F0F0F0'];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const size = Math.random() * 8 + 5;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 3;
    const shape = Math.random() > 0.5 ? '50%' : '0';

    particle.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 6px ${color};
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, (duration + delay) * 1000 + 100);
  }
}

// ==========================================
//  STAGE 1: SYSTEM BOOT
// ==========================================
async function runStage1() {
  const bootLog = document.getElementById('boot-log');
  const cursor = document.getElementById('boot-cursor');
  const progressContainer = document.getElementById('progress-container-1');
  const progressFill = document.getElementById('progress-1');
  const progressPct = document.getElementById('progress-1-pct');

  const bootMessages = [
    { text: 'PATIENCE.exe v2.1.0', delay: 400 },
    { text: 'Initializing system...', delay: 600 },
    { text: 'Checking memory.......... <span class="ok">OK</span>', delay: 800 },
    { text: 'Loading patience module... <span class="ok">OK</span>', delay: 700 },
    { text: 'Calibrating honesty detector... <span class="ok">OK</span>', delay: 900 },
    { text: 'Scanning visitor integrity... <span class="processing">██████ PROCESSING</span>', delay: 1000 },
    { text: 'Visitor classified as: <span class="processing">UNKNOWN</span>', delay: 800 },
    { text: 'Proceeding to verification...', delay: 600 },
  ];

  for (const msg of bootMessages) {
    await addBootLine(bootLog, msg.text, msg.delay);
  }

  cursor.style.display = 'none';

  // Show & fill progress bar
  progressContainer.style.opacity = '1';
  await animateProgress(progressFill, progressPct, 100, 1500);

  await sleep(500);
  switchStage(1, 2);
}

// ==========================================
//  STAGE 2: ESTABLISHING CONNECTION
// ==========================================
async function runStage2() {
  const asciiArt = document.getElementById('ascii-art');
  const statusText = document.getElementById('connection-status');
  const progressFill = document.getElementById('progress-2');
  const progressPct = document.getElementById('progress-2-pct');
  const clickTaunt = document.getElementById('click-taunt');

  // Spinning globe
  let frameIdx = 0;
  const globeSpin = setInterval(() => {
    asciiArt.textContent = globeFrames[frameIdx % globeFrames.length];
    frameIdx++;
  }, 300);

  // Click taunt
  const stage2El = document.getElementById('stage-2');
  const clickHandler = () => {
    clickTaunt.textContent = "Clicking won't help 😏";
    clickTaunt.classList.add('visible');
    setTimeout(() => clickTaunt.classList.remove('visible'), 2000);
  };
  stage2El.addEventListener('click', clickHandler);

  // Progress: 0 → 87% over 5 seconds
  statusText.textContent = 'Connecting to Patience Server...';
  await animateProgress(progressFill, progressPct, 87, 5000);

  // Hang at 87%
  statusText.textContent = 'Connection unstable... retrying...';
  statusText.style.color = '#FF006E';
  await sleep(3500);

  // Jump to 100%
  statusText.textContent = 'Connection established!';
  statusText.style.color = '#39FF14';
  await animateProgress(progressFill, progressPct, 100, 800);

  clearInterval(globeSpin);
  stage2El.removeEventListener('click', clickHandler);

  await sleep(600);
  switchStage(2, 3);
}

// ==========================================
//  STAGE 3: SECURITY CLEARANCE
// ==========================================
async function runStage3() {
  const codeScroll = document.getElementById('code-scroll');
  const tauntMessages = document.getElementById('taunt-messages');

  // Scrolling code
  const codeInterval = setInterval(() => {
    const line = document.createElement('div');
    line.textContent = generateCodeLine();
    codeScroll.appendChild(line);
    codeScroll.scrollTop = codeScroll.scrollHeight;

    // Keep DOM clean
    if (codeScroll.children.length > 50) {
      codeScroll.removeChild(codeScroll.firstChild);
    }
  }, 80);

  await sleep(2500);

  // Taunt messages
  const taunts = [
    'Are you still here?',
    'Most people leave by now.',
    'You might actually be legit.',
  ];

  for (const taunt of taunts) {
    const line = document.createElement('div');
    line.className = 'taunt-line';
    line.textContent = taunt;
    tauntMessages.appendChild(line);
    await sleep(1800);
  }

  // Granted
  const granted = document.createElement('div');
  granted.className = 'taunt-line granted';
  granted.textContent = '✦ CLEARANCE: GRANTED ✦';
  tauntMessages.appendChild(granted);
  await sleep(1500);

  clearInterval(codeInterval);
  switchStage(3, 4);
}

// ==========================================
//  STAGE 4: FINAL LOADING
// ==========================================
async function runStage4() {
  const crashText = document.getElementById('crash-text');
  const progressWrap = document.getElementById('final-progress-wrap');
  const progressFill = document.getElementById('progress-4');
  const progressPct = document.getElementById('progress-4-pct');

  // Fake crash — blank screen
  await sleep(2500);

  // Blinking cursor appears
  crashText.innerHTML = '<span class="blinking-cursor">▌</span>';
  await sleep(1500);

  // Type "Just kidding"
  crashText.innerHTML = '';
  await typeTextInto(crashText, 'Just kidding. Almost there.', 70);
  await sleep(1200);

  // Show rainbow progress bar
  crashText.style.display = 'none';
  progressWrap.style.opacity = '1';
  await animateProgress(progressFill, progressPct, 100, 3000);

  await sleep(600);
  switchStage(4, 5);
}

// ==========================================
//  STAGE 5: THE REWARD
// ==========================================
async function runStage5() {
  const confettiContainer = document.getElementById('confetti-container');
  const waitTimeEl = document.getElementById('wait-time');
  const certDate = document.getElementById('cert-date');
  const shareBtn = document.getElementById('share-btn');

  // Confetti!
  generateConfetti(confettiContainer, 150);

  // More confetti waves
  setTimeout(() => generateConfetti(confettiContainer, 80), 2000);
  setTimeout(() => generateConfetti(confettiContainer, 50), 4000);

  // Calculate wait time
  const elapsed = Math.round((Date.now() - state.startTime) / 1000);
  waitTimeEl.textContent = elapsed;

  // Certificate date
  const now = new Date();
  certDate.textContent = `Issued: ${now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}`;

  // Share button
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'PATIENCE.exe',
      text: `I waited ${elapsed} seconds on PATIENCE.exe and proved I'm legit! Only 12% make it this far. Can you?`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        shareBtn.textContent = '✅ COPIED TO CLIPBOARD!';
        setTimeout(() => {
          shareBtn.textContent = '📤 SHARE YOUR ACHIEVEMENT';
        }, 3000);
      } catch {
        shareBtn.textContent = '❌ COULD NOT COPY';
        setTimeout(() => {
          shareBtn.textContent = '📤 SHARE YOUR ACHIEVEMENT';
        }, 3000);
      }
    }
  });
}

// ==========================================
//  MAIN — Run all stages
// ==========================================
async function main() {
  await runStage1();
  await runStage2();
  await runStage3();
  await runStage4();
  await runStage5();
}

// Start the experience
main();
