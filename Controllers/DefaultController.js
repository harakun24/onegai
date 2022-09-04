import { BaseController } from "./BaseController.js";
export class DefaultController extends BaseController {
  constructor() {
    super("default");
  }
  index(res) {
    // res.send("<h1>Hello world</h1>");
    res.svelte("text.svelte", {
      total: 30,
      title: "hara",
      global: { title: "addition" },
    });
  }
}
