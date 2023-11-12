import Util from '../utils/Util';

class Order {
  #date;
  #menu;
  
  constructor(date, menu) {
    this.#date = date;
    this.#menu = menu;
  }

  get date() {
    return this.#date;
  }

  get menu() {
    return this.#menu;
  }

  calculatePrice(category, quantity) {
    if (!category) {
      return 0;
    }

    return category.price * quantity;
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