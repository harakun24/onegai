/** @format */

import base from "./BaseRouter.js";
import { DefaulService } from "../Services/DefaultService.js";
import AdminRouter from "./AdminRouter.js";
export class DefaultRouter extends base {
  constructor() {
    super("default");

    const service = new DefaulService();
    this.route("/", {
      get: [
        {
          "/": (req, res) => {
            res.redirect("/dashboard");
          },
        },
      ],
      sub: [{ "/dashboard": AdminRouter.handler[1] }],
    });
  }
}
