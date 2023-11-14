import { PRICE, DATE } from '../../src/constants/event';
import DDayDiscount from '../../src/domain/DDayDiscount';

describe('크리스마스 디데이 할인 테스트', () => {
  test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
    const price = PRICE.for_benefit - 1;
    const date = DATE.christmas;
    const result = DDayDiscount.calculate(price, date);

    expect(result).toBe(0);
  });

  test('크리스마스가 지났다면 0을 반환해야 한다.', () => {
    const price = PRICE.for_benefit;
    const date = DATE.christmas + 1;
    const result = DDayDiscount.calculate(price, date);

    expect(result).toBe(0);
  });

  test(`${PRICE.for_benefit} 만원 이상이고 크리스마스가 지나지 않았다면 원하는 계산 결과와 정확히 일치해야 한다.`, () => {
    const price = PRICE.for_benefit + 1;
    const date = DATE.christmas - 1;
    const expectedResult = (PRICE.for_d_day_init + (date - 1) * PRICE.for_d_day_increase) * (-1);
    const result = DDayDiscount.calculate(price, date);

    expect(result).toBe(expectedResult);
  });
});