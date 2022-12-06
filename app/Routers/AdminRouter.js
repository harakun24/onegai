/** @format */

import base from "./BaseRouter.js";
import { AdminService } from "../Services/AdminService.js";
import Kategori from "./KategoriRouter.js";
import Subkategori from "./SubkategoriRouter.js";
import Divisi from "./DivisiRouter.js";

const service = new AdminService();
class AdminRouter extends base {
  constructor() {
    super();

    this.route("/dashboard", {
      get: [{ "/": service.render }],
      post: [{ "/add-content": service.create }],
      put: [{ "/update-content/:id": service.update }],
      delete: [
        { "/delete-content/:id": service.delete.bind(service) },
        { "/delete-content-all": service.deleteAll },
      ],
      sub: [
        { "/kategori": Kategori.handler[1] },
        { "/subkategori": Subkategori.handler[1] },
        { "/divisi": Divisi.handler[1] },
      ],
      // micro views
      components: [
        {
          "/dashboard": service.res_dashboard,
        },
        {
          "/admin": service.admin.bind(service),
        },
        {
          "/-admin": service.res_admin,
        },
        { "/-table-content": service.res_table_show },
        { "/-search-content": service.res_search },
        { "/-add-content": service.res_add },
        { "/-edit-content/:id": service.res_edit },
        { "/-row-content/:id": service.res_row },
        { "/-page-goto/:page": service.res_goto },
        { "/-limit-content": service.res_limit },
      ],
    });
  }
}

export default new AdminRouter();
