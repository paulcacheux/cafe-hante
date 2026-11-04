"use strict";

/* =========================================================
 *  À PERSONNALISER
 * ========================================================= */
const CONFIG = {
  herName: "Mon amour",          // son prénom ou petit surnom
  fromName: "Ton bébé",         // ta signature
  age: 31,
  customersPerShift: 8,
  // La boisson préférée qu'elle prépare pour le dernier client
  favoriteRecipe: ["espresso", "pumpkin", "maple", "oat", "foam", "cinnamon"],
  finalMessage:
    "Joyeux anniversaire ! Que cette nouvelle année soit douce comme un latte à l'avoine, " +
    "chaleureuse comme un pull tricoté main, et un tout petit peu ensorcelée. 🎃",
};

/* =========================================================
 *  Données du jeu
 * ========================================================= */
const INGREDIENTS = {
  espresso:  { label: "Espresso",      emoji: "☕", color: "#3b2416" },
  oat:       { label: "Lait d'avoine", emoji: "🌾", color: "#efe0c4" },
  foam:      { label: "Mousse",        emoji: "☁️", color: "#fffaf0" },
  pumpkin:   { label: "Citrouille",    emoji: "🎃", color: "#e8792b" },
  cinnamon:  { label: "Cannelle",      emoji: "🍂", color: "#9c4f22", sprinkle: true },
  chocolate: { label: "Chocolat",      emoji: "🍫", color: "#5b3420" },
  maple:     { label: "Érable",        emoji: "🍁", color: "#c8812f" },
  chai:      { label: "Chaï",          emoji: "🫖", color: "#b98a5e" },
};
const ING_KEYS = Object.keys(INGREDIENTS);

const DRINKS = [
  { name: "Double espresso",          tier: 0, recipe: ["espresso", "espresso"] },
  { name: "Latte à l'avoine",         tier: 0, recipe: ["espresso", "oat", "foam"] },
  { name: "Chocolat chaud",           tier: 0, recipe: ["chocolate", "oat", "foam"] },
  { name: "Chaï latte",               tier: 1, recipe: ["chai", "oat", "foam", "cinnamon"] },
  { name: "Mocha",                    tier: 1, recipe: ["espresso", "chocolate", "oat", "foam"] },
  { name: "Latte érable",             tier: 1, recipe: ["espresso", "maple", "oat", "foam"] },
  { name: "Pumpkin Spice Latte",      tier: 2, recipe: ["espresso", "pumpkin", "oat", "foam", "cinnamon"] },
  { name: "Potion de la sorcière",    tier: 2, recipe: ["chai", "pumpkin", "maple", "oat", "foam", "cinnamon"] },
  { name: "Mocha citrouille",         tier: 2, recipe: ["espresso", "chocolate", "pumpkin", "oat", "foam"] },
];

const CUSTOMERS = [
  { emoji: "👻", name: "Gaspard le fantôme", hello: "B-bonsoir… Je pourrais avoir…",
    thanks: "Merci ! Je me sens moins transparent.", angry: "Bon… je repasse à travers le mur." },
  { emoji: "🧙‍♀️", name: "Mélusine la sorcière", hello: "Il me faut de quoi tenir jusqu'au sabbat :",
    thanks: "Exquis ! Mieux que toutes mes potions.", angry: "Pfff, je vais me la faire moi-même." },
  { emoji: "🧛", name: "Comte Vladimir", hello: "Rien de rouge ce soir, merci. Plutôt…",
    thanks: "Divin. Et 100 % végétal, parfait !", angry: "Le soleil va bientôt se lever, tant pis…" },
  { emoji: "🎃", name: "Jack la citrouille", hello: "Salut ! Ce soir j'ai envie d'un…",
    thanks: "Ça me redonne des couleurs !", angry: "Je suis tout ratatiné d'attendre…" },
  { emoji: "🦇", name: "Bérénice la chauve-souris", hello: "Vite, vite, avant l'aube :",
    thanks: "Merci ! Je vole à nouveau droit.", angry: "Je repars la tête en bas…" },
  { emoji: "🐈‍⬛", name: "Minuit le chat noir", hello: "Miaou. (Traduction :)",
    thanks: "Rrrrrr… (ronronnement satisfait)", angry: "Miaou ! (il est vexé)" },
  { emoji: "💀", name: "Oscar le squelette", hello: "Il me faut du calcium… végétal, bien sûr :",
    thanks: "Ça me réchauffe jusqu'aux os !", angry: "Je n'ai plus que la peau sur les os… enfin, les os." },
  { emoji: "🧟‍♀️", name: "Zoé la zombie", hello: "Cerveaaaau… euh, pardon, je voulais dire :",
    thanks: "Mmmh ! Je me sens presque vivante.", angry: "Grrrr… je repasserai demain." },
  { emoji: "🕷️", name: "Arachné l'araignée", hello: "J'ai tricoté toute la nuit, il me faut un…",
    thanks: "Je te tricoterai un pull à huit manches !", angry: "Je retourne à mes pelotes…" },
  { emoji: "🦉", name: "Hulotte la chouette", hello: "Hou hou… Une longue nuit m'attend :",
    thanks: "Parfait pour veiller jusqu'au matin !", angry: "Hou… je vais voir ailleurs." },
];

// Commandes spéciales à tricoter (aux positions KNIT_SLOTS de la file)
const KNIT_SLOTS = [2, 5];
const KNIT_ITEMS = [
  { name: "Une écharpe", emoji: "🧣", rows: 8, width: 72, colors: ["#ff8c42", "#fff4e3"],
    ask: "Brrr… Il fait si froid ce soir. Tu pourrais me tricoter une écharpe ?",
    thanks: "Elle est magnifique ! Je ne la quitte plus." },
  { name: "Des mitaines", emoji: "🧤", rows: 6, width: 130, colors: ["#b07cff", "#ffc4dc"],
    ask: "J'ai les doigts gelés… Tu me tricoterais des mitaines ?",
    thanks: "Toutes douces ! Mes doigts te disent merci." },
  { name: "Des chaussettes", emoji: "🧦", rows: 7, width: 100, colors: ["#ff9ecd", "#fff4e3", "#ff8c42"],
    ask: "On m'a dit que tu tricotais des chaussettes de rêve…",
    thanks: "Parfaites pour hanter le grenier au chaud !" },
];

const FINAL_CUSTOMER = {
  emoji: "🕵️", name: "Un mystérieux inconnu",
  hello: "Je sais qu'il est tard… Une dernière boisson, s'il te plaît :",
  thanks: "Elle n'est pas pour moi… Elle est pour toi. 💜",
};

/* =========================================================
 *  Utilitaires
 * ========================================================= */
const $ = (sel) => document.querySelector(sel);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const restartAnim = (el, cls) => {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
};

function show(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
}

/* =========================================================
 *  Son (petits bips WebAudio, aucun fichier)
 * ========================================================= */
let audioCtx = null;
function tone(freq, dur = 0.12, type = "sine", vol = 0.12, delay = 0) {
  if (state.muted) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t = audioCtx.currentTime + delay;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start(t);
    o.stop(t + dur);
  } catch { /* pas de son, pas grave */ }
}
const sfx = {
  tap: () => tone(520 + Math.random() * 140, 0.08, "triangle"),
  wrong: () => tone(150, 0.2, "square", 0.06),
  serve: () => [660, 880, 1100].forEach((f, i) => tone(f, 0.15, "triangle", 0.1, i * 0.08)),
  sad: () => [392, 294].forEach((f, i) => tone(f, 0.3, "sine", 0.1, i * 0.18)),
  bell: () => { tone(1320, 0.5, "sine", 0.08); tone(1760, 0.4, "sine", 0.05, 0.05); },
  blow: () => tone(200, 0.4, "sawtooth", 0.03),
  fanfare: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.25, "triangle", 0.1, i * 0.15)),
};

/* =========================================================
 *  État
 * ========================================================= */
const state = {
  queue: [], knitItems: [], index: 0, tips: 0, served: 0,
  current: null, muted: false, raf: 0, lastT: 0,
};

/* =========================================================
 *  Décor
 * ========================================================= */
function buildSky() {
  const sky = $("#sky");
  for (let i = 0; i < 40; i++) {
    const s = document.createElement("div");
    s.className = "star";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 60 + "%";
    s.style.animationDelay = Math.random() * 3 + "s";
    sky.appendChild(s);
  }
  ["🦇", "🦇", "👻", "🦇"].forEach((emoji, i) => {
    const f = document.createElement("div");
    f.className = "floaty";
    f.textContent = emoji;
    f.style.top = 5 + Math.random() * 40 + "%";
    f.style.fontSize = 18 + Math.random() * 16 + "px";
    f.style.animationDuration = 18 + Math.random() * 14 + "s";
    f.style.animationDelay = -i * 6 + "s";
    sky.appendChild(f);
  });
}

function confetti(n = 70) {
  const box = $("#confetti");
  const bits = ["🎉", "💜", "🧡", "🍂", "☕", "✨", "🧶", "🎃", "🎂"];
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span");
    c.className = "confetto";
    c.textContent = pick(bits);
    c.style.left = Math.random() * 100 + "vw";
    c.style.fontSize = 16 + Math.random() * 18 + "px";
    c.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    box.appendChild(c);
    setTimeout(() => c.remove(), 6000);
  }
}

/* =========================================================
 *  Comptoir
 * ========================================================= */
function buildPantry() {
  const pantry = $("#pantry");
  ING_KEYS.forEach((key, i) => {
    const ing = INGREDIENTS[key];
    const b = document.createElement("button");
    b.className = "ing";
    b.dataset.key = key;
    b.innerHTML = `<kbd>${i + 1}</kbd><span class="ing-emoji">${ing.emoji}</span><span class="ing-label">${ing.label}</span>`;
    b.addEventListener("click", () => addIngredient(key));
    pantry.appendChild(b);
  });
}

function flashButton(key, cls) {
  const b = document.querySelector(`.ing[data-key="${key}"]`);
  restartAnim(b, cls);
  setTimeout(() => b.classList.remove(cls), 300);
}

function resetCup() {
  $("#liquid").innerHTML = "";
  $("#cup").classList.remove("served");
}

function addLayer(key) {
  const ing = INGREDIENTS[key];
  const layer = document.createElement("div");
  layer.className = "layer" + (ing.sprinkle ? " sprinkle" : "") + (key === "foam" ? " foam" : "");
  layer.style.setProperty("--c", ing.color);
  $("#liquid").appendChild(layer);
}

function renderRecipe() {
  const c = state.current;
  $("#recipe").innerHTML = c.drink.recipe
    .map((key, i) => {
      const cls = i < c.step ? "done" : i === c.step ? "next" : "";
      return `<span class="chip ${cls}" title="${INGREDIENTS[key].label}">${INGREDIENTS[key].emoji}</span>`;
    })
    .join("");
}

function updateHud() {
  const n = state.queue.length;
  $("#hud-count").textContent = state.current?.finale
    ? "Après la fermeture…"
    : `Client ${Math.min(state.index + 1, n)}/${n}`;
  $("#hud-tips").textContent = `🪙 ${state.tips}`;
}

function updatePatience() {
  const c = state.current;
  const r = Math.max(0, c.patience / c.maxPatience);
  const fill = $("#patience-fill");
  fill.style.width = r * 100 + "%";
  fill.style.setProperty("--fill", r > 0.5 ? "#7be495" : r > 0.25 ? "#ffc857" : "#ff6b6b");
}

/* =========================================================
 *  Déroulement d'une partie
 * ========================================================= */
function startGame() {
  state.queue = shuffle([...CUSTOMERS]).slice(0, CONFIG.customersPerShift);
  state.index = 0;
  state.tips = 0;
  state.served = 0;
  state.current = null;
  state.knitItems = shuffle([...KNIT_ITEMS]);
  cancelAnimationFrame(state.raf);
  // Comptoir vide en attendant le premier client (utile quand on rejoue)
  resetCup();
  $("#customer").textContent = "";
  $("#bubble").classList.remove("show");
  $("#gift").classList.remove("show");
  $("#patience").style.visibility = "hidden";
  $("#serve").disabled = true;
  $("#screen-game").classList.remove("knitting");
  show("screen-game");
  updateHud();
  setTimeout(nextCustomer, 400);
}

function pickDrink(i) {
  const n = state.queue.length;
  const maxTier = i < n * 0.35 ? 0 : i < n * 0.7 ? 1 : 2;
  const pool = DRINKS.filter((d) => d.tier <= maxTier);
  const hardest = pool.filter((d) => d.tier === maxTier);
  return Math.random() < 0.65 ? pick(hardest) : pick(pool);
}

function nextCustomer() {
  if (state.index >= state.queue.length) return endShift();
  const knitSlot = KNIT_SLOTS.indexOf(state.index);
  if (knitSlot >= 0) return beginKnit(state.queue[state.index], state.knitItems[knitSlot % state.knitItems.length]);
  const drink = pickDrink(state.index);
  const patience = 10 + drink.recipe.length * 3 - state.index * 0.6;
  beginOrder(state.queue[state.index], drink, patience, false);
}

function beginOrder(customer, drink, maxPatience, finale) {
  state.current = { customer, drink, step: 0, patience: maxPatience, maxPatience, finale, mistakes: 0, done: false };
  updateHud();
  resetCup();
  $("#screen-game").classList.remove("knitting");
  customerEnters(customer, customer.hello);
  $("#bubble-drink").textContent = drink.name;
  renderRecipe();
  $("#recipe").style.display = "";

  $("#patience").style.visibility = finale ? "hidden" : "visible";
  $("#serve").disabled = true;

  if (!finale) {
    updatePatience();
    startTimer();
  }
}

function customerEnters(customer, line) {
  const el = $("#customer");
  el.textContent = customer.emoji;
  el.className = "customer";
  restartAnim(el, "enter");
  $("#gift").className = "gift";
  $("#bubble-name").textContent = customer.name;
  $("#bubble-text").textContent = line;
  setTimeout(() => $("#bubble").classList.add("show"), 250);
  sfx.bell();
}

/* =========================================================
 *  Tricot : l'aiguille fait des allers-retours,
 *  il faut toucher quand elle est dans la zone verte.
 * ========================================================= */
function beginKnit(customer, item) {
  state.current = { customer, item, knit: true, row: 0, misses: 0, perfects: 0, x: 0, dir: 1, done: false };
  updateHud();
  $("#screen-game").classList.add("knitting");
  customerEnters(customer, item.ask);
  $("#bubble-drink").textContent = `${item.emoji} ${item.name}`;
  $("#recipe").style.display = "none";
  $("#patience").style.visibility = "hidden";

  const work = $("#knit-item");
  work.innerHTML = "";
  work.style.setProperty("--w", item.width + "px");
  setKnitFeedback(`Touche quand la pelote est dans le vert ! (0/${item.rows})`, "");
  newKnitZone();
  startKnitLoop();
}

function newKnitZone() {
  const c = state.current;
  const progress = c.row / c.item.rows;
  c.zoneW = 0.3 - progress * 0.13;
  c.zoneC = c.zoneW / 2 + Math.random() * (1 - c.zoneW);
  c.speed = 0.75 + progress * 0.65 + state.index * 0.03;
  const zone = $("#knit-zone");
  zone.style.left = `calc(22px + ${c.zoneC - c.zoneW / 2} * (100% - 44px))`;
  zone.style.width = `calc(${c.zoneW} * (100% - 44px))`;
}

function startKnitLoop() {
  cancelAnimationFrame(state.raf);
  state.lastT = performance.now();
  const cursor = $("#knit-cursor");
  const loop = (t) => {
    const c = state.current;
    if (!c || !c.knit || c.done) return;
    const dt = Math.min(0.05, (t - state.lastT) / 1000);
    state.lastT = t;
    c.x += c.dir * c.speed * dt;
    if (c.x >= 1) { c.x = 1; c.dir = -1; }
    if (c.x <= 0) { c.x = 0; c.dir = 1; }
    cursor.style.left = `calc(22px + ${c.x} * (100% - 44px))`;
    state.raf = requestAnimationFrame(loop);
  };
  state.raf = requestAnimationFrame(loop);
}

function setKnitFeedback(text, cls) {
  const fb = $("#knit-feedback");
  fb.textContent = text;
  fb.className = "knit-feedback " + cls;
}

function knitTap() {
  const c = state.current;
  if (!c || !c.knit || c.done) return;
  const dist = Math.abs(c.x - c.zoneC);

  if (dist > c.zoneW / 2) {
    c.misses++;
    sfx.wrong();
    restartAnim($("#knit-item"), "shake");
    setKnitFeedback("Oups, une maille filée !", "bad");
    return;
  }

  const perfect = dist <= c.zoneW / 5;
  if (perfect) c.perfects++;
  c.row++;
  tone(440 + c.row * 60, 0.1, "triangle");
  const row = document.createElement("div");
  row.className = "knit-row";
  row.style.setProperty("--c", c.item.colors[Math.floor((c.row - 1) / 2) % c.item.colors.length]);
  $("#knit-item").appendChild(row);
  setKnitFeedback(`${perfect ? "Parfait ! ✨" : "Joli !"} (${c.row}/${c.item.rows})`, perfect ? "perfect" : "good");

  if (c.row >= c.item.rows) finishKnit();
  else newKnitZone();
}

function finishKnit() {
  const c = state.current;
  c.done = true;
  cancelAnimationFrame(state.raf);
  sfx.serve();
  setKnitFeedback("Terminé ! 🧶", "perfect");

  $("#bubble-text").textContent = c.item.thanks;
  $("#bubble-drink").textContent = "";
  $("#customer").className = "customer happy";
  const gift = $("#gift");
  gift.textContent = c.item.emoji;
  gift.classList.add("show");

  const tip = Math.max(2, 4 + c.perfects - c.misses);
  state.tips += tip;
  state.served++;
  updateHud();
  const ft = $("#float-text");
  ft.textContent = `+${tip} 🪙`;
  restartAnim(ft, "go");

  setTimeout(leave, 2200);
}

function startTimer() {
  cancelAnimationFrame(state.raf);
  state.lastT = performance.now();
  const loop = (t) => {
    const c = state.current;
    if (!c || c.done) return;
    const dt = Math.min(0.1, (t - state.lastT) / 1000);
    state.lastT = t;
    c.patience -= dt;
    updatePatience();
    if (c.patience <= 0) return customerGivesUp();
    state.raf = requestAnimationFrame(loop);
  };
  state.raf = requestAnimationFrame(loop);
}

function addIngredient(key) {
  const c = state.current;
  if (!c || c.done || c.step >= c.drink.recipe.length) return;

  if (key !== c.drink.recipe[c.step]) {
    sfx.wrong();
    restartAnim($("#cup"), "shake");
    flashButton(key, "bad");
    c.mistakes++;
    if (!c.finale) c.patience = Math.max(0.01, c.patience - 1.5);
    return;
  }

  sfx.tap();
  flashButton(key, "good");
  addLayer(key);
  c.step++;
  renderRecipe();
  if (c.step === c.drink.recipe.length) $("#serve").disabled = false;
}

function serve() {
  const c = state.current;
  if (!c || c.done || c.step < c.drink.recipe.length) return;
  c.done = true;
  cancelAnimationFrame(state.raf);
  $("#serve").disabled = true;

  sfx.serve();
  $("#cup").classList.add("served");
  $("#bubble-text").textContent = c.customer.thanks;
  $("#bubble-drink").textContent = "";
  $("#recipe").style.display = "none";
  $("#customer").className = "customer happy";

  if (c.finale) {
    setTimeout(startBirthday, 3200);
    return;
  }

  const speed = c.patience / c.maxPatience;
  const tip = Math.max(1, c.drink.recipe.length + Math.round(speed * 3) - c.mistakes);
  state.tips += tip;
  state.served++;
  updateHud();
  const ft = $("#float-text");
  ft.textContent = `+${tip} 🪙`;
  restartAnim(ft, "go");

  setTimeout(leave, 1700);
}

function customerGivesUp() {
  const c = state.current;
  c.done = true;
  sfx.sad();
  $("#bubble-text").textContent = c.customer.angry;
  $("#bubble-drink").textContent = "";
  $("#recipe").style.display = "none";
  $("#customer").className = "customer sad";
  setTimeout(leave, 1700);
}

function leave() {
  $("#bubble").classList.remove("show");
  $("#gift").classList.remove("show");
  $("#customer").className = "customer exit";
  setTimeout(() => {
    state.index++;
    nextCustomer();
  }, 600);
}

/* =========================================================
 *  Fin de service & finale
 * ========================================================= */
function message({ emoji, title, text, button, onNext }) {
  $("#msg-emoji").textContent = emoji;
  $("#msg-title").textContent = title;
  $("#msg-text").innerHTML = text;
  const b = $("#msg-btn");
  b.textContent = button;
  b.onclick = () => { sfx.tap(); onNext(); };
  show("screen-msg");
}

function endShift() {
  state.current = null;
  const n = state.queue.length;
  const verdict =
    state.served === n ? "Barista légendaire ! ✨"
    : state.served >= n - 2 ? "Super service, les fantômes sont ravis !"
    : "Les fantômes reviendront quand même, promis. 👻";

  message({
    emoji: "🕯️",
    title: "Le café ferme…",
    text: `Tu as servi <b>${state.served}/${n}</b> clients et gagné <b>${state.tips} 🪙</b> de pourboires.<br>${verdict}`,
    button: "Éteindre les lumières",
    onNext: () =>
      message({
        emoji: "🚪",
        title: "Toc, toc…",
        text: "Quelqu'un frappe à la porte.<br>Un dernier client ?",
        button: "Ouvrir",
        onNext: startFinale,
      }),
  });
}

function startFinale() {
  show("screen-game");
  const drink = { name: `Le préféré de ${CONFIG.herName}`, recipe: CONFIG.favoriteRecipe };
  beginOrder(FINAL_CUSTOMER, drink, Infinity, true);
}

function startBirthday() {
  $("#bubble").classList.remove("show");
  const candles = $("#candles");
  candles.innerHTML = "";
  for (let i = 0; i < CONFIG.age; i++) {
    const c = document.createElement("div");
    c.className = "candle";
    c.style.animationDelay = Math.random() * 0.3 + "s";
    candles.appendChild(c);
  }
  $("#bday-title").textContent = "Fais un vœu…";
  $("#bday-text").textContent = "puis touche le gâteau pour souffler les bougies";
  $("#bday-next").classList.add("hidden");
  $("#cake").onclick = blowCandles;
  show("screen-birthday");
}

function blowCandles() {
  $("#cake").onclick = null;
  sfx.blow();
  const candles = [...document.querySelectorAll(".candle")];
  shuffle(candles).forEach((c, i) => setTimeout(() => c.classList.add("out"), i * 35));

  setTimeout(() => {
    sfx.fanfare();
    confetti();
    $("#bday-title").textContent = `Joyeux anniversaire, ${CONFIG.herName} !`;
    $("#bday-text").textContent = `${CONFIG.age} ans, et toujours la plus jolie sorcière du café. 🧡`;
    $("#bday-next").classList.remove("hidden");
  }, candles.length * 35 + 300);
}

function showFinal() {
  $("#final-text").textContent = CONFIG.finalMessage;
  $("#final-sign").textContent = `${CONFIG.fromName} 💜`;
  show("screen-final");
  confetti(40);
}

/* =========================================================
 *  Initialisation
 * ========================================================= */
function init() {
  buildSky();
  buildPantry();
  $("#dedication").textContent = `Pour ${CONFIG.herName} 🧡`;

  $("#start").addEventListener("click", () => { sfx.tap(); startGame(); });
  $("#serve").addEventListener("click", serve);
  $("#bday-next").addEventListener("click", () => { sfx.tap(); showFinal(); });
  $("#replay").addEventListener("click", () => { sfx.tap(); startGame(); });
  $("#mute").addEventListener("click", () => {
    state.muted = !state.muted;
    $("#mute").textContent = state.muted ? "🔇" : "🔊";
  });

  $("#knit-btn").addEventListener("pointerdown", (e) => { e.preventDefault(); knitTap(); });
  $("#knit-meter").addEventListener("pointerdown", knitTap);

  document.addEventListener("keydown", (e) => {
    if (!$("#screen-game").classList.contains("active")) return;
    if (state.current?.knit) {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!e.repeat) knitTap(); }
      return;
    }
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= ING_KEYS.length) addIngredient(ING_KEYS[n - 1]);
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      serve();
    }
  });
}

init();
