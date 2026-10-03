<template>
  <div class="relative flex justify-between flex-col w-full h-full">
    <TopNavigation :showBack="true" :showLogoText="false" />
    <div
      class="bg-ivory flex flex-col gap-6 w-full mt-10 px-6 h-full justify-between mb-26"
    >
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-2">
        <div class="font-bold text-2xl">
          {{ currentQuizType.title }}
        </div>
        <div class="text-limegreen-700 text-sm">
          5문제 중 3문제 이상 맞혀야 미션 성공입니다.
        </div>
        <!-- Progress Bar -->
        <div class="flex flex-col gap-2">
          <div class="w-full h-2 bg-limegreen-100 rounded-full">
            <div
              class="h-full bg-green rounded-full transition-all"
              :style="{
                width: `${((currentIndex + 1) / quizList.length) * 100}%`,
              }"
            ></div>
          </div>
          <div class="flex items-center text-xs mt-1 text-limegreen-700">
            <div class="text-sm text-green">
              {{ currentIndex + 1 }}
            </div>
            <div class="px-1">/ {{ quizList.length }}</div>
          </div>
        </div>
      </div>

      <!-- 현재 질문 카드 컴포넌트 -->
      <QuizCard
        v-if="currentQuestion"
        :quizData="currentQuestion"
        :selectedOption="selectedOption"
        @select="val => (selectedOption = val)"
      />
      <!-- 다음 버튼 -->
      <button
        @click="handleNext"
        class="w-full bg-limegreen-500 text-white text-lg py-4 rounded-lg"
        :disabled="!selectedOption"
        :class="{ 'opacity-50 cursor-not-allowed': !selectedOption }"
      >
        {{ currentIndex === quizList.length - 1 ? '완료' : '다음' }}
      </button>

      <!-- 선택하지 않은 항목이 있을 때 모달 -->
      <AlertModal
        v-if="showModal"
        title="알림"
        message="질문에 응답해주세요."
        buttonText="확인"
        @close="showModal = false"
      />

      <!-- 퀴즈 완료 결과 모달 -->
      <ResultModal
        v-if="showResultModal"
        :correctCount="correctCount"
        :totalCount="quizList.length"
        :isPassed="correctCount >= 3"
        :questionResults="detailedResults"
        @close="handleQuizComplete"
      />
    </div>
    <BottomNavigation />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { validateQuizMission } from '@/api/matchingApi';
import AlertModal from '@/components/AlertModal.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import QuizCard from './components/QuizCard.vue';
import ResultModal from './components/ResultModal.vue';
import { QUIZ_LIST } from './quizData';

const router = useRouter();

const route = useRoute();

// 전달받은 미션 정보
const MISSION_INFO = {
  missionId: route.query.id,
  missionScore: route.query.missionScore,
  score: route.query.score,
};

const currentIndex = ref(0);
const selectedOption = ref(null);
const showModal = ref(false);
const showResultModal = ref(false);
const userAnswers = ref([]);
const correctCount = ref(0);

// 퀴즈 타입 - 현재는 'A'로 고정, 추후 route params나 props로 전달받을 수 있도록 확장 가능
const currentQuizType = computed(() =>
  QUIZ_LIST.find(type => type.type === 'A')
);
const quizList = computed(() => currentQuizType.value?.questions || []);
const currentQuestion = computed(() => quizList.value[currentIndex.value]);

// 상세 결과 데이터
const detailedResults = computed(() => {
  return userAnswers.value.map(answer => {
    const question = quizList.value.find(q => q.id === answer.questionId);
    const selectedOption = question.options.find(
      opt => opt.value === answer.selectedAnswer
    );
    const correctOption = question.options.find(
      opt => opt.value === answer.correctAnswer
    );

    return {
      questionId: answer.questionId,
      question: question.question,
      selectedAnswerText: selectedOption.label,
      correctAnswerText: correctOption.label,
      isCorrect: answer.isCorrect,
      explanation: question.explanation,
    };
  });
});

const handleNext = () => {
  if (!selectedOption.value) {
    showModal.value = true;
    return;
  }

  // 현재 답안 저장
  const currentAnswer = {
    questionId: currentQuestion.value.id,
    selectedAnswer: selectedOption.value,
    correctAnswer: currentQuestion.value.answer,
    isCorrect: selectedOption.value === currentQuestion.value.answer,
  };

  userAnswers.value.push(currentAnswer);

  if (currentAnswer.isCorrect) {
    correctCount.value++;
  }

  console.log('선택한 답:', selectedOption.value);
  console.log('정답:', currentQuestion.value.answer);
  console.log('정답 여부:', currentAnswer.isCorrect);

  if (currentIndex.value < quizList.value.length - 1) {
    currentIndex.value++;
    selectedOption.value = null;
  } else {
    // 퀴즈 완료
    console.log('퀴즈 완료 - 정답 수:', correctCount.value);
    showResultModal.value = true;
  }
};

const handleQuizComplete = async () => {
  showResultModal.value = false;

  if (correctCount.value >= 3) {
    MISSION_INFO.score = MISSION_INFO.missionScore;
  }

  try {
    await validateQuizMission(MISSION_INFO.missionId, MISSION_INFO.score);
  } catch (error) {
    console.error('퀴즈 인증 요청 실패:', error);
  }

  router.go(-1);
};

const handleRetry = () => {
  // 퀴즈 재시작
  currentIndex.value = 0;
  selectedOption.value = null;
  showResultModal.value = false;
  userAnswers.value = [];
  correctCount.value = 0;
};
</script>
