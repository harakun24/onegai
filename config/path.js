import path2 from "path";
import { fileURLToPath as file } from "url";
// export path

export var dir = path2.resolve(path2.dirname(file(import.meta.url)), "../");
export var path = path2;
