import { BADGE, DATE, PRICE, SPECIAL_DAY, WEEKEND } from '../constants/event';
import { BEVERAGE } from '../constants/menu';
import Util from '../utils/Util';

class Promotion {
  calculateGiftEvent(price) {
    if (price > PRICE.for_gift) {
      return true;
    }

    return false;
  }

  calculateDDay(price, date) {
    if (price < PRICE.for_benefit || date > DATE.christmas) {
      return 0;
    }

    let discount = PRICE.for_d_day_init + (date - 1) * PRICE.for_d_day_increase;

    return discount * (-1);
  }

  calculateCategoryDiscount(order, category, discount) {
    if (category) {
      discount += order.quantity * DATE.year;
    }
    
    return discount;
  }

  calculateWeekday(date, orders) {
    const orderDate = new Date(DATE.year, DATE.month - 1, date);
    const day = orderDate.getDay();
    
    if (WEEKEND.includes(day)) return 0;

    return orders.reduce((discount, order) => {
      const { dessert } = Util.hasMenuInCategory(order.menu);

      return this.calculateCategoryDiscount(order, dessert, discount);
    }, 0) * (-1);
  }

  calculateWeekend(date, orders) {
    const orderDate = new Date(DATE.year, DATE.month - 1, date);
    const day = orderDate.getDay();
    
    if (!WEEKEND.includes(day)) return 0;
    
    return orders.reduce((discount, order) => {
      const { main } = Util.hasMenuInCategory(order.menu);

      return this.calculateCategoryDiscount(order, main, discount);
    }, 0) * (-1);
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

  calculateTotalBenefit(dDay, weekday, weekend, special, gift) {
    return dDay + weekday + weekend + special + gift;
  }

  calculateEventBadge(price) {
    const sortedBadges = BADGE.slice().sort((a, b) => b.price - a.price);
    const badge = sortedBadges.find(b => Math.abs(price) >= b.price);

    if (badge) {
      return badge.name;
    }

    return false;
  }

  calculateAllBenefits(price, date, menu) {
    const dDay = this.calculateDDay(price, date);
    const weekday = this.calculateWeekday(date, menu);
    const weekend = this.calculateWeekend(date, menu);
    const special = this.calculateSpecialDay(date);
    const gift = this.calculateGiftPrice(price);
    const totalBenefit = this.calculateTotalBenefit(dDay, weekday, weekend, special, gift);

    return { dDay, weekday, weekend, special, gift, totalBenefit };
  }
}

export default Promotion;