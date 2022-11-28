import Adapter from "./app/Models/index.js";
import ex from "express";
import morgan from "morgan";
import env from "dotenv";
import "colors";
env.config();

const app = new ex();

app.use(morgan("dev"));
app.use(ex.json());
app.use(ex.urlencoded({ extended: true }));

app.notFound = (cb) => {
  app.use((req, res, next) => {
    res.req = req;
    cb(res);
  });
};
app.launch = (cb) => {
  const { env } = process;
  app.listen(env.PORT || 4000, function () {
    cb(this.address());
  });
};
app.static = (body, src) => {
  app.use(body, ex.static(src));
};
app.routes = (ep, router) => {
  app.use(ep, router);
};
app.sync = async (option = "") => {
  try {
    await Adapter.driver.sync(option);
    console.log("\n\t--Terhubung ke database--".blue);
  } catch (error) {
    console.log("   - gagal terhubung database-".red);
    console.log("    " + error.message.yellow);
    setTimeout(() => {
      app.sync(option);
    }, 1000);
  }
};
export default app;
