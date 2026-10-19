const root = document.getElementById("root");
const core = document.getElementById("core");
const opts = [
  document.getElementById("opt-insumo"),
  document.getElementById("opt-servico"),
];

let open = false;

function setOpen(next) {
  open = next;
  root.classList.toggle("is-open", open);
  core.setAttribute("aria-expanded", String(open));
  opts.forEach((o) => {
    o.tabIndex = open ? 0 : -1;
  });
}

core.addEventListener("click", (e) => {
  e.stopPropagation();
  setOpen(!open);
});

opts.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    // substitua pelo roteamento / callback do app
    console.log("selecionado:", btn.id);
    setOpen(false);
  });
});

document.addEventListener("click", () => {
  if (open) setOpen(false);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && open) {
    setOpen(false);
    core.focus();
  }
});
