import { PRICE_FOR_GIFT } from '../constants/event';

class Promotion {
  calculateGiftEvent(price) {
    if (price > PRICE_FOR_GIFT) {
      return true;
    }
    return false;
  }
}

export default Promotion;