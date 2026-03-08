const dynamicContent = document.getElementById('dynamicContent');
const rainLayer = document.getElementById('rainLayer');
const nameDialog = document.getElementById('nameDialog');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const heroSubtitle = document.getElementById('heroSubtitle');

const shortWishes = [
  '8/3 rạng rỡ nhé!',
  'Luôn xinh đẹp và hạnh phúc!',
  'Mỗi ngày đều là ngày đặc biệt!',
  'Tự tin và tỏa sáng!',
  'Yêu thương ngập tràn!'
];

const heartPositions = [
  [50, 8], [36, 14], [64, 14], [24, 24], [50, 24], [76, 24],
  [16, 38], [34, 38], [50, 38], [66, 38], [84, 38],
  [24, 54], [40, 54], [60, 54], [76, 54],
  [34, 70], [50, 70], [66, 70],
  [50, 86]
];

let rainInterval = null;

function typeWriter(element, text, speed = 28) {
  return new Promise((resolve) => {
    element.textContent = '';
    element.classList.add('cursor');
    let i = 0;

    const timer = setInterval(() => {
      element.textContent += text[i] || '';
      i += 1;
      if (i >= text.length) {
        clearInterval(timer);
        element.classList.remove('cursor');
        resolve();
      }
    }, speed);
  });
}

function clearOutput({ keepHint = false } = {}) {
  stopRain();
  dynamicContent.innerHTML = '';
  if (!keepHint) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Hãy bấm một hộp quà để mở hiệu ứng nhé 💐';
    dynamicContent.appendChild(hint);
  }
}

function stopRain() {
  if (rainInterval) {
    clearInterval(rainInterval);
    rainInterval = null;
  }
  rainLayer.innerHTML = '';
}

function spawnRainItem() {
  const item = document.createElement('div');
  item.className = 'rain-item';
  item.textContent = Math.random() < 0.4 ? '💖' : shortWishes[Math.floor(Math.random() * shortWishes.length)];
  item.style.left = `${Math.random() * 90}%`;
  item.style.fontSize = `${0.95 + Math.random() * 0.6}rem`;
  const duration = 4 + Math.random() * 3;
  item.style.animationDuration = `${duration}s`;

  rainLayer.appendChild(item);
  item.addEventListener('animationend', () => item.remove());
}

async function openGift1() {
  clearOutput({ keepHint: true });
  const p = document.createElement('p');
  p.className = 'typing-paragraph';
  dynamicContent.appendChild(p);

  await typeWriter(
    p,
    'Nhân ngày Quốc tế Phụ nữ 8/3, chúc bạn luôn xinh đẹp, mạnh mẽ và giữ mãi nụ cười rạng rỡ. Mong mọi ước mơ của bạn đều nở hoa, mọi hành trình đều có niềm vui, và mỗi ngày trôi qua đều đầy ắp yêu thương.',
    20
  );
}

function openGift2() {
  clearOutput({ keepHint: true });
  const p = document.createElement('p');
  p.className = 'typing-paragraph';
  p.textContent = 'Mưa tim và lời chúc đang rơi xuống vô hạn... 💞';
  dynamicContent.appendChild(p);

  rainInterval = setInterval(spawnRainItem, 220);
}

function openGift3() {
  clearOutput({ keepHint: true });

  const intro = document.createElement('p');
  intro.className = 'typing-paragraph';
  dynamicContent.appendChild(intro);

  typeWriter(intro, 'Kho ảnh 8/3 xuất hiện theo hình trái tim dành tặng bạn 💗', 24).then(() => {
    const gallery = document.createElement('div');
    gallery.className = 'heart-gallery';

    heartPositions.forEach(([x, y], idx) => {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.left = `${x}%`;
      item.style.top = `${y}%`;
      item.style.transform = 'translate(-50%, -50%)';
      item.style.animationDelay = `${idx * 0.06}s`;

      const img = document.createElement('img');
      img.src = 'background8-3.jpg';
      img.alt = `Ảnh 8/3 số ${idx + 1}`;

      item.appendChild(img);
      gallery.appendChild(item);
    });

    dynamicContent.appendChild(gallery);
  });
}

function openGift4() {
  if (typeof nameDialog.showModal === 'function') {
    nameInput.value = '';
    nameDialog.showModal();
  }
}

async function renderPersonalWish(name) {
  clearOutput({ keepHint: true });

  const p = document.createElement('p');
  p.className = 'typing-paragraph';
  dynamicContent.appendChild(p);

  const text = `Gửi ${name}, chúc bạn có một ngày 8/3 thật dịu dàng và rực rỡ. Mong rằng mọi nỗ lực của bạn luôn được ghi nhận, mọi điều tốt đẹp luôn tìm đến, và trái tim bạn luôn ngập tràn bình yên, yêu thương.`;
  await typeWriter(p, text, 20);

  const gif = document.createElement('img');
  gif.className = 'gift-gif';
  gif.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3J6dDBzMG5iNnBkbXgxNzgzZW83aHVhNjQyejQ5a3J4NGFobzV6biZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5GoVLqeAOo6PK/giphy.gif';
  gif.alt = 'GIF chúc mừng 8/3';
  dynamicContent.appendChild(gif);
}

function bindEvents() {
  document.getElementById('gift1').addEventListener('click', openGift1);
  document.getElementById('gift2').addEventListener('click', openGift2);
  document.getElementById('gift3').addEventListener('click', openGift3);
  document.getElementById('gift4').addEventListener('click', openGift4);

  nameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const action = event.submitter?.value;
    if (action !== 'ok') {
      nameDialog.close();
      return;
    }

    const name = nameInput.value.trim() || 'Bạn';
    nameDialog.close();
    renderPersonalWish(name);
  });
}

bindEvents();
typeWriter(
  heroSubtitle,
  'Nơi đây có 4 hộp quà đặc biệt dành riêng cho bạn. Mỗi hộp sẽ mở ra một bất ngờ ngọt ngào của ngày 8/3.',
  24
);
