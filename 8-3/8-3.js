const wishes = [
  "Chúc bạn luôn rạng ngời như hoa tháng 3, gặp nhiều may mắn và niềm vui!",
  "Mong bạn mỗi ngày đều tự tin, mạnh mẽ và được yêu thương thật nhiều.",
  "Chúc mọi điều tốt đẹp nhất sẽ đến với bạn trong học tập, công việc và cuộc sống.",
  "Hãy luôn mỉm cười vì bạn xứng đáng với những điều tuyệt vời nhất!",
  "Chúc bạn 8/3 ngập tràn quà tặng, tiếng cười và những khoảnh khắc hạnh phúc."
];

const unlocked = new Set();
let luckyNumber = Math.floor(Math.random() * 8) + 1;
let guessTries = 3;
let heartCount = 0;

const giftList = document.getElementById("giftList");
const quizStatus = document.getElementById("quizStatus");
const guessStatus = document.getElementById("guessStatus");
const heartStatus = document.getElementById("heartStatus");

function addWish(index) {
  if (unlocked.has(index)) return;

  unlocked.add(index);
  if (unlocked.size === 1) giftList.innerHTML = "";

  const li = document.createElement("li");
  li.className = "unlocked";
  li.textContent = `🎉 ${wishes[index]}`;
  giftList.appendChild(li);
}

function randomWish() {
  const index = Math.floor(Math.random() * wishes.length);
  addWish(index);
}

function createPetals() {
  const wrap = document.getElementById("petals");
  for (let i = 0; i < 18; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${9 + Math.random() * 7}s`;
    petal.style.animationDelay = `${-Math.random() * 6}s`;
    petal.style.opacity = `${0.45 + Math.random() * 0.45}`;
    wrap.appendChild(petal);
  }
}

function resetGame() {
  unlocked.clear();
  luckyNumber = Math.floor(Math.random() * 8) + 1;
  guessTries = 3;
  heartCount = 0;

  giftList.innerHTML = "<li>Hoàn thành mini game để mở khóa lời chúc.</li>";
  quizStatus.textContent = "Hãy chọn đáp án chính xác để nhận quà.";
  guessStatus.textContent = "May mắn đang chờ bạn ✨";
  heartStatus.textContent = "Số lần bắt được: 0/5";

  document.getElementById("guessInput").value = "";
}

function setupEvents() {
  document.querySelectorAll(".answer").forEach((button) => {
    button.addEventListener("click", () => {
      const isCorrect = button.dataset.correct === "true";
      if (isCorrect) {
        quizStatus.textContent = "Đúng rồi! Bạn đã mở khóa 1 lời chúc 💝";
        addWish(0);
      } else {
        quizStatus.textContent = "Chưa đúng rồi, thử lại nhé!";
      }
    });
  });

  document.getElementById("guessBtn").addEventListener("click", () => {
    if (guessTries <= 0) return;

    const input = document.getElementById("guessInput");
    const value = Number(input.value);

    if (!value || value < 1 || value > 8) {
      guessStatus.textContent = "Vui lòng nhập số từ 1 đến 8.";
      return;
    }

    guessTries -= 1;

    if (value === luckyNumber) {
      guessStatus.textContent = "Chính xác! Bạn đã mở khóa quà may mắn 🌟";
      addWish(1);
      guessTries = 0;
      return;
    }

    if (guessTries > 0) {
      const hint = value < luckyNumber ? "lớn hơn" : "nhỏ hơn";
      guessStatus.textContent = `Sai rồi! Số may mắn ${hint} ${value}. Còn ${guessTries} lượt.`;
    } else {
      guessStatus.textContent = `Hết lượt! Số may mắn là ${luckyNumber}. Bạn vẫn nhận được 1 lời chúc an ủi 💗`;
      addWish(2);
    }
  });

  document.getElementById("heartBtn").addEventListener("click", (event) => {
    heartCount += 1;
    heartStatus.textContent = `Số lần bắt được: ${heartCount}/5`;

    const btn = event.currentTarget;
    btn.style.transform = `translate(${Math.random() * 60 - 30}px, ${Math.random() * 30 - 15}px)`;

    if (heartCount >= 5) {
      heartStatus.textContent = "Bạn thật nhanh tay! Đã mở khóa lời chúc trái tim 💘";
      addWish(3);
    }
  });

  document.getElementById("openGiftBtn").addEventListener("click", () => {
    randomWish();
  });

  document.getElementById("resetBtn").addEventListener("click", resetGame);
}

createPetals();
setupEvents();
