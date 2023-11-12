import { Console } from '@woowacourse/mission-utils';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Order from './domain/Order.js';
import Promotion from './domain/Promotion.js';

class App {
  #order;
  #promotion;

  async run() {
    await this.readOrder();
    this.printOrderList();
    this.printGiftList();
    this.printBenefitList();
    this.printTotalPrice();
    this.printEventBadge();
  }
  
  async readOrder() {
    OutputView.printIntro();
    const day = await this.readUserInput(InputView.readDay);
    const menu = await this.readUserInput(InputView.readMenu);
    this.#order = new Order(day, menu);
    OutputView.printPreview(this.#order.date);
  }
  
  printOrderList() {
    OutputView.printMenu(this.#order.menu);
    OutputView.printPriceBeforeDiscount(this.#order);
  }

  printGiftList() {
    this.#promotion = new Promotion();
    const price = this.#order.calculateTotalPrice();
    const isOverPrice = this.#promotion.calculateGiftEvent(price);
    OutputView.printGiftMenu(isOverPrice);
  }
  
  printBenefitList() {
    const price = this.#order.calculateTotalPrice();
    const { 
      dDay, weekday, weekend, special, gift
    } = this.#promotion.getAllBenefits(price, this.#order.date, this.#order.menu);
    
    OutputView.printAllBenefit(dDay, weekday, weekend, special, gift);
  }
  
  printTotalPrice() {
    const price = this.#order.calculateTotalPrice();
    const { totalBenefit } = this.#promotion.getAllBenefits(price, this.#order.date, this.#order.menu);
    const expectedAmount = this.#order.calculateExpectedAmount(totalBenefit);
    
    OutputView.printBenefitPrice(totalBenefit);
    OutputView.printPriceAfterDiscount(expectedAmount);
  }
  
  printEventBadge() {
    const price = this.#order.calculateTotalPrice();
    const { totalBenefit } = this.#promotion.getAllBenefits(price, this.#order.date, this.#order.menu);
    const badge = this.#promotion.calculateEventBadge(totalBenefit);

    OutputView.printBadge(badge);
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
