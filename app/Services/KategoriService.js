import base from "./BaseService.js";
import { Op } from "sequelize";

const { Kategori } = base.models;
export class KategoriService extends base {
  constructor() {
    super("kategori");
  }
  async render(req, res) {
    req.session.search = "";
    req.session.page = 0;
    req.session.limit = 5;
    res.render("layouts/kategori-man.html", {
      list: await Kategori.findAll(),
    });
  }
  //data management
  async create(req, res) {
    try {
      if (req.body) await Kategori.create(req.body);
    } catch (error) {
      console.log(error.message);
    }
    findAll(req, res);
  }

  async update(req, res) {
    try {
      if (req.body) {
        await Kategori.update(req.body, {
          where: { id_kategori: req.params.id },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    res.render("components/kategori/row-content.html", {
      item: (
        await Kategori.findAll({ where: { id_kategori: req.params.id } })
      )[0],
    });
  }

  async delete(req, res) {
    if (req.params.id)
      await deleting(req, res, { where: { id_kategori: req.params.id } });
    else this.res_table_show(req, res);
    // else res.redirect("/dashboard/-table-admin");
  }
  async deleteAll(req, res) {
    await deleting(req, res, { where: {}, truncate: true });
  }

  //micro views

  async res_table_show(req, res) {
    findAll(req, res);
  }
  async res_add(req, res) {
    res.render("components/kategori/add-content.html", {
      list: await Kategori.findAll({
        where: {
          nama_kategori: {
            [Op.like]: `%${req.session.search}%`,
          },
        },
        limit: req.session.limit,
        offset: req.session.page * req.session.limit,
        order: [["id_kategori", "DESC"]],
      }),
      count: await Kategori.count({
        where: {
          nama_kategori: {
            [Op.like]: `%${req.session.search}%`,
          },
        },
      }),
    });
  }
  async res_edit(req, res) {
    res.render("components/kategori/edit-content.html", {
      data: (
        await Kategori.findAll({ where: { id_kategori: req.params.id } })
      )[0],
    });
  }
  async res_row(req, res) {
    res.render("components/kategori/row-content.html", {
      item: (
        await Kategori.findAll({ where: { id_kategori: req.params.id } })
      )[0],
    });
  }
  async res_search(req, res) {
    req.session.search = req.body.name || "";
    req.session.page = 0;
    findAll(req, res);
  }
  async res_goto(req, res) {
    if (req.params.page) req.session.page = req.params.page - 0;
    findAll(req, res);
  }
  async res_limit(req, res) {
    req.session.limit = req.body.limit;
    req.session.page = 0;

    findAll(req, res);
  }
}

const findAll = async (req, res) => {
  req.session.page = req.session.page ?? 0;
  req.session.limit = req.session.limit ?? 5;
  req.session.search = req.session.search ?? "";

  const count = await Kategori.count({
    where: {
      nama_kategori: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
  });
  const rawResult = await Kategori.findAll({
    where: {
      nama_kategori: {
        [Op.like]: `%${req.session.search}%`,
      },
    },
    limit: req.session.limit,
    offset: req.session.page * req.session.limit,
    order: [["id_kategori", "DESC"]],
  });

  res.render("components/kategori/table-content.html", {
    list: rawResult,
    count: Math.ceil(count / req.session.limit),
  });
};

const deleting = async (req, res, option) => {
  try {
    await Kategori.destroy(option);
  } catch (error) {
    console.log(error.message);
  }
  // req.session.search = "";
  const tempPage =
    Math.ceil(
      (await Kategori.count({
        where: { nama_kategori: { [Op.like]: `%${req.session.search}%` } },
      })) / req.session.limit
    ) - 1;
  req.session.page = tempPage < req.session.page ? tempPage : req.session.page;
  findAll(req, res);
};