<template>
  <div class="bg-ivory rounded-lg p-6 w-full h-full">
    <div class="rounded-lg flex flex-col gap-y-1">
      <!-- 제목 -->
      <span class="text-gray-600 text-[14px]">
        {{ title }}
      </span>

      <!-- 차트 모드 -->
      <div v-if="mode === 'chart'" class="flex items-center justify-between">
        <!-- 도넛 차트 (카테고리별 세그먼트) -->
        <div class="relative w-22 h-22">
          <svg class="w-22 h-22 transform -rotate-90" viewBox="0 0 120 120">
            <!-- 배경 원 -->
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#E5E7EB"
              stroke-width="10"
            />
            <!-- 카테고리 세그먼트들 -->
            <circle
              v-for="segment in donutSegments"
              :key="segment.categoryName"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              :stroke="segment.strokeColor"
              stroke-width="10"
              :stroke-dasharray="segment.strokeDasharray"
              :stroke-dashoffset="segment.strokeDashoffset"
              stroke-linecap="butt"
            />
          </svg>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-sm text-green"
              >{{ totalPercentageDisplay }}%</span
            >
          </div>
        </div>

        <!-- 카테고리별 데이터 -->
        <div class="flex flex-col space-y-2">
          <div
            v-for="category in sortedCategoryList"
            :key="category.name"
            class="flex items-center gap-x-2"
          >
            <!-- 카테고리 이름 -->
            <div class="text-gray-300 text-sm w-10">{{ category.name }}</div>
            <div class="flex items-center">
              <!-- 진행률 바 -->
              <div class="h-2 w-20 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full"
                  :style="{
                    width: `${category.percentage}%`,
                    backgroundColor: CATEGORY_COLOR_MAP[category.name],
                  }"
                ></div>
              </div>
              <!-- 퍼센트 표시 -->
              <span class="text-[10px] text-gray-300">
                {{ category.percentage }}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 캐릭터 모드 -->
      <div
        v-else-if="mode === 'character'"
        class="flex items-center justify-between"
      >
        <!-- 캐릭터 이미지 -->
        <div class="flex items-center justify-center flex-col">
          <img :src="image" :alt="name" class="size-28 object-cover" />
          <div class="text-limegreen-700">
            {{ name }}
          </div>
        </div>

        <!-- 캐릭터 정보 -->
        <div class="flex-1">
          <div class="text-gray-500 text-sm leading-relaxed">
            {{ summary }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

// Props 정의
const props = defineProps({
  // 모드: 'chart', 'character'
  mode: {
    type: String,
    default: 'chart',
    validator: value => ['chart', 'character'].includes(value),
  },
  // 카드 제목
  title: {
    type: String,
    default: '',
  },
  // 차트 모드 데이터
  chartData: {
    type: Object,
    default: () => ({
      categories: {},
    }),
  },
  // 캐릭터 모드 데이터
  characterData: {
    type: Object,
    default: () => ({
      image: '',
      name: '',
      summary: '',
    }),
  },
});

// 차트 데이터 computed로 반응성 유지
const categoryMap = computed(() => props.chartData.categories || {});

// 카테고리 배열로 변환 (이름 포함)
const categoryList = computed(() =>
  Object.entries(categoryMap.value).map(([categoryName, categoryValue]) => ({
    name: categoryName,
    amount: categoryValue?.amount ?? 0,
    percentage: Number(categoryValue?.ratio ?? 0),
  }))
);

// 카테고리 퍼센트 내림차순 정렬 리스트
const sortedCategoryList = computed(() =>
  [...categoryList.value].sort((a, b) => b.percentage - a.percentage)
);

// 도넛 차트 세그먼트 계산
const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 314.159...
// 식비, 교통비, 쇼핑, 기타
const DEFAULT_COLOR_PALETTE = [
  '#FF6B6B', // 레드 - 식비
  '#4ECDC4', // 민트 - 교통비
  '#FFD166', // 노랑 - 쇼핑
  '#95A5A6', // 그레이 - 기타
];

// 카테고리명에 대한 대표 색 매핑 (없으면 팔레트 순환)
const CATEGORY_COLOR_MAP = {
  식비: '#FF6B6B',
  교통비: '#4ECDC4',
  쇼핑: '#FFD166',
  기타: '#95A5A6',
};

// 도넛 차트 세그먼트 계산
const donutSegments = computed(() => {
  let accumulatedLength = 0;
  return categoryList.value.map((category, index) => {
    // 세그먼트 길이 계산
    const segmentLength = (CIRCUMFERENCE * category.percentage) / 100;
    // 세그먼트 속성 설정
    const segment = {
      // 카테고리 이름
      categoryName: category.name,
      // 세그먼트 색상
      strokeColor:
        CATEGORY_COLOR_MAP[category.name] ||
        DEFAULT_COLOR_PALETTE[index % DEFAULT_COLOR_PALETTE.length],
      // 세그먼트 대시 배열
      strokeDasharray: `${CIRCUMFERENCE}`,
      // 세그먼트 대시 오프셋
      strokeDashoffset: accumulatedLength,
    };
    // 누적 길이 업데이트
    accumulatedLength += segmentLength;
    return segment;
  });
});

// 총 퍼센트 표시
const totalPercentageDisplay = computed(() => {
  // 카테고리 퍼센트 합계 계산
  const total = categoryList.value.reduce(
    (sum, category) =>
      sum + (Number.isFinite(category.percentage) ? category.percentage : 0),
    0
  );
  // 소수점 버림
  return Math.round(total);
});

// 캐릭터 데이터 computed로 반응성 유지
const image = computed(() => props.characterData.image);
const name = computed(() => props.characterData.name);
const summary = computed(() => props.characterData.summary);
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
