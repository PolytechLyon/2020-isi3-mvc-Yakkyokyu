export class Controller {
  constructor(model) {
    this.model = model;
    document.getElementById("start").onclick = function() {
      model.run();
    };
    document.getElementById("reset").onclick = function() {
      model.reset();
    };
    document.getElementById("stop").onclick = function() {
      model.stop();
    };
  }
}
