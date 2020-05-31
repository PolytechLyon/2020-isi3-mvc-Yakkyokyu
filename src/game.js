import "./style.css";
import { View } from "./gameOfLife/view";
import { Model } from "./gameOfLife/model";
import { Controller } from "./gameOfLife/controller.js";

const model = new Model();
const view = new View();
const controller = new Controller(model);
model.init();
view.initView(controller);
view.drawGame(model);
