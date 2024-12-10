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
    question: 'Är Australien både ett land och en kontinent?',
    type: 'trueFalse',
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    question: 'Vilken av följande städer är känd för sina kanaler?',
    type: 'radiobtn',
    options: ['Venedig', 'Paris', 'Berlin'],
    correctAnswer: 'Venedig'
  },
  {
    question: 'Vilka av följande är de största floderna i världen?',
    type: 'checkbox',
    options: ['Amazonas', 'Nilen', 'Mississippi', 'Yangtze'],
    correctAnswer: 'Amazonas, Nilen'
  },
  {
    question: 'Är Mount Everest världens högsta berg?',
    type: 'trueFalse',
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    question: 'Vilket av följande länder är känt för sina tulpaner?',
    type: 'radiobtn',
    options: ['Holland', 'Kanada', 'Italien'],
    correctAnswer: 'Holland'
  },
  {
    question: 'Vilken stad har flest invånare i världen?',
    type: 'radiobtn',
    options: ['Tokio', 'Shanghai', 'New York'],
    correctAnswer: 'Tokio'
  },
  {
    question: 'Vilken av följande öar tillhör inte Indonesien?',
    type: 'checkbox',
    options: ['Bali', 'Sumatra', 'Sicilien', 'Java'],
    correctAnswer: 'Sicilien'
  },
  {
    question: 'Vilket land har flest antal tidszoner?',
    type: 'radiobtn',
    options: ['USA', 'Ryssland', 'Kina'],
    correctAnswer: 'Ryssland'
  },
  {
    question: 'Är Sahara en regnskog?',
    type: 'trueFalse',
    options: ['True', 'False'],
    correctAnswer: 'False'
  },
  {
    question: 'Vilken av följande byggnader är den högsta i Europa?',
    type: 'radiobtn',
    options: ['Eiffeltornet', 'Shard', 'Ostankino Tower'],
    correctAnswer: 'Ostankino Tower'
  }
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
let userAnswers = []


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
  //hämtya icheckade svar för frågan
  const selected = document.querySelectorAll(`input[name='question ${currentQuestion + 1}']:checked`)
  //om inget är icheckat, kör en pop up alert
  if (selected.length === 0) {
    alert('Du måste svara på denna fråga för att komma vidare till nästa !')
    return;
  }
  //hämta användarens svar 
  let selectedAnswer = [];
  selected.forEach(option => {
    selectedAnswer.push(option.value)
  })

  //kolla om svaret är korrekt
  const correctAnswer = questions[currentQuestion].correctAnswer
  let isCorrect = false

  if (questions[currentQuestion].type === 'checkbox') {
    //för checkbox, kolla om rätt svar valts
    if (selectedAnswer.includes(correctAnswer)) {
      isCorrect = true
    }
  } else {
    //för trueFalse/radiobtn kolla om rätt svar valts
    if (selectedAnswer[0] === correctAnswer) {
      isCorrect = true
    }
  }
  //lägg till användarens svar i en array
  userAnswers.push({
    question: questions[currentQuestion].question,
    userAnswer: selectedAnswer,
    correctAnswer: correctAnswer,
    isCorrect: isCorrect
  })

  //om användaren svarat rätt så ökas poäng med 1
  if (isCorrect) {
    score++
  }


  //gå vidare till nästa fråga
  currentQuestion++
  if (currentQuestion < questions.length) {
    manageQuestion()
  } else {
    //när frågorna är slut, visa resultat
    showResults()
  }
})


// Visa resultatet
function showResults() {
  resultSection.classList.remove('hidden')
  points.textContent = `Du fick ${score} av ${questions.length} rätt!`;

  feedback.innerHTML = '';

  // kollar igenom svar i usersAnswers, visar frågan, svaret och det är rätt eller fel.
  for (let i = 0; i < userAnswers.length; i++) {
    const answer = userAnswers[i];
    const resultText = answer.isCorrect ? 'Rätt svar!' : 'Fel svar..';
    feedback.innerHTML +=
      `<p><strong>${answer.question}</strong></p>
      <p>${resultText}</p>
      <p>Ditt svar: ${answer.userAnswer}</p>
      <p>Rätt svar: ${answer.correctAnswer}</p>`
  }

  questionSection.classList.add('hidden')
  nextBtn.classList.add('hidden')
  restartBtn.classList.remove('hidden')
}

// // Starta om quizet
restartBtn.addEventListener('click', () => {

  resultSection.classList.add('hidden')
  startPage.classList.add('hidden')
  questionSection.classList.remove('hidden')
  nextBtn.classList.remove('hidden')
  currentQuestion = 0
  score = 0
  userAnswers = []
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


