import { ERROR_MESSAGE } from '../constants/message';
import { SETTING } from '../constants/setting'; 
import Util from './Util';
import { APPETIZER, MAIN, DESSERT, BEVERAGE } from '../constants/menu';

const MenuValidator = {
  isMenuInCategory(menu) {
    const isAppetizer = Object.keys(APPETIZER).some(key => APPETIZER[key].name === menu);
    const isMain = Object.keys(MAIN).some(key => MAIN[key].name === menu);
    const isDessert = Object.keys(DESSERT).some(key => DESSERT[key].name === menu);
    const isBeverage = Object.keys(BEVERAGE).some(key => BEVERAGE[key].name === menu);
  
    return { isAppetizer, isMain, isDessert, isBeverage };
  },

  hasMenu(orders) {
    const orderArray = Util.parseInputOrder(orders);
  
    for (const order of orderArray) {
      const {
        isAppetizer, isMain, isDessert, isBeverage
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
     const orderRegex = /^([가-힣]+-[1-9][0-9]*)(?:,([가-힣]+-[1-9][0-9]*))*$/;

    if (!orderRegex.test(orders)) {
      throw new Error(ERROR_MESSAGE.not_menu);
    }
  },

  isUniqueMenu(orders) {
    const orderArray = Util.parseInputOrder(orders);
    const menuSet = new Set();

    for (const order of orderArray) {
      if (menuSet.has(order.menu)) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }

      menuSet.add(order.menu);
    }
  },

  isOnlyBeverage(orders) {
    const orderArray = Util.parseInputOrder(orders);

    if (orderArray.every(order => this.isMenuInCategory(order.menu).isBeverage)) {
      throw new Error(ERROR_MESSAGE.not_menu);
    }
  },

  isTooManyQuantity(orders) {
    const orderArray = Util.parseInputOrder(orders);
    const totalQuantity = orderArray.reduce((total, order) => total + order.quantity, 0);

    if (totalQuantity > SETTING.max_menu) {
      throw new Error(ERROR_MESSAGE.not_menu);
    }
  },
}

export default MenuValidator;