/** @format */

console.time("start");
import app from "./setting.config.js";
import { DefaultRouter } from "./app/Routers/DefaultRouter.js";
import { path, dir } from "./path.js";

app.sync();
app.set("view engine", "html");
app.set("views", path.resolve(dir, "./app/Views"));
app.static("/assets", path.resolve(dir, "./public"));
app.use(...new DefaultRouter().handler);
app.notFound((req, res) => {
  res.status(404).redirect("/dashboard");
});
app.launch((addr) => {
  console.log(`\nlisten on port ${addr.port}`);
});
console.timeEnd("start");
