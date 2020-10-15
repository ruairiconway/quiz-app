/**
 * Store structure
 */
let store = {
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
  // Generate main html content for the quiz landing page
  return `
    <div>
      <form>
        <h2>Ready when you are!</h2>
        <button type="button" id="start-button">Start Quiz</button>
      </form>
    </div>`;
}

function generateQuizQuestionString(indexAndObject) {
  // Generate main html structure for the PROMPT question + answers
  return `
  <div>
    <div>
      <p>${indexAndObject.index} / ${store.questions.length}</p>
    </div>
    <div>
      <p>${indexAndObject.object.question}</p>
    </div>
    <form>
      <ul>
        ${generateAnswerList(indexAndObject.object.answers)}
      </ul>
      <div>
        <button type="button" id="validate-button">Check Answer</button>
      </div>
    </form>
    <div>
      <p>${store.score} pts</p>
    </div>
  </div>`;
}

function generateAnswerList(answerList) {
  // Generate list of PROMPT answers
  let answerString = '';
  answerList.forEach(function(answer) {
    answerString += `
    <li>
      <label>
        <input type="radio" name="answers" value="` + answer + `">`
        + answer +
      `</label>
    </li>`;
  });
  return answerString;
}

function generateQuizValidateString(indexAndObject, buttonType) {
  // Generate main html structure for the GRADED question + answers
  return `
  <div>
    <div>
      <p>${indexAndObject.index} / ${store.questions.length}</p>
    </div>
    <div>
      <p>${indexAndObject.object.question}</p>
    </div>
    <form>
      <ul>
        ${generateFeedbackList(indexAndObject.object)}
      </ul>
      <div>
        ${generateButtonType()}
      </div>
    </form>
    <div>
      <p>${store.score} pts</p>
    </div>
    <div>
      ${generateAnswerFeedback()}
    </div>
  </div>`;
}

function generateFeedbackList(validateList) {
  // Generate list of GRADED answers
  let validateString = '';
  (validateList.answers).forEach(function(answer) {
    if (answer === validateList.correctAnswer) {
      validateString += `
        <li>
          <label class="correct-answer">
            <input type="radio" name="answers" value="` + answer + `" disabled>`
            + answer +
          `</label>
        </li>`;
    }
    else {
      validateString += `
        <li>
          <label class="incorrect-answer">
            <input type="radio" name="answers" value="` + answer + `" disabled>`
            + answer +
          `</label>
        </li>`;
    }
  });
  return validateString;
}

function generateButtonType() {
  // Generate 'See Results' button on last question
  if (store.questionNumber + 1 < store.questions.length) {
    return `<button type="button" id="next-question-button">Next Question</button>`
  }
  if (store.questionNumber + 1 === store.questions.length) {
    return `<button type="button" id="next-question-button">See Results</button>`
  }
}

function generateAnswerFeedback() {
  // Generate feedback based on correct/incorrect answer submission
  let answerChoice = $('input[name="answers"]:checked').val();
  let questionIndex = store.questionNumber;
  let correctAnswer = store.questions[questionIndex].correctAnswer;

  if (answerChoice === correctAnswer) {
    let feedbackString = `<p>You chose ${answerChoice}, that's correct!</p>`;
    return feedbackString;
  }
  else {
    let feedbackString = `<p>You chose ${answerChoice}, the correct answer was ${correctAnswer}!</p>`;
    return feedbackString;
  }
}

function generateQuizEndString() {
  // generate main html content for the quiz results
  return `
  <div>
    <div>
      <p>Thanks for taking the quiz!</p>
      <p>How did you do?</p>
      <p>${store.score} / ${store.questions.length * 5}</p>
    <div>
    <div>
      <button type="button" id="reset-button">Try Again</button>
    </div>
  </div>`
}

/********** RENDER FUNCTION(S) **********/

function renderQuiz() {
  // Conditionally replaces the contents of the <main> tag based on the state of the store
  console.log('rendered quiz');
  if (store.quizStarted === false) {
    // start condition
    if (store.submittingAnswer === false) {
      let startString = generateQuizStartString();
      $('main').html(startString);
    }
    // end condition
    if (store.submittingAnswer === true) {
      let endString = generateQuizEndString();
      $('main').html(endString);
    }
  }
  if (store.quizStarted === true) {
    // prompt condition
    if (store.submittingAnswer === false) {
      let questionString = generateQuizQuestionString(currentQuestion());
      $('main').html(questionString);
    }
    // validating/grading condition
    if (store.submittingAnswer === true) {
      let validateString = generateQuizValidateString(currentQuestion());
      $('main').html(validateString);
    }
  }

}

function setStartConditions() {
  // Set store values for start condition and reset
  store.quizStarted = false;
  store.submittingAnswer = false;
  store.questionNumber = 0;
  store.score = 0;
}

function setPromptConditions() {
  // Set store values for prompt condition
  store.quizStarted = true;
  store.submittingAnswer = false;
}

function setSubmitConditions() {
  // Set store values for validation/grading condition
  store.quizStarted = true;
  store.submittingAnswer = true;
}

function setEndConditions() {
  // Set store values for end condition
  store.quizStarted = false;
  store.submittingAnswer = true;
}

function currentQuestion() {
  // render variables for generateQuizQuestion/ValidateString
  let currentIndex = store.questionNumber;
  let currentObject = store.questions[currentIndex];
  let indexAndObject = {
    index: currentIndex + 1,
    object: currentObject
  };
  return indexAndObject;
}

function validateSubmission() {
  // Confirms an input is submitted and triggers grading
  console.log('validate submission');
  let answerOptions = $('input:radio[name=answers]');
  let answerChoice = $('input[name="answers"]:checked').val();
  let questionIndex = store.questionNumber;
  let correctAnswer = store.questions[questionIndex].correctAnswer;

  if (answerOptions.filter(':checked').length === 0) {
    alert('Please select an answer.');
    return;
  }
  else {
    if (answerChoice === correctAnswer) {
      store.score += 5;
    }
    setSubmitConditions();
    renderQuiz();
  }
}

function nextQuestion() {
  // iterates through store questions and triggers end condition on last question
  if (store.questionNumber + 1 < store.questions.length) {
    console.log('next question');
    store.questionNumber += 1;
    setPromptConditions();
  }
  else if (store.questionNumber + 1 === store.questions.length) {
    console.log('quiz end')
    setEndConditions();
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleQuiz() {
  renderQuiz();
  handleQuizStart();
  handleQuizValidateQuestion();
  handleQuizNextQuestion();
  handleQuizRestart();
}

function handleQuizStart() {
  //this function will handle the quiz when the start button is pressed
  $('main').on('click', '#start-button', function(event) {
    console.log('quiz started');
    event.preventDefault();
    setPromptConditions();
    renderQuiz();
  });
}

function handleQuizValidateQuestion() {
  //this function will handle the quiz when an answer is clicked
  $('main').on('click', '#validate-button', function(event) {
    event.preventDefault();
    validateSubmission();
  });
}

function handleQuizNextQuestion() {
  //this function will handle the quiz when 'next question' is clicked
  $('main').on('click', '#next-question-button', function(event) {
    event.preventDefault();
    nextQuestion();
    renderQuiz();
  });
}

function handleQuizRestart() {
  //this function will handle the quiz when the 'try again' button is pressed
  $('main').on('click', '#reset-button', function(event) {
    event.preventDefault();
    setStartConditions();
    renderQuiz();
  });
}

$(handleQuiz);