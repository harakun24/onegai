import base from "./BaseService.js";

const { Admin } = base.models;
export class DefaulService extends base {
  constructor() {
    super("default");
  }
  async render(req, res) {
    res.render("layouts/template");
  }
}
