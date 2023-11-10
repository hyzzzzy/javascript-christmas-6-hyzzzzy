import { SETTING, ERROR_MESSAGE } from '../constants/message';
import Util from './Util';
import { APPETIZER, MAIN, DESSERT, BEVERAGE } from '../constants/menu';

const Validate = {
  isDay(num) {
    num = Number(num);
    if (num < SETTING.min_day || num > SETTING.max_day) {
      throw new Error(ERROR_MESSAGE.not_date);
    }
  },

  isNaturalNumber(num) {
    num = Number(num);
    if (num <= 0 || num !== Math.floor(num)) {
      throw new Error(ERROR_MESSAGE.not_date);
    }
  },

  hasMenu(orders) {
    const orderArray = Util.parseInputOrder(orders);
  
    orderArray.forEach((order) => {
      if (!APPETIZER.hasOwnProperty(order.menu)
      || !MAIN.hasOwnProperty(order.menu)
      || !DESSERT.hasOwnProperty(order.menu)
      || !BEVERAGE.hasOwnProperty(order.menu)) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }
    });
  },

  hasMinQuantity(orders) {
    const orderArray = Util.parseInputOrder(orders);

    orderArray.forEach((order) => {
      if (order.quantity < SETTING.min_menu
        || this.isNaturalNumber(order.quantity)) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }
    });
  },

  isMenuFormat(orders) {
    const orderArray = orders.split(',').map((v) => v.trim());
    orderArray.forEach((order) => {
      const orderDetail = order.split('-');

      if (orderDetail.length !== SETTING.order_partial_length) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }
    });
  },

  isUniqueMenu(orders) {
    const orderArray = orders.split(',').map((v) => v.trim());
    const menuSet = new Set();

    orderArray.forEach((order) => {
      const [menu] = order;

      if (menuSet.has(menu)) {
        throw new Error(ERROR_MESSAGE.not_menu);
      }

      menuSet.add(menu);
    });
  },

  isOnlyBeverage(orders) {
    const orderArray = orders.split(',').map((v) => v.trim());
    const count = 0;

    orderArray.forEach((order) => {
      if (BEVERAGE.hasOwnProperty(order.menu)) {
        count++;
      }
    });

    if (count === orderArray.length) {
      throw new Error(ERROR_MESSAGE.only_beverage);
    }
  },

  isTooManyQuantity(orders) {
    const orderArray = Util.parseInputOrder(orders);
    const count = 0;

    orderArray.forEach((order) => {
      count += order.quantity;
    });

    if (count === SETTING.max_menu) {
      throw new Error(ERROR_MESSAGE.too_many_order);
    }
  },
};

export default Validate;