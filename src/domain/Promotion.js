import DDayDiscount from './DDayDiscount';
import GiftEvent from './GiftEvent';
import SpecialDiscount from './SpecialDiscount';
import WeekDiscount from './WeekDiscount';

const Promotion = {
  calculateTotalBenefit(dDay, weekday, weekend, special, gift) {
    return dDay + weekday + weekend + special + gift;
  },

  calculateAllBenefits(price, date, menu) {
    const dDay = DDayDiscount.calculate(price, date);
    const weekday = WeekDiscount.calculateWeekday(date, menu, price);
    const weekend = WeekDiscount.calculateWeekend(date, menu, price);
    const special = SpecialDiscount.calculate(date, price);
    const gift = GiftEvent.calculate(price);
    const totalBenefit = this.calculateTotalBenefit(dDay, weekday, weekend, special, gift);

    return { dDay, weekday, weekend, special, gift, totalBenefit };
  },
}

export default Promotion;