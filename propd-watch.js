import fs from "fs";
import "colors";
import obfuster from "javascript-obfuscator";

console.log("wathcing file: getProps.js");

fs.watchFile("./public/js/getProps.js", {}, (curr, prev) => {
  console.log("konten berubah");
  const konten = fs.readFileSync("./public/js/getProps.js").toString();
  const result = obfuster.obfuscate(konten);
  fs.writeFileSync("./public/dist/js/props.js", result.getObfuscatedCode());
  console.log(
    `\t${curr.mtime}`.cyan +
      `\n---generate props.js---\n` +
      `\t${prev.mtime}`.cyan
  );
});
