// 설문 항목의 인덱스는 0부터 시작
export const SURVEY_LIST = [
  {
    id: 0,
    title: '현재 직업 상태가 어떻게 되나요?',
    options: [
      { value: 1, label: '학생' },
      { value: 2, label: '취업\n준비중' },
      { value: 3, label: '직장인' },
      { value: 4, label: '프리랜서\n자영업' },
      { value: 5, label: '기타' },
    ],
  },
  {
    id: 1,
    title: '월 평균 소득이 얼마인가요?',
    subtitle: '(세후 기준)',
    priceUnit: '(단위: 10,000원)',
    options: [
      { value: 1, label: '~200' },
      { value: 2, label: '200\n~300' },
      { value: 3, label: '300\n~400' },
      { value: 4, label: '400\n~500' },
      { value: 5, label: '500~' },
    ],
  },
  {
    id: 2,
    title: '매월 저축을 얼마나 하나요?',
    priceUnit: '(단위: 10,000원)',
    options: [
      { value: 1, label: '~5' },
      { value: 2, label: '5~15' },
      { value: 3, label: '15~30' },
      { value: 4, label: '30~50' },
      { value: 5, label: '50~' },
    ],
  },
  {
    id: 3,
    title: '평소 소비 습관은 어떤 편인가요?',
    options: [
      { value: 1, label: '절약적\n소비' },
      { value: 2, label: '타협적\n소비' },
      { value: 3, label: '합리적\n소비' },
      { value: 4, label: '감정적\n소비' },
      { value: 5, label: '즉흥적\n소비' },
    ],
  },
  {
    id: 4,
    type: 4,
    question: '새로 나온 신형 스마트폰 !',
    subtitle:
      '아직 쓸만한 현재 스마트폰.\n하지만 신형 모델이 너무 예쁘다 !\n새로 구매할지 고민이 되는데...\n당신의 선택은?',
    options: [
      { value: 1, label: '고장 나기 전까진 안바꿈' },
      { value: 2, label: '사용 후기를 찾아보며 더 고민해보기!' },
      { value: 3, label: '지금 사고 오래 쓰자!' },
      { value: 4, label: '지금 안 사면 후회할 듯! 바로 구매한다' },
    ],
  },
  {
    id: 5,
    type: 4,
    question: '갑자기 날씨가 너무 덥다!',
    subtitle:
      '무더위 속 땀을 흘리며 거리를 걷고 있다.\n그때 우연히 편의점 앞에 걸린 "아이스크림 2+1" 행사!\n편의점에 들어가 냉동고 앞에 섰다.\n당신의 선택은?',
    options: [
      { value: 1, label: '참고 집에 가서 먹는다' },
      { value: 2, label: '2개는 과소비! 딱 한 개만 사서 먹는다' },
      { value: 3, label: '이렇게 더운 날에는 먹어야지! 3개를 구매한다' },
      { value: 4, label: '이런 기회에 많이 사둬야지! 봉지 가득 구매한다' },
    ],
  },
  {
    id: 6,
    type: 4,
    question: '친구와의 저녁 약속',
    subtitle:
      '친구에게 저녁을 먹자는 연락이 왔다.\n카톡창에 뜬 "오늘은 스테이크 어때?".\n1인분에 3만원 이상 지출이 예상되는 저녁약속!\n당신의 선택은?',
    options: [
      { value: 1, label: '가격이 부담된다고 솔직히 말하기' },
      { value: 2, label: '약속에 가지만 속으로 가격이 부담된다고 생각' },
      { value: 3, label: '가격보다 친구와의 시간이 더 중요!' },
      { value: 4, label: '이런 날 스테이크도 한 번 먹어줘야지!' },
    ],
  },
  {
    id: 7,
    type: 4,
    question: '배고픈 저녁, 배달음식 고민',
    subtitle:
      '배가 고픈 저녁시간, 습관처럼 배달 앱을 켰다.\n추천 메뉴 중 16,000원짜리 1인세트가 눈에 밟힌다.\n먹고싶은 메뉴지만 가격이 살짝 부담되는 상황!\n당신의 선택은?',
    options: [
      { value: 1, label: '돈은 아끼고 집밥으로 배를 채운다' },
      { value: 2, label: '쿠폰을 열심히 찾아본 뒤 결제!' },
      { value: 3, label: '맛있게 먹으면 스트레스도 풀린다! 시켜!' },
      { value: 4, label: '먹고싶은건 먹어야지! 바로 주문한다' },
    ],
  },
  {
    id: 8,
    type: 4,
    question: '바뀐 계절, 새 옷 쇼핑하기',
    subtitle:
      '점점 바뀌어가는 계절.\n옷이 있지만 새로운 계절을 맞아 새 옷을 사고싶다!\n여러 사이트를 둘러보지만 꽤나 큰 금액..\n당신의 선택은?',
    options: [
      { value: 1, label: '쇼핑을 멈추고 작년 옷을 꺼내입는다' },
      { value: 2, label: '장바구니에서 몇 개만 골라서 산다' },
      { value: 3, label: '내년에도 입으면 되니까! 나를 위해 투자' },
      { value: 4, label: '어차피 살 옷들! 그냥 지금 결제해! ' },
    ],
  },
  {
    id: 9,
    type: 2,
    question: '중고 마켓에서 한정판 신발 발견!',
    subtitle:
      '중고 마켓을 둘러보던 중 눈에 들어오는 신발!\n예전부터 갖고 싶던 모델을 발견했다.\n정가는 10만 원이지만, 어느새 20만 원에 팔리고 있다.\n당신의 선택은?',
    options: [
      { value: 1, label: '가격을 보고\n마음을 접는다' },
      { value: 2, label: '이런 건 타이밍 !\n바로 결제한다' },
    ],
  },
  {
    id: 10,
    type: 2,
    question: '영화관에서 판매중인 한정판 굿즈',
    subtitle:
      '영화를 보기 위해 영화관에서 티켓을 구매했다.\n3천 원을 더 내면 한정판 굿즈까지 받을 수 있다는데!\n이번 영화를 위한 전용 디자인 굿즈라고 한다.\n당신의 선택은?',
    options: [
      { value: 1, label: '굿즈 필요 NO !\n사지 않는다' },
      { value: 2, label: '한정판은 사야지 !\n3천 원을 낸다' },
    ],
  },
  {
    id: 11,
    type: 2,
    question: '친한 친구의 여행 제안',
    subtitle:
      '친한 친구에게서 온 연락.\n"우리 여행 가자!"\n하지만 요즘 예산이 빠듯한 상황이다.\n당신의 선택은?',
    options: [
      { value: 1, label: '예산 부족으로 다음 기회에 간다' },
      { value: 2, label: '기회는 지금뿐!\n조금 무리해서라도\n여행을 간다' },
    ],
  },
  {
    id: 12,
    type: 2,
    question: '게임 도중 등장하는 광고',
    subtitle:
      '요즘 푹 빠진 모바일 게임을 하고 있다.\n그런데 게임 도중에 나오는 30초 광고가 너무 거슬린다!\n6000원에 광고 제거 기능을 구매할 수 있다는데!\n당신의 선택은?',
    options: [
      { value: 1, label: '돈이 아까우니\n그냥 참는다' },
      { value: 2, label: '광고 없는 행복을\n위해 투자한다' },
    ],
  },
  {
    id: 13,
    type: 2,
    question: '평일 아침, 카페에서 메뉴 고르기',
    subtitle:
      '평소 2,000원 아메리카노를 마시는 당신.\n하지만 오늘은 유난히 피곤하다.\n마침 5,000원 "딸기 휘핑라떼"가 눈에 들어온다!\n당신의 선택은?',
    options: [
      { value: 1, label: '너무비싸 !\n아메리카노를 먹는다' },
      { value: 2, label: '오늘은 스스로에게\n신메뉴 선물 !' },
    ],
  },
];
