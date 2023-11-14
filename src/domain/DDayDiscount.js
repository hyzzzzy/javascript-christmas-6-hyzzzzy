import { PRICE, DATE } from '../constants/event';

const DDayDiscount = {
  calculate(price, date) {
    if (price < PRICE.for_benefit || date > DATE.christmas) {
      return 0;
    }

    const discount = PRICE.for_d_day_init + (date - 1) * PRICE.for_d_day_increase;

    return discount * (-1);
  }
}

export default DDayDiscount;