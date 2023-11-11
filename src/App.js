import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Order from './domain/Order.js';

class App {
  #order;

  async run() {
    OutputView.printIntro();
    await this.makeReservation();
  }
  
  async makeReservation() {
    const day = await this.readUserInput(InputView.readDay);
    const menu = await this.readUserInput(InputView.readMenu);
    this.#order = new Order(day, menu);
  }

  async readUserInput(inputFunction, functionParameter) {
    try {
      return await inputFunction(functionParameter);
    } catch (e) {
      Console.print(e.message);
      return this.readUserInput(inputFunction, functionParameter);
    }
  }
}

export default App;
