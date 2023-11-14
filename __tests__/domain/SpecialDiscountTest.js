import { PRICE, SPECIAL_DAY } from '../../src/constants/event';
import { APPETIZER, MAIN } from '../../src/constants/menu';
import SpecialDiscount from '../../src/domain/SpecialDiscount';

describe('특별 할인 계산 메서드 테스트', () => {
  test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
    const date = SPECIAL_DAY[0];
    const orders = [{ menu: `${APPETIZER.tapas.name}`, quantity: 1 }];
    const price = APPETIZER.tapas.price * orders[0].quantity; // 5500원
    const result = SpecialDiscount.calculate(date, price);

    expect(result).toBe(0);
  });

  test('별 있는 날이 아니라면 0을 반환해야 한다.', () => {
    const date = SPECIAL_DAY[0] - 1;
    const orders = [{ menu: `${MAIN.bbq_ribs.name}`, quantity: 1 }];
    const price = MAIN.bbq_ribs.price * orders[0].quantity; 
    const result = SpecialDiscount.calculate(date, price);

    expect(result).toBe(0);
  });

  test('총주문 금액이 1 만원 이상이고 별 있는 날이라면 원하는 계산 결과와 정확히 일치해야 한다.', () => {
    const date = SPECIAL_DAY[0];
    const orders = [{ menu: `${MAIN.bbq_ribs.name}`, quantity: 1 }];
    const price = MAIN.bbq_ribs.price * orders[0].quantity;
    const expectedResult = PRICE.for_special * (-1);
    const result = SpecialDiscount.calculate(date, price);

    expect(result).toBe(expectedResult);
  });
});