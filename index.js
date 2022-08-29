import app from "./config/config.js";
import "colors";
import svelte from "./config/express-svelte/lib/express-svelte.js";
import { dir } from "./config/path.js";

app.use(
  svelte({
    legacy: true,
    hydratable: true,
    viewsDirname: "./Views/",
    bundlesDirname: "./public/dist",
    bundlesHost: "/public/dist",
    bundlesPattern: "[name][extname]",
    env: "development",
  })
);
app.routeHandler();
// app.sync();

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
