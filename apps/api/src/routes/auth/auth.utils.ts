import { randomInt } from 'crypto';

export function randomVerificationCode() {
  return randomInt(0, 1000000);
}
