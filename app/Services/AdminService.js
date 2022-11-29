import base from "./BaseService.js";
import axios from "axios";

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
    console.log(
      res.req.get("host").replace("localhost", "127.0.0.1") +
        "/dashboard/res/table-admin"
    );
    const response = await axios.post(
      res.req.protocol +
        "://" +
        res.req.get("host").replace("localhost", "127.0.0.1") +
        "/dashboard/res/table-admin"
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
      res.req.protocol +
        "://" +
        res.req.get("host") +
        `/dashboard/res/row-admin/${res.req.params.id}`
    );
    // console.log(response.data);
    res.send(response.data);
  }

  async delete(res) {
    try {
      if (res.req.params.id)
        await Admin.destroy({ where: { userID: res.req.params.id } });
    } catch (error) {
      console.log(error.message);
    }
    const response = await axios.post(
      res.req.protocol +
        "://" +
        res.req.get("host").replace("localhost", "127.0.0.1") +
        "/dashboard/res/table-admin"
    );
    res.send(response.data);
  }
  //micro views
  async res_dashboard(res) {
    res.render("layouts/dashboard.html");
  }
  async res_admin(res) {
    res.render("layouts/admin-man.html");
  }
  async res_table_show(res) {
    res.render("components/table-admin.html", {
      list: await Admin.findAll({ order: [["userID", "DESC"]] }),
    });
  }
  async res_add_row(res) {
    res.render("components/add-admin.html");
  }
  async res_add(res) {
    const url = res.req.protocol + "://" + res.req.get("host");
    const first = (await axios.post(url + "/dashboard/res/add-row")).data;
    const second = (await axios.post(url + "/dashboard/res/table-admin")).data;
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
}
