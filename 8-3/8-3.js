const gift1Btn = document.getElementById('gift1Btn');
const gift2Btn = document.getElementById('gift2Btn');
const gift3Btn = document.getElementById('gift3Btn');
const gift4Btn = document.getElementById('gift4Btn');

const gift1Panel = document.getElementById('gift1Panel');
const gift2Panel = document.getElementById('gift2Panel');
const gift3Panel = document.getElementById('gift3Panel');
const gift4Panel = document.getElementById('gift4Panel');

const gift1Text = document.getElementById('gift1Text');
const rainLayer = document.getElementById('rainLayer');
const wishOutput = document.getElementById('wishOutput');
const personalWish = document.getElementById('personalWish');
const wishGif = document.getElementById('wishGif');

const nameModal = document.getElementById('nameModal');
const nameInput = document.getElementById('nameInput');
const openDialogBtn = document.getElementById('openDialogBtn');
const submitNameBtn = document.getElementById('submitNameBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

const longWish =
  'Nhân ngày 8-3, chúc bạn luôn xinh đẹp, rạng rỡ và ngập tràn năng lượng tích cực. Mong mọi dự định của bạn đều thuận lợi, mọi cố gắng đều được đền đáp, và mỗi ngày trôi qua đều là một ngày thật dịu dàng, thật hạnh phúc.';

const shortWishes = [
  'Chúc bạn luôn vui 💖',
  '8/3 rạng rỡ nhé 🌸',
  'Luôn tự tin tỏa sáng ✨',
  'Ngập tràn yêu thương 💕',
  'Hạnh phúc mỗi ngày 💐'
];

let rainTimer = null;
let typingTimer = null;

function typeWriter(target, text, speed = 24, callback) {
  clearInterval(typingTimer);
  target.textContent = '';
  let index = 0;

  typingTimer = setInterval(() => {
    target.textContent += text[index] || '';
    index += 1;

    if (index >= text.length) {
      clearInterval(typingTimer);
      if (callback) callback();
    }
  }, speed);
}

function showPanel(panel) {
  panel.classList.remove('hidden');
  panel.classList.add('fade-float');
}

function createRainItem() {
  const item = document.createElement('div');
  item.className = 'rain-item';
  item.style.left = `${Math.random() * 95}vw`;
  item.style.animationDuration = `${4.4 + Math.random() * 2.8}s`;

  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '💗';

  const text = document.createElement('div');
  text.className = 'short-wish';
  text.textContent = shortWishes[Math.floor(Math.random() * shortWishes.length)];

  item.appendChild(heart);
  item.appendChild(text);
  rainLayer.appendChild(item);

  item.addEventListener('animationend', () => {
    item.remove();
  });
}

function startInfiniteRain() {
  if (rainTimer) return;
  for (let i = 0; i < 8; i += 1) {
    setTimeout(createRainItem, i * 240);
  }
  rainTimer = setInterval(createRainItem, 360);
}

gift1Btn.addEventListener('click', () => {
  showPanel(gift1Panel);
  typeWriter(gift1Text, longWish);
});

gift2Btn.addEventListener('click', () => {
  showPanel(gift2Panel);
  startInfiniteRain();
});

gift3Btn.addEventListener('click', () => {
  showPanel(gift3Panel);
});

gift4Btn.addEventListener('click', () => {
  showPanel(gift4Panel);
  nameModal.classList.remove('hidden');
  nameInput.focus();
});

openDialogBtn.addEventListener('click', () => {
  nameModal.classList.remove('hidden');
  nameInput.focus();
});

closeModalBtn.addEventListener('click', () => {
  nameModal.classList.add('hidden');
});

submitNameBtn.addEventListener('click', () => {
  const name = nameInput.value.trim() || 'Bạn';
  const message = `Chúc ${name} có một ngày 8-3 thật ngọt ngào, luôn mỉm cười, luôn được yêu thương và gặp thật nhiều điều may mắn trong cuộc sống!`;

  nameModal.classList.add('hidden');
  wishOutput.classList.remove('hidden');
  wishGif.classList.add('hidden');

  typeWriter(personalWish, message, 28, () => {
    wishGif.classList.remove('hidden');
    wishGif.classList.add('fade-float');
  });
});
