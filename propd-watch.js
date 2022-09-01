import fs from "fs";
import "colors";

console.log("wathcing file: getProps.js");

fs.watchFile("./public/js/getProps.js", {}, (curr, prev) => {
  console.log("konten berubah");
  const konten = fs.readFileSync("./public/js/getProps.js").toString();

  fs.writeFileSync("./public/js/props.js", konten);
  console.log(
    `\t${curr.mtime}`.cyan +
      `\n---generate props.js---\n` +
      `\t${prev.mtime}`.cyan
  );
});
