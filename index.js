
const themeToggle = document.querySelector('#themeToggle');
const quizContainer = document.querySelector('.quizContainer');
const startPage = document.querySelector('.startPage');
const letsPlayBtn = document.querySelector('#letsPlayBtn');
const questionSection = document.querySelector('.questionSection');
const nextBtn = document.querySelector('#nextBtn');
const resultSection = document.querySelector('#resultSection');
const score = document.querySelector('#score');
const feedback = document.querySelector('#feedback');
const restartBtn = document.querySelector('#restartBtn');


const questions = [
  {
    type: 'true-false',
    question: 'JavaScript är ett programmeringsspråk.',
    answer: true
  },

  {
    type: 'radiobutton',
    question: 'Vilket av följande är ett CSS-ramverk?',
    options: ['React', 'Bootstrap', 'Node.js', 'MongoDB'],
    answer: 1
  },

  {
    type: "checkbox",
    question: 'Vilka av följande är JavaScript-ramverk?',
    options: ['React', 'Vue.js', 'Django', 'Angular'],
    answer: [0, 1, 3]
  }
];


//ändra tema - darkmode/lightmode
document.querySelector('#themeToggle').addEventListener('click', () => {
  //använder toogle-metoden för att skifta mellan hide() och show()
  document.body.classList.toggle('darkMode');
  /*kollar om klassen darkMode finns, gör en kort verision på if/else-sats och
  om villkoret uppfylls så ändrar vi texten till lightMode*/
  document.querySelector('#themeToggle').innerHTML =
    document.body.classList.contains('darkMode') ? 'Light Mode' : 'Dark Mode';
});


letsPlayBtn.addEventListener('click', () => {
  //dölj startsidan och visa frågor samt next button.
  letsPlayBtn.classList.add('hidden');
  startPage.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  manageQuestion();
});


let index = 0;
let userScore = 0;


// nextBtn.addEventListener('click', () => {
// manageQuestion();
// })


// const manageQuestion = () => {
//   for (let index = 0; index <= questions.length; index++;)
// }

function manageQuestion() {
  const currentQuestion = questions[index];
  questionSection.textContent = currentQuestion.question;


}