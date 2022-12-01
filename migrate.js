import up_migrate from "./app/database/up.migrate.js";
const [method, amount] = process.argv.slice(2);

switch (method) {
  case "up":
    await up_migrate(amount);
    break;
}
