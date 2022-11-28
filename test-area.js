const temp = {
  get: [{ "/": "text" }],
  put: [],
  sub: [{ "/blue": "text2" }],
};

const { get, post, put, sub } = temp;

function e(temp) {
  const key = Object.keys(temp)[0];
  const tmp = temp[key];

  if (tmp && tmp.length) {
    tmp.forEach((el) => {
      const k = Object.keys(el)[0];
      console.log(`method=${key}, ep=${k}, cb=${el[k]}`);
    });
  }
}
