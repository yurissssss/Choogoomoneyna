export const QUIZ_LIST = [
  {
    type: 'A',
    title: '절약퀴즈',
    questions: [
      {
        id: 1,
        question:
          '다음 중 생활 속 고정비 절감에 해당하는 실천으로 가장 적절한 것은?',
        options: [
          { value: 1, label: '마트 세일 상품을 많이 산다' },
          { value: 2, label: '휴대폰 요금제를 본인 사용량에 맞게 변경한다' },
          { value: 3, label: '친구들과 외식 약속을 줄인다' },
          { value: 4, label: '하루에 한 번만 커피를 마신다' },
        ],
        answer: 2,
        explanation:
          '고정비는 정기적으로 반복되는 지출이며, 통신 요금처럼 매월 나가는 항목을 줄이는 것이 가장 효과적입니다.',
      },
      {
        id: 2,
        question: '기회비용을 고려한 올바른 소비 습관은 무엇인가?',
        options: [
          { value: 1, label: '할인이면 무조건 산다' },
          { value: 2, label: '비싸도 만족스러우면 산다' },
          { value: 3, label: '다른 선택지를 비교해보고 더 이익인 쪽을 고른다' },
          { value: 4, label: '친구가 사면 따라서 산다' },
        ],
        answer: 3,
        explanation:
          '기회비용은 포기한 선택지의 가치를 의미하며, 비교 후 선택하는 것이 합리적인 소비입니다.',
      },
      {
        id: 3,
        question:
          '에너지 절약을 위해 전기 사용량을 낮추는 시간대에 전자제품을 사용하는 것이 좋다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '전력 사용량이 낮은 시간대(예: 야간)는 전기요금이 상대적으로 저렴하고 누진세 구간 진입을 피할 수 있습니다.',
      },
      {
        id: 4,
        question:
          '구독 서비스를 쓰지 않아도 계속 유지하는 것은 절약에 도움이 된다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 2,
        explanation:
          '사용하지 않는 구독은 낭비이며, 정기적으로 점검하고 해지하는 것이 중요합니다.',
      },
      {
        id: 5,
        question:
          '장보기 전 필요한 목록을 미리 정리해서 구매하는 것은 비용 효율성이 높은 소비 행동이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '사전에 계획한 소비는 충동구매를 줄이고 예산 내 지출을 가능하게 하므로 비용 효율성이 높습니다.',
      },
    ],
  },
  {
    type: 'B',
    title: '합리소비퀴즈',
    questions: [
      {
        id: 1,
        question:
          '다음 중 ‘정보의 비대칭’을 해소하는 가장 효과적인 소비자 행동은?',
        options: [
          { value: 1, label: '친구가 산 제품을 그대로 따라 산다' },
          { value: 2, label: '광고를 기준으로 상품을 선택한다' },
          { value: 3, label: '상품 리뷰와 비교 사이트를 참고해 선택한다' },
          { value: 4, label: '가격이 높은 상품이 가장 좋은 것이라고 생각한다' },
        ],
        answer: 3,
        explanation:
          '정보의 비대칭은 판매자와 소비자 간 정보 격차를 의미하며, 리뷰와 비교를 통해 그 격차를 줄일 수 있습니다.',
      },
      {
        id: 2,
        question: '다음 중 ‘합리적 소비’를 실천한 사례로 가장 적절한 것은?',
        options: [
          { value: 1, label: '세일이라서 필요 없지만 일단 산다' },
          { value: 2, label: '광고를 보고 충동적으로 결제한다' },
          { value: 3, label: '구매 전 예산과 필요 여부를 고려해 선택한다' },
          { value: 4, label: '지인에게 추천받았으니 바로 구매한다' },
        ],
        answer: 3,
        explanation:
          '합리적 소비는 자신에게 필요한 물건을 예산 내에서 구매하는 소비 행동을 의미합니다.',
      },
      {
        id: 3,
        question: '합리적 소비는 항상 가장 싼 상품을 고르는 것이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 2,
        explanation:
          '합리적 소비는 가격뿐 아니라 품질, 필요성, 만족도 등을 종합적으로 고려한 선택입니다.',
      },
      {
        id: 4,
        question: '계획 소비는 충동구매를 줄이는 데 도움이 된다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '사전에 예산과 구매 항목을 정해두면 불필요한 지출을 예방할 수 있습니다.',
      },
      {
        id: 5,
        question:
          '소비자 주권이란 소비자가 시장에서 제품을 선택할 ‘최종 결정권’을 가진다는 뜻이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '소비자 주권은 기업보다 소비자의 선택이 시장을 결정한다는 개념입니다.',
      },
    ],
  },
  {
    type: 'D',
    title: '투자퀴즈',
    questions: [
      {
        id: 1,
        question: '다음 중 분산 투자의 가장 큰 목적은?',
        options: [
          { value: 1, label: '수익을 극대화하기 위해' },
          { value: 2, label: '모든 자산을 한 기업에 몰아넣기 위해' },
          { value: 3, label: '위험(리스크)을 줄이기 위해' },
          { value: 4, label: '단기 수익을 빠르게 얻기 위해' },
        ],
        answer: 3,
        explanation:
          '분산 투자는 다양한 자산에 나누어 투자함으로써 특정 자산의 손실 위험을 줄이기 위한 전략입니다.',
      },
      {
        id: 2,
        question: 'ETF(상장지수펀드)에 대한 설명으로 옳은 것은?',
        options: [
          { value: 1, label: '은행 예금처럼 원금이 보장된다' },
          { value: 2, label: '하나의 회사에만 투자하는 펀드다' },
          { value: 3, label: '실시간으로 주식처럼 거래가 가능하다' },
          { value: 4, label: '정부에서 운영하는 공공기금이다' },
        ],
        answer: 3,
        explanation:
          'ETF는 주식시장에 상장된 펀드로, 일반 주식처럼 자유롭게 사고팔 수 있습니다.',
      },
      {
        id: 3,
        question: '복리 투자란, 이자에 이자가 붙는 구조를 말한다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '복리는 이전에 발생한 이자에도 다시 이자가 붙는 방식으로, 시간이 지날수록 자산이 더 빠르게 불어납니다.',
      },
      {
        id: 4,
        question: '주식이나 펀드는 원금이 100% 보장되는 투자 수단이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 2,
        explanation:
          '투자 상품은 수익 가능성과 함께 손실 위험도 있으므로 원금이 보장되지 않습니다.',
      },
      {
        id: 5,
        question:
          '‘하이리스크 하이리턴’은 위험이 클수록 수익 가능성도 크다는 의미이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '수익률이 높은 상품일수록 변동성과 위험이 크기 때문에 위험을 감수할 준비가 필요합니다.',
      },
    ],
  },
  {
    type: 'E',
    title: '금융용어퀴즈',
    questions: [
      {
        id: 1,
        question: "다음 중 '예금자보호제도'에 대한 설명으로 옳은 것은?",
        options: [
          { value: 1, label: '모든 예금은 금액과 상관없이 전액 보호된다' },
          { value: 2, label: '파산한 은행의 대출금까지 국가가 대신 상환한다' },
          {
            value: 3,
            label: '1인당 1금융회사 기준 최대 5천만 원까지 보호된다',
          },
          { value: 4, label: '은행이 원하는 경우에만 보호된다' },
        ],
        answer: 3,
        explanation:
          '예금자보호법에 따라 원금과 이자를 포함해 최대 5천만 원까지 보호됩니다.',
      },
      {
        id: 2,
        question: "다음 중 'CMA 계좌'의 특징으로 가장 알맞은 것은?",
        options: [
          { value: 1, label: '정기예금과 같아 중도 해지가 불가능하다' },
          { value: 2, label: '주식 투자만 가능한 전용 계좌이다' },
          { value: 3, label: '입출금이 자유롭고 하루만 맡겨도 이자가 붙는다' },
          { value: 4, label: '정부가 직접 운영하는 국가계좌이다' },
        ],
        answer: 3,
        explanation:
          'CMA는 단기 자금을 운용하며 수시 입출금이 가능하고, 하루만 맡겨도 소액 이자가 발생하는 금융 상품입니다.',
      },
      {
        id: 3,
        question:
          '신용점수는 금융기관이 대출 가능 여부를 판단할 때 참고하는 지표이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '신용점수는 개인의 금융거래 신뢰도를 수치화한 지표로, 대출 심사 등에서 중요한 역할을 합니다.',
      },
      {
        id: 4,
        question: '체크카드는 결제 즉시 내 통장에서 돈이 빠져나간다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '체크카드는 신용카드와 달리 후불이 아니라 실시간 출금 방식입니다.',
      },
      {
        id: 5,
        question: '복리 상품은 이자에 대해서도 다시 이자가 붙는 구조이다.',
        options: [
          { value: 1, label: 'O' },
          { value: 2, label: 'X' },
        ],
        answer: 1,
        explanation:
          '복리는 일정 기간마다 발생한 이자에 대해 다시 이자가 붙는 방식으로, 장기적으로 자산이 빠르게 증가합니다.',
      },
    ],
  },
];
