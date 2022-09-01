const name = document.querySelector("secret").getAttributeNames();
const arr = {};

for (const n of name) {
  let y = document.querySelector("secret").getAttribute(n);
  document.querySelector("secret").removeAttribute(n);
  arr[n] = detach(y);
}
function tach(val) {
  if (!val) return null;
  return `${val}`
    .split("")
    .map((t) => t.charCodeAt(0) / 1024)
    .reduce((a, b) => `${a}'${b}`);
}
function detach(val) {
  if (!val) return null;
  return val
    .split("'")
    .map((t) => String.fromCharCode(t * 1024))
    .reduce((a, b) => `${a}${b}`);
}
function props(n = null) {
  if (n) {
    return arr[n];
  } else {
    return arr;
  }
}
function select(n) {
  return document.querySelector(n);
}
function selectAll(n) {
  return document.querySelectorAll(n);
}
function bound(v) {
  const { data } = v();
  const name = `compare-${JSON.stringify(data)}`;
  localStorage.setItem(name, null);
  setInterval(() => {
    const { data, target } = v();
    if (data != localStorage.getItem(name)) {
      localStorage.setItem(name, data);
      target(data);
    }
  }, 0);
}

setTimeout(() => {
  select("In").remove();
}, 100);
