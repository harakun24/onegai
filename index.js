import app from "./config/config.js";
import "colors";
import svelte from "./config/express-svelte/lib/express-svelte.js";
import { dir, path } from "./config/path.js";
import method from "method-override";

app.use(method("_method"));
app.use(
  svelte({
    // legacy: true,
    // hydratable: true,
    viewsDirname: "./Views/",
    bundlesDirname: path.resolve(dir, "./public/dist"),
    bundlesHost: path.resolve(dir, "/public/dist"),
    bundlesPattern: "[name][extname]",
    env: "production",
  })
);
app.routeHandler();
app.sync({ force: true });

app.notFound((res) => {
  res.send("<h1>url not found</h1>");
});

app.internalError = (res) => {
  res.send(`<h1>internal server error</h1>
  <p>${res.message}</p>
  <p>${res.req.url}</p>
  `);
};

app.launch((addr) => {
  console.log(`\n\tserver listen on :${addr.port}\n`.cyan);
});
