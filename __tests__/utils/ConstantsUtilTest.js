import ConstantsUtil from '../../src/utils/ConstantsUtil';

describe('객체 동결 함수 테스트', () => {
  test('주어진 객체와 중첩된 객체 모두 불변해야 한다.', () => {
    const dessert = {
      egg_tart: {
        name: '에그타르트',
        price: '3000',
      },
    };

    ConstantsUtil.deepFreeze(dessert);

    expect(Object.isFrozen(dessert)).toBe(true);
    expect(Object.isFrozen(dessert.egg_tart)).toBe(true);
    expect(Object.isFrozen(dessert.egg_tart.price)).toBe(true);
  });
});