import { DATE } from '../constants/setting.js';

class Order {
  #date;
  #menu;

  constructor(day, menu) {
    this.#date = new Date(DATE.year, DATE.month - 1, day);
    this.#menu = menu;
  }
}

export default Order;