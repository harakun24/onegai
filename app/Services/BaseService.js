import "colors";

export default class BaseService {
  constructor(name) {
    console.log(`   └service: ${name}`.yellow + " ✓".green);
  }
}
