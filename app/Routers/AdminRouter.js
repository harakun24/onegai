import base from "./BaseRouter.js";
import { AdminService } from "../Services/AdminService.js";

export class AdminRouter extends base {
  constructor() {
    super("admin");

    const service = new AdminService();
    this.route("/dashboard", {
      get: [{ "/": service.render }],
      post: [
        { "/add-admin": service.create },
        {
          "/res/dashboard": service.res_dashboard,
        },
        {
          "/res/admin": service.res_admin,
        },
        { "/res/table-admin": service.res_table_show },
        { "/res/search-admin/": service.res_search },
        { "/res/add-row-admin": service.res_add_row },
        { "/res/add-admin": service.res_add },
        { "/res/edit-admin/:id": service.res_edit },
        { "/res/row-admin/:id": service.res_row },
      ],
      put: [{ "/update-admin/:id": service.update }],
      delete: [{ "/delete-admin/:id": service.delete }],
    });
  }
}
