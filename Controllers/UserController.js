import { BaseController } from "./BaseController.js";

export class UserController extends BaseController {
  constructor() {
    super("user");
  }
  async index(res) {
    res.svelte("user", {
      props: {
        header: "user manager",
        user: await this.Models.User.findAll(),
      },
    });
  }
  addPages(res) {
    res.svelte("adduser", {});
  }
  async editPages(res) {
    const { User } = this.Models;
    if (!res.req.params.id) res.redirect("/user");
    else
      res.svelte("edit", {
        props: {
          id: res.req.params.id,
          user: await User.findByPk(res.req.params.id),
        },
      });
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
}
