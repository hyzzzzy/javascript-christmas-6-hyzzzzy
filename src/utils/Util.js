import { APPETIZER, MAIN, DESSERT, BEVERAGE } from '../constants/menu';

const Util = {
  parseInputOrder(str) {
    const orderArray = str.split(',');

    const parseArray = orderArray.map((order) => {
      const orderDetail = order.trim().split('-');
      
      return {
        menu: orderDetail[0],
        quantity: Number(orderDetail[1]),
      };
    });

    return parseArray;
  },

  hasMenuInCategory(menu) {
    const appetizer = Object.values(APPETIZER).find((item) => item.name === menu);
    const main = Object.values(MAIN).find((item) => item.name === menu);
    const dessert = Object.values(DESSERT).find((item) => item.name === menu);
    const beverage = Object.values(BEVERAGE).find((item) => item.name === menu);

    return { appetizer, main, dessert, beverage };
  },
}

export default Util;