import { models } from "../Models/index.js";
import "colors";

export default class BaseService {
  static models = models;
  constructor(name) {
    console.log(`   └service: ${name}`.yellow + " ✓".green);
  }
}
