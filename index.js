import app from "./setting.config.js";
import { DefaultRouter } from "./app/Routers/DefaultRouter.js";

app.sync();

app.use(...new DefaultRouter().handler);
app.notFound((res) => {
  res.send("404 kali");
});
app.launch((addr) => {
  console.log(`\nlisten on port ${addr.port}`);
});
