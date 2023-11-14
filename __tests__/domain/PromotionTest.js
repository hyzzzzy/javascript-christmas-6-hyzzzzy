import { PRICE, DATE, WEEKEND, SPECIAL_DAY, BADGE } from '../../src/constants/event';
import { DESSERT, APPETIZER, MAIN, BEVERAGE } from '../../src/constants/menu';
import Promotion from '../../src/domain/Promotion';

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

describe('Promotion 클래스 테스트', () => {
  const promotion = new Promotion();
  
  describe('증정 이벤트 여부 계산 메서드 테스트', () => {
    test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 이상이라면 true를 반환해야 한다.`, () => {
      const price = PRICE.for_gift + 1;
      const result = promotion.calculateGiftEvent(price);

      expect(result).toBeTruthy();
    });

    test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 미만이라면 false를 반환해야 한다.`, () => {
      const price = PRICE.for_gift - 1;
      const result = promotion.calculateGiftEvent(price);

      expect(result).toBeFalsy();
    });
  });

  describe('크리스마스 디데이 할인 계산 메서드 테스트', () => {
    test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
      const price = PRICE.for_benefit - 1;
      const date = DATE.christmas;
      const result = promotion.calculateDDay(price, date);

      expect(result).toBe(0);
    });

    test('크리스마스가 지났다면 0을 반환해야 한다.', () => {
      const price = PRICE.for_benefit;
      const date = DATE.christmas + 1;
      const result = promotion.calculateDDay(price, date);

      expect(result).toBe(0);
    });

    test(`${PRICE.for_benefit} 만원 이상이고 크리스마스가 지나지 않았다면 원하는 계산 결과와 정확히 일치해야 한다.`, () => {
      const price = PRICE.for_benefit + 1;
      const date = DATE.christmas - 1;
      const expectedResult = (PRICE.for_d_day_init + (date - 1) * PRICE.for_d_day_increase) * (-1);
      const result = promotion.calculateDDay(price, date);

      expect(result).toBe(expectedResult);
    });
  });

  describe('주문한 해당 카테고리 할인 계산 메서드 테스트', () => {
    test('유효하지 않은 카테고리라면 매개변수 discount의 값과 일치해야 한다.', () => {
      const order = { menu: '아메리카노', quantity: 1 };
      const category = undefined;
      const discount = 1000;
      const result = promotion.calculateCategoryDiscount(order, category, discount);
      
      expect(result).toBe(discount);
    });

    test('유효한 카테고리라면 원하는 계산 결과와 정확히 일치해야 한다.', () => {
      const order = { menu: '아이스크림', quantity: 1 };
      const category = DESSERT.icecream;
      const discount = 0;
      const expectedResult = discount + DATE.year;
      const result = promotion.calculateCategoryDiscount(order.quantity, category, discount);

      expect(result).toBe(expectedResult);
    });
  });

  describe('평일 할인 계산 메서드 테스트', () => {
    test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
      const date = getFirstWeekday();
      const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 1 }]
      const price = DESSERT.icecream.price * orders[0].quantity; // 5000원
      const result = promotion.calculateWeekday(date, orders, price);

      expect(result).toBe(0);
    });

    test('예약 날이 주말이라면 0을 반환해야 한다.', () => {
      const date = getFirstWeekend();
      const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 3 }];
      const price = DESSERT.icecream.price * orders[0].quantity;
      const result = promotion.calculateWeekday(date, orders, price);

      expect(result).toBe(0);
    });

    test(`총주문 금액 ${PRICE.for_benefit} 만원 이상이고 예약 날이 평일이라면 원하는 계산 결과와 정확히 일치해야 한다.`, () => {
      const date = getFirstWeekday();
      const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 3 }];
      const price = DESSERT.icecream.price * orders[0].quantity;
      const expectedResult = (DATE.year * orders[0].quantity) * (-1);
      const result = promotion.calculateWeekday(date, orders, price);

      expect(result).toBe(expectedResult);
    });
  });

  describe('주말 할인 계산 메서드 테스트', () => {
    test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
      const date = getFirstWeekend();
      const orders = [{ menu: `${APPETIZER.tapas.name}`, quantity: 1 }];
      const price = APPETIZER.tapas.price * orders[0].quantity; // 5500원
      const result = promotion.calculateWeekend(date, orders, price);

      expect(result).toBe(0);
    });

    test('예약 날이 평일이라면 0을 반환해야 한다.', () => {
      const date = getFirstWeekday();
      const orders = [{ menu: `${DESSERT.icecream.name}`, quantity: 3 }];
      const price = DESSERT.icecream.price * orders[0].quantity;
      const result = promotion.calculateWeekend(date, orders, price);

      expect(result).toBe(0);
    });

    test(`총주문 금액 ${PRICE.for_benefit} 만원 이상이고 예약 날이 주말이라면 원하는 계산 결과와 정확히 일치해야 한다.`, () => {
      const date = getFirstWeekend();
      const orders = [{ menu: `${MAIN.bbq_ribs.name}`, quantity: 3 }];
      const price = MAIN.bbq_ribs.price * orders[0].quantity;
      const expectedResult = (DATE.year * orders[0].quantity) * (-1);
      const result = promotion.calculateWeekend(date, orders, price);

      expect(result).toBe(expectedResult);
    });
  });

  describe('특별 할인 계산 메서드 테스트', () => {
    test(`총주문 금액 ${PRICE.for_benefit} 만원 미만이라면 0을 반환해야 한다.`, () => {
      const date = SPECIAL_DAY[0];
      const orders = [{ menu: `${APPETIZER.tapas.name}`, quantity: 1 }];
      const price = APPETIZER.tapas.price * orders[0].quantity; // 5500원
      const result = promotion.calculateSpecialDay(date, price);

      expect(result).toBe(0);
    });

    test('별 있는 날이 아니라면 0을 반환해야 한다.', () => {
      const date = SPECIAL_DAY[0] - 1;
      const orders = [{ menu: `${MAIN.bbq_ribs.name}`, quantity: 1 }];
      const price = MAIN.bbq_ribs.price * orders[0].quantity; 
      const result = promotion.calculateSpecialDay(date, price);

      expect(result).toBe(0);
    });

    test('총주문 금액이 1 만원 이상이고 별 있는 날이라면 원하는 계산 결과와 정확히 일치해야 한다.', () => {
      const date = SPECIAL_DAY[0];
      const orders = [{ menu: `${MAIN.bbq_ribs.name}`, quantity: 1 }];
      const price = MAIN.bbq_ribs.price * orders[0].quantity;
      const expectedResult = PRICE.for_special * (-1);
      const result = promotion.calculateSpecialDay(date, price);

      expect(result).toBe(expectedResult);
    });
  });

  describe('증정 이벤트 할인 계산 메서드 테스트', () => {
    test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 이상이라면 -${BEVERAGE.champagne.price}을 반환해야 한다.`, () => {
      const price = PRICE.for_gift;
      const result = promotion.calculateGiftPrice(price);
      const expectedResult = BEVERAGE.champagne.price * (-1);

      expect(result).toBe(expectedResult);
    });

    test(`할인 전 총주문 금액이 ${PRICE.for_gift}만 원 미만이라면 0을 반환해야 한다.`, () => {
      const price = PRICE.for_gift - 1;
      const result = promotion.calculateGiftPrice(price);

      expect(result).toBe(0);
    });
  });

  describe('이벤트 뱃지 계산 메서드 테스트', () => {
    const first = BADGE.find((v) => v.name === '산타');
    const second = BADGE.find((v) => v.name === '트리');
    const third = BADGE.find((v) => v.name === '별');
    
    test(`총혜택 금액이 ${first.price} 만원 이상이라면 ${first.name}를 반환해야 한다.`, () => {
      const result = promotion.calculateEventBadge(first.price);

      expect(result).toBe(first.name);
    });

    test(`총혜택 금액이 ${second.price} 만원 이상 ${first.price} 만원 미만이라면 ${second.name}를 반환해야 한다.`, () => {
      const result = promotion.calculateEventBadge(second.price);

      expect(result).toBe(second.name);
    });

    test(`총혜택 금액이 ${third.price} 만원 이상 ${second.price} 만원 미만이라면 ${third.name}를 반환해야 한다.`, () => {
      const result = promotion.calculateEventBadge(third.price);

      expect(result).toBe(third.name);
    });

    test(`총혜택 금액이 ${third.price} 미만이라면 false를 반환해야 한다.`, () => {
      const result = promotion.calculateEventBadge(third.price - 1);

      expect(result).toBeFalsy();
    });
  });
});