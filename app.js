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

// 日本語の問題データ
const quizData = [
  {
    category: "地理",
    difficulty: "easy",
    question: "日本の首都はどこですか？",
    correctAnswer: "東京",
    choices: ["東京", "大阪", "名古屋", "福岡"]
  },
  {
    category: "理科",
    difficulty: "easy",
    question: "太陽がのぼる方角はどれですか？",
    correctAnswer: "東",
    choices: ["東", "西", "南", "北"]
  },
  {
    category: "国語",
    difficulty: "easy",
    question: "『あか』を漢字で書くとどれですか？",
    correctAnswer: "赤",
    choices: ["赤", "青", "白", "黄"]
  },
  {
    category: "歴史",
    difficulty: "medium",
    question: "江戸幕府を開いた人物は誰ですか？",
    correctAnswer: "徳川家康",
    choices: ["徳川家康", "織田信長", "豊臣秀吉", "坂本龍馬"]
  },
  {
    category: "数学",
    difficulty: "medium",
    question: "15 + 27 はいくつですか？",
    correctAnswer: "42",
    choices: ["42", "32", "52", "38"]
  },
  {
    category: "英語",
    difficulty: "medium",
    question: "『apple』の日本語の意味はどれですか？",
    correctAnswer: "りんご",
    choices: ["りんご", "みかん", "ぶどう", "もも"]
  },
  {
    category: "理科",
    difficulty: "hard",
    question: "水がこおる温度は通常何度ですか？",
    correctAnswer: "0度",
    choices: ["0度", "10度", "50度", "100度"]
  },
  {
    category: "地理",
    difficulty: "hard",
    question: "日本でいちばん高い山はどれですか？",
    correctAnswer: "富士山",
    choices: ["富士山", "北岳", "阿蘇山", "高尾山"]
  },
  {
    category: "雑学",
    difficulty: "hard",
    question: "1週間は何日ありますか？",
    correctAnswer: "7日",
    choices: ["7日", "6日", "8日", "5日"]
  }
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getQuizByDifficulty() {
  const difficulty = difficultyEl.value;
  const filteredQuiz = quizData.filter((quiz) => quiz.difficulty === difficulty);

  if (filteredQuiz.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuiz.length);
  return filteredQuiz[randomIndex];
}

function loadQuiz() {
  resultEl.textContent = "";
  nextBtn.classList.add("hidden");
  choicesEl.innerHTML = "";

  const selectedQuiz = getQuizByDifficulty();

  if (!selectedQuiz) {
    categoryEl.textContent = "";
    questionEl.textContent = "この難易度の問題はまだありません。";
    quizBox.classList.remove("hidden");
    return;
  }

  currentQuiz = {
    category: selectedQuiz.category,
    question: selectedQuiz.question,
    correctAnswer: selectedQuiz.correctAnswer,
    choices: shuffle(selectedQuiz.choices)
  };

  categoryEl.textContent = `カテゴリ: ${currentQuiz.category}`;
  questionEl.textContent = currentQuiz.question;

  currentQuiz.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.className = "choice-btn";
    button.onclick = () => checkAnswer(choice);
    choicesEl.appendChild(button);
  });

  quizBox.classList.remove("hidden");
}

function checkAnswer(selectedChoice) {
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (selectedChoice === currentQuiz.correctAnswer) {
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
