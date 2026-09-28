// Animated mockups for the services section (components/ServiceVisual.astro). Only the open
// service's figure runs, and only while the box is on screen; each figure loops its own story.

const STOP = Symbol("stop");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** One playback of a figure: every wait rejects once stopped, which unwinds the async story */
class Run {
  alive = true;
  private timers: number[] = [];

  wait(ms: number) {
    return new Promise<void>((resolve, reject) => {
      if (!this.alive) return reject(STOP);
      this.timers.push(window.setTimeout(() => (this.alive ? resolve() : reject(STOP)), ms));
    });
  }

  stop() {
    this.alive = false;
    this.timers.forEach(clearTimeout);
  }
}

const box = document.querySelector<HTMLElement>("[data-service-visual]")!;
const stage = box.querySelector<HTMLElement>("[data-stage]")!;
const panels = [...stage.querySelectorAll<HTMLElement>("[data-visual]")];
let scale = 1;

// Scale the fixed 530px stage to the box
new ResizeObserver(() => {
  scale = box.clientWidth / 530;
  stage.style.transform = `scale(${scale})`;
}).observe(box);

const $ = <T extends Element = HTMLElement>(root: Element, sel: string) => root.querySelector(sel) as T;
const $$ = <T extends Element = HTMLElement>(root: Element, sel: string) => [...root.querySelectorAll(sel)] as T[];

// ---- shared helpers -------------------------------------------------------------------------------

/** Moves the panel's fake cursor over `target` (coordinates are in unscaled stage pixels) */
async function point(run: Run, panel: HTMLElement, target: Element, ms = 700, fx = 0.6, fy = 0.55) {
  const cursor = $<SVGElement>(panel, "[data-cursor]");
  const pr = panel.getBoundingClientRect();
  const tr = target.getBoundingClientRect();
  const x = (tr.left - pr.left + tr.width * fx) / scale;
  const y = (tr.top - pr.top + tr.height * fy) / scale;
  cursor.style.transition = `transform ${ms}ms cubic-bezier(0.45,0,0.2,1), opacity 250ms`;
  cursor.style.opacity = "1";
  cursor.style.transform = `translate(${x}px, ${y}px)`;
  await run.wait(ms + 60);
}

async function click(run: Run, panel: HTMLElement, target?: HTMLElement) {
  const cursor = $<SVGElement>(panel, "[data-cursor]");
  const base = cursor.style.transform.replace(/ scale\([^)]*\)/, "");
  cursor.style.transition = "transform 90ms";
  cursor.style.transform = `${base} scale(0.8)`;
  if (target) target.style.transform = "scale(0.96)";
  await run.wait(110);
  cursor.style.transform = base;
  if (target) target.style.transform = "";
  await run.wait(120);
}

function hideCursor(panel: HTMLElement) {
  const cursor = panel.querySelector<SVGElement>("[data-cursor]");
  if (cursor) cursor.style.opacity = "0";
}

async function type(run: Run, el: HTMLElement, text: string, ms = 55) {
  for (let i = 1; i <= text.length; i++) {
    el.textContent = text.slice(0, i);
    await run.wait(ms);
  }
}

async function erase(run: Run, el: HTMLElement, ms = 22) {
  const text = el.textContent ?? "";
  for (let i = text.length - 1; i >= 0; i--) {
    el.textContent = text.slice(0, i);
    await run.wait(ms);
  }
}

async function count(run: Run, el: HTMLElement, from: number, to: number, ms: number, fmt = (n: number) => String(n)) {
  const steps = Math.max(1, Math.min(Math.abs(to - from), 30));
  for (let s = 1; s <= steps; s++) {
    el.textContent = fmt(Math.round(from + ((to - from) * s) / steps));
    await run.wait(ms / steps);
  }
}

const peso = (n: number) => "$ " + n.toLocaleString("es-AR");

// ---- 01 Sitio institucional ---------------------------------------------------------------------

const HEADLINES = [
  "Soluciones que hacen crecer tu empresa",
  "Tu marca, clara y profesional",
  "Todo lo que hacés, bien contado",
];
let headline = 0;

async function institucional(run: Run, p: HTMLElement) {
  const page = $(p, "[data-page]");
  const phonePage = $(p, "[data-phone-page]");
  const phone = $(p, "[data-phone]");
  const serp = $(p, "[data-serp]");
  const rank = $(p, "[data-rank]");
  const result = $(p, "[data-result]");
  const title = $(p, "[data-headline]");
  const caret = $(p, "[data-caret]");
  const phoneTitle = $(p, "[data-phone-headline]");
  const edit = $(p, "[data-edit]");

  for (;;) {
    hideCursor(p);
    caret.classList.add("hidden");
    edit.style.opacity = "0";
    page.style.transform = phonePage.style.transform = "";
    phone.style.cssText = "opacity:0; transform:translateY(24px)";
    serp.style.cssText = "opacity:0; transform:translateY(16px)";
    rank.textContent = "#14";
    result.classList.remove("border-bruma");
    await run.wait(500);

    phone.style.cssText = "";
    await run.wait(350);
    serp.style.cssText = "";
    await run.wait(500);
    await count(run, rank, 14, 1, 1500, (n) => `#${n}`);
    result.classList.add("border-bruma");
    await run.wait(700);

    // Self-managed site: the client edits the headline, phone updates too
    await point(run, p, title, 800, 0.9, 0.5);
    await click(run, p);
    edit.style.opacity = "1";
    caret.classList.remove("hidden");
    await erase(run, title);
    headline = (headline + 1) % HEADLINES.length;
    await type(run, title, HEADLINES[headline], 45);
    phoneTitle.textContent = HEADLINES[headline];
    await run.wait(500);
    caret.classList.add("hidden");
    edit.style.opacity = "0";
    hideCursor(p);
    await run.wait(400);

    // Scroll the site on desktop and phone
    const viewport = $(p, "[data-viewport]");
    const phoneViewport = $(p, "[data-phone-viewport]");
    page.style.transform = `translateY(-${page.offsetHeight - viewport.clientHeight}px)`;
    phonePage.style.transform = `translateY(-${phonePage.offsetHeight - phoneViewport.clientHeight}px)`;
    await run.wait(2600);
    page.style.transform = phonePage.style.transform = "";
    await run.wait(2400);
  }
}

// ---- 02 Landing page ----------------------------------------------------------------------------

async function landing(run: Run, p: HTMLElement) {
  const ring = $<SVGCircleElement>(p, "[data-ring]");
  const score = $(p, "[data-score]");
  const load = $(p, "[data-load]");
  const name = $(p, "[data-field='name']");
  const email = $(p, "[data-field='email']");
  const caretName = $(p, "[data-field-caret='name']");
  const caretEmail = $(p, "[data-field-caret='email']");
  const submit = $(p, "[data-submit]");
  const leads = $(p, "[data-leads]");
  const newbar = $(p, "[data-newbar]");
  const leadsCard = $(p, "[data-leads-card]");
  const CIRC = 113.1;

  for (;;) {
    hideCursor(p);
    caretName.classList.add("hidden");
    caretEmail.classList.add("hidden");
    leadsCard.classList.remove("border-ladrillo");
    ring.style.transition = "none";
    ring.style.strokeDashoffset = String(CIRC);
    void ring.getBoundingClientRect();
    ring.style.transition = "";
    score.textContent = "0";
    load.textContent = "—";
    name.textContent = email.textContent = "";
    submit.textContent = "Quiero mi presupuesto →";
    submit.classList.replace("bg-marino", "bg-ladrillo");
    leads.textContent = "23";
    newbar.style.height = "0%";
    await run.wait(500);

    // Fast by design: performance score fills up
    ring.style.strokeDashoffset = String(CIRC * (1 - 0.98));
    await count(run, score, 0, 98, 1200);
    load.textContent = "0,8 s";
    await run.wait(500);

    // A visitor fills the form...
    await point(run, p, name.parentElement!, 800, 0.2, 0.6);
    await click(run, p);
    caretName.classList.remove("hidden");
    await type(run, name, "Martina Gómez", 60);
    caretName.classList.add("hidden");
    await point(run, p, email.parentElement!, 450, 0.2, 0.6);
    await click(run, p);
    caretEmail.classList.remove("hidden");
    await type(run, email, "martina@gmail.com", 50);
    caretEmail.classList.add("hidden");
    await point(run, p, submit, 600, 0.5, 0.5);
    await click(run, p, submit);
    submit.textContent = "Enviando…";
    await run.wait(600);
    submit.classList.replace("bg-ladrillo", "bg-marino");
    submit.textContent = "✓ ¡Listo! Te contactamos hoy";
    hideCursor(p);

    // ...and it lands as a new lead
    await run.wait(300);
    leadsCard.classList.add("border-ladrillo");
    await count(run, leads, 23, 24, 200);
    newbar.style.height = "84%";
    await run.wait(700);
    leadsCard.classList.remove("border-ladrillo");
    await run.wait(2600);
  }
}

// ---- 03 Tienda online ---------------------------------------------------------------------------

async function tienda(run: Run, p: HTMLElement) {
  const cartBtn = $(p, "[data-cart-btn]");
  const countEl = $(p, "[data-cart-count]");
  const fly = $(p, "[data-fly]");
  const drawer = $(p, "[data-drawer]");
  const total = $(p, "[data-total]");
  const pay = $(p, "[data-pay]");
  const shipping = $(p, "[data-shipping]");
  const steps = $$(p, "[data-ship-step]");
  const adds = $$(p, "[data-add]");
  const PRICES = [38900, 14900];

  const flyToCart = async (from: Element) => {
    const pr = p.getBoundingClientRect();
    const a = from.getBoundingClientRect();
    const b = cartBtn.getBoundingClientRect();
    const pos = (r: DOMRect) => `translate(${(r.left - pr.left + r.width / 2) / scale}px, ${(r.top - pr.top + r.height / 2) / scale}px)`;
    fly.style.transition = "none";
    fly.style.transform = pos(a);
    fly.style.opacity = "1";
    void fly.getBoundingClientRect();
    fly.style.transition = "transform 550ms cubic-bezier(0.5,0,0.3,1), opacity 150ms 500ms";
    fly.style.transform = pos(b) + " scale(0.6)";
    await run.wait(550);
    fly.style.opacity = "0";
  };

  for (;;) {
    hideCursor(p);
    fly.style.opacity = "0";
    countEl.textContent = "0";
    drawer.style.transform = "";
    total.textContent = "$ 0";
    pay.textContent = "Pagar";
    pay.classList.replace("bg-acero", "bg-ladrillo");
    shipping.style.opacity = "0";
    steps.forEach((s) => s.classList.remove("bg-ladrillo"));
    adds.forEach((a) => {
      a.textContent = "Agregar";
      a.classList.remove("bg-marino", "text-crema");
      a.classList.add("text-marino");
    });
    await run.wait(700);

    for (const [i, add] of adds.entries()) {
      await point(run, p, add, 750);
      await click(run, p, add);
      add.textContent = "✓ Agregado";
      add.classList.remove("text-marino");
      add.classList.add("bg-marino", "text-crema");
      await flyToCart(add);
      countEl.textContent = String(i + 1);
      countEl.style.transform = "scale(1.35)";
      await run.wait(160);
      countEl.style.transform = "";
      await run.wait(250);
    }

    await point(run, p, cartBtn, 600, 0.5, 0.5);
    await click(run, p, cartBtn);
    drawer.style.transform = "translateX(0)";
    await run.wait(450);
    await count(run, total, 0, PRICES[0] + PRICES[1], 700, peso);
    await run.wait(300);

    await point(run, p, pay, 650, 0.5, 0.5);
    await click(run, p, pay);
    pay.textContent = "Procesando pago…";
    await run.wait(900);
    pay.classList.replace("bg-ladrillo", "bg-acero");
    pay.textContent = "✓ Pago aprobado";
    hideCursor(p);
    shipping.style.opacity = "1";
    for (const s of steps) {
      await run.wait(650);
      s.classList.add("bg-ladrillo");
    }
    await run.wait(2600);
  }
}

// ---- 04 Desarrollo & consultoría ----------------------------------------------------------------

const KEYWORDS = new Set(["import", "from", "export", "async", "function", "const", "await", "return"]);
const TOKEN = /(\/\/.*$)|("[^"]*")|([A-Za-z_]\w*)(?=\()|(\.\w+)|([A-Za-z_]\w*)|(\s+)|(.)/gm;

/** Splits the source into coloured runs: [text, className] */
function highlight(src: string): [string, string][] {
  const out: [string, string][] = [];
  for (const m of src.matchAll(TOKEN)) {
    const [t, comment, str, fn, prop, word] = m;
    let cls = "text-crema/60";
    if (comment) cls = "italic text-crema/35";
    else if (str) cls = "text-bruma";
    else if (fn) cls = "text-crema";
    else if (prop) cls = "text-bruma/75";
    else if (word) cls = KEYWORDS.has(word) ? "text-[#D9786B]" : "text-crema/85";
    out.push([t, cls]);
  }
  return out;
}

const DEPLOY = [
  ["$ npm run deploy", "text-crema/60"],
  ["✓ build listo en 1,2 s", "text-bruma"],
  ["✓ 24 tests pasaron", "text-bruma"],
  ["✓ online → tuempresa.com.ar", "text-crema"],
];

async function codigo(run: Run, p: HTMLElement) {
  const pre = $(p, "[data-code]");
  const term = $(p, "[data-terminal]");
  const source = pre.dataset.source ?? pre.textContent ?? "";
  pre.dataset.source = source;
  const runs = highlight(source);

  for (;;) {
    pre.textContent = "";
    term.textContent = "";
    const caret = document.createElement("span");
    caret.className = "inline-block h-[13px] w-[6px] translate-y-[2px] bg-ladrillo bw-blink";
    pre.append(caret);
    await run.wait(500);

    for (const [text, cls] of runs) {
      const span = document.createElement("span");
      span.className = cls;
      pre.insertBefore(span, caret);
      for (const ch of text) {
        span.textContent += ch;
        await run.wait(ch === "\n" ? 140 : ch === " " ? 8 : 22);
      }
    }
    await run.wait(600);

    for (const [line, cls] of DEPLOY) {
      const row = document.createElement("div");
      row.className = cls;
      row.textContent = line;
      term.append(row);
      await run.wait(line.startsWith("$") ? 700 : 420);
    }
    await run.wait(3200);
  }
}

// ---- playback control -----------------------------------------------------------------------------

const STORIES = [institucional, landing, tienda, codigo];
let active = 0;
let visible = false;
let current: Run | null = null;

function sync() {
  current?.stop();
  current = null;
  if (!visible || reduce) return;
  const run = new Run();
  current = run;
  // Let the panel finish fading in before measuring positions for the cursor
  run
    .wait(750)
    .then(() => STORIES[active](run, panels[active]))
    .catch((e) => {
      if (e !== STOP) throw e;
    });
}

new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting === visible) return;
    visible = entry.isIntersecting;
    sync();
  },
  { threshold: 0.25 },
).observe(box);

/** Called by the services list when another service opens */
export function showVisual(index: number) {
  if (index === active) return;
  active = index;
  sync();
}
