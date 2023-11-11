import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Order from './domain/Order.js';
import Promotion from './domain/Promotion.js';

class App {
  #order;
  #promotion;

  async run() {
    OutputView.printIntro();
    await this.makeReservation();
    OutputView.printPreview(this.#order.date);
    OutputView.printMenu(this.#order.menu);
    OutputView.printPriceBeforeDiscount(this.#order);
    this.printGiftList();
  }
  
  async makeReservation() {
    const day = await this.readUserInput(InputView.readDay);
    const menu = await this.readUserInput(InputView.readMenu);
    this.#order = new Order(day, menu);
  }

  printGiftList() {
    this.#promotion = new Promotion();
    const price = this.#order.calculateTotalPrice();
    const isOverPrice = this.#promotion.calculateGiftEvent(price);
    OutputView.printGiftMenu(isOverPrice);
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
