const startPage = document.querySelector(".startPage");
const questionSection = document.querySelector('.questionSection');
const nextBtn = document.querySelector('#nextBtn');
const letsPlayBtn = document.querySelector('#letsPlayBtn');
const restartBtn = document.querySelector('#restartBtn');
const resultSection = document.querySelector('#resultSection');
const points = document.querySelector('#score')
const feedback = document.querySelector('#feedback')

//ändra tema - darkmode/lightmode
document.querySelector('#themeToggle').addEventListener('click', () => {
  //använder toogle-metoden för att skifta mellan hide() och show()
  document.body.classList.toggle('darkMode');
  /*kollar om klassen darkMode finns, gör en kort verision på if/else-sats och
  om villkoret uppfylls så ändras texten till lightMode*/
  document.querySelector('#themeToggle').innerHTML =
    document.body.classList.contains('darkMode') ? 'Light Mode' : 'Dark Mode';
});


// Starta quizet
letsPlayBtn.addEventListener('click', () => {

  startPage.classList.add('hidden')
  questionSection.classList.remove('hidden')
  nextBtn.classList.remove('hidden')
  manageQuestion();
});


let currentQuestion = 0;
let score = 0;
let totalPoints = 0;

//hämta alla frågor
let questions = document.querySelectorAll(".questionSection fieldset");
// Funktion för att visa första frpgan
function manageQuestion() {

  questions.forEach(question => question.classList.add('hidden'))

  if (currentQuestion < questions.length) {
    questions[currentQuestion].classList.remove('hidden')

  } else {
    showResults()
  }
}

/*hämta alla frågor och räkna ut dina poäng,
rätt på 1 fråga = 1 poäng*/
function showResults() {
  totalPoints = questions.length
  questions.forEach(fieldset => {
    const inputs = fieldset.querySelectorAll("input");
    inputs.forEach(input => {
      if (input.checked && input.value === "true") {
        score++;
      }
    })
  })

  // Visa resultatet
  resultSection.classList.remove('hidden')
  points.textContent = `Du fick ${score} av ${totalPoints} rätt!`;
  feedback.textContent = ``
  nextBtn.classList.add('hidden')
  restartBtn.classList.remove('hidden')
};

nextBtn.addEventListener('click', () => {
  //gå vidare till nästa fråga
  currentQuestion++
  manageQuestion()
});



// Starta om quizet
restartBtn.addEventListener('click', () => {

  resultSection.classList.add('hidden')
  startPage.classList.add('hidden')
  nextBtn.classList.remove('hidden')
  currentQuestion = 0
  manageQuestion()
});