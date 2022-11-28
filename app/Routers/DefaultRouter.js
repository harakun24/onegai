import base from "./BaseRouter.js";
import { DefaulService } from "../Services/DefaultService.js";

export class DefaultRouter extends base {
  constructor() {
    super("default");

    const service = new DefaulService();
    this.route("/", {
      get: [{ "/": service.render }],
    });
  }
}
