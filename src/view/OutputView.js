import { Console } from '@woowacourse/mission-utils';
import { BENEFIT_MESSAGE, MESSAGE, TITLE } from '../constants/message';
import { BEVERAGE } from '../constants/menu';
import { SETTING } from '../constants/setting';

const OutputView = {
  printIntro() {
    Console.print(MESSAGE.intro);
  },

  printPreview(date) {
    Console.print(MESSAGE.preview(date));
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

  printDDayDiscount(dDay) {
    if (dDay) {
      Console.print(BENEFIT_MESSAGE.christmas_d_day_discount(dDay.toLocaleString()));
    }
  },

  printWeekdayDiscount(weekday) {
    if (weekday) {
      Console.print(BENEFIT_MESSAGE.weekday_discount(weekday.toLocaleString()));
    }
  },
  
  printWeekendDiscount(weekend) {
    if (weekend) {
      Console.print(BENEFIT_MESSAGE.weekend_discount(weekend.toLocaleString()));
    }
  },

  printSpecialDayDiscount(special) {
    if (special) {
      Console.print(BENEFIT_MESSAGE.special_discount(special.toLocaleString()));
    }
  },

  printGiftDiscount(gift) {
    if (gift) {
      Console.print(BENEFIT_MESSAGE.gift_event(gift.toLocaleString()));
    }
  },

  printAllBenefit(dDay, weekday, weekend, special, gift) {
    Console.print(TITLE.benefit);

    this.printDDayDiscount(dDay);
    this.printWeekdayDiscount(weekday);
    this.printWeekendDiscount(weekend);
    this.printSpecialDayDiscount(special);
    this.printGiftDiscount(gift);

    if (!dDay && !weekday && !weekend && !special && !gift) {
      Console.print(MESSAGE.noting);
    }
  },

  printBenefitPrice(price) {
    Console.print(TITLE.benefit_price);

    if (price) {
      Console.print(`${price.toLocaleString()}${MESSAGE.unit}`);
    }

    if (!price) {
      Console.print(MESSAGE.noting);
    }
  },

  printPriceAfterDiscount(price) {
    Console.print(TITLE.price_after_discount);
    Console.print(`${price.toLocaleString()}${MESSAGE.unit}`);
  },

  printBadge(name) {
    Console.print(TITLE.badge);

    if (name) {
      Console.print(name);
    }

    if (!name) {
      Console.print(MESSAGE.noting);
    }
  },
}

export default OutputView;