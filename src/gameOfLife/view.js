import { GAME_SIZE, CELL_SIZE } from "./constants";

export class View {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
  }

  drawCell(x, y, value) {
    this.context.fillStyle = value;
    this.context.fillRect(
      x + CELL_SIZE * x,
      y + CELL_SIZE * y,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  initView(controller) {
    document.getElementById("game").appendChild(this.canvas);
    this.canvas.setAttribute("height", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
    this.canvas.setAttribute("width", GAME_SIZE * CELL_SIZE + GAME_SIZE - 1);
    //Ajout de l'observable
    controller.model.addObserver(this);
  }

  //update
  drawGame(model) {
    model.state.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        this.drawCell(rowIndex, columnIndex, value);
      });
    });
  }
}
