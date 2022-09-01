import { BaseController } from "./BaseController.js";
export class DefaultController extends BaseController {
  constructor() {
    super("default");
  }
  index(res) {
    // res.send("<h1>Hello world</h1>");
    res.svelte("text.svelte", {
      globalStores: {
        counter: 0,
      },
      globalProps: {
        Hound: "Express Svelte Example",
      },
      props: {
        user: [
          { u: "dimas23", p: "123" },
          { u: "dimas24", p: "124" },
          { u: "dimas25", p: "125" },
        ],
        total: "reaksi kimia @1234!$~",
      },
    });
  }
}
