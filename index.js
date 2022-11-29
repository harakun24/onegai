import app from "./setting.config.js";
import { AdminRouter } from "./app/Routers/AdminRouter.js";
import { path, dir } from "./path.js";

app.sync();
app.set("view engine", "html");
app.set("views", path.resolve(dir, "./app/Views"));
app.static("/assets", path.resolve(dir, "./public"));
app.use(...new AdminRouter().handler);
app.notFound((res) => {
  res.status(404).send("404 kali");
});
app.launch((addr) => {
  console.log(`\nlisten on port ${addr.port}`);
});
