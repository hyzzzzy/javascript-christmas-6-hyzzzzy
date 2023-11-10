import Util from '../utils/Util';

export const SPECIAL_DAY = Object.freeze([
  3, 10, 17, 24, 25, 31,
]);

export const BADGE = {
  star: { name: '별', price: 5000 },
  tree: { name: '트리', price: 10000 },
  santa: { name: '산타', price: 20000 },
};
Util.deepFreeze(BADGE);