import base from "./BaseService.js";
import { Op } from "sequelize";

const { Kategori, Subkategori } = base.models;
export class SubkategoriService extends base {
  constructor() {
    super("kategori");
  }
  async render(req, res) {
    req.session.search = "";
    req.session.page = 0;
    req.session.limit = 5;
    req.session.kat = (
      await Kategori.findAll({
        limit: 1,
        raw: true,
        attributes: ["id_kategori"],
      })
    )[0].id_kategori;
    console.log(req.session.kat);
    res.render("layouts/subkategori-man.html", {
      // list: await Kategori.findAll(),
    });
  }
  //data management
  async create(req, res) {
    try {
      if (req.body)
        await Subkategori.create({ ...req.body, fk_kategori: req.session.kat });
    } catch (error) {
      console.log(error.message);
    }
    findAll(req, res);
  }

  async update(req, res) {
    try {
      if (req.body) {
        await Subkategori.update(req.body, {
          where: { id_sub: req.params.id },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    res.render("components/subkategori/row-content.html", {
      item: (
        await Subkategori.findAll({ where: { id_sub: req.params.id } })
      )[0],
    });
  }

  async delete(req, res) {
    if (req.params.id)
      await deleting(req, res, { where: { id_sub: req.params.id } });
    else this.res_table_show(req, res);
    // else res.redirect("/dashboard/-table-admin");
  }
  async deleteAll(req, res) {
    await deleting(req, res, { where: {}, truncate: true });
  }

  //micro views
  async res_kategori(req, res) {
    res.render("components/subkategori/kategori-select.html", {
      data: await Kategori.findAll(),
    });
  }
  async res_table_show(req, res) {
    findAll(req, res);
  }
  async res_add(req, res) {
    res.render("components/subkategori/add-content.html", {
      list: await Subkategori.findAll({
        where: {
          nama_sub: {
            [Op.like]: `%${req.session.search}%`,
          },
          fk_kategori: req.session.kat,
        },
        limit: req.session.limit,
        offset: req.session.page * req.session.limit,
        order: [["id_sub", "DESC"]],
      }),
      current: req.session.page,
      count: await Subkategori.count({
        where: {
          nama_sub: {
            [Op.like]: `%${req.session.search}%`,
          },
          fk_kategori: req.session.kat,
        },
      }),
    });
  }
  async res_edit(req, res) {
    res.render("components/subkategori/edit-content.html", {
      data: (
        await Subkategori.findAll({ where: { id_sub: req.params.id } })
      )[0],
    });
  }
  async res_row(req, res) {
    res.render("components/subkategori/row-content.html", {
      item: (
        await Subkategori.findAll({ where: { id_sub: req.params.id } })
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
  async switch(req, res) {
    req.session.kat = req.body.kategori ?? req.session.kat;
    findAll(req, res);
  }
}

const findAll = async (req, res) => {
  req.session.page = req.session.page ?? 0;
  req.session.limit = req.session.limit ?? 5;
  req.session.search = req.session.search ?? "";
  req.session.kat =
    req.session.kat ??
    (
      await Kategori.findAll({
        limit: 1,
        raw: true,
        attributes: ["id_kategori"],
      })
    )[0].id_kategori;
  const count = await Subkategori.count({
    where: {
      nama_sub: {
        [Op.like]: `%${req.session.search}%`,
      },
      fk_kategori: req.session.kat,
    },
  });
  const rawResult = await Subkategori.findAll({
    where: {
      nama_sub: {
        [Op.like]: `%${req.session.search}%`,
      },
      fk_kategori: req.session.kat,
    },
    limit: req.session.limit,
    offset: req.session.page * req.session.limit,
    order: [["id_sub", "DESC"]],
  });

  res.render("components/subkategori/table-content.html", {
    list: rawResult,
    current: req.session.page,
    count: Math.ceil(count / req.session.limit),
  });
};

const deleting = async (req, res, option) => {
  try {
    await Subkategori.destroy(option);
  } catch (error) {
    console.log(error.message);
  }
  // req.session.search = "";
  const tempPage =
    Math.ceil(
      (await Subkategori.count({
        where: {
          nama_sub: { [Op.like]: `%${req.session.search}%` },
          fk_kategori: req.session.kat,
        },
      })) / req.session.limit
    ) - 1;
  req.session.page = tempPage < req.session.page ? tempPage : req.session.page;
  findAll(req, res);
};
