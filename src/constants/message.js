import { SETTING, DATE } from './setting';

export const FIX = Object.freeze({
  title: (value) => `<${value}>`,
  error: '[ERROR]',
  retry: '다시 입력해 주세요.',
});

export const TITLE = Object.freeze({
  order_menu: FIX.title('주문메뉴'),
  price_before_discount: FIX.title('할인 전 총주문 금액'),
  gift_menu: FIX.title('증정 메뉴'),
  benefit: FIX.title('혜택 내역'),
  benefit_price: FIX.title('총혜택 금액'),
  price_after_discount: FIX.title('할인 후 예상 결제 금액'),
  badge: FIX.title(`${DATE.month}월 이벤트 배지`),
});

export const MESSAGE = Object.freeze({
  intro: `안녕하세요! ${SETTING.name} ${DATE.month}월 이벤트 플래너입니다.\n`,
  input_day: `${DATE.month}월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n`,
  input_menu: '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
  preview: (day) => `${DATE.month}월 ${day}일에 ${SETTING.name}에서 받을 이벤트 혜택 미리 보기!`,
  number: '개',
  unit: '원',
  noting: '없음',
});

export const ERROR_MESSAGE = Object.freeze({
  not_date: `${FIX.error} 유효하지 않은 날짜입니다. ${FIX.retry}`,
  not_menu: `${FIX.error} 유효하지 않은 주문입니다. ${FIX.retry}`,
  only_beverage: `${FIX.error} 음료만 주문할 수 없습니다. ${FIX.retry}`,
  too_many_order: `${FIX.error} 메뉴는 최대 ${SETTING.max_menu}개까지만 주문 가능합니다. ${FIX.retry}`,
});

export const BENEFIT_MESSAGE = Object.freeze({
  christmas_d_day_discount: (price) => `크리스마스 디데이 할인: ${price}${MESSAGE.unit}`,
  weekday_discount: (price) => `평일 할인: ${price}${MESSAGE.unit}`,
  weekend_discount: (price) => `주말 할인: ${price}${MESSAGE.unit}`,
  special_discount: (price) => `특별 할인: ${price}${MESSAGE.unit}`,
  gift_event: (price) => `증정 이벤트: ${price}${MESSAGE.unit}`
});