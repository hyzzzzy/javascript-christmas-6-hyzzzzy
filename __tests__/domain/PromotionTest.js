import { APPETIZER, MAIN, DESSERT, BEVERAGE } from '../../src/constants/menu';
import DDayDiscount from '../../src/domain/DDayDiscount';
import GiftEvent from '../../src/domain/GiftEvent';
import Promotion from '../../src/domain/Promotion';
import SpecialDiscount from '../../src/domain/SpecialDiscount';
import WeekDiscount from '../../src/domain/WeekDiscount';

jest.mock('../../src/domain/DDayDiscount');
jest.mock('../../src/domain/GiftEvent');
jest.mock('../../src/domain/SpecialDiscount');
jest.mock('../../src/domain/WeekDiscount');

describe('Promotion 테스트', () => {
  const dDay = -1200;
  const weekday = -4046;
  const weekend = 0;
  const special = -1000;
  const gift = -25000;

  beforeEach(() => {
    DDayDiscount.calculate.mockReturnValue(dDay);
    WeekDiscount.calculateWeekday.mockReturnValue(weekday);
    WeekDiscount.calculateWeekend.mockReturnValue(weekend);
    SpecialDiscount.calculate.mockReturnValue(special); 
    GiftEvent.calculate.mockReturnValue(gift); 
  });

  test('예상한 총혜택 금액과 정확히 일치해야 한다.', () => {
    const result = Promotion.calculateTotalBenefit(dDay, weekday, weekend, special, gift);
    const expectedResult = dDay + weekday + weekend + special + gift;

    expect(result).toBe(expectedResult); 
  });

  test('모든 혜택 내역들을 객체 형태로 반환해야 한다.', () => {
    const result = Promotion.calculateAllBenefits(126500, 3, [
      { menu: `${APPETIZER.tapas.name}`, quantity: 1 },
      { menu: `${MAIN.bbq_ribs.name}`, quantity: 2 },
      { menu: `${DESSERT.icecream.name}`, quantity: 2 },
      { menu: `${BEVERAGE.coke_zero.name}`, quantity: 1 },
    ]);

    expect(result).toEqual({
      dDay: dDay,
      weekday: weekday,
      weekend: weekend,
      special: special,
      gift: gift,
      totalBenefit: dDay + weekday + weekend + special + gift, 
    });
  });
});