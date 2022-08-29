import { BaseRouter } from "./BaseRouter.js";
import { DefaultController } from "../Controllers/DefaultController.js";

export class DefaultRouter extends BaseRouter {
  #service;
  #list = [
    //list route
    "/<@get>index",
  ];
  constructor() {
    super("default");
    this.driver = "/";
    this.#service = new DefaultController();
    this.bound(this.#list, this.#service);
  }
}
