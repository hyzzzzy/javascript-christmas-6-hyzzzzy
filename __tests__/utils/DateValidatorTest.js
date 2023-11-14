import DateValidator from '../../src/utils/DateValidator';
import { ERROR_MESSAGE } from '../../src/constants/message';

describe('날짜 유효성 유틸함수 테스트', () => {
  test.each([
    1, 10, 20, 30, 31
  ])('1 이상 31 이하의 숫자라면 정상적으로 작동해야 한다.', (input) => {
    const result = () => DateValidator.isDate(input);

    expect(result).not.toThrow(ERROR_MESSAGE.not_date);
  });

  test.each([
    0, 100, -10,
  ])('1 미만 31 초과의 숫자라면 에러를 반환해야 한다.', (input) => {
    const result = () => DateValidator.isDate(input);

    expect(result).toThrow(ERROR_MESSAGE.not_date);
  });

  test.each([
    1.1, 1/100, -10.3, 'a', 'woowa'
  ])('자연수가 아니라면 에러를 반환해야 한다.', (input) => {
    const result = () => DateValidator.isNaturalNumber(input);

    expect(result).toThrow(ERROR_MESSAGE.not_date);
  });
});