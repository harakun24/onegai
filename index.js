import app from "./config/config.js";
import "colors";

app.routeHandler();
app.sync();

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
  console.log(`\n\tserver listen on ${addr.address}:${addr.port}\n`.cyan);
});
