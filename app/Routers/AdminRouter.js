import base from "./BaseRouter.js";
import { AdminService } from "../Services/AdminService.js";

const service = new AdminService();
class partial_views extends base {
  constructor() {
    super();
    this.route("/", {
      post: [
        {
          "/dashboard": service.res_dashboard,
        },
        {
          "/admin": service.res_admin,
        },
        { "/table-admin": service.res_table_show },
        { "/search-admin/": service.res_search },
        { "/add-admin": service.res_add },
        { "/edit-admin/:id": service.res_edit },
        { "/row-admin/:id": service.res_row },
        { "/page-admin": service.res_page },
        { "/page-goto/:page": service.res_goto },
        { "/limit-admin": service.res_limit },
      ],
    });
  }
}
class AdminRouter extends base {
  constructor() {
    super();

    this.route("/dashboard", {
      get: [{ "/": service.render }],
      post: [{ "/add-admin": service.create }],
      put: [{ "/update-admin/:id": service.update }],
      delete: [
        { "/delete-admin/:id": service.delete },
        { "/delete-admin-all": service.deleteAll },
      ],
      // micro views
      views: [
        {
          "/-dashboard": service.res_dashboard,
        },
        {
          "/-admin": service.res_admin,
        },
        { "/-table-admin": service.res_table_show },
        { "/-search-admin/": service.res_search },
        { "/-add-admin": service.res_add },
        { "/-edit-admin/:id": service.res_edit },
        { "/-row-admin/:id": service.res_row },
        { "/-page-admin": service.res_page },
        { "/-page-goto/:page": service.res_goto },
        { "/-limit-admin": service.res_limit },
      ],
    });
  }
}

export default new AdminRouter();
