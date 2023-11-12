const ConstantsUtil = {
  deepFreeze(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.deepFreeze(obj[key]);
      }
    });
  
    Object.freeze(obj);
  },
}

export default ConstantsUtil;