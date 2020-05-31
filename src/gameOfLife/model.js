import {
  GAME_SIZE,
  CELL_STATES,
  DEFAULT_ALIVE_PAIRS,
  RENDER_INTERVAL
} from "./constants";

export class Model {
  constructor() {
    //Def Observer
    this.observers = [];
    this.addObserver = function(observer) {
      this.observers.push(observer);
    };
    //Fin Def Observer
    this.width = GAME_SIZE;
    this.height = GAME_SIZE;
    this.raf = null;
  }

  init() {
    this.state = Array.from(new Array(this.height), () =>
      Array.from(new Array(this.width), () => CELL_STATES.NONE)
    );
    DEFAULT_ALIVE_PAIRS.forEach(([x, y]) => {
      this.state[y][x] = CELL_STATES.ALIVE;
    });
    this.updated();
  }

  run(date = new Date().getTime()) {
    this.raf = requestAnimationFrame(() => {
      const copyState = this.state.map(function(arr) {
        return arr.slice();
      });
      const currentTime = new Date().getTime();
      if (currentTime - date > RENDER_INTERVAL) {
        for (let i = 0; i < this.width; i++) {
          for (let j = 0; j < this.width; j++) {
            const nbAlive = this.aliveNeighbours(i, j);
            // TODO implement Game of life logic
            switch (nbAlive) {
              case 2:
                break;
              case 3:
                copyState[j][i] = CELL_STATES.ALIVE;
                break;
              default:
                if (this.isCellAlive(i, j)) {
                  copyState[j][i] = CELL_STATES.DEAD;
                }
                break;
            }
          }
        }
        this.state = Array.from(copyState);
        this.updated();
        this.run(currentTime);
      } else {
        this.run(date);
      }
    });
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  reset() {
    this.stop();
    this.init();
  }

  isCellAlive(x, y) {
    return x >= 0 &&
      y >= 0 &&
      y < this.height &&
      x < this.height &&
      this.state[y][x] === CELL_STATES.ALIVE
      ? 1
      : 0;
  }
  aliveNeighbours(x, y) {
    let number = 0;
    // TODO
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (i !== x || j !== y) {
          number += this.isCellAlive(i, j);
        }
      }
    }
    return number;
  }

  //Notify
  updated() {
    // TODO update the view
    var self = this;
    this.observers.forEach(function(observer) {
      observer.drawGame(self);
    });
  }
}
