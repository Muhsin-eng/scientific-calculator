// Sélection des éléments
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const history = document.querySelector(".history");

let currentInput = "";
let historyLog = [];

// Fonction pour mettre à jour l'affichage
function updateDisplay(value) {
  display.value = value;
}

// Fonction principale pour gérer les boutons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      try {
        const result = eval(currentInput);
        updateDisplay(result);
        historyLog.unshift(currentInput + " = " + result);
        updateHistory();
        currentInput = result.toString(); // Pour permettre des calculs en chaîne
      } catch (error) {
        updateDisplay("Error");
        currentInput = "";
      }
    } else if (value === "AC") {
      currentInput = "";
      updateDisplay("");
    } else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

// Historique
function updateHistory() {
  history.innerHTML = historyLog.slice(0, 5).map(item => `<div>${item}</div>`).join("");
}
// Support du clavier physique
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    currentInput += key;
    updateDisplay(currentInput);
  } else if (key === "Enter") {
    try {
      const result = eval(currentInput);
      updateDisplay(result);
      historyLog.unshift(currentInput + " = " + result);
      updateHistory();
      currentInput = result.toString();
    } catch (error) {
      updateDisplay("Error");
      currentInput = "";
    }
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (key === "Escape") {
    currentInput = "";
    updateDisplay("");
  }
});
