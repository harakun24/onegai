import express from "express";
import "colors";

export default class BaseRouter {
  #router;
  #endpoint;
  constructor(name) {
    console.log(`\n └Router ${name}`.blue + " ✓".green);
    this.#router = new express.Router();
  }
  get handler() {
    return [this.#endpoint, this.#router];
  }
  route(ep, routes) {
    this.#endpoint = ep;
    const { get, post, put, sub } = routes;
    const del = routes.delete;

    const match = (temp) => {
      const key = Object.keys(temp)[0];
      const tmp = temp[key];

      if (tmp && tmp.length) {
        tmp.forEach((el) => {
          const k = Object.keys(el)[0];
          if (key == "sub") {
          } else {
            console.log(`   └${key.toUpperCase()} ${k}`.magenta);
            this.#router[key](k, (req, res) => {
              res.req = req;
              el[k](res);
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
  }
}
