<template>
  <div class="flex justify-center w-full px-6">
    <div class="bg-ivory min-h-screen flex flex-col w-full">
      <!-- 상단: 타이틀 + 프로그레스 바 -->
      <div class="pt-8 pb-4">
        <!-- 타이틀 -->
        <div class="flex flex-col text-center gap-2 mb-4">
          <div class="font-bold text-2xl text-limegreen-900 justify-center">
            사전 조사
          </div>
          <div class="text-limegreen-700 text-sm">
            자산관리 성향을 새롭게 진단해보세요.
          </div>
        </div>

        <!-- Progress Bar -->
        <div>
          <div class="w-full h-2 bg-limegreen-100 rounded-full">
            <div
              class="h-full bg-green rounded-full transition-all"
              :style="{
                width: `${((currentIndex + 1) / surveyList.length) * 100}%`,
              }"
            ></div>
          </div>
          <div class="flex items-center text-base mt-1 text-limegreen-700">
            <div class="text-base text-green">
              {{ currentIndex + 1 }}
            </div>
            <div class="px-1">/ {{ surveyList.length }}</div>
          </div>
        </div>
      </div>

      <!-- 중앙: 질문 카드 컴포넌트 -->
      <div class="flex-1 flex items-center justify-center w-full">
        <QuestionCard
          :question="currentQuestion"
          :selectedOption="selectedOption"
          @select="val => (selectedOption = val)"
        />
      </div>

      <!-- 하단: 버튼 -->
      <div class="pb-8 pt-4">
        <button
          @click="handleNext"
          class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg disabled:opacity-50"
          :disabled="isProcessing"
        >
          {{
            isProcessing
              ? '처리 중...'
              : currentIndex === surveyList.length - 1
                ? '자산 연동'
                : '다음'
          }}
        </button>
      </div>

      <!--선택하지 않은 항목이 있을 때 모달 -->
      <AlertModal
        v-if="showModal"
        title="알림"
        message="질문에 응답해주세요."
        buttonText="확인"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import AlertModal from '@/components/AlertModal.vue';
import QuestionCard from '@/views/signup/components/survey/QuestionCard.vue';
import { SURVEY_LIST } from '@/views/signup/constants/survey';

// Emit 정의
const emit = defineEmits(['next']);

// 설문 2 목록
const surveyList = SURVEY_LIST.filter(question => question.id >= 4);

// 현재 질문 인덱스
const currentIndex = ref(0);

// 선택된 옵션
const selectedOption = ref(null);

// 모달 상태
const showModal = ref(false);

// 로딩 상태 관리
const isProcessing = ref(false);

// survey2 답변들을 저장할 배열
const survey2Answers = ref([selectedOption.value]);

// 현재 질문
const currentQuestion = computed(() => surveyList[currentIndex.value]);

const isLastSurvey = computed(
  () => currentIndex.value === surveyList.length - 1
);

const handleNext = () => {
  // 선택된 옵션이 없을 때
  if (!selectedOption.value) {
    showModal.value = true;
    return;
  }
  // 현재 질문의 답변을 저장
  survey2Answers.value[currentIndex.value] = selectedOption.value;

  // 마지막 질문일 때
  if (isLastSurvey.value) {
    emit('next', survey2Answers.value);
    return;
  }

  // 다음 질문으로 이동
  currentIndex.value++;
  selectedOption.value = null;
};
</script>
