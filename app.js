/**
 * Store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    { // Q1
      question: "Hansen's disease is more commonly known by what name?",
      answers: [
        "Appendicitus",
        "Leprosy",
        "Arthritis",
        "Vertigo"
      ],
      correctAnswer: "Leprosy"
    },
    { // Q2
      question: "Botany is the study of what life form?",
      answers: [
        "Mammals",
        "Plants",
        "Insects",
        "crustaceans"
      ],
      correctAnswer: "Plants"
    },
    { // Q3
      question: "What is the human body’s largest organ?",
      answers: [
        "Liver",
        "Brain",
        "Skin",
        "Intestines"
      ],
      correctAnswer: "Skin"
    },
    { // Q4
      question: "How many neck vertebrae do giraffes have?",
      answers: [
        "7",
        "25",
        "14",
        "19"
      ],
      correctAnswer: "7"
    },
    { // Q5
      question: "What part of the human body is the Mandible?",
      answers: [
        "Inner Ear",
        "Jawbone",
        "Hip",
        "Ankle"
      ],
      correctAnswer: "Jawbone"
    },
    { // Q6
      question: "How many bones does an adult human have?",
      answers: [
        "106",
        "376",
        "76",
        "206"
      ],
      correctAnswer: "206"
    },
    { // Q7
      question: "Heterochromia results in what difference of physical appearance?",
      answers: [
        "Eye Color",
        "Arm Length",
        "Ear Shape",
        "Leg Length"
      ],
      correctAnswer: "Eye Color"
    },
    { // Q8
      question: "Which microbiologist discovered the process of pasteurisation?",
      answers: [
        "Alexander Hamilton",
        "Alexander Fleming",
        "Louis Pasteur",
        "Tom Cruise"
      ],
      correctAnswer: "Louis Pasteur"
    },
    { // Q9
      question: "What year was the first animal cloned?",
      answers: [
        "2010",
        "2003",
        "1999",
        "1996"
      ],
      correctAnswer: "1996"
    },
    { // Q10
      question: "How many millions of species are estimated to live on Earth?",
      answers: [
        "8.7",
        "24.4",
        "13.6",
        "1.2"
      ],
      correctAnswer: "8.7"
    }   
  ],
  quizStarted: false,
  submittingAnswer: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateQuizStartString() {
  // this function will generate the html content for the quiz start
  return `
    <div>
      <form>
        <h2>Ready when you are!</h2>
        <button type="submit" id="start-button">Start Quiz</button>
      </form>
    </div>`;
}

function generateQuizQuestionString(currentObject) {
  // this function will generate the html content for the quiz question prompt
  return `
  <div>
    <div>
      <p>${currentObject.currentIndex} / ${store.questions.length}</p>
    </div>
    <div>
      <p>${currentObject.question}</p>
    </div>
    <ul>
      
    </ul>
  </div>`;
}

function generateAnswerString() {
  //this function creates the answer portion of the form

}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz() {
  console.log('rendered quiz');

  if (store.quizStarted === false) {
    const startString = generateQuizStartString();
    $('main').html(startString);
    };

  if (store.quizStarted === true) {
    if (store.submittingAnswer === false) {
      const questionString = generateQuizQuestionString(currentQuestion());
      $('main').html(questionString);
    }
  }

}

function startQuiz() {
  console.log('Quiz started');
  store.quizStarted = true;
}

function currentQuestion() {
  console.log('setting up new question');
  const currentIndex = store.questionNumber;
  const currentObject = store.questions[currentIndex];
  console.log(currentObject);
  return currentObject;
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleQuiz() {
  renderQuiz();
  handleQuizStart();
  handleQuizSubmitAnswer();
  handleQuizNextQuestion();
  handleQuizSeeResults();
  handleQuizRestart();
}

function handleQuizStart() {
  //this function will handle the quiz when the start button is pressed
  $('#start-button').on('click', function(event) {
    event.preventDefault();
    startQuiz();
    renderQuiz();
  });
}

function handleQuizSubmitAnswer() {
  //this function will handle the quiz when an answer is clicked
}

function handleQuizNextQuestion() {
  //this function will handle the quiz when 'next question' is clicked
}

function handleQuizSeeResults() {
  //this function will handle the end of the quiz when the last question is submitted
}

function handleQuizRestart() {
  //this function will handle the quiz when the 'try again' button is pressed
}

$(handleQuiz);