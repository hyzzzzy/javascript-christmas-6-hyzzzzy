import { PRICE, DATE, WEEKEND } from '../../src/constants/event';
import { APPETIZER, MAIN, DESSERT } from '../../src/constants/menu';
import WeekDiscount from '../../src/domain/WeekDiscount';

const getFirstWeekday = () => {
  const eventDate = new Date(DATE.year, DATE.month - 1, DATE.min_date);
  const lastDay = DATE.max_date;

  for (let day = 1; day <= lastDay; day++) {
    eventDate.setDate(day);

    const dayOfWeek = eventDate.getDay();

    if (!WEEKEND.includes(dayOfWeek)) {
      return day;
    }
  }
};

const getFirstWeekend = () => {
  const eventDate = new Date(DATE.year, DATE.month - 1, DATE.min_date);
  const lastDay = DATE.max_date;

  for (let day = 1; day <= lastDay; day++) {
    eventDate.setDate(day);

    const dayOfWeek = eventDate.getDay();

    if (WEEKEND.includes(dayOfWeek)) {
      return day;
    }
  }
};

describe('주문한 해당 카테고리 할인 계산 메서드 테스트', () => {
  test('유효하지 않은 카테고리라면 매개변수 discount의 값과 일치해야 한다.', () => {
    const order = { menu: '아메리카노', quantity: 1 };
    const category = undefined;
    const discount = 1000;
    const result = WeekDiscount.calculateCategoryDiscount(order, category, discount);
    
    expect(result).toBe(discount);
  });

  test('유효한 카테고리라면 원하는 계산 결과와 정확히 일치해야 한다.', () => {
    const order = { menu: '아이스크림', quantity: 1 };
    const category = DESSERT.icecream;
    const discount = 0;
    const expectedResult = discount + DATE.year;
    const result = WeekDiscount.calculateCategoryDiscount(order.quantity, category, discount);

    expect(result).toBe(expectedResult);
  });
});

describe('평일 할인 테스트', () => {
  test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
    const date = getFirstWeekday();
    const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 1 }]
    const price = DESSERT.icecream.price * orders[0].quantity; // 5000원
    const result = WeekDiscount.calculateWeekday(date, orders, price);

    expect(result).toBe(0);
  });

  test('예약 날이 주말이라면 0을 반환해야 한다.', () => {
    const date = getFirstWeekend();
    const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 3 }];
    const price = DESSERT.icecream.price * orders[0].quantity;
    const result = WeekDiscount.calculateWeekday(date, orders, price);

    expect(result).toBe(0);
  });

  test(`총주문 금액 ${PRICE.for_benefit} 만원 이상이고 예약 날이 평일이라면 원하는 계산 결과와 정확히 일치해야 한다.`, () => {
    const date = getFirstWeekday();
    const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 3 }];
    const price = DESSERT.icecream.price * orders[0].quantity;
    const expectedResult = (DATE.year * orders[0].quantity) * (-1);
    const result = WeekDiscount.calculateWeekday(date, orders, price);

    expect(result).toBe(expectedResult);
  });
});

describe('주말 할인 계산 메서드 테스트', () => {
  test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
    const date = getFirstWeekend();
    const orders = [{ menu: `${APPETIZER.tapas.name}`, quantity: 1 }];
    const price = APPETIZER.tapas.price * orders[0].quantity; // 5500원
    const result = WeekDiscount.calculateWeekend(date, orders, price);

    expect(result).toBe(0);
  });

  test('예약 날이 평일이라면 0을 반환해야 한다.', () => {
    const date = getFirstWeekday();
    const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 3 }];
    const price = DESSERT.icecream.price * orders[0].quantity;
    const result = WeekDiscount.calculateWeekend(date, orders, price);

    expect(result).toBe(0);
  });

  test(`총주문 금액 ${PRICE.for_benefit} 만원 이상이고 예약 날이 주말이라면 원하는 계산 결과와 정확히 일치해야 한다.`, () => {
    const date = getFirstWeekend();
    const orders = [{ menu: `${MAIN.bbq_ribs.name}`, quantity: 3 }];
    const price = MAIN.bbq_ribs.price * orders[0].quantity;
    const expectedResult = (DATE.year * orders[0].quantity) * (-1);
    const result = WeekDiscount.calculateWeekend(date, orders, price);

    expect(result).toBe(expectedResult);
  });
});