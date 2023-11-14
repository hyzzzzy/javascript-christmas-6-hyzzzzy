import { SPECIAL_DAY, PRICE } from '../constants/event';

const SpecialDiscount = {
  calculate(date, price) {
    const isSpecial = SPECIAL_DAY.includes(date);

    if (isSpecial && price >= PRICE.for_benefit) {
      return PRICE.for_special * (-1);
    }

    return 0;
  },
}

export default SpecialDiscount;