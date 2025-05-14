const questionsData = [
  { from: "mm", to: "cm", q: 10, a: 1 },
  { from: "cm", to: "m", q: 100, a: 1 },
  { from: "m", to: "km", q: 1000, a: 1 },
  { from: "g", to: "kg", q: 1000, a: 1 },
  { from: "kg", to: "tonne", q: 1000, a: 1 },
  { from: "ml", to: "cl", q: 10, a: 1 },
  { from: "ml", to: "Litre", q: 1000, a: 1 },
  { from: "Litre", to: "m³", q: 1000, a: 1 },
  { from: "ml", to: "cm³", q: 1, a: 1 },
  { from: "inches", to: "foot", q: 12, a: 1 },
  { from: "feet", to: "yard", q: 3, a: 1 },
  { from: "yards", to: "mile", q: 1760, a: 1 },
  { from: "ounces", to: "pound", q: 16, a: 1 },
  { from: "pounds", to: "stone", q: 14, a: 1 },
  { from: "pounds", to: "tonne", q: 2240, a: 1 },
  { from: "pints", to: "gallon", q: 8, a: 1 },
  { from: "inch", to: "cm", q: 1, a: 2.5 },
  { from: "foot", to: "cm", q: 1, a: 30 },
  { from: "mile", to: "km", q: 1, a: 1.6 },
  { from: "miles", to: "km", q: 5, a: 8 },
  { from: "pound", to: "g", q: 1, a: 450 },
  { from: "pounds", to: "kg", q: 2.2, a: 1 },
  { from: "pint", to: "ml", q: 1, a: 570 },
  { from: "gallon", to: "Litre", q: 1, a: 4.5 },
  { from: "pints", to: "Litre", q: 1.75, a: 1 }
];

let reversed = false;

function renderQuestions() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  document.getElementById("mode-indicator").innerText = "Mode: " + (reversed ? "Reversed" : "Normal");

  questionsData.forEach((q, i) => {
    const inputId = `input-${i}`;
    const hintId = `hint-${i}`;
    const fromVal = reversed ? q.a : q.q;
    const fromUnit = reversed ? q.to : q.from;
    const toUnit = reversed ? q.from : q.to;
    const correctAnswer = reversed ? q.q : q.a;
    const hintText = `Hint: ${q.q} ${q.from} = ${q.a} ${q.to}`;

    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `
      <label>${fromVal} ${fromUnit} = 
        <input type="number" step="any" id="${inputId}" data-answer="${correctAnswer}" />
        ${toUnit}
      </label>
      <button class="hint-btn" id="${hintId}" onclick="showHint('${hintId}', '${hintText}')">Hint</button>
    `;
    container.appendChild(div);
  });

  updateScore(0, questionsData.length);
}

function checkAnswers() {
  let correct = 0;
  questionsData.forEach((_, i) => {
    const input = document.getElementById(`input-${i}`);
    const expected = parseFloat(input.dataset.answer);
    const userVal = parseFloat(input.value);
    const parent = input.closest('.question');
    parent.classList.remove("correct", "incorrect");

    if (!isNaN(userVal) && Math.abs(userVal - expected) < 0.01) {
      parent.classList.add("correct");
      correct++;
    } else {
      parent.classList.add("incorrect");
    }
  });
  updateScore(correct, questionsData.length);
}

function updateScore(correct, total) {
  document.getElementById("score").innerText = `Score: ${correct} / ${total}`;
}

function resetQuiz() {
  questionsData.forEach((_, i) => {
    const input = document.getElementById(`input-${i}`);
    const hint = document.getElementById(`hint-${i}`);
    if (input) {
      input.value = "";
      input.closest('.question').classList.remove("correct", "incorrect");
    }
    if (hint && hint.tagName !== "BUTTON") {
      const newHintBtn = document.createElement("button");
      newHintBtn.className = "hint-btn";
      newHintBtn.id = `hint-${i}`;
      newHintBtn.innerText = "Hint";
      newHintBtn.onclick = function () {
        showHint(`hint-${i}`, `Hint: ${questionsData[i].q} ${questionsData[i].from} = ${questionsData[i].a} ${questionsData[i].to}`);
      };
      hint.replaceWith(newHintBtn);
    }
  });
  updateScore(0, questionsData.length);
}

function toggleReverse() {
  reversed = !reversed;
  renderQuestions();
}

function showHint(id, text) {
  const hintBtn = document.getElementById(id);
  const span = document.createElement("span");
  span.innerText = text;
  span.id = id;
  hintBtn.replaceWith(span);
}

renderQuestions();