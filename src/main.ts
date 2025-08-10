import "../style.css";

/** -------- Navigation (Screens) -------- */
type Screen = "home" | "game" | "help";

const scrHome = document.getElementById("home")!;
const scrGame = document.getElementById("game")!;
const scrHelp = document.getElementById("help")!;

function show(screen: Screen) {
  for (const el of [scrHome, scrGame, scrHelp]) el.classList.remove("active");
  (screen === "home" ? scrHome : screen === "game" ? scrGame : scrHelp).classList.add("active");
}

// Buttons
document.getElementById("btnStart")?.addEventListener("click", () => show("game"));
document.getElementById("btnHelp")?.addEventListener("click", () => show("help"));
document.getElementById("btnBackHome1")?.addEventListener("click", () => show("home"));
document.getElementById("btnBackHome2")?.addEventListener("click", () => show("home"));

/** -------- Spiel-Minilogik (wie zuvor) -------- */
function clamp(n: number) {
  if (Number.isNaN(n)) return 50;
  return Math.min(101, Math.max(0, Math.floor(n)));
}
function draw(): number {
  // Ganzzahl 0..101
  return Math.floor(Math.random() * 102);
}
function getGuess(): "over" | "under" {
  const el = document.querySelector('input[name="guess"]:checked') as HTMLInputElement | null;
  return el?.value === "under" ? "under" : "over";
}

const superInput = document.getElementById("super") as HTMLInputElement;
const resultEl = document.getElementById("result") as HTMLDivElement;
const drawBtn = document.getElementById("draw") as HTMLButtonElement;

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
      <div><span class="badge">Tipp</span>${tip}</div>
      <p class="ok">Treffer. Gegenspieler trinken 1 Schluck.</p>
    `;
  } else {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span><strong>${n}</strong></div>
      <div><span class="badge">Tipp</span>${tip}</div>
      <p class="bad">Falsch. Angreifer trinkt 1 Schluck (bleibt dran).</p>
    `;
  }
});
