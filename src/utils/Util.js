const Util = {
  deepFreeze(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        deepFreeze(obj[key]);
      }
    });
  
    Object.freeze(obj);
  }
}

export default Util;