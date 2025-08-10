import "../style.css";
import { clampSuper, drawNumber, evaluate } from "./game";
import type { Guess } from "./types";

/** --- State --- */
let players: string[] = [];
let attackerIdx = 0;
let round = 1;

/** --- DOM --- */
const setup = document.getElementById("setup") as HTMLElement;
const game = document.getElementById("game") as HTMLElement;

const playerInput = document.getElementById("playerInput") as HTMLInputElement;
const addPlayerBtn = document.getElementById("addPlayer") as HTMLButtonElement;
const playersUl = document.getElementById("players") as HTMLUListElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;

const attackerNameEl = document.getElementById("attackerName") as HTMLElement;
const roundCounterEl = document.getElementById("roundCounter") as HTMLElement;
const opponentList = document.getElementById("opponentList") as HTMLUListElement;

const superEl = document.getElementById("super") as HTMLInputElement;
const drawBtn = document.getElementById("draw") as HTMLButtonElement;
const resultEl = document.getElementById("result") as HTMLDivElement;
const resetAllBtn = document.getElementById("resetAll") as HTMLButtonElement;

/** --- Helpers --- */
function getGuess(): Guess {
  const el = document.querySelector('input[name="guess"]:checked') as HTMLInputElement;
  return (el?.value === "under" ? "under" : "over");
}
function getSuper(): number {
  return clampSuper(Number(superEl.value));
}
function renderPlayersSetup() {
  playersUl.innerHTML = "";
  players.forEach((name, idx) => {
    const li = document.createElement("li");
    li.className = "pill";
    li.innerHTML = `
      <span>${name}</span>
      <button class="x" data-idx="${idx}" title="entfernen">×</button>
    `;
    playersUl.appendChild(li);
  });
  startBtn.disabled = players.length < 2;
}
function setAttackerUI() {
  const name = players[attackerIdx] ?? "–";
  attackerNameEl.textContent = name;
  roundCounterEl.textContent = String(round);

  // Opponentenliste neu aufbauen (alle außer Angreifer)
  opponentList.innerHTML = "";
  players.forEach((p, i) => {
    if (i === attackerIdx) return;
    const li = document.createElement("li");
    li.className = "pill";
    li.dataset.player = p;
    li.textContent = p;
    opponentList.appendChild(li);
  });
}
function selectedOpponents(): string[] {
  return Array.from(opponentList.querySelectorAll(".pill.active"))
    .map(el => (el as HTMLElement).dataset.player!)
    .filter(Boolean);
}
function selectToggle(e: Event) {
  const target = e.target as HTMLElement;
  const pill = target.closest(".pill") as HTMLElement | null;
  if (!pill) return;
  pill.classList.toggle("active");
}

/** --- Setup Events --- */
addPlayerBtn.addEventListener("click", () => {
  const name = (playerInput.value || "").trim();
  if (!name) return;
  if (players.includes(name)) return;
  players.push(name);
  playerInput.value = "";
  playerInput.focus();
  renderPlayersSetup();
});
playerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addPlayerBtn.click();
});
playersUl.addEventListener("click", (e) => {
  const btn = (e.target as HTMLElement).closest("button.x") as HTMLButtonElement | null;
  if (!btn) return;
  const idx = Number(btn.dataset.idx);
  players.splice(idx, 1);
  renderPlayersSetup();
});
startBtn.addEventListener("click", () => {
  if (players.length < 2) return;
  attackerIdx = 0;
  round = 1;
  setup.classList.remove("active");
  game.classList.add("active");
  setAttackerUI();
});

/** --- Game Events --- */
opponentList.addEventListener("click", selectToggle);

drawBtn.addEventListener("click", () => {
  const opps = selectedOpponents();
  if (opps.length === 0) {
    resultEl.innerHTML = `<p class="bad">Bitte mind. einen Gegenspieler wählen.</p>`;
    return;
  }

  const guess = getGuess();
  const s = getSuper();
  const n = drawNumber();
  const outcome = evaluate({ guess, superNumber: s }, n);

  const tip = guess === "over" ? "Drüber (≥51)" : "Drunter (≤50)";
  const range = `${Math.max(0, s - 2)}–${Math.min(101, s + 2)}`;
  const attacker = players[attackerIdx];

  if (outcome.kind === "super") {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span> <strong>${outcome.n}</strong></div>
      <div><span class="badge">Super</span> Bereich ${range}</div>
      <p class="super"><strong>SUPER!</strong> ${opps.join(", ")} trinken <strong>komplett</strong> aus.</p>
      <p>Nächster Zug: wechselt.</p>
    `;
    // Zug wechselt
    attackerIdx = (attackerIdx + 1) % players.length;
    if (attackerIdx === 0) round++;
  } else if (outcome.kind === "correct") {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span> <strong>${outcome.n}</strong></div>
      <div><span class="badge">Tipp</span> ${tip}</div>
      <p class="ok">Treffer. ${opps.join(", ")} trinken <strong>1 Schluck</strong>.</p>
      <p>Nächster Zug: wechselt.</p>
    `;
    // Zug wechselt
    attackerIdx = (attackerIdx + 1) % players.length;
    if (attackerIdx === 0) round++;
  } else {
    resultEl.innerHTML = `
      <div><span class="badge">Zahl</span> <strong>${outcome.n}</strong></div>
      <div><span class="badge">Tipp</span> ${tip}</div>
      <p class="bad">Falsch. ${attacker} trinkt <strong>1 Schluck</strong>.</p>
      <p>Nächster Zug: <strong>${attacker}</strong> bleibt dran.</p>
    `;
    // Angreifer bleibt
  }

  // Nach jeder Runde UI aktualisieren
  setAttackerUI();
});

resetAllBtn.addEventListener("click", () => {
  players = [];
  attackerIdx = 0;
  round = 1;
  // Reset UI
  playerInput.value = "";
  playersUl.innerHTML = "";
  resultEl.innerHTML = "";
  (document.querySelector('input[name="guess"][value="over"]') as HTMLInputElement).checked = true;
  superEl.value = "50";
  game.classList.remove("active");
  setup.classList.add("active");
});
