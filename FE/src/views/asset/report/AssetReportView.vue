<template>
  <LoadingModal v-if="isLoading" />
  <!-- 전체 배경 -->
  <div v-else class="min-h-screen bg-ivory flex flex-col items-center px-4">
    <!-- 헤더 -->
    <div class="text-limegreen-900 text-2xl h-20 flex items-center mt-4">
      자산 분석 리포트
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="w-full flex flex-col gap-y-6">
      <!-- 순자산 박스 -->
      <div class="bg-limegreen-100 rounded-lg w-full flex flex-col gap-y-1 p-6">
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
              title="카테고리 별 소비"
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
            <div class="text-green">{{ reportData.advice }}</div>
            <div
              class="text-limegreen-900 leading-relaxed whitespace-pre-line"
              v-for="(item, index) in reportData.actionItems"
              :key="index"
            >
              - {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 다음 버튼 -->
    <div class="w-full pb-10 mt-6">
      <button
        class="w-full bg-limegreen-500 text-white text-2xl py-4 rounded-lg"
        @click="handleNext"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
import { useRouter } from 'vue-router';

import { fetchAccounts } from '@/api/bankApi';
import { createReport, fetchUserData } from '@/api/userApi';
import LoadingModal from '@/components/LoadingModal.vue';
import { CHOOGOOMI_CHARACTERS } from '@/constants/ChoogoomiList';
import AnalysisCard from '@/views/asset/report/components/AnalysisCard.vue';

const isLoading = ref(false);
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

// API 응답 데이터 구조
const reportData = ref({});

const userData = ref({
  nickname: '',
  asset: 0,
  summary: '',
});

// 차트 데이터
const expenseCategories = ref({
  식비: {
    amount: 0,
    ratio: 0,
  },
  교통비: {
    amount: 0,
    ratio: 0,
  },
  쇼핑: {
    amount: 0,
    ratio: 0,
  },
  기타: {
    amount: 0,
    ratio: 0,
  },
});

// AnalysisCard에서 사용할 차트 데이터
const chartAnalysisData = computed(() => ({
  categories: expenseCategories.value,
}));

// AnalysisCard에서 사용할 캐릭터 데이터
const characterAnalysisData = ref({
  image: '',
  name: '',
  summary: '',
});

// API에서 리포트 데이터 가져오기
const fetchReportData = async () => {
  isLoading.value = true;
  try {
    const response = await createReport();
    // 리포트 데이터 저장
    reportData.value = response;
    userData.value.summary = reportData.value.summary;
    expenseCategories.value = reportData.value.categorySpent;

    characterAnalysisData.value.name = reportData.value.recommend;

    // 유저/자산 데이터 병렬 로드가 모두 끝날 때까지 대기
    await Promise.all([getUserData(), getAsset()]);

    // 추천받은 추구미 데이터 찾기
    const choogoomi = CHOOGOOMI_CHARACTERS.find(
      choogoomi => choogoomi.label === reportData.value.recommend
    );
    // 추천받은 추구미 데이터 설정
    characterAnalysisData.value = {
      image: choogoomi.img,
      name: choogoomi.label,
      summary: choogoomi.summary,
    };
  } catch (error) {
    console.error('리포트 데이터 로드 실패:', error);
  } finally {
    isLoading.value = false;
  }
};

const getUserData = async () => {
  const response = await fetchUserData();
  userData.value.nickname = response.nickname;
};

const getAsset = async () => {
  const accounts = await fetchAccounts();

  // 계좌가 없으면 종료
  if (accounts.length === 0) return;
  // 자산 총액 계산
  const totalAsset = accounts.reduce(
    (acc, curr) => Number(acc) + Number(curr.accountBalance),
    0
  );
  userData.value.asset = totalAsset;
};

// 다음 버튼 클릭 핸들러
const handleNext = () => {
  router.push('/choogoomi');
};

onMounted(() => {
  fetchReportData();
});
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
