import { models } from "../Models/index.js";
import "colors";

export default class BaseService {
  static models = models;
  static baseUrl = (req) => {
    return (
      req.protocol + "://" + req.get("host").replace("localhost", "127.0.0.1")
    );
  };
  constructor(name) {
    console.log(`   @service: ${name}`.yellow);
  }
}
