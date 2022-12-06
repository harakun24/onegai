/** @format */

import base from "./BaseService.js";
import { Op } from "sequelize";

const { Divisi } = base.models;
export class DivisiService extends base {
  constructor() {
    super("kategori");
  }
  async render(req, res) {
    if (req.header("mode") == "tab") {
      this.res_content(req, res);
    } else {
      req.session.layout = "dashboard/divisi/-content";
      res.redirect("/");
    }
  }
  //data management
  async create(req, res) {
    try {
      if (req.body) await Divisi.create(req.body);
    } catch (error) {
      console.log(error.message);
    }
    findAll(req, res);
  }

  async update(req, res) {
    try {
      if (req.body) {
        await Divisi.update(req.body, {
          where: { id_divisi: req.params.id },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    res.render("components/divisi/row-content.html", {
      item: (await Divisi.findAll({ where: { id_divisi: req.params.id } }))[0],
    });
  }

  async delete(req, res) {
    if (req.params.id)
      await deleting(req, res, { where: { id_divisi: req.params.id } });
    else this.res_table_show(req, res);
    // else res.redirect("/dashboard/-table-admin");
  }
  async deleteAll(req, res) {
    await deleting(req, res, { where: {}, truncate: true });
  }

  //micro views
  async res_content(req, res) {
    req.session.search = "";
    req.session.page = 0;
    req.session.limit = 5;
    res.render("layouts/divisi-man.html", {
      // list: await Divisi.findAll(),
    });
  }
  async res_table_show(req, res) {
    findAll(req, res);
  }
  async res_add(req, res) {
    req.session.page = 0;
    res.render("components/divisi/add-content.html", {
      list: await Divisi.findAll({
        where: {
          nama_divisi: {
            [Op.like]: `%${req.session.search}%`,
          },
        },
        limit: req.session.limit,
        offset: req.session.page * req.session.limit,
        order: [["id_divisi", "DESC"]],
      }),
      current: req.session.page,
      count: Math.ceil(
        (await Divisi.count({
          where: {
            nama_divisi: {
              [Op.like]: `%${req.session.search}%`,
            },
          },
        })) / req.session.limit
      ),
    });
  }
  async res_edit(req, res) {
    res.render("components/divisi/edit-content.html", {
      data: (await Divisi.findAll({ where: { id_divisi: req.params.id } }))[0],
    });
  }
  async res_row(req, res) {
    res.render("components/divisi/row-content.html", {
      item: (await Divisi.findAll({ where: { id_divisi: req.params.id } }))[0],
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
  req.session.limit = req.session.limit ?? 5;
  req.session.search = req.session.search ?? "";

  const count = await Divisi.count({
    where: {
      nama_divisi: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
  });
  const rawResult = await Divisi.findAll({
    where: {
      nama_divisi: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
    limit: req.session.limit,
    offset: req.session.page * req.session.limit,
    order: [["id_divisi", "DESC"]],
  });

  res.render("components/divisi/table-content.html", {
    list: rawResult,
    current: req.session.page,
    count: Math.ceil(count / req.session.limit),
  });
};

const deleting = async (req, res, option) => {
  try {
    await Divisi.destroy(option);
  } catch (error) {
    console.log(error.message);
  }
  // req.session.search = "";
  const tempPage =
    Math.ceil(
      (await Divisi.count({
        where: { nama_divisi: { [Op.like]: `%${req.session.search}%` } },
      })) / req.session.limit
    ) - 1;
  req.session.page = tempPage < req.session.page ? tempPage : req.session.page;
  findAll(req, res);
};
