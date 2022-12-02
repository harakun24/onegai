import adapter from "../Models/index.js";
import { faker } from "@faker-js/faker";

faker.locale = "id_ID";
console.log("\nstart");
// let amount = 0;
// export default function (aamount) {
//   amount = aamount;
// }
// console.log(amount);
export default async function (amount) {
  await adapter.driver.sync({ force: true });
  console.log("--building db--");
  const arrData = [];
  const { Admin } = adapter.list;
  for (let i = 0; i < amount; i++) {
    arrData.push({
      name: faker.internet.userName(),
      password: faker.internet.password(),
    });
  }
  await Admin.bulkCreate(arrData);
  console.log("done!");
}
