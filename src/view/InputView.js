import { Console } from '@woowacourse/mission-utils';
import { MESSAGE } from '../constants/message';
import Validator from '../utils/Validator';
import Util from '../utils/Util';

const InputView = {
  async readDay() {
    const input = await Console.readLineAsync(MESSAGE.input_day);

    Validator.validateDate(input);

    return Number(input);
  },

  async readMenu() {
    const input = await Console.readLineAsync(MESSAGE.input_menu);

    Validator.validateMenu(input);
    
    return Util.parseInputOrder(input);
  },
}

export default InputView;