import DateValidator from './DateValidator';
import MenuValidator from './MenuValidator';

const Validator = {
  validateDate(input) {
    DateValidator.isDay(input);
    DateValidator.isNaturalNumber(input);
  },

  validateMenu(input) {
    MenuValidator.hasMenu(input);
    MenuValidator.hasMinQuantity(input);
    MenuValidator.isMenuFormat(input);
    MenuValidator.isUniqueMenu(input);
    MenuValidator.isOnlyBeverage(input);
    MenuValidator.isTooManyQuantity(input);
  }
};

export default Validator;