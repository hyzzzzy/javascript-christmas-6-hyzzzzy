import Util from '../utils/Util';

class Order {
  #date;
  #menu;
  
  constructor(day, menu) {
    this.#date = day;
    this.#menu = menu;
  }

  get date() {
    return this.#date;
  }

  get menu() {
    return this.#menu;
  }

  calculatePrice(category, quantity) {
    let price = 0;

    if (category) {
      price += category.price * quantity;
    }

    return price;
  }

  calculateTotalPrice() {
    let price = 0;

    for (const order of this.#menu) {
      const { 
        appetizer, main, dessert, beverage 
      } = Util.hasMenuInCategory(order.menu);

      price += this.calculatePrice(appetizer, order.quantity);
      price += this.calculatePrice(main, order.quantity);
      price += this.calculatePrice(dessert, order.quantity);
      price += this.calculatePrice(beverage, order.quantity);
    }

    return price;
  }

  calculateExpectedAmount(totalBenefit) {
    const price = this.calculateTotalPrice();

    return price + totalBenefit;
  }
}

export default Order;