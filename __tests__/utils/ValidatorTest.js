import { ERROR_MESSAGE } from '../../src/constants/message';
import DateValidator from '../../src/utils/DateValidator';
import MenuValidator from '../../src/utils/MenuValidator';
import Validator from '../../src/utils/Validator';

const mockDateValidator = jest.spyOn(DateValidator, 'isDate');
const mockNaturalNumberValidator = jest.spyOn(DateValidator, 'isNaturalNumber');
const mockHasMenuValidator = jest.spyOn(MenuValidator, 'hasMenu');
const mockMinQuantityValidator = jest.spyOn(MenuValidator, 'hasMinQuantity');
const mockMenuFormatValidator = jest.spyOn(MenuValidator, 'isMenuFormat');
const mockUniqueMenuValidator = jest.spyOn(MenuValidator, 'isUniqueMenu');
const mockOnlyBeverageValidator = jest.spyOn(MenuValidator, 'isOnlyBeverage');
const mockTooManyQuantityValidator = jest.spyOn(MenuValidator, 'isTooManyQuantity');

describe('Validator 유효성 유틸함수 테스트', () => {
  test('올바른 날짜를 입력했다면 정상적으로 작동해야 한다.', () => {
    const validDate = '3';
    Validator.validateDate(validDate);

    expect(mockDateValidator).toHaveBeenCalledWith(validDate);
    expect(mockNaturalNumberValidator).toHaveBeenCalledWith(validDate);
  });

  test('올바르지 않은 날짜를 입력했다면 에러를 반환해야 한다.', () => {
    const validDate = '3.3';
    const result = () => Validator.validateDate(validDate);

    expect(result).toThrow(ERROR_MESSAGE.not_date);
  });

  test('올바른 주문 메뉴를 입력했다면 정상적으로 작동해야 한다.', () => {
    const validMenu = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
    Validator.validateMenu(validMenu);

    expect(mockMenuFormatValidator).toHaveBeenCalledWith(validMenu);
    expect(mockHasMenuValidator).toHaveBeenCalledWith(validMenu);
    expect(mockMinQuantityValidator).toHaveBeenCalledWith(validMenu);
    expect(mockUniqueMenuValidator).toHaveBeenCalledWith(validMenu);
    expect(mockOnlyBeverageValidator).toHaveBeenCalledWith(validMenu);
    expect(mockTooManyQuantityValidator).toHaveBeenCalledWith(validMenu);
  });

  test('올바르지 않은 주문 메뉴를 입력했다면 에러를 반환해야 한다.', () => {
    const invalidFormatMenu = '에그타르트-1.마라탕-2:꿔바로우~2';
    const result = () => Validator.validateMenu(invalidFormatMenu);

    expect(result).toThrow(ERROR_MESSAGE.not_menu);
  });
});
