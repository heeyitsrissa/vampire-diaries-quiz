// set attribute and variables
const myQuestions = [
  {
    question: `What year were Stephan and Damon turned?`,
    answer: [
      { text: "1999", correct: false },
      { text: "1864", correct: true },
      { text: "1763", correct: false },
      { text: "1964", correct: false },
    ],
  },
  {
    question: "How many times does Bonnie die?",
    answer: [
      { text: "1", correct: false },
      { text: "never", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: "Who does Elena end up with?",
    answer: [
      { text: "Matt", correct: false },
      { text: "Stephan", correct: false },
      { text: "Klaus", correct: false },
      { text: "None of the above", correct: true },
    ],
  },
  {
    question:
      "Who does Klaus possess while waiting for his body to get Mystic Falls?",
    answer: [
      { text: "Alaric", correct: true },
      { text: "Stephan", correct: false },
      { text: "Jeremy", correct: false },
      { text: "Vicky", correct: false },
    ],
  },
  {
    question: `Who was Alaric Saltzman's wife?`,
    answer: [
      { text: `Aunt Jenna`, correct: false },
      { text: `Elena's Birth mother`, correct: true },
      { text: `the history teacher`, correct: false },
      { text: `Matt and Vicky's Mom`, correct: false },
    ],
  },
];

const startBtn = document.getElementById("start");

const timerEl = document.getElementById("timer");

const quizEl = document.querySelector(".quiz");

const questionEl = document.getElementById("question");

const answerEl = document.getElementById("answers");

const buttonEl = document.querySelector(".buttons");

const nextBtn = document.getElementById("next");

let currentQuestion = 0;
let score = 0;
let secondsLeft = 60;
let timer;

quizEl.style.display = "none";

function startGame() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("intro").style.display = "none";
  quizEl.style.display = "block";
  showQuestions();
  startTimer();
}

function startTimer() {
  timer = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      endGame();
    }
  }, 1000);
  showQuestions();
}

function showQuestions() {
  let currentQuestionIndex = myQuestions[currentQuestion];
  let numberQuestion = currentQuestion + 1;
  questionEl.innerHTML = numberQuestion + ". " + currentQuestionIndex.question;
  answerEl.innerHTML = "";
  currentQuestionIndex.answer.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("buttons");
    answerEl.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
  });
  answerEl.addEventListener("click", correctAnswer);
}

function correctAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === true;
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
    secondsLeft -= 10;
    if (secondsLeft === 0) {
      secondsLeft = 0;
    }
  }
  disableButtons();
  setTimeout(() => {
    showNextQuestion();
  }, 1000);
}

function disableButtons() {
  Array.from(answerEl.children).forEach((button) => {
    button.disabled = true;
  });
}

function showNextQuestion(){
    currentQuestion ++;
    if(currentQuestion < myQuestions.length){
        showQuestions();
    }else{
        endGame();
    }
}

function endGame(){
    clearInterval(timer);
}


startBtn.addEventListener("click", startGame);

