import { APPETIZER, BEVERAGE } from '../../src/constants/menu';
import Util from '../../src/utils/Util';

describe('주문 주문 메뉴 문자열 파싱 함수 테스트', () => {
  test('입력된 문자열을 배열로 반환해야 한다.', () => {
    const input = `${APPETIZER.tapas.name}-1,${BEVERAGE.coke_zero.name}-1`;
    const result = Util.parseInputOrder(input);

    expect(result).toEqual([
      { menu: `${APPETIZER.tapas.name}`, quantity: 1 },
      { menu: `${BEVERAGE.coke_zero.name}`, quantity: 1 },
    ]);
  });
});

describe('카테고리에 존재하는 메뉴 여부 검사 테스트', () => {
  test('주어진 메뉴에 대해 올바른 카테고리를 찾아 반환해야 한다.', () => {
    const name = APPETIZER.tapas.name;
    const price = APPETIZER.tapas.price;
    const result = Util.hasMenuInCategory(name);

    expect(result).toEqual({
      appetizer: { name: name, price: price },
      main: undefined,
      dessert: undefined,
      beverage: undefined,
    });
  });
});