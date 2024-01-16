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

const highScores = document.querySelector('.highscores');

let highScoreList = document.getElementById('highscorelist');

const submitBtn = document.getElementById('submitHighscore');

let playerInitials = document.getElementById('initials');

const scoreEl = document.querySelector('.score');

let scoreCard = localStorage.getItem('scoreCard');
 
let playersScore = document.getElementById('playerScore')
let scorecardInitials = document.getElementById('playerInitials')



let currentQuestion = 0;
let secondsLeft = 60;
let timer;
let score = 0;




quizEl.style.display = "none";
highScores.style.display = 'none';

function init(){
  getScore()
}

function startGame() {
  currentQuestion = 0;
  score = 0;
  initials = '';
  document.getElementById('intro').style.display = "none";
  quizEl.style.display = "block";
  showQuestions();
  startTimer();
}

function startTimer() {
  timer = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timer);
      quizEl.style.display = 'none';
      highScores.style.display = 'block';
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
    score++;
    setScore();
} else {
   
   secondsLeft -= 10;
  }
  if (secondsLeft === 0) {
    secondsLeft = 0;
  }
  
  disableButtons();
    showNextQuestion();
  
}

function setScore(){
  const player = playerInitials.value;
  scoreEl.textContent = score;
  localStorage.setItem("score", score);
  localStorage.setItem('player', player)
  localStorage.getItem('player')
  scorecardInitials.append(player)
}

function getScore(){
  const storedScore = JSON.parse(localStorage.getItem('score'));

  if(storedScore === null){
    score = 0;
  } else {
    score = storedScore
  }
  playersScore.textContent = score;
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
        highScores.style.display = 'block';
        quizEl.style.display = 'none';
       clearInterval(timer);
       
    }
}

init()

submitBtn.addEventListener('click', function(e){
  e.preventDefault();
  setScore();
  getScore();
})
startBtn.addEventListener("click", startGame);

