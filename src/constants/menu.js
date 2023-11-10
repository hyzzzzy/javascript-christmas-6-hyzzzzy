import { deepFreeze } from '../utils/deepFreeze';

export const APPETIZER = {
  mushroom_soup: { name: '양송이스프', price: 6000 },
  tapas: { name: '타파스', price: 5500 },
  caesar_salad: { name: '시저샐러드', price: 8000 },
};
deepFreeze(APPETIZER);

export const MAIN = {
  t_bone_steak: { name: '티본스테이크', price: 55000 },
  bbq_ribs: { name: '바베큐립', price: 54000 },
  seafood_pasta: { name: '해산물파스타', price: 35000 },
  christmas_pasta: { name: '크리스마스파스타', price: 25000 },
};
deepFreeze(MAIN);

export const DESSERT = {
  chocolate_cake: { name: '초코케이크', price: 15000 },
  icecream: { name: '아이스크림', price: 5000 },
};
deepFreeze(DESSERT);

export const BEVERAGE = {
  coke_zero: { name: '제로콜라', price: 3000 },
  red_wine: { name: '레드와인', price: 60000 },
  champagne: { name: '샴페인', price: 25000 },
};
deepFreeze(BEVERAGE);