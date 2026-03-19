const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const difficultyEl = document.getElementById("difficulty");
const quizBox = document.getElementById("quizBox");
const categoryEl = document.getElementById("category");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

let currentQuiz = null;
let score = 0;

const quizData = [
  {
    category: "地理",
    difficulty: "easy",
    question: "日本の首都はどこですか？",
    correctAnswer: "東京",
    choices: ["東京", "大阪", "福岡", "名古屋"]
  },
  {
    category: "理科",
    difficulty: "easy",
    question: "水が100度で沸騰するときの状態はどれですか？",
    correctAnswer: "液体から気体",
    choices: ["液体から気体", "気体から固体", "固体から液体", "固体から気体"]
  },
  {
    category: "歴史",
    difficulty: "medium",
    question: "江戸幕府を開いた人物は誰ですか？",
    correctAnswer: "徳川家康",
    choices: ["徳川家康", "織田信長", "豊臣秀吉", "坂本龍馬"]
  },
  {
    category: "国語",
    difficulty: "medium",
    question: "『走る』の反対に近い意味として最も適切なのはどれですか？",
    correctAnswer: "止まる",
    choices: ["止まる", "笑う", "飛ぶ", "考える"]
  },
  {
    category: "雑学",
    difficulty: "hard",
    question: "1年はうるう年でない場合、何日ありますか？",
    correctAnswer: "365日",
    choices: ["365日", "364日", "366日", "360日"]
  },
  {
    category: "数学",
    difficulty: "hard",
    question: "12 × 8 はいくつですか？",
    correctAnswer: "96",
    choices: ["96", "88", "108", "92"]
  }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getFilteredQuiz() {
  const difficulty = difficultyEl.value;
  const filtered = quizData.filter(q => q.difficulty === difficulty);

  if (filtered.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

function loadQuiz() {
  resultEl.textContent = "";
  nextBtn.classList.add("hidden");
  choicesEl.innerHTML = "";

  const q = getFilteredQuiz();

  if (!q) {
    questionEl.textContent = "この難易度の問題がありません。";
    categoryEl.textContent = "";
    quizBox.classList.remove("hidden");
    return;
  }

  currentQuiz = {
    question: q.question,
    correctAnswer: q.correctAnswer,
    category: q.category,
    choices: shuffle(q.choices)
  };

  categoryEl.textContent = `カテゴリ: ${currentQuiz.category}`;
  questionEl.textContent = currentQuiz.question;

  currentQuiz.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
    btn.onclick = () => checkAnswer(choice);
    choicesEl.appendChild(btn);
  });

  quizBox.classList.remove("hidden");
}

function checkAnswer(selected) {
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (selected === currentQuiz.correctAnswer) {
    resultEl.textContent = "正解！";
    score += 10;
  } else {
    resultEl.textContent = `不正解。正解は「${currentQuiz.correctAnswer}」です。`;
  }

  scoreEl.textContent = `スコア: ${score}`;
  nextBtn.classList.remove("hidden");
}

startBtn.addEventListener("click", loadQuiz);
nextBtn.addEventListener("click", loadQuiz);
