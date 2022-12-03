import base from "./BaseService.js";
import axios from "axios";
import { Op } from "sequelize";

const { Admin } = base.models;
export class AdminService extends base {
  constructor() {
    super("admin");
  }
  async render(req, res) {
    res.render("layouts/template");
  }
  //data management
  async create(req, res) {
    try {
      if (req.body) await Admin.create(req.body);
    } catch (error) {
      console.log(error.message);
    }
    findAll(req, res);
  }

  async update(req, res) {
    try {
      if (req.body) {
        await Admin.update(req.body, {
          where: { userID: req.params.id },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    res.render("components/admin/row-admin.html", {
      item: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }

  async delete(req, res) {
    if (req.params.id)
      await deleting(req, res, { where: { userID: req.params.id } });
    else res.redirect("/dashboard/res/table-admin");
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
    res.render("layouts/admin-man.html", {
      list: await Admin.findAll(),
    });
  }
  async res_table_show(req, res) {
    findAll(req, res);
  }
  async res_add(req, res) {
    res.render("components/admin/add-admin.html", {
      list: await Admin.findAll({ limit: 5, order: [["userID", "DESC"]] }),
    });
  }
  async res_edit(req, res) {
    res.render("components/admin/edit-admin.html", {
      data: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }
  async res_row(req, res) {
    res.render("components/admin/row-admin.html", {
      item: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }
  async res_search(req, res) {
    req.session.search = req.body.name || "";
    req.session.page = 0;
    findAll(req, res);
  }
  async res_page(req, res) {
    const total = await Admin.count({
      where: {
        name: {
          [Op.like]: `%${req.session.search}%`,
        },
      },
    });
    res.render("components/admin/pagination-admin.html", {
      count: Math.ceil(total / 5),
    });
  }
  async res_goto(req, res) {
    if (req.params.page) req.session.page = req.params.page - 0;
    findAll(req, res);
  }
}

const findAll = async (req, res) => {
  req.session.page = req.session.page ?? 0;
  req.session.search = req.session.search ?? "";
  const rawResult = await Admin.findAll({
    where: {
      name: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
    limit: 5,
    offset: req.session.page * 5,
    order: [["userID", "DESC"]],
  });

  res.render("components/admin/table-admin.html", {
    list: rawResult,
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
      })) / 5
    ) - 1;
  console.log({ tempPage, page: req.session.page });
  req.session.page = tempPage < req.session.page ? tempPage : req.session.page;
  findAll(req, res);
};
