import { PRICE, DATE, WEEKEND } from '../constants/event';
import Util from '../utils/Util';

const WeekDiscount = {
  calculateCategoryDiscount(quantity, category, discount) {
    if (category) {
      discount += quantity * DATE.year;
    }
    
    return discount;
  },

  calculateWeekday(date, orders, price) {
    const orderDate = new Date(DATE.year, DATE.month - 1, date);
    const day = orderDate.getDay();
    
    if (price < PRICE.for_benefit || WEEKEND.includes(day)) {
      return 0;
    }

    return orders.reduce((discount, order) => {
      const { dessert } = Util.hasMenuInCategory(order.menu);

      return this.calculateCategoryDiscount(order.quantity, dessert, discount);
    }, 0) * (-1);
  },

  calculateWeekend(date, orders, price) {
    const orderDate = new Date(DATE.year, DATE.month - 1, date);
    const day = orderDate.getDay();
    
    if (price < PRICE.for_benefit || !WEEKEND.includes(day)) {
      return 0;
    }

    return orders.reduce((discount, order) => {
      const { main } = Util.hasMenuInCategory(order.menu);

      return this.calculateCategoryDiscount(order.quantity, main, discount);
    }, 0) * (-1);
  },
}

export default WeekDiscount;