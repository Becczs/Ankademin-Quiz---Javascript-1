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

//skapa quizfrågorna
const questions = [
  {
    question: 'Javascript är ett programmeringsspråk?',
    type: 'trueFalse',
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    question: 'Vilket av följande är ett CSS-ramverk?',
    type: 'radiobtn',
    options: ['React', 'Bootstrap'],
    correctAnswer: 'Bootstrap'
  },
  {
    question: 'Vilka av följande är JavaScript-ramverk?',
    type: 'checkbox',
    options: ['Flask', 'Vue.js', 'Django', 'Angular'],
    correctAnswer: 'Vue.js'
  },

]

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


function manageQuestion() {
  //här vill jag lägga till frågorna
  const questionContainer = document.querySelector('.questionSection')
  questionContainer.innerHTML = ''
  //hämta frågan från questions
  const eachQuestion = questions[currentQuestion]
  //skapa HTML element där frågorna komemr att visas
  const fieldset = document.createElement('h3')
  //skriver ut vilken fråga vi är på
  const h3 = document.createElement('h3')
  h3.textContent = `Fråga ${currentQuestion + 1}`
  //frågans text
  const p = document.createElement('p')
  p.textContent = eachQuestion.question;
  //lägg till i fieldset
  fieldset.append(h3, p)

  //skapa olika svarsalternativ beroende på typ av fråga
  if (eachQuestion.type === 'trueFalse') {
    eachQuestion.options.forEach(option => {
      const label = document.createElement('label')
      label.textContent = option
      const input = document.createElement('input')
      input.type = 'radio'
      input.name = `question ${currentQuestion + 1}`
      input.value = option
      label.append(input)
      fieldset.append(label)
    })
  } else if (eachQuestion.type === 'radiobtn') {
    eachQuestion.options.forEach(option => {
      const label = document.createElement('label')
      label.textContent = option
      const input = document.createElement('input')
      input.type = 'radio'
      input.name = `question ${currentQuestion + 1}`
      input.value = option
      label.append(input)
      fieldset.append(label)
    })
  } else if (eachQuestion.type === 'checkbox') {
    eachQuestion.options.forEach(option => {
      const label = document.createElement('label')
      label.textContent = option
      const input = document.createElement('input')
      input.type = 'checkbox'
      input.name = `question ${currentQuestion + 1}`
      input.value = option
      label.append(input)
      fieldset.append(label)
    })
  }

  questionContainer.append(fieldset);

}

nextBtn.addEventListener('click', () => {
  //gå vidare till nästa fråga
  currentQuestion++
  manageQuestion()
});




// function manageQuestion() {
//   let questions = document.querySelectorAll(".questionSection fieldset");
//   questions.forEach(question => question.classList.add('hidden'))

//   if (currentQuestion < questions.length) {
//     questions[currentQuestion].classList.remove('hidden')

//   } else {
//     showResults()
//   }
// }

// /*hämta alla frågor och räkna ut dina poäng,
// rätt på 1 fråga = 1 poäng*/
// function showResults() {
//   totalPoints = questions.length
//   questions.forEach(fieldset => {
//     const inputs = fieldset.querySelectorAll("input");
//     inputs.forEach(input => {
//       if (input.checked && input.value === "true") {
//         score++;
//       }
//     })
//   })

//   // Visa resultatet
//   resultSection.classList.remove('hidden')
//   points.textContent = `Du fick ${score} av ${totalPoints} rätt!`;
//   feedback.textContent = ``
//   nextBtn.classList.add('hidden')
//   restartBtn.classList.remove('hidden')
// };

// nextBtn.addEventListener('click', () => {
//   //gå vidare till nästa fråga
//   currentQuestion++
//   manageQuestion()
// });



// // Starta om quizet
// restartBtn.addEventListener('click', () => {

//   resultSection.classList.add('hidden')
//   startPage.classList.add('hidden')
//   nextBtn.classList.remove('hidden')
//   currentQuestion = 0
//   manageQuestion()
// });