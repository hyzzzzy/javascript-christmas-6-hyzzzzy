import { Console } from '@woowacourse/mission-utils';
import { MESSAGE, TITLE } from '../constants/message';

const OutputView = {
  printIntro() {
    Console.print(MESSAGE.intro);
  },

  printPreview(day) {
    Console.print(MESSAGE.preview(day));
  },

  printMenu() {
    Console.print(TITLE.order_menu);
    // TODO: 주문 메뉴 출력
  },

  printPriceBeforeDiscount() {
    Console.print(TITLE.price_before_discount);
    // TODO: 할인 전 총 주문 금액 출력
  },

  printGiftMenu() {
    Console.print(TITLE.gift_menu);
    // TODO: 증정 메뉴 출력
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