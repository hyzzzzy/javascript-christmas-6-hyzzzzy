const Util = {
  deepFreeze(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.deepFreeze(obj[key]);
      }
    });
  
    Object.freeze(obj);
  },

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
}

export default Util;