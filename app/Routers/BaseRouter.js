import express, { Router } from "express";
import "colors";

export default class BaseRouter {
  #router;
  #endpoint;
  constructor() {
    this.#router = new express.Router();
  }
  get handler() {
    return [this.#endpoint, this.#router];
  }
  route(ep, routes) {
    this.#endpoint = ep;
    console.log(`\n  @Route  ${ep}`.green);
    let { get, put, post, swap, sub } = routes;
    // console.log([...routes.post, ...routes.swap]);
    const del = routes.delete;

    const match = (temp) => {
      const key = Object.keys(temp)[0];
      const tmp = temp[key];

      if (tmp && tmp.length) {
        tmp.forEach((el) => {
          const k = Object.keys(el)[0];
          if (key == "sub") {
            this.#router.use(k, el[k]);
          } else {
            console.log(
              `   ${key.toUpperCase()}--\t`.magenta +
                // ` ${this.#endpoint}`.cyan +
                `${k == this.#endpoint ? "" : k}`.green
            );
            this.#router[key](k, (req, res) => {
              // req = req;
              el[k](req, res);
            });
          }
        });
      }
    };
    match({ get });
    match({ post });
    match({ put });
    match({ delete: del });
    match({ sub });
    match({ post: swap });
  }
}
