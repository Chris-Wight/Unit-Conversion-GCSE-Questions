const originalConversions = [
  { left: "10 mm", right: "1 cm", hint: "There are 10 millimetres in a centimetre." },
  { left: "100 cm", right: "1 m", hint: "100 centimetres make 1 metre." },
  { left: "1000 m", right: "1 km", hint: "1000 metres equal 1 kilometre." },
  { left: "1000 g", right: "1 kg", hint: "1000 grams make 1 kilogram." },
  { left: "1000 kg", right: "1 tonne", hint: "1000 kilograms equal 1 tonne." },
  { left: "10 ml", right: "1 cl", hint: "10 millilitres make 1 centilitre." },
  { left: "1000 ml", right: "100 cl", hint: "There are 100 centilitres in 1000 millilitres." },
  { left: "1000 ml", right: "1 litres", hint: "1000 millilitres equal 1 litre." },
  { left: "1000 litres", right: "1 m³", hint: "1000 litres equal 1 cubic metre." },
  { left: "1 ml", right: "1 cm³", hint: "1 millilitre is the same as 1 cubic centimetre." },
  { left: "12 inches", right: "1 foot", hint: "12 inches make 1 foot." },
  { left: "3 feet", right: "1 yard", hint: "3 feet equal 1 yard." },
  { left: "1760 yards", right: "1 mile", hint: "1760 yards make 1 mile." },
  { left: "16 ounces", right: "1 pound", hint: "16 ounces equal 1 pound." },
  { left: "14 pounds", right: "1 stone", hint: "14 pounds make 1 stone." },
  { left: "2240 pounds", right: "1 tonne", hint: "2240 pounds make 1 tonne (UK)." },
  { left: "8 pints", right: "1 gallon", hint: "8 pints equal 1 gallon." },
  { left: "1 inch", right: "2.5 cm", hint: "1 inch is approximately 2.5 cm." },
  { left: "1 foot", right: "30 cm", hint: "1 foot is approximately 30 cm." },
  { left: "1 mile", right: "1.6 km", hint: "1 mile is about 1.6 kilometres." },
  { left: "5 miles", right: "8 km", hint: "5 miles is about 8 kilometres." },
  { left: "1 pound", right: "450 g", hint: "1 pound is approximately 450 grams." },
  { left: "2.2 pounds", right: "1 kg", hint: "2.2 pounds equal 1 kilogram." },
  { left: "1 pint", right: "570 ml", hint: "1 pint is about 570 millilitres." },
  { left: "1 gallon", right: "4.5 litres", hint: "1 gallon is about 4.5 litres." },
  { left: "1.75 pints", right: "1 litre", hint: "1.75 pints make 1 litre." }
];

let isReversed = false;

function getCurrentConversions() {
  return originalConversions.map(q => ({
    question: isReversed ? `${q.right} = ___ ${q.left.split(' ')[1]}` : `${q.left} = ___ ${q.right.split(' ')[1]}`,
    answer: parseFloat(isReversed ? q.left.split(' ')[0] : q.right.split(' ')[0]),
    hint: q.hint
  }));
}

function generateQuestions() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  getCurrentConversions().forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <label>${q.question}
        <input type="number" step="any" id="answer-${i}" />
      </label>
      <button class="hint-btn" id="hint-btn-${i}" onclick="showHint(${i})">Hint</button>
    `;
    container.appendChild(div);
  });
  updateScore(0, originalConversions.length);
}

function showHint(index) {
  const btn = document.getElementById(`hint-btn-${index}`);
  btn.outerHTML = `<span id="hint-btn-${index}" style="margin-left:10px;">${getCurrentConversions()[index].hint}</span>`;
}

function checkAnswers() {
  let correctCount = 0;

  getCurrentConversions().forEach((q, i) => {
    const input = document.getElementById(`answer-${i}`);
    const userAnswer = parseFloat(input.value);
    const parent = input.closest('.question');
    parent.classList.remove('correct', 'incorrect');
    if (Math.abs(userAnswer - q.answer) < 0.01) {
      parent.classList.add('correct');
      correctCount++;
    } else {
      parent.classList.add('incorrect');
    }
  });

  updateScore(correctCount, originalConversions.length);
}

function resetQuiz() {
  originalConversions.forEach((q, i) => {
    const input = document.getElementById(`answer-${i}`);
    if (input) input.value = '';
    const parent = input.closest('.question');
    parent.classList.remove('correct', 'incorrect');

    const hintContainer = document.getElementById(`hint-btn-${i}`);
    if (hintContainer && hintContainer.tagName === 'SPAN') {
      hintContainer.outerHTML = `<button class='hint-btn' id='hint-btn-${i}' onclick='showHint(${i})'>Hint</button>`;
    }
  });
  updateScore(0, originalConversions.length);
}

function updateScore(correct, total) {
  document.getElementById('score').textContent = `Score: ${correct} / ${total}`;
}

function toggleReverse() {
  isReversed = !isReversed;
  generateQuestions();
}

generateQuestions();