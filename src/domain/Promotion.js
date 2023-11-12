import { DATE, PRICE, SPECIAL_DAY } from '../constants/event';
import { BEVERAGE } from '../constants/menu';
import Validate from '../utils/Validate';

class Promotion {
  calculateGiftEvent(price) {
    if (price > PRICE.for_gift) {
      return true;
    }
    return false;
  }

  calculateDDay(price, day) {
    let discount = 0;
    if (price < PRICE.for_benefit) {
      return 0;
    }

    discount = PRICE.for_d_day_init + (day - 1) * PRICE.for_d_day_increase;

    return discount * (-1);
  }

  calculateWeekday(date, orders) {
    let discount = 0;
    const reservationDate = new Date(DATE.year, DATE.month - 1, date);
    const day = reservationDate.getDay();

    if (day === 5 || day === 6) {
      return 0;
    }

    for (const order of orders) {
      const { dessert } = Validate.hasMenuInCategory(order.menu);
      if (dessert) {
        discount += order.quantity * DATE.year;
      }
    }

    return discount * (-1);
  }

  calculateWeekend(date, orders) {
    let discount = 0;
    const reservationDate = new Date(DATE.year, DATE.month - 1, date);
    const day = reservationDate.getDay();

    if (day !== 5 && day !== 6) {
      return 0;
    }

    for (const order of orders) {
      const { main } = Validate.hasMenuInCategory(order.menu);
      if (main) {
        discount += order.quantity * DATE.year;
      }
    }

    return discount * (-1);
  }

  calculateSpecialDay(date) {
    const isSpecial = SPECIAL_DAY.includes(date);

    if (isSpecial) {
      return PRICE.for_special * (-1);
    }

    return 0;
  }

  calculateGiftPrice(price) {
    if (price > PRICE.for_gift) {
      return BEVERAGE.champagne.price * (-1);
    }

    return 0;
  }
}

export default Promotion;