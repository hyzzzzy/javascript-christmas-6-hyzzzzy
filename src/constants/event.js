import ConstantsUtil from '../utils/ConstantsUtil';

export const DATE = Object.freeze({
  min_date: 1,
  month: 12,
  christmas: 25,
  max_date: 31,
  year: 2023,
});

export const SPECIAL_DAY = Object.freeze([
  3, 10, 17, 24, 25, 31,
]);

export const PRICE = Object.freeze({
  for_gift: 120000,
  for_benefit: 10000,
  for_d_day_init: 1000,
  for_d_day_increase: 100,
  for_day_of_week: DATE.year,
  for_special: 1000,
});

export const BADGE = [
  { name: '별', price: 5000 },
  { name: '트리', price: 10000 },
  { name: '산타', price: 20000 },
];
ConstantsUtil.deepFreeze(BADGE);