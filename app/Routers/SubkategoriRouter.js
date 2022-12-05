import base from "./BaseRouter.js";
import { SubkategoriService } from "../Services/SubkategoriService.js";

const service = new SubkategoriService();
class SubkategoriRouter extends base {
  constructor() {
    super();

    this.route("/subkategori", {
      // get: [],
      post: [{ "/": service.render }, { "/add-subkategori": service.create }],
      put: [{ "/update-subkategori/:id": service.update }],
      delete: [
        { "/delete-subkategori/:id": service.delete.bind(service) },
        { "/delete-subkategori-all": service.deleteAll },
      ],
      // micro views
      components: [
        { "/-kategori": service.res_kategori },
        { "/-table-subkategori": service.res_table_show },
        { "/-search-subkategori/": service.res_search },
        { "/-add-subkategori": service.res_add },
        { "/-edit-subkategori/:id": service.res_edit },
        { "/-row-subkategori/:id": service.res_row },
        { "/-page-goto/:page": service.res_goto },
        { "/-limit-subkategori": service.res_limit },
      ],
    });
  }
}

export default new SubkategoriRouter();
