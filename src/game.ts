import "../style.css";

function clamp(n: number) {
  if (Number.isNaN(n)) return 50;
  return Math.min(100, Math.max(0, Math.floor(n)));
}
function draw(): number {
  return Math.floor(Math.random() * 102); // 0..101
}

let guess: "over" | "under" = "under";

function setGuess(g: "over" | "under"){
  guess = g;
  if (g == "over"){
    overBtn.classList.add("active");
    underBtn.classList.remove("active");
  } else {
    underBtn.classList.add("active");
    overBtn.classList.remove("active");
  }
}

function getGuess(): "over" | "under" {
  return guess;
}

const superInput = document.getElementById("super") as HTMLInputElement;
const resultEl = document.getElementById("result") as HTMLDivElement;
const resultDialog = document.getElementById("result-dialog") as HTMLDialogElement;
const closeResultBtn = document.getElementById("close-result") as HTMLButtonElement;
const drawBtn = document.getElementById("draw") as HTMLButtonElement;
const overBtn = document.getElementById("range-over") as HTMLButtonElement;
const underBtn = document.getElementById("range-under") as HTMLButtonElement;
const superDisplay = document.getElementById("super-display") as HTMLDivElement;
const numBtns = Array.from(document.querySelectorAll<HTMLButtonElement>(".num-btn[data-num]"));
const clearBtn = document.getElementById("clear-super") as HTMLButtonElement;

function updateSuperDisplay(){
  if (!superDisplay) return;
  if (superInput.value){
    superDisplay.textContent = superInput.value;
    superDisplay.classList.add("filled");
  } else {
    superDisplay.textContent = "Superzahl eingeben";
    superDisplay.classList.remove("filled");
  }
}

function shakeSuper(){
  if (!superDisplay) return;
  superDisplay.classList.add("shake");
  setTimeout(() => superDisplay.classList.remove("shake"), 300);
}

updateSuperDisplay();

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const digit = btn.dataset.num ?? "";
    const current = superInput.value;

    if (current.length === 0){
      if (digit === "0"){
        shakeSuper();
        return;
      }
      superInput.value = digit;
    }else if (current.length === 1){
      superInput.value = current + digit;
    }else if (current.length === 2){
      if (current === "10" && digit === "0"){
        superInput.value = current + digit;
      }else{
        shakeSuper();
        return;
      }
    }else{
      return;
    }

    updateSuperDisplay();
  });
});

clearBtn?.addEventListener("click", () => {
  superInput.value = "";
  updateSuperDisplay();
});

overBtn?.addEventListener("click", () => setGuess("over"));
underBtn?.addEventListener("click", () => setGuess("under"));

closeResultBtn?.addEventListener("click", () => {
  resultDialog.close();
  drawBtn.focus();
});

setGuess("under");

drawBtn?.addEventListener("click", () => {
  const s = clamp(Number(superInput.value));
  const n = draw();
  const over = n >= 51;
  const inSuper = n >= Math.max(0, s - 2) && n <= Math.min(101, s + 2);
  const guess = getGuess();
  const correct = (guess === "over" && over) || (guess === "under" && !over);

  const actualRange = over ? "drüber" : "drunter";
  const guessText = guess === "over" ? "drüber" : "drunter";
  const lines = `
      <h3 class="result-heading">Auswertung</h3>
      <pre class="result-line">Ergebnis&#9&#9&#9${n}</pre>
      <pre class="result-line">Bereich&#9&#9&#9${actualRange}</pre>
      <pre class="result-line">Dein Tipp&#9&#9${guessText}</pre>
      <pre class="result-line">Deine Superzahl&#9&#9&#9${s}</pre>
    `;

  if (inSuper) {
    resultEl.innerHTML = `
      ${lines}
      <p class="super">EX EX EX leert eure Gläser</p>
    `;
  } else if (correct) {
    resultEl.innerHTML = `
      ${lines}
      <p class="ok">korrekter Bereich, ein Schluck für die Verlierer</p>
    `;
  } else {
    resultEl.innerHTML = `
      ${lines}
      <p class="bad">das war nichts, trink selbst</p>
    `;
  }

  resultDialog.showModal();
});
