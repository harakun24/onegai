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
    console.log(`  @Route  ${ep}`.green);
    let { get, put, post, components, sub } = routes;
    const del = routes.delete;

    const match = (temp) => {
      const key = Object.keys(temp)[0];
      const tmp = temp[key];

      if (tmp && tmp.length) {
        tmp.forEach((el) => {
          const k = Object.keys(el)[0];
          if (key == "sub") {
            this.#router.use(k, el[k]);
            console.log(`    ${key.toUpperCase()}\t\t`.cyan + `${k}`.yellow);
          } else {
            this.#router[key](k, (req, res) => {
              // req = req;
              el[k](req, res);
            });
            console.log(`   ${key.toUpperCase()}  \t`.magenta + `${k}`.green);
          }
        });
      }
    };
    match({ get });
    match({ post });
    match({ put });
    match({ delete: del });
    match({ get: components });
    match({ sub });
  }
}
