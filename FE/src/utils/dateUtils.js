//추구미 수정 가능한 날인지(매달 첫째 주 일요일)
export function isEditableDay() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // 해당 달의 1일부터 7일까지
  for (let day = 1; day <= 7; day++) {
    const date = new Date(year, month, day);

    // 일요일 찾음
    if (date.getDay() === 0) {
      //오늘이 첫째주 일요일이라면
      return (
        today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear()
      );
    }
  }
  return false;
}

// 리포트의 생성날짜 계산해주는 함수
export function calculateRegDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}

//월요일 찾는 함수 (지난주 매칭 결과 확인용)
export function isMonday() {
  return new Date().getDay() === 1;
}
