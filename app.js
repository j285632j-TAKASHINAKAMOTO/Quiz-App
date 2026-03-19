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

function decodeHtml(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

async function loadQuiz() {
  resultEl.textContent = "";
  nextBtn.classList.add("hidden");
  choicesEl.innerHTML = "";

  const difficulty = difficultyEl.value;
  const url = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    questionEl.textContent = "問題を取得できませんでした。";
    return;
  }

  const q = data.results[0];
  currentQuiz = {
    question: decodeHtml(q.question),
    correctAnswer: decodeHtml(q.correct_answer),
    category: decodeHtml(q.category),
    choices: shuffle([
      ...q.incorrect_answers.map(decodeHtml),
      decodeHtml(q.correct_answer)
    ])
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
    resultEl.textContent = `不正解。正解は「${currentQuiz.correctAnswer}」`;
  }

  scoreEl.textContent = `Score: ${score}`;
  nextBtn.classList.remove("hidden");
}

startBtn.addEventListener("click", loadQuiz);
nextBtn.addEventListener("click", loadQuiz);
