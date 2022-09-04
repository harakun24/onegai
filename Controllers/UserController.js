import { BaseController } from "./BaseController.js";
import rabbit from "crypto-js/rabbit.js";
export class UserController extends BaseController {
  constructor() {
    super("user");
  }
  async index(res) {
    let user = await this.Models.User.findAll();
    res.svelte("user", {
      header: "user manager",
      user,
      stores: { rate: 2 },
    });
  }
  async bulkAll(res) {
    const { User } = this.Models;
    res.send(JSON.stringify(await User.findAll()));
  }
  addPages(res) {
    res.svelte("adduser", {});
  }
  async editPages(res) {
    const { User } = this.Models;
    if (!res.req.params.id) res.redirect("/user");
    else {
      const user = await User.findByPk(res.req.params.id);
      res.svelte("edit", {
        id: res.req.params.id,
        user: user.get({ plain: true }),
      });
    }
  }
  async createUser(res) {
    const { body } = res.req;
    if (!body) res.redirect("/user");
    else {
      const { User } = this.Models;
      try {
        await User.create(body);
        console.log("user %s ditambahkan ", JSON.stringify(body));
        res.redirect("/user");
      } catch (ex) {
        res.message = ex.message;
        res.req.app.internalError(res);
      }
    }
  }
  async updateUser(res) {
    if (!res.req.params.id || !res.req.body) res.redirect("/user");
    else {
      const { User } = this.Models;
      try {
        await User.update(res.req.body, {
          where: { userID: res.req.params.id },
        });
        res.redirect("/user");
      } catch (ex) {
        res.message = ex.message;
        res.req.app.internalError(res);
      }
    }
  }
  async hapusUser(res) {
    if (!res.req.params.id) res.redirect("/user");
    else {
      const { User } = this.Models;
      try {
        await User.destroy({ where: { userID: res.req.params.id } });
        res.redirect("/user");
      } catch (Ex) {
        res.message = Ex.message;
        res.req.app.internalError(res);
      }
    }
  }
  async showdata(res) {
    if (!res.req.params.text) res.redirect("/user");
    else {
    }
  }
}
