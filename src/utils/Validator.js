import DateValidator from './DateValidator';
import MenuValidator from './MenuValidator';

const Validator = {
  validateDate(input) {
    DateValidator.isNaturalNumber(input);
    DateValidator.isDate(input);
  },

  validateMenu(input) {
    MenuValidator.isMenuFormat(input); 
    MenuValidator.hasMenu(input);
    MenuValidator.hasMinQuantity(input);
    MenuValidator.isUniqueMenu(input);
    MenuValidator.isOnlyBeverage(input);
    MenuValidator.isTooManyQuantity(input);
  }
};

export default Validator;