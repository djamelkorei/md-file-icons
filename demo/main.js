import "../src/md-file-icons.scss";
import "./style.css";

const COLORS = [
  "red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue",
  "cyan", "teal", "green", "light-green", "lime", "yellow", "amber",
  "orange", "deep-orange", "brown", "grey", "blue-grey",
];

const el = (tag, props = {}, ...children) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const child of children) {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
};

const makeFile = (classes, inner = "") => {
  const node = el("span", { className: ["md-file", ...classes].join(" ") });
  if (inner) node.innerHTML = inner;
  return node;
};

const copy = async (text, trigger) => {
  try {
    await navigator.clipboard.writeText(text);
    if (trigger) {
      const original = trigger.dataset.label ?? trigger.textContent;
      trigger.dataset.label = original;
      trigger.textContent = "Copied ✓";
      trigger.classList.add("is-copied");
      setTimeout(() => {
        trigger.textContent = original;
        trigger.classList.remove("is-copied");
      }, 1200);
    }
  } catch {
    /* clipboard unavailable — no-op */
  }
};

/* ---------- hero stage ---------- */
const heroPicks = [
  ["blue", "Ps"], ["purple", "Pr"], ["deep-purple", "Ae"], ["orange", "Ai"],
  ["light-green", "Dw"], ["red", '<i class="fa-solid fa-file-pdf"></i>'],
  ["teal", '<i class="fa-solid fa-music"></i>'], ["indigo", "DOC"],
];
const stage = document.getElementById("hero-stage");
heroPicks.forEach(([color, inner], i) => {
  const node = makeFile([`md-file-${color}`, "md-file-lg"], inner);
  node.style.setProperty("--i", i);
  stage.append(node);
});

/* ---------- color gallery ---------- */
const grid = document.getElementById("color-grid");
COLORS.forEach((color) => {
  const cls = `md-file md-file-${color}`;
  const tile = el(
    "button",
    { className: "tile", title: `Copy "${cls}"` },
    makeFile([`md-file-${color}`, "md-file-lg"]),
    el("span", { className: "tile-name", textContent: `.md-file-${color}` }),
  );
  tile.addEventListener("click", () => copy(cls, tile.querySelector(".tile-name")));
  grid.append(tile);
});

/* ---------- file-type presets ---------- */
const PRESETS = [
  "pdf", "docx", "xlsx", "csv", "ppt", "txt", "markdown", "json", "js", "ts",
  "tsx", "html", "css", "scss", "vue", "py", "rb", "go", "rs", "php", "java",
  "sql", "yml", "sh", "png", "svg", "jpg", "gif", "mp3", "mp4", "zip", "env",
];
const presetGrid = document.getElementById("preset-grid");
PRESETS.forEach((ext) => {
  const cls = `md-file md-file-${ext}`;
  const tile = el(
    "button",
    { className: "tile", title: `Copy "${cls}"` },
    makeFile([`md-file-${ext}`, "md-file-lg"]),
    el("span", { className: "tile-name", textContent: `.md-file-${ext}` }),
  );
  tile.addEventListener("click", () => copy(cls, tile.querySelector(".tile-name")));
  presetGrid.append(tile);
});

/* ---------- sizes ---------- */
const sizeRow = document.getElementById("size-row");
const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
SIZES.forEach((size) => {
  sizeRow.append(
    el(
      "div",
      { className: "size-item" },
      makeFile([`md-file-${size}`, "md-file-indigo"], size.toUpperCase()),
      el("code", { textContent: `.md-file-${size}` }),
    ),
  );
});

/* ---------- showcase ---------- */
const showcase = document.getElementById("showcase");
[
  ["blue", "XLS"], ["green", "CSV"], ["deep-orange", '<i class="fa-brands fa-html5"></i>'],
  ["amber", '<i class="fa-solid fa-image"></i>'], ["pink", '<i class="fa-solid fa-film"></i>'],
  ["brown", "ZIP"], ["blue-grey", "EXE"], ["cyan", '<i class="fa-solid fa-database"></i>'],
].forEach(([color, inner]) => {
  showcase.append(makeFile([`md-file-${color}`, "md-file-xl"], inner));
});

/* ---------- playground ---------- */
const pg = {
  icon: document.getElementById("pg-icon"),
  code: document.getElementById("pg-code"),
  label: document.getElementById("ctrl-label"),
  size: document.getElementById("ctrl-size"),
  content: document.getElementById("ctrl-content"),
  colors: document.getElementById("ctrl-colors"),
  copyBtn: document.getElementById("pg-copy"),
};
let activeColor = "blue";

COLORS.forEach((color) => {
  const swatch = el("button", {
    className: "swatch" + (color === activeColor ? " is-active" : ""),
    title: color,
  });
  swatch.style.setProperty("--swatch", `var(--md-${color})`);
  swatch.addEventListener("click", () => {
    activeColor = color;
    pg.colors.querySelectorAll(".swatch").forEach((s) => s.classList.remove("is-active"));
    swatch.classList.add("is-active");
    renderPlayground();
  });
  pg.colors.append(swatch);
});

const renderPlayground = () => {
  const classes = ["md-file", `md-file-${activeColor}`];
  if (pg.size.value) classes.push(`md-file-${pg.size.value}`);

  let inner = "";
  if (pg.content.value === "text") inner = pg.label.value.trim();
  else if (pg.content.value === "icon") inner = '<i class="fa-solid fa-music"></i>';

  pg.icon.className = classes.join(" ");
  pg.icon.innerHTML = inner;
  pg.label.disabled = pg.content.value !== "text";

  pg.code.textContent = `<span class="${classes.join(" ")}">${inner}</span>`;
};

[pg.label, pg.size, pg.content].forEach((node) => {
  node.addEventListener("input", renderPlayground);
});
pg.copyBtn.addEventListener("click", () => copy(pg.code.textContent, pg.copyBtn));
renderPlayground();

/* ---------- misc ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
