import base from "./BaseRouter.js";
import { KategoriService } from "../Services/KategoriService.js";

const service = new KategoriService();
class KategoriRouter extends base {
  constructor() {
    super();

    this.route("/kategori", {
      // get: [],
      post: [{ "/": service.render }, { "/add-kategori": service.create }],
      put: [{ "/update-kategori/:id": service.update }],
      delete: [
        { "/delete-kategori/:id": service.delete.bind(service) },
        { "/delete-kategori-all": service.deleteAll },
      ],
      // micro views
      components: [
        { "/-table-kategori": service.res_table_show },
        { "/-search-kategori/": service.res_search },
        { "/-add-kategori": service.res_add },
        { "/-edit-kategori/:id": service.res_edit },
        { "/-row-kategori/:id": service.res_row },
        { "/-page-goto/:page": service.res_goto },
        { "/-limit-kategori": service.res_limit },
      ],
    });
  }
}

export default new KategoriRouter();
