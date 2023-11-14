import { BADGE, DATE, PRICE, SPECIAL_DAY, WEEKEND } from '../constants/event';
import { BEVERAGE } from '../constants/menu';
import Util from '../utils/Util';

class Promotion {
  calculateGiftEvent(price) {
    if (price >= PRICE.for_gift) {
      return true;
    }

    return false;
  }

  calculateDDay(price, date) {
    if (price < PRICE.for_benefit || date > DATE.christmas) {
      return 0;
    }

    const discount = PRICE.for_d_day_init + (date - 1) * PRICE.for_d_day_increase;

    return discount * (-1);
  }

  calculateCategoryDiscount(quantity, category, discount) {
    if (category) {
      discount += quantity * DATE.year;
    }
    
    return discount;
  }

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
  }

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
  }

  calculateSpecialDay(date, price) {
    const isSpecial = SPECIAL_DAY.includes(date);

    if (isSpecial && price >= PRICE.for_benefit) {
      return PRICE.for_special * (-1);
    }

    return 0;
  }

  calculateGiftPrice(price) {
    const gift = this.calculateGiftEvent(price);

    if (gift) {
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
    const weekday = this.calculateWeekday(date, menu, price);
    const weekend = this.calculateWeekend(date, menu, price);
    const special = this.calculateSpecialDay(date, price);
    const gift = this.calculateGiftPrice(price);
    const totalBenefit = this.calculateTotalBenefit(dDay, weekday, weekend, special, gift);

    return { dDay, weekday, weekend, special, gift, totalBenefit };
  }
}

export default Promotion;