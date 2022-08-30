function props(n) {
  const y = document.querySelector("secret").getAttribute(n);
  document.querySelector("secret").removeAttribute(n);
  return y;
}

function select(n) {
  return document.querySelector(n);
}

function bound(v) {
  setInterval(v, 0);
}
