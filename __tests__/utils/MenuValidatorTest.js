import { MAIN, BEVERAGE } from '../../src/constants/menu';
import { ERROR_MESSAGE } from '../../src/constants/message';
import MenuValidator from '../../src/utils/MenuValidator';

describe('주문 메뉴 유효성 유틸함수 테스트', () => {
  test('존재하지 않는 메뉴를 입력했다면 에러를 반환해야 한다.', () => {
    const input = '연어샐러드-2,제로사이다-1';

    const result = () => MenuValidator.hasMenu(input);
    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });

  test('존재하는 메뉴를 입력했다면 정상적으로 작동해야 한다.', () => {
    const input = `${MAIN.christmas_pasta.name}-3,${MAIN.bbq_ribs.name}-1`;

    const result = () => MenuValidator.hasMenu(input);
    expect(result).not.toThrow(ERROR_MESSAGE.not_menu);
  });

  test('1 미만의 수량을 입력했다면 에러를 반환해야 한다.', () => {
    const input = `${MAIN.christmas_pasta.name}-0,${MAIN.bbq_ribs.name}-0`;

    const result = () => MenuValidator.hasMinQuantity(input);
    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });

  test('1 이상의 수량을 입력했다면 정상적으로 작동해야 한다.', () => {
    const input = `${MAIN.christmas_pasta.name}-3,${MAIN.bbq_ribs.name}-1`;

    const result = () => MenuValidator.hasMinQuantity(input);
    expect(result).not.toThrow(ERROR_MESSAGE.not_menu);
  });

  test.each([
    `${MAIN.bbq_ribs.name}-1.${MAIN.christmas_pasta.name}-3`,
    `${MAIN.bbq_ribs.name}:1`,
    `${MAIN.bbq_ribs.name}:1.${MAIN.christmas_pasta.name}-a`,
  ])('주문형식(메뉴-수량)이 맞지 않다면 에러를 반환해야 한다.', (input) => {
    const result = () => MenuValidator.isMenuFormat(input);

    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });

  test.each([
    `${MAIN.bbq_ribs.name}-1,${MAIN.christmas_pasta.name}-3`,
    `${MAIN.bbq_ribs.name}-1`,
  ])('주문형식(메뉴-수량)이 맞다면 정상적으로 작동해야 한다.', (input) => {
    const result = () => MenuValidator.isMenuFormat(input);

    expect(result).not.toThrow(ERROR_MESSAGE.not_menu);
  });

  test('중복된 메뉴를 입력했다면 에러를 반환해야 한다.', () => {
    const input = `${MAIN.bbq_ribs.name}-1,${MAIN.bbq_ribs.name}-1`;
    const result = () => MenuValidator.isUniqueMenu(input);

    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });

  test('중복되지 않은 메뉴를 입력했다면 정상적으로 작동해야 한다.', () => {
    const input = `${MAIN.bbq_ribs.name}-1,${MAIN.christmas_pasta.name}-3`;
    const result = () => MenuValidator.isUniqueMenu(input);

    expect(result).not.toThrow(ERROR_MESSAGE.not_menu);
  });

  test('음료만 주문했다면 에러를 반환해야 한다.', () => {
    const input = `${BEVERAGE.champagne.name}-2`;
    const result = () => MenuValidator.isOnlyBeverage(input);

    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });

  test('음료만 주문하지 않았다면 정상적으로 작동해야 한다.', () => {
    const input = `${BEVERAGE.champagne.name}-2,${MAIN.christmas_pasta.name}-3`;
    const result = () => MenuValidator.isOnlyBeverage(input);

    expect(result).not.toThrow(ERROR_MESSAGE.not_menu);
  });

  test.each([
    `${MAIN.bbq_ribs.name}-10,${MAIN.christmas_pasta.name}-13`,
    `${MAIN.bbq_ribs.name}-22`,
  ])('수량이 20 초과라면 에러를 반환해야 한다.', (input) => {
    const result = () => MenuValidator.isTooManyQuantity(input);

    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });

  test.each([
    `${MAIN.bbq_ribs.name}-10,${MAIN.christmas_pasta.name}-9`,
    `${MAIN.bbq_ribs.name}-20`,
  ])('수량이 20 이하라면 정상적으로 작동해야 한다.', (input) => {
    const result = () => MenuValidator.isTooManyQuantity(input);

    expect(result).not.toThrow(ERROR_MESSAGE.not_menu);
  });
});