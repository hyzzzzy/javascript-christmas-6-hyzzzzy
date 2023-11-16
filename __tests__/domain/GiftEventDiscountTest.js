import { PRICE } from '../../src/constants/event';
import { BEVERAGE } from '../../src/constants/menu';
import GiftEvent from '../../src/domain/GiftEvent';

describe('증정 이벤트 여부 계산 메서드 테스트', () => {
  test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 이상이라면 true를 반환해야 한다.`, () => {
    const price = PRICE.for_gift + 1;
    const result = GiftEvent.isOverPrice(price);

    expect(result).toBeTruthy();
  });

  test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 미만이라면 false를 반환해야 한다.`, () => {
    const price = PRICE.for_gift - 1;
    const result = GiftEvent.isOverPrice(price);

    expect(result).toBeFalsy();
  });
});  

describe('증정 이벤트 할인 계산 메서드 테스트', () => {
  test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 이상이라면 -${BEVERAGE.champagne.price}을 반환해야 한다.`, () => {
    const price = PRICE.for_gift;
    const result = GiftEvent.calculate(price);
    const expectedResult = BEVERAGE.champagne.price * (-1);

    expect(result).toBe(expectedResult);
  });

  test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 미만이라면 0을 반환해야 한다.`, () => {
    const price = PRICE.for_gift - 1;
    const result = GiftEvent.calculate(price);

    expect(result).toBe(0);
  });
});