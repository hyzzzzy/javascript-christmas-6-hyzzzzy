import { ERROR_MESSAGE } from '../constants/message';
import { SETTING } from '../constants/setting'; 
import { DATE } from '../constants/event';
import Util from './Util';
import { APPETIZER, MAIN, DESSERT, BEVERAGE } from '../constants/menu';

const Validate = {
  isDay(num) {
    num = Number(num);
    if (num < DATE.min_day || num > DATE.max_day) {
      throw new Error(ERROR_MESSAGE.not_date);
    }
  },

  isNaturalNumber(num) {
    num = Number(num);
    if (num <= 0 || num !== Math.floor(num)) {
      throw new Error(ERROR_MESSAGE.not_date);
    }
  },

  isMenuInCategory(menu) {
    const isAppetizer = Object.keys(APPETIZER).some(key => APPETIZER[key].name === menu);
    const isMain = Object.keys(MAIN).some(key => MAIN[key].name === menu);
    const isDessert = Object.keys(DESSERT).some(key => DESSERT[key].name === menu);
    const isBeverage = Object.keys(BEVERAGE).some(key => BEVERAGE[key].name === menu);
  
    return { isAppetizer, isMain, isDessert, isBeverage };
  },

  hasMenuInCategory(menu) {
    const appetizer = Object.values(APPETIZER).find((item) => item.name === menu);
    const main = Object.values(MAIN).find((item) => item.name === menu);
    const dessert = Object.values(DESSERT).find((item) => item.name === menu);
    const beverage = Object.values(BEVERAGE).find((item) => item.name === menu);

    return { appetizer, main, dessert, beverage };
  },

  hasMenu(orders) {
    const orderArray = Util.parseInputOrder(orders);
  
    for (const order of orderArray) {
      const {
        isAppetizer, 
        isMain, 
        isDessert, 
        isBeverage
       } = this.isMenuInCategory(order.menu);

      if (!isAppetizer && !isMain && !isDessert && !isBeverage) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }
    }
  },

  hasMinQuantity(orders) {
    const orderArray = Util.parseInputOrder(orders);
    
    for (const order of orderArray) {
      if (order.quantity < SETTING.min_menu) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }
    }
  },

  isMenuFormat(orders) {
    const orderArray = orders.split(',').map((v) => v.trim());
    for (const order of orderArray) {
      const orderDetail = order.split('-');

      if (orderDetail.length !== SETTING.order_partial_length
        || isNaN(orderDetail[1])) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }
    }
  },

  isUniqueMenu(orders) {
    const orderArray = Util.parseInputOrder(orders);
    const menuSet = new Set();

    for (const order of orderArray) {
      const menu = order.menu;

      if (menuSet.has(menu)) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }

      menuSet.add(menu);
    }
  },

  isOnlyBeverage(orders) {
    const orderArray = Util.parseInputOrder(orders);
    let count = 0;

    for (const order of orderArray) {
      const { isBeverage } = this.isMenuInCategory(order.menu);
      if (isBeverage) {
        count++;
      }
    }

    if (count === orderArray.length) {
      throw new Error(ERROR_MESSAGE.not_menu);
    }
  },

  isTooManyQuantity(orders) {
    const orderArray = Util.parseInputOrder(orders);
    let count = 0;

    for (const order of orderArray) {
      count += order.quantity;
    }

    if (count > SETTING.max_menu) {
      throw new Error(ERROR_MESSAGE.not_menu);
    }
  },
};

export default Validate;