/** @format */

import base from "./BaseRouter.js";
import { KategoriService } from "../Services/KategoriService.js";

const service = new KategoriService();
class KategoriRouter extends base {
  constructor() {
    super();

    this.route("/", {
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

export default new KategoriRouter();
