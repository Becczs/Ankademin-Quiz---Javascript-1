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
    options: ['Sant', 'Falskt'],
    correctAnswer: 'Sant'
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
    options: ['Sant', 'Falskt'],
    correctAnswer: 'Sant'
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
    options: ['Tokyo', 'Shanghai', 'New York'],
    correctAnswer: 'Tokyo'
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
    options: ['Sant', 'Falskt'],
    correctAnswer: 'Falskt'
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
  //skapa fieldset element där frågorna komemr att visas
  const fieldset = document.createElement('fieldset')
  //skriver ut vilken fråga vi är på
  const h3 = document.createElement('h3')
  h3.textContent = `Fråga ${currentQuestion + 1}`
  //frågans text
  const p = document.createElement('p')
  p.textContent = eachQuestion.question;
  //lägg till i fieldset
  fieldset.append(h3, p)

  //skapa olika svarsalternativ beroende på typ av fråga
  if (eachQuestion.type === 'checkbox') {

    eachQuestion.options.forEach(option => {

      const label = document.createElement('label')
      label.textContent = option
      const input = document.createElement('input')
      input.type = 'checkbox'
      input.name = `question ${currentQuestion + 1}`
      input.value = option

      fieldset.append(input, label)
    })
  } else if (eachQuestion.type === 'trueFalse' || 'radiobtn') {

    eachQuestion.options.forEach(option => {

      const label = document.createElement('label')
      label.textContent = option
      const input = document.createElement('input')
      input.type = 'radio'
      input.name = `question ${currentQuestion + 1}`
      input.value = option

      fieldset.append(input, label)
    })
  }

  questionContainer.append(fieldset);

}



nextBtn.addEventListener('click', () => {
  //hämtya icheckade svar för currentquestion
  const selected = document.querySelectorAll(`input[name='question ${currentQuestion + 1}']:checked`)
  //om inget är icheckat, kör en pop up alert
  if (selected.length === 0) {
    alert('Du måste svara på denna fråga för att komma vidare till nästa !')
    return;
  }
  //skpar en array där vi sparar användarens svar 
  let selectedAnswer = [];
  //går igenom varje val och lägger det valet i arrayen
  selected.forEach(option => {
    selectedAnswer.push(option.value)
  })

  //kolla om svaret på frågan är rätt
  const correctAnswer = questions[currentQuestion].correctAnswer
  //variabel för att hålla koll på om frågan är rätt elelr ej
  let isCorrect = false

  // om frågan är 'checkbox'
  if (questions[currentQuestion].type === 'checkbox') {
    // splitta en string till en array då vi har flera rätta svar
    const correctAnswersArr = correctAnswer.split(', ')

    // kolla om användaren valt lika många rätta som finns för frågan 
    if (selectedAnswer.length === correctAnswersArr.length) {
      //hålla koll på alla rätta svar
      let correctCount = 0
      //för varje valt svar, kollar vi om den finns med i correctAnswersArr och isåfall öka med 1
      selectedAnswer.forEach(answer => {
        if (correctAnswersArr.includes(answer)) {
          correctCount++
        }
      })

      // Om alla valda svar är korrekta
      if (correctCount === selectedAnswer.length) {
        isCorrect = true;
      }
    }
  } else {
    // Om radiobt eller truefalse, jämför det (enda) valda svaret med det rätta svaret
    if (selectedAnswer[0] === correctAnswer) {
      isCorrect = true
    }
  }

  //lägg till fråga, rätta svaret och användarens svar (och om correct) i arrayen userAnswers.
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

  //räkna ut poäng i procent 
  finalScore = (score / questions.length) * 100
  let feedbackText = ''
  let textColor = ''

  if (finalScore < 50) {
    feedbackText = 'Inte godkänt, bättre lycka nästa gång..'
    //färga text röd
    textColor = '#ea0202';
  } else if (finalScore >= 50 && finalScore <= 75) {
    feedbackText = 'Bra jobbat, men du kan bättre!'
    //orange
    textColor = '#DE6F07'
  } else {
    feedbackText = 'Snyggt, MVG!'
    //grön
    textColor = '#048204'
  }

  points.innerHTML = `Du fick ${score} av ${questions.length} rätt
  <p style='color: ${textColor}'>${feedbackText}</p>`;

  feedback.innerHTML = '';

  // kollar igenom svar i usersAnswers, visar frågan, svaret och det är rätt eller fel.
  for (let i = 0; i < userAnswers.length; i++) {
    const answer = userAnswers[i];
    feedback.innerHTML +=
      `<p><strong>${answer.question}</strong></p>
      <p style='color:${answer.isCorrect ? '#048204' : '#ea0202'};'>${answer.isCorrect ? 'Rätt svar!' : 'Fel svar..'}</p>
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
  //reset värden
  currentQuestion = 0
  score = 0
  userAnswers = []
  manageQuestion()
});

