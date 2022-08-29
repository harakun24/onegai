import ModelAdapter from "../Models/index.js";
import "colors";

export class BaseController {
  constructor(name) {
    console.log(" -".green + `service ${name}`.bgGreen.black);
  }
  get Models() {
    return ModelAdapter.list;
  }
}
