import { BADGE } from '../constants/event';

const BadgeEvent = {
  calculate(price) {
    const sortedBadges = BADGE.slice().sort((a, b) => b.price - a.price);
    const badge = sortedBadges.find(b => Math.abs(price) >= b.price);

    if (badge) {
      return badge.name;
    }

    return false;
  }
}

export default BadgeEvent;