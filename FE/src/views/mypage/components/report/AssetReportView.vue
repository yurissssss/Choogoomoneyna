<template>
  <AlertModal
    v-if="isAlertModalOpen"
    @close="isAlertModalOpen = false"
    :message="'자산 분석 리포트를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.'"
  />
  <!-- 전체 배경 -->

  <div
    v-else
    class="min-h-screen bg-ivory flex flex-col items-center justify-evenly px-4"
  >
    <!-- 메인 콘텐츠 영역 -->
    <div
      class="flex flex-col w-full items-center justify-center overflow-y-auto"
    >
      <!-- 헤더 -->
      <div class="h-12 flex items-center justify-center w-full gap-x-4">
        <!-- 이전 버튼 -->
        <div
          class="flex items-center justify-center bg-limegreen-100 rounded-xl"
        >
          <button
            @click="goToPreviousReport"
            :disabled="currentReportIndex === 0"
            :class="[
              'size-10 flex items-center justify-center rounded-xl',
              currentReportIndex === 0 && 'cursor-not-allowed text-gray-300',
            ]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <!-- 제목 -->
        <div class="text-limegreen-900 text-2xl text-center">
          자산 분석 리포트
        </div>
        <!-- 다음 버튼 -->
        <div
          class="flex items-center justify-center bg-limegreen-100 rounded-xl"
        >
          <button
            @click="goToNextReport"
            :disabled="currentReportIndex === reportList.length - 1"
            :class="[
              'size-10 flex items-center justify-center rounded-xl',
              currentReportIndex === reportList.length - 1 &&
                'cursor-not-allowed text-gray-300',
            ]"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- 리포트 생성날짜 및 인덱스 -->
      <div class="text-limegreen-700 text-lg mb-4">
        {{ reportList[currentReportIndex].regDate }}
      </div>

      <!-- 메인 콘텐츠 박스들 -->
      <div class="w-full flex flex-col gap-y-4">
        <!-- 순자산 박스 -->
        <div
          class="bg-limegreen-100 rounded-lg w-full flex flex-col gap-y-1 p-6"
        >
          <span class="text-limegreen-900 text-xl">
            {{ userData.nickname }} 님의 순자산
          </span>
          <span class="text-green text-xl">
            {{ Number(userData.asset).toLocaleString() }}원
          </span>
          <span class="text-gray-300 text-base whitespace-pre-line break-keep">
            {{ userData.summary }}
          </span>
        </div>

        <!-- 메인 컨테이너 -->
        <div
          class="w-full flex h-110 flex-col bg-limegreen-500 rounded-lg p-6 gap-y-4"
        >
          <Carousel v-bind="carouselConfig">
            <Slide>
              <!-- 지출 분석 차트 박스 -->
              <AnalysisCard
                mode="chart"
                title="전체 수입 대비 지출이 많아요!"
                :chart-data="chartAnalysisData"
              />
            </Slide>
            <!-- 캐릭터 분석 예제 -->
            <Slide>
              <AnalysisCard
                mode="character"
                :character-data="characterAnalysisData"
              />
            </Slide>
          </Carousel>

          <!-- 분석 내용 박스 -->
          <div class="bg-limegreen-200 rounded-lg overflow-hidden">
            <div
              class="bg-ivory rounded-lg p-4 flex flex-col gap-y-1 h-80 overflow-y-scroll [&::-webkit-scrollbar]:hidden"
            >
              <span
                class="text-green text-base whitespace-pre-line break-keep"
                >{{ reportList[currentReportIndex].advice }}</span
              >
              <span
                class="text-gray-600 text-base leading-relaxed whitespace-pre-line"
                v-for="(item, index) in reportList[currentReportIndex]
                  .actionItems"
                :key="index"
              >
                - {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 고정 버튼 -->
    <button
      class="w-full bg-limegreen-500 text-white text-2xl py-4 rounded-lg"
      @click="handleClose"
    >
      확인
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
import { useRouter } from 'vue-router';

import { fetchAccounts } from '@/api/bankApi';
import { getReportList } from '@/api/userApi';
import { fetchUserData } from '@/api/userApi';
import AlertModal from '@/components/AlertModal.vue';
import { CHOOGOOMI_CHARACTERS } from '@/constants/ChoogoomiList';
import { calculateRegDate } from '@/utils/dateUtils';
import AnalysisCard from '@/views/mypage/components/report/components/AnalysisCard.vue';

const carouselConfig = {
  // 한 번에 보여줄 슬라이드 개수 (1개씩 보여주기)
  itemsToShow: 1,
  // 마지막 슬라이드에서 첫 번째 슬라이드로 순환 이동 가능
  wrapAround: true,
  // 자동재생 간격 (밀리초) - 2초마다 자동으로 다음 슬라이드
  autoplay: 2000,
  // 슬라이드 전환 애니메이션 속도 (밀리초) - 2초 동안 부드럽게 전환
  transition: 2000,
  // 슬라이드 간 간격 (픽셀) - 슬라이드 사이 20px 여백
  gap: 20,
  // 마우스 드래그로 슬라이드 이동 허용
  mouseDrag: true,
  // 터치(모바일)로 슬라이드 이동 허용
  touchDrag: true,
  // 마우스 호버 시 자동재생 일시정지 (사용자가 내용을 자세히 볼 수 있도록)
  pauseAutoplayOnHover: true,
};

const router = useRouter();

// 사용자 데이터
const userData = ref({
  nickname: '',
  asset: 0,
  summary: '',
});

// 리포트 데이터 배열
const reportList = ref([
  {
    regDate: '',
    summary: '',
    advice: '',
    recommend: '',
    actionItems: [],
  },
]);

const isAlertModalOpen = ref(false);

// 현재 리포트 인덱스
const currentReportIndex = ref(reportList.value.length - 1);

// 차트 기본 카테고리
const DEFAULT_EXPENSE_CATEGORIES = {
  식비: { amount: 0, ratio: 0 },
  교통비: { amount: 0, ratio: 0 },
  쇼핑: { amount: 0, ratio: 0 },
  기타: { amount: 0, ratio: 0 },
};

// AnalysisCard에서 사용할 차트 데이터 (현재 인덱스 기반)
const chartAnalysisData = computed(() => {
  const current = reportList.value[currentReportIndex.value];
  return {
    categories: current?.categorySpent || DEFAULT_EXPENSE_CATEGORIES,
  };
});

// AnalysisCard에서 사용할 캐릭터 데이터 (현재 인덱스 기반)
const characterAnalysisData = computed(() => {
  const current = reportList.value[currentReportIndex.value];
  const name = current?.recommend || '';
  const choogoomi = CHOOGOOMI_CHARACTERS.find(c => c.label === name);
  return choogoomi
    ? {
        image: choogoomi.img,
        name: choogoomi.label,
        summary: choogoomi.summary,
      }
    : { image: '', name, summary: '' };
});

// API에서 리포트 목록 가져오기
const fetchReportList = async () => {
  try {
    const response = await getReportList();
    response.forEach(item => {
      item.regDate = calculateRegDate(item.regDate);
    });
    reportList.value = response;
    // 최신 리포트가 기본으로 보이도록 설정
    currentReportIndex.value = Math.max(0, reportList.value.length - 1);
    // 사용자 데이터/자산 동시 요청
    Promise.all([getUserData(), getAsset()]);
    // 요약 텍스트 초기화
    userData.value.summary =
      reportList.value[currentReportIndex.value]?.summary || '';
    return response;
  } catch (error) {
    isAlertModalOpen.value = true;
  }
};

const getUserData = async () => {
  try {
    const response = await fetchUserData();
    userData.value.nickname = response.nickname;
  } catch (error) {
    isAlertModalOpen.value = true;
  }
};

const getAsset = async () => {
  try {
    const accounts = await fetchAccounts();
    // 계좌가 없으면 종료
    if (accounts.length === 0) return;
    // 자산 총액 계산
    const totalAsset = accounts.reduce(
      (acc, curr) => Number(acc) + Number(curr.accountBalance),
      0
    );
    userData.value.asset = totalAsset;
  } catch (error) {
    isAlertModalOpen.value = true;
  }
};

// 이전 리포트로 이동
const goToPreviousReport = () => {
  if (currentReportIndex.value > 0) {
    currentReportIndex.value--;
  }
};

// 다음 리포트로 이동
const goToNextReport = () => {
  if (currentReportIndex.value < reportList.value.length - 1) {
    currentReportIndex.value++;
  }
};

const handleClose = () => {
  router.push('/mypage');
};

onMounted(() => {
  fetchReportList();
});

// 인덱스 변경 시 요약 텍스트 갱신
watch(currentReportIndex, () => {
  userData.value.summary =
    reportList.value[currentReportIndex.value]?.summary || '';
});
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
