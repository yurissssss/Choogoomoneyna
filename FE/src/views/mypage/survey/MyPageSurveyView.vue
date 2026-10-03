<template>
  <div class="relative min-h-screen bg-ivory">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <!-- 설문 1 -->
    <SurveyOneComponent
      v-if="currentStep === 1"
      @next="handleSurveyOneComplete"
    />

    <!-- 설문 2 -->
    <SurveyTwoComponent
      v-if="currentStep === 2"
      @next="handleSurveyTwoComplete"
    />
    <AlertModal
      v-if="isSuccessModalOpen"
      title="설문 제출 완료"
      message="설문 제출이 완료되었습니다."
      @close="handleModalClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { submitSurvey } from '@/api/userApi';
import AlertModal from '@/components/AlertModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import SurveyOneComponent from './MyPageSurveyOneComponent.vue';
import SurveyTwoComponent from './MyPageSurveyTwoComponent.vue';

const router = useRouter();
// 현재 설문 단계 (1: 첫 번째 설문, 2: 두 번째 설문)
const currentStep = ref(1);

// 설문 데이터를 저장할 평면 배열 [설문1답변1, 설문1답변2, ..., 설문2답변1, 설문2답변2, ...] (총 14개)
const surveyAnswers = ref([]);

const isSuccessModalOpen = ref(false);

// 설문 1 완료 처리
const handleSurveyOneComplete = surveyOneAnswers => {
  // 배열을 평면화하여 추가 (spread operator 사용)
  surveyAnswers.value.push(...surveyOneAnswers);
  // 다음 설문으로 이동
  currentStep.value = 2;
};

// 설문 2 완료 처리
const handleSurveyTwoComplete = surveyTwoAnswers => {
  // 설문 2 답변들도 평면화하여 추가
  surveyAnswers.value.push(...surveyTwoAnswers);
  // 최종 설문 데이터 출력 (총 14개 값이 하나의 배열에)
  sendSurveyData();
};

// API 요청 형식으로 변환하는 함수
const convertToRequestData = () => {
  // 문제의 id값은 1부터 14까지
  return {
    surveyAnswers: surveyAnswers.value.map((answer, index) => ({
      surveyQuestionId: index + 1,
      surveyAnswerId: answer,
    })),
  };
};

const sendSurveyData = async () => {
  const requestData = convertToRequestData();

  await submitSurvey(requestData);
  isSuccessModalOpen.value = true;
};

const handleModalClose = () => {
  isSuccessModalOpen.value = false;
  router.push('/mypage');
};
</script>
