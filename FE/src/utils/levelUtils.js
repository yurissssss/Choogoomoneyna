export const LEVEL_THRESHOLDS = [0, 300, 800, 1500, 2500];

//userScore로 레벨 계산
export function getLevel(score) {
  const LEVEL = LEVEL_THRESHOLDS;
  let level = 0;

  for (let i = 0; i < LEVEL.length; i++) {
    if (score >= LEVEL[i]) {
      level = i;
    } else {
      break;
    }
  }
  return level;
}
