import base from "./BaseService.js";

export class DefaulService extends base {
  constructor() {
    super("default");
  }
  async render(res) {
    res.send("hello services!");
  }
}
