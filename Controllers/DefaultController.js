import { BaseController } from "./BaseController.js";

export class DefaultController extends BaseController {
  constructor() {
    super("default");
  }
  index(res) {
    // res.send("<h1>Hello world</h1>");
    res.svelte("dev.svelte", {
      globalStores: {
        counter: 0,
      },
      globalProps: {
        Hound: "Express Svelte Example",
      },
      props: {
        value: "View prop",
      },
    });
  }
}
