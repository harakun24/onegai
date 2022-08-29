import express from "express";
import "colors";

export class BaseRouter {
  #router;
  #ep;
  constructor(name) {
    console.log(`\n @Router ${name}`.yellow);
    this.#router = new express.Router();
  }
  get driver() {
    return { rt: this.#router, ep: this.#ep };
  }
  set driver(ep) {
    this.#ep = ep;
  }
  bound(list, service) {
    for (const l of list) {
      const ep = l.substring(0, l.indexOf("<@"));
      const m = l.substring(l.indexOf("<@") + 2, l.indexOf(">"));
      const h = l.substring(l.indexOf(">") + 1);
      this.#router[m](ep, (req, res, next) => {
        res.req = req;
        res.next = next;
        service[h](res);
      });
      console.log(`   └`.yellow + `End-point ${ep}`.magenta);
    }
  }
}
