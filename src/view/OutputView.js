import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, TITLE } from '../constants/message';
import { BEVERAGE } from '../constants/menu';
import { SETTING } from '../constants/setting';

const OutputView = {
  printIntro() {
    Console.print(MESSAGE.intro);
  },

  printPreview(day) {
    Console.print(MESSAGE.preview(day));
  },

  printMenu(orders) {
    Console.print(TITLE.order_menu);
    for (const order of orders) {
      Console.print(`${order.menu} ${order.quantity}${MESSAGE.number}`);
    }
  },

  printPriceBeforeDiscount(order) {
    Console.print(TITLE.price_before_discount);
    Console.print(`${order.calculateTotalPrice().toLocaleString()}${MESSAGE.unit}`);
  },

  printGiftMenu(isOverPrice) {
    Console.print(TITLE.gift_menu);

    if (isOverPrice) {
      Console.print(`${BEVERAGE.champagne.name} ${SETTING.min_menu}${MESSAGE.number}`);
    } 

    if (!isOverPrice) {
      Console.print(`${MESSAGE.noting}`);
    }
  },

  printBenefit() {
    Console.print(TITLE.benefit);
    // TODO: 혜택 내역 출력
  },

  printBenefitPrice() {
    Console.print(TITLE.benefit_price);
    // TODO: 총혜택 금액 출력
  },

  printPriceAfterDiscount() {
    Console.print(TITLE.price_after_discount);
    // TODO: 할인 후 예상 결제 금액 출력
  },

  printBadge() {
    Console.log(TITLE.badge);
    // TODO: 이벤트 배지 출력
  },
}

export default OutputView;