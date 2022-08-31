import { BaseRouter } from "./BaseRouter.js";
import { UserController } from "../Controllers/UserController.js";

export class UserRouter extends BaseRouter {
  #service;
  #list = [
    //list route
    "/<@get>index",
    "/add<@get>addPages",
    "/edit/:id<@get>editPages",
    "/tambah<@post>createUser",
    "/update/:id<@put>updateUser",
    "/hapus/:id<@get>hapusUser",
  ];
  constructor() {
    super("user");
    this.driver = "/user";
    this.#service = new UserController();
    this.bound(this.#list, this.#service);
  }
}
