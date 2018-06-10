'use strict';

const STORE = [
	{
		question: 'Who is the original World Cup Trophy named after?',
		answers: ['Jules Rinet','Pele','Abel Lafleur','Diego Maradona'],
		correctAnswer:'Jules Rinet',
	},

	{
		question: 'What country won the first World Cup in 1930?',
		answers: ['Uruguay','England','Brazil','USA'],
		correctAnswer:'Uruguay',
	},

	{
		question: 'Who scored the first goal in World Cup history?',
		answers: ['Diego Maradona','Pele','Bert Patenaude','Lucien Laurent'],
		correctAnswer:'Lucien Laurent',
	},

	{
		question: 'What country was the first to win consecutive World Cups?',
		answers: ['South Africa','Italy','Brazil','England','France'],
		correctAnswer:'Italy',
	},

	{
		question:
			'Who is the only player to score a hat-trick in a World Cup final?',
		answers: ['Geoff Hurtz','Pele','Eusebio','Lionel Messi'],
		correctAnswer:'Geoff Hurtz',
	},

	{
		question: 'What city will host the next World Cup in 2022?',
		answers: ['Tokyo','Seoul','Qatar','Toronto'],
		correctAnswer:'Qatar',
	},

	{
		question: 'Who has the most career goals scored at the World Cup?',
		answers: ['Miroslav Klose','Pele','Cristiano Renaldo', 'Lucien Laurent'],
		correctAnswer:'Miroslav Klose',
	},

	{
		question:'Which country has made the most World Cup finals without a victory?',
		answers: ['Netherlands','Portugal','France','Sweden'],
		correctAnswer:'Netherlands',
	},

	{
		question:'In 1982 the World Cup expanded to how many teams?',
		answers: ['20','60','32','24'],
		correctAnswer:'24',
	},

	{
		question:'What was the first nation to host the World Cup twice?',
		answers: ['England','Brazil','Mexico','Argentina'],
		correctAnswer:'Mexico',
	},
];

let questionNumber = 0;
let score = 0;

function generateSingleQuestion(questionNumber, choice) {
	return `
      <div class="answerContainer">
          <input type="radio"
              class="answerOption"
              id="question${choice}"
              value="${STORE[questionNumber].answers[choice]}"
              name="answer" required/>
          <label class="answerOptionLabel" for="question${choice}">
                 ${STORE[questionNumber].answers[choice]}
          </label>
      </div>
         `;
}

function generateQuestions() {
	if (questionNumber < STORE.length) {
		return `
        <div class="question-${questionNumber}">
            <form>
                <fieldset>
                    <legend>
                        ${STORE[questionNumber].question}
                    </legend>
                        ${generateSingleQuestion(questionNumber, 0)}
                        ${generateSingleQuestion(questionNumber, 1)}
                        ${generateSingleQuestion(questionNumber, 2)}
                        ${generateSingleQuestion(questionNumber, 3)}
                </fieldset>
                    <button type="submit"
                    class="submitButton"
                    id="submitEle">
                      Submit
                    </button>
            </form>
        </div>
          `;
	} else {
		$('.icon').hide();
		$('.questionNumber').text(10);
		renderResults();
		restartQuiz();
	}
}

function changeQuestionNumber() {
	questionNumber += 1;
	$('.questionNumber').text(questionNumber + 1);
}

function changeScore() {
	score += 1;
}

function startPage() {
	$('.questionAnswerForm').toggleClass('hidden');
	$('.results').toggleClass('hidden');
	$('.logo').toggleClass('hidden');
	$('.icon').hide();
}

function startQuiz() {
	$('.quizStart').on('click', '.startButton', function(event) {
		$('.quizStart').remove();
		$('.questionAnswerForm').css('display', 'block');
		$('.questionNumber').text(1);
		$('.results').toggleClass('hidden');
		$('.logo').toggleClass('hidden');
		$('.icon').show();
	});
}

function renderQuestion() {
	$('.questionAnswerForm').html(generateQuestions());
}

function userSelection() {
	$('form').on('submit', function(event) {
		event.preventDefault();

		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${STORE[questionNumber].correctAnswer}`;

		if (answer === correctAnswer) {
			userAnswerFeedbackCorrect();
		} else {
			userAnswerFeedbackWrong();
		}
	});
}

function userAnswerFeedbackWrong() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;

	$('.questionAnswerForm').html(
		`<div class="wrongFeedback">
        <h2>Missed that one.</h2>
        <p>The correct answer is "${correctAnswer}"</p>
            <button type=button class="nextButton">Next</button>
    </div>`
	);
}

function userAnswerFeedbackCorrect() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	$('.questionAnswerForm').html(
		`<div class="correctFeedback">
        <h2>That's a goal!</h2>
        <p>Nice moves.</p>
          <button type=button class="nextButton">Next</button>
    </div>`
	);
	changeScore();
	$('.score').text(score);
}

function renderResults() {
	if (score >= 8) {
		$('.questionAnswerForm').html(
			`<div class="championResults">
          <img src="https://png.icons8.com/ios/1600/strategy-board.png"  alt="playbook" width="150px" height:"150px"/>
          <h3>Raise the trophy</h3>
          <p>You got ${score} / 10 </p>
          <p>You're a world class champ!</p>
              <button class="restartButton">Play Again</button>
      </div>`
		);
	} else if (score < 8 && score >= 5) {
		$('.questionAnswerForm').html(
			`<div class="averageResults">
          <img src="https://png.icons8.com/ios/1600/strategy-board.png"  alt="playbook" width="150px" height:"150px"/>
          <h3>Not bad.</h3>
          <p>You got ${score} / 10 </p>
          <p>Keep practicing!</p>
              <button class="restartButton">Play Again</button>
      </div>`
		);
	} else {
		$('.questionAnswerForm').html(
			`<div class="badResults">
          <img src="https://png.icons8.com/ios/1600/strategy-board.png"  alt="playbook" width="150px" height:"150px"/>
          <h3>Poor showing.</h3>
          <p>You got ${score} / 10 </p>
          <p>You've embarrased your football club!</p>
              <button class="restartButton">Play Again</button>
      </div>`
		);
	}
}

function renderNextQuestion() {
	$('main').on('click', '.nextButton', function(event) {
		changeQuestionNumber();
		renderQuestion();
		userSelection();
	});
}

function restartQuiz() {
	$('main').on('click', '.restartButton', function(event) {
		location.reload();
	});
}

function makeQuiz() {
	startPage();
	startQuiz();
	renderQuestion();
	userSelection();
	renderNextQuestion();
}

$(makeQuiz);
