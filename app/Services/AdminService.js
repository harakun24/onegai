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
    const response = await axios.post(
      base.baseUrl(req) + "/dashboard/res/table-admin"
    );
    res.send(response.data);
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
    const response = await axios.post(
      base.baseUrl(req) + `/dashboard/res/row-admin/${req.params.id}`
    );
    // console.log(response.data);
    res.send(response.data);
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
    res.render("layouts/admin-man.html", { list: await Admin.findAll() });
  }
  async res_table_show(req, res) {
    findAll(req, res);
  }
  async res_add_row(req, res) {
    res.render("components/add-admin.html");
  }
  async res_add(req, res) {
    // const first = (await axios.post(url + "/dashboard/res/add-row-admin")).data;
    const first = (
      await axios.post(base.baseUrl(req) + "/dashboard/res/add-row-admin")
    ).data;
    const second = (
      await axios.post(base.baseUrl(req) + "/dashboard/res/table-admin")
    ).data;
    res.send(`${first} ${second}`);
  }
  async res_edit(req, res) {
    res.render("components/edit-admin.html", {
      data: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }
  async res_row(req, res) {
    res.render("components/row-admin.html", {
      item: (await Admin.findAll({ where: { userID: req.params.id } }))[0],
    });
  }
  async res_search(req, res) {
    req.session.search = req.body.name || "";
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
    res.render("components/pagination-admin.html", {
      count: Math.ceil(total / 5),
    });
  }
  async res_goto(req, res) {
    if (req.params.page) req.session.page = req.params.page - 0;
    console.log({ search: req.session.search, page: req.session.page });
    findAll(req, res);
  }
}

const findAll = async (req, res) => {
  const rawResult = await Admin.findAll({
    where: {
      name: {
        [Op.like]: `%${req.session.search || ""}%`,
      },
    },
    limit: 5,
    offset: (req.session.page || 0) * 5,
    order: [["userID", "DESC"]],
  });

  res.render("components/table-admin.html", {
    list: rawResult,
  });
};

const deleting = async (req, res, option) => {
  try {
    await Admin.destroy(option);
  } catch (error) {
    console.log(error.message);
  }
  req.session.search = "";
  req.session.page = 0;
  const response = await axios.post(
    base.baseUrl(req) + "/dashboard/res/table-admin"
  );
  console.log(base.baseUrl(req) + "/dashboard/res/table-admin");
  res.send(response.data);
  // res.redirect("/dashboard/res/table-admin");
};
