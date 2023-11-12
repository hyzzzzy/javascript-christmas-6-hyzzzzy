import { ERROR_MESSAGE } from '../constants/message';
import { DATE } from '../constants/event';

const DateValidator = {
  isDay(input) {
    const num = Number(input);

    if (num < DATE.min_day || num > DATE.max_day) {
      throw new Error(ERROR_MESSAGE.not_date);
    }
  },

  isNaturalNumber(input) {
    const num = Number(input);

    if (num <= 0 || num !== Math.floor(num)) {
      throw new Error(ERROR_MESSAGE.not_date);
    }
  },
}

export default DateValidator;