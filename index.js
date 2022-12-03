import app from "./setting.config.js";
import { DefaultRouter } from "./app/Routers/DefaultRouter.js";
import { path, dir } from "./path.js";

app.sync();
app.set("view engine", "html");
app.set("views", path.resolve(dir, "./app/Views"));
app.static("/assets", path.resolve(dir, "./public"));
app.get("/", (req, res) => res.send("hwllos"));
// app.use(...new DefaultRouter().handler);
app.notFound((req, res) => {
  res.status(404).send("404 kali");
});
app.launch((addr) => {
  console.log(`\nlisten on port ${addr.port}`);
});
