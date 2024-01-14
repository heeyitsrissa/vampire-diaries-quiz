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

const highScores = document.querySelector('.highscores');

const highScoreList = document.getElementById('highscorelist');

const submitBtn = document.getElementById('submitHighscore');

const scoreBtn = document.getElementById('showscores')

const alertMessage = document.querySelector("alertmessage")

let scoreCard = localStorage.getItem('scoreCard');




let currentQuestion = 0;
let score = 0;
let secondsLeft = 60;
let timer;

quizEl.style.display = "none";
highScores.style.display = 'none';

function startGame() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("intro").style.display = "none";
  quizEl.style.display = "block";
  nextBtn.style.display = 'none';
  showQuestions();
  startTimer();
}

function startTimer() {
  timer = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft == 0) {
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
  const isCorrect = selectBtn.dataset.correct;

  if (isCorrect) {
  
  } else {
   
   secondsLeft -= 10;
  }
  if (secondsLeft === 0) {
    secondsLeft = 0;
  }
  
  disableButtons();
    showNextQuestion();
  
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
       nextBtn.style.display = 'block';
        endGame();
    }
}

function endGame(){
    clearInterval(timer);
}

startBtn.addEventListener("click", startGame);

function logScores(){
  highScores.style.display = 'block';
  quizEl.style.display = 'none';

}





nextBtn.addEventListener('click', logScores);
