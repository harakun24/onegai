import ex from "express";
import env from "dotenv";
import morgan from "morgan";
import * as router from "../Routers/index.js";
import ModelAdapter from "../Models/index.js";

env.config();

const app = new ex();
app.use("/public", ex.static("/public"));
app.use(ex.json());
app.use(ex.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.launch = function (cb) {
  const { env } = process;
  app.listen(env.PORT || 4000, function () {
    cb(this.address());
  });
};

app.routeHandler = () => {
  Object.values(router).forEach((r) => {
    const { ep, rt } = new r().driver;
    app.use(ep, rt);
  });
};

app.notFound = (cb) => {
  app.use((req, res, next) => {
    res.req = req;
    cb(res);
  });
};
app.internalError = null;
app.sync = async (opt = "") => {
  const adapter = ModelAdapter.driver;
  try {
    await adapter.sync(opt);
    console.log("\n\t--Terhubung ke database--".blue);
  } catch (ex) {
    console.log("  -Gagal terhubung database-".yellow);
    console.log("--gagal terhubung database--\n".red + ex.message.yellow);
    setTimeout(() => {
      app.sync(opt);
    }, 1000);
  }
};

export default app;
