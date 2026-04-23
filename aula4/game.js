const GAME_DURATION = 15;
const SPAWN_INTERVAL = 700;
const ENEMY_LIFETIME = 1800;
const POINTS_PER_HIT = 10;

let score = 0;
let timeLeft = GAME_DURATION;
let spawnTimer = null;
let countdownTimer = null;
let gameRunning = false;

const cursor = document.createElement('div');
cursor.id = 'cursor';
cursor.textContent = '✦';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

function startGame() {
  if (gameRunning) return;
  gameRunning = true;
  score = 0;
  timeLeft = GAME_DURATION;

  document.getElementById('score').textContent = 0;
  document.getElementById('timer').textContent = GAME_DURATION;
  document.getElementById('start-btn').disabled = true;
  document.getElementById('game-area').classList.add('active');

  spawnTimer = setInterval(spawnEnemy, SPAWN_INTERVAL);

  countdownTimer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  setTimeout(endGame, GAME_DURATION * 1000);
}

function endGame() {
  if (!gameRunning) return;
  gameRunning = false;

  clearInterval(spawnTimer);
  clearInterval(countdownTimer);

  document.getElementById('game-area').classList.remove('active');
  document.querySelectorAll('.enemy').forEach(e => e.remove());

  document.getElementById('final-score').textContent = score;
  document.getElementById('overlay').classList.remove('hidden');
}

function resetGame() {
  document.getElementById('overlay').classList.add('hidden');
  document.getElementById('start-btn').disabled = false;
  document.getElementById('score').textContent = 0;
  document.getElementById('timer').textContent = GAME_DURATION;
}

function spawnEnemy() {
  const area = document.getElementById('game-area');
  const margin = 80;
  const x = Math.random() * (window.innerWidth  - margin * 2) + margin;
  const y = Math.random() * (window.innerHeight - margin * 2) + margin;

  const enemy = document.createElement('div');
  enemy.className = 'enemy';
  enemy.style.left = (x - 40) + 'px';
  enemy.style.top  = (y - 40) + 'px';

  const img = document.createElement('img');
  img.src = 'mask_yami.png';
  img.draggable = false;
  enemy.appendChild(img);

  enemy.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!gameRunning) return;
    hitEnemy(enemy, x, y);
  });

  area.appendChild(enemy);

  setTimeout(() => {
    if (enemy.parentNode) enemy.remove();
  }, ENEMY_LIFETIME);
}

function hitEnemy(enemy, x, y) {
  score += POINTS_PER_HIT;
  document.getElementById('score').textContent = score;
  enemy.remove();
  spawnScorePopup(x, y);
}

function spawnScorePopup(x, y) {
  const area = document.getElementById('game-area');
  const popup = document.createElement('div');
  popup.className = 'score-popup';
  popup.textContent = '+' + POINTS_PER_HIT;
  popup.style.left = x + 'px';
  popup.style.top  = y + 'px';
  area.appendChild(popup);
  setTimeout(() => popup.remove(), 600);
}
