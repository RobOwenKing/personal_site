let questions = [
  { prompt: "Alabama", answers: ['montgomery'] },
  { prompt: "Alaska", answers: ['juneau'] },
  { prompt: "Arizona", answers: ['phoenix'] },
  { prompt: "Arkansas", answers: ['little rock'] }
];

const category = document.getElementById('category');
const prompt = document.getElementById('prompt');
const answerInput = document.getElementById('answer');
let answerArray;

const newQuestion = () => {
  questions = questions.filter((element) => answerArray != element.answers);
  let qNumber = Math.floor(Math.random() * questions.length);
  prompt.innerText = questions[qNumber].prompt;
  answerArray = questions[qNumber].answers;
}

answerInput.addEventListener('input', (event) => {
  if (answerArray.includes(answerInput.value.toLowerCase())) {
    newQuestion();
    answerInput.value = '';
  }
})

newQuestion();
