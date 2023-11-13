import Order from '../../src/domain/Order';
import { APPETIZER, MAIN, DESSERT, BEVERAGE } from '../../src/constants/menu';

describe('주문한 해당 카테고리 메뉴 계산 메서드 테스트', () => {
  test('원하는 계산 결과와 정확히 일치해야 한다.', () => {
    const order = new Order(3, [
      { menu: `${APPETIZER.tapas.name}`, quantity: 1 },
    ]);

    const appetizer = APPETIZER.tapas;
    const price = APPETIZER.tapas.price;
    const result = order.calculatePrice(appetizer, 1);

    expect(result).toBe(price);
  });
});

describe('주문한 모든 메뉴 계산 메서드 테스트', () => {
  test('원하는 계산 결과와 정확히 일치해야 한다.', () => {
    const order = new Order(3, [
      { menu: `${APPETIZER.tapas.name}`, quantity: 1 },
      { menu: `${MAIN.bbq_ribs.name}`, quantity: 2 },
      { menu: `${DESSERT.icecream.name}`, quantity: 2 },
      { menu: `${BEVERAGE.coke_zero.name}`, quantity: 1 },
    ]);

    const totalPrice = APPETIZER.tapas.price * 1
    + MAIN.bbq_ribs.price * 2
    + DESSERT.icecream.price * 2
    + BEVERAGE.coke_zero.price * 1;
    const result = order.calculateTotalPrice();

    expect(result).toBe(totalPrice);
  });
});

describe('예상 결제 금액 계산 메서드 테스트', () => {
  test('원하는 계산 결과와 정확히 일치해야 한다.', () => {
    const order = new Order(3, [
      { menu: `${APPETIZER.tapas.name}`, quantity: 1 },
      { menu: `${MAIN.bbq_ribs.name}`, quantity: 2 },
      { menu: `${DESSERT.icecream.name}`, quantity: 2 },
      { menu: `${BEVERAGE.coke_zero.name}`, quantity: 1 },
    ]);

    const totalPrice = order.calculateTotalPrice();
    const totalBenefit = -31246;
    const result = order.calculateExpectedAmount(totalBenefit);

    expect(result).toBe(totalPrice + totalBenefit);
  });
});