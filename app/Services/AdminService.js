/** @format */

import base from "./BaseService.js";
import { Op } from "sequelize";

const { Admin } = base.models;
export class AdminService extends base {
  constructor() {
    super("admin");
  }
  async render(req, res) {
    req.session.layout = req.session.layout ?? "dashboard/-admin";
    res.render("layouts/template", { layout: req.session.layout });
  }
  async admin(req, res) {
    if (req.header("mode") == "tab") {
      this.res_admin(req, res);
    } else {
      req.session.layout = "dashboard/-admin";
      res.redirect("/");
    }
  }
  async dashboard(req, res) {
    if (req.header("mode") == "tab") {
      this.res_dashboard(req, res);
    } else {
      req.session.layout = "dashboard/-dashboard";
      res.redirect("/");
    }
  }
  //data management
  async create(req, res) {
    try {
      if (req.body) {
        await Admin.create(req.body);
        req.session.message = "add";
      }
    } catch (error) {
      req.session.message = "err";
      console.log(error.message);
    }
    findAll(req, res);
  }

  async update(req, res) {
    let msg = null;
    try {
      if (req.body) {
        await Admin.update(req.body, {
          where: { userID: req.params.id },
        });
        msg = "update";
      }
    } catch (error) {
      msg = "err";
      console.log(error.message);
    }
    res.render("components/admin/row-content.html", {
      msg,
      item: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }

  async delete(req, res) {
    if (req.params.id)
      await deleting(req, res, { where: { userID: req.params.id } });
    else this.res_table_show(req, res);
  }
  async deleteAll(req, res) {
    await deleting(req, res, { where: {}, truncate: true });
  }

  //micro views
  async res_dashboard(req, res) {
    res.render("layouts/dashboard.html");
  }
  async res_admin(req, res) {
    req.session.search = "";
    req.session.page = 0;
    req.session.limit = 5;
    req.session.message = null;

    res.render("layouts/admin-man.html", {
      list: await Admin.findAll(),
    });
  }
  async res_table_show(req, res) {
    findAll(req, res);
  }
  async res_add(req, res) {
    req.session.page = 0;
    res.render("components/admin/add-content.html", {
      list: await Admin.findAll({
        where: {
          name: {
            [Op.like]: `%${req.session.search || ""}%`,
          },
        },
        limit: req.session.limit,
        offset: req.session.page * req.session.limit,
        order: [["userID", "DESC"]],
      }),
      current: req.session.page,
      count: Math.ceil(
        (await Admin.count({
          where: {
            name: {
              [Op.like]: `%${req.session.search}%`,
            },
          },
        })) / req.session.limit
      ),
    });
  }
  async res_edit(req, res) {
    res.render("components/admin/edit-content.html", {
      data: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }
  async res_row(req, res) {
    res.render("components/admin/row-content.html", {
      item: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
      msg: null,
    });
  }
  async res_search(req, res) {
    req.session.search = req.query.name || "";
    req.session.page = 0;
    findAll(req, res);
  }
  async res_goto(req, res) {
    if (req.params.page) req.session.page = req.params.page - 0;
    findAll(req, res);
  }
  async res_limit(req, res) {
    req.session.limit = req.query.limit;
    req.session.page = 0;

    findAll(req, res);
  }
}

const findAll = async (req, res) => {
  req.session.page = req.session.page ?? 0;
  req.session.search = req.session.search ?? "";
  req.session.limit = req.session.limit ?? 5;

  const count = await Admin.count({
    where: {
      name: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
  });
  const rawResult = await Admin.findAll({
    where: {
      name: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
    limit: req.session.limit,
    offset: req.session.page * req.session.limit,
    order: [["userID", "DESC"]],
  });
  const msg = req.session.message;
  req.session.message = null;
  res.render("components/admin/table-content.html", {
    list: rawResult,
    current: req.session.page,
    msg,
    count: Math.ceil(count / req.session.limit),
  });
};

const deleting = async (req, res, option) => {
  try {
    await Admin.destroy(option);
  } catch (error) {
    console.log(error.message);
  }
  // req.session.search = "";
  const tempPage =
    Math.ceil(
      (await Admin.count({
        where: { name: { [Op.like]: `%${req.session.search}%` } },
      })) / req.session.limit
    ) - 1;
  req.session.page = tempPage < req.session.page ? tempPage : req.session.page;
  findAll(req, res);
};
