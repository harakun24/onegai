import base from "./BaseRouter.js";
import { SubkategoriService } from "../Services/SubkategoriService.js";

const service = new SubkategoriService();
class SubkategoriRouter extends base {
  constructor() {
    super();

    this.route("/subkategori", {
      get: [{ "/": service.render.bind(service) }],
      post: [, { "/add-content": service.create }],
      put: [{ "/update-content/:id": service.update }],
      delete: [
        { "/delete-content/:id": service.delete.bind(service) },
        { "/delete-content-all": service.deleteAll },
      ],
      // micro views
      components: [
        { "/-content": service.res_content },
        { "/-kategori": service.res_kategori },
        { "/-switch": service.switch },
        { "/-table-content": service.res_table_show },
        { "/-search-content/": service.res_search },
        { "/-add-content": service.res_add },
        { "/-edit-content/:id": service.res_edit },
        { "/-row-content/:id": service.res_row },
        { "/-page-goto/:page": service.res_goto },
        { "/-limit-content": service.res_limit },
      ],
    });
  }
}

export default new SubkategoriRouter();
