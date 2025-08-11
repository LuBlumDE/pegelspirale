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

  const tip = guess === "over" ? "Drüber (≥51)" : "Drunter (≤50)";
  const range = `${Math.max(0, s - 2)}–${Math.min(101, s + 2)}`;

  if (inSuper) {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span><strong>${n}</strong></div>
      <div><span class="badge">Super</span>Bereich ${range}</div>
      <p class="super"><strong>SUPER!</strong> Gegenspieler exen.</p>
    `;
  } else if (correct) {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span><strong>${n}</strong></div>
      <div><span class="badge">Bereich</span>${tip}</div>
      <p class="ok">Treffer. Gegenspieler trinken 1 Schluck.</p>
    `;
  } else {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span><strong>${n}</strong></div>
      <div><span class="badge">Bereich</span>${tip}</div>
      <p class="bad">Falsch. Angreifer trinkt 1 Schluck (bleibt dran).</p>
    `;
  }

  resultDialog.showModal();
});
