import { PRICE } from '../constants/event';
import { BEVERAGE } from '../constants/menu';

const GiftEvent = {
  isOverPrice(price) {
    if (price >= PRICE.for_gift) {
      return true;
    }

    return false;
  },

  calculate(price) {
    const gift = this.isOverPrice(price);

    if (gift) {
      return BEVERAGE.champagne.price * (-1);
    }

    return 0;
  }
}

export default GiftEvent;