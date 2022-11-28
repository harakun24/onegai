import { ModelAdapter } from "./ModelAdapter.js";

const adapter = new ModelAdapter();
export default adapter;
export var models = adapter.list;
