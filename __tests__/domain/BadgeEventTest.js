import { BADGE } from '../../src/constants/event';
import BadgeEvent from '../../src/domain/BadgeEvent';

describe('이벤트 뱃지 계산 메서드 테스트', () => {
  const first = BADGE.find((v) => v.name === BADGE[2].name);
  const second = BADGE.find((v) => v.name === BADGE[1].name);
  const third = BADGE.find((v) => v.name === BADGE[0].name);
  
  test(`총혜택 금액이 ${first.price} 만원 이상이라면 ${first.name}를 반환해야 한다.`, () => {
    const result = BadgeEvent.calculate(first.price);

    expect(result).toBe(first.name);
  });

  test(`총혜택 금액이 ${second.price} 만원 이상 ${first.price} 만원 미만이라면 ${second.name}를 반환해야 한다.`, () => {
    const result = BadgeEvent.calculate(second.price);

    expect(result).toBe(second.name);
  });

  test(`총혜택 금액이 ${third.price} 만원 이상 ${second.price} 만원 미만이라면 ${third.name}를 반환해야 한다.`, () => {
    const result = BadgeEvent.calculate(third.price);

    expect(result).toBe(third.name);
  });

  test(`총혜택 금액이 ${third.price} 미만이라면 false를 반환해야 한다.`, () => {
    const result = BadgeEvent.calculate(third.price - 1);

    expect(result).toBeFalsy();
  });
});