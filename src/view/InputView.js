import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message';
import Validate from '../utils/Validate';
import Util from '../utils/Util';

const InputView = {
  async readDay() {
    const input = await Console.readLineAsync(MESSAGE.input_day);
    Validate.isDay(input);
    Validate.isNaturalNumber(input);
    return Number(input);
  },

  async readMenu() {
    const input = await Console.readLineAsync(MESSAGE.input_menu);
    Validate.hasMenu(input);
    Validate.hasMinQuantity(input);
    Validate.isMenuFormat(input);
    Validate.isUniqueMenu(input);
    Validate.isOnlyBeverage(input);
    Validate.isTooManyQuantity(input);
    return Util.parseInputOrder(input);
  },
}

export default InputView;