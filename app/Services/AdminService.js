import base from "./BaseService.js";
import axios from "axios";
import { Op } from "sequelize";

const { Admin } = base.models;
export class AdminService extends base {
  constructor() {
    super("admin");
  }
  async render(res) {
    res.render("layouts/template");
  }
  //data management
  async create(res) {
    try {
      if (res.req.body) await Admin.create(res.req.body);
    } catch (error) {
      console.log(error.message);
    }
    const response = await axios.post(
      base.baseUrl(res) + "/dashboard/res/table-admin"
    );
    res.send(response.data);
  }

  async update(res) {
    try {
      if (res.req.body) {
        await Admin.update(res.req.body, {
          where: { userID: res.req.params.id },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    const response = await axios.post(
      base.baseUrl(res) + `/dashboard/res/row-admin/${res.req.params.id}`
    );
    // console.log(response.data);
    res.send(response.data);
  }

  async delete(res) {
    if (res.req.params.id)
      await deleting(res, { where: { userID: res.req.params.id } });
    else res.redirect("/dashboard/res/table-admin");
  }
  async deleteAll(res) {
    await deleting(res, { where: {}, truncate: true });
  }

  //micro views
  async res_dashboard(res) {
    res.render("layouts/dashboard.html");
  }
  async res_admin(res) {
    res.render("layouts/admin-man.html");
  }
  async res_table_show(res) {
    findAll(res, { order: [["userID", "DESC"]] });
  }
  async res_add_row(res) {
    res.render("components/add-admin.html");
  }
  async res_add(res) {
    // const first = (await axios.post(url + "/dashboard/res/add-row-admin")).data;
    const first = (
      await axios.post(base.baseUrl(res) + "/dashboard/res/add-row-admin")
    ).data;
    const second = (
      await axios.post(base.baseUrl(res) + "/dashboard/res/table-admin")
    ).data;
    res.send(`${first} ${second}`);
  }
  async res_edit(res) {
    res.render("components/edit-admin.html", {
      data: (await Admin.findAll({ where: { userID: res.req.params.id } }))[0],
    });
  }
  async res_row(res) {
    res.render("components/row-admin.html", {
      item: (await Admin.findAll({ where: { userID: res.req.params.id } }))[0],
    });
  }
  async res_search(res) {
    findAll(res, {
      where: { name: { [Op.like]: `%${res.req.body.name}%` } },
      order: [["userID", "DESC"]],
    });
  }
}

const findAll = async (res, option) => {
  res.render("components/table-admin.html", {
    list: await Admin.findAll(option),
  });
};

const deleting = async (res, option) => {
  try {
    await Admin.destroy(option);
  } catch (error) {
    console.log(error.message);
  }
  const response = await axios.post(
    base.baseUrl(res) + "/dashboard/res/table-admin"
  );
  res.send(response.data);
};
