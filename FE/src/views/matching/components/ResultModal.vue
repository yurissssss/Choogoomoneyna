<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="bg-ivory rounded-4xl p-6 mx-4 max-w-[335px] w-full max-h-[90vh] flex flex-col shadow-lg"
    >
      <!-- 결과 확인 타이틀과 미션 성공 여부 -->
      <div class="text-center mb-6">
        <div class="text-limegreen-700 text-3xl mb-2">결과 확인</div>
        <div
          class="flex items-center justify-center gap-2 mb-2 text-2xl"
          :class="isPassed ? 'text-green' : 'text-red'"
        >
          {{ isPassed ? '미션 성공 🎯' : '미션 실패 😅' }}
          <span class="text-2xl">{{ correctCount }}/{{ totalCount }}</span>
        </div>
      </div>

      <!-- 문제별 결과 스크롤 영역 -->
      <div class="flex-1 overflow-y-auto mb-6 [&::-webkit-scrollbar]:hidden">
        <div
          v-for="(result, index) in questionResults"
          :key="index"
          class="bg-limegreen-100 rounded-lg p-4 mb-4 flex flex-col gap-2"
        >
          <!-- 문제 제목 -->
          <div class="text-limegreen-800 text-lg mb-3 whitespace-pre-line">
            <!-- 정답/오답 표시 -->
            <div class="mb-3">
              <span
                class="px-2 py-1 rounded text-lg"
                :class="
                  result.isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                "
              >
                {{ result.isCorrect ? '정답' : '오답' }}
              </span>
            </div>
            Q{{ result.questionId }} {{ result.question }}
          </div>
          <!-- 답안 정보 -->
          <div class="mb-4 text-lg flex flex-col gap-2">
            <div class="flex items-center w-full">
              <span class="w-16 text-sm text-limegreen-700">내 선택</span>
              <span
                class="whitespace-pre-wrap text-sm"
                :class="result.isCorrect ? 'text-green-600' : 'text-red-600'"
              >
                {{ result.selectedAnswerText }}
              </span>
            </div>
            <div class="flex items-center w-full">
              <span class="w-16 text-sm text-limegreen-700">정답</span>
              <span class="text-green-600 whitespace-pre-wrap text-sm">{{
                result.correctAnswerText
              }}</span>
            </div>
          </div>

          <!-- 해설 -->
          <div class="text-sm text-limegreen-800 leading-relaxed">
            <span class="font-semibold">해설:</span> {{ result.explanation }}
          </div>
        </div>
      </div>

      <!-- 액션 버튼 -->
      <div class="flex w-full">
        <button
          @click="$emit('close')"
          class="h-12 bg-limegreen-500 text-limegreen-900 rounded-lg text-lg font-bold transition-colors hover:bg-limegreen-600"
          :class="!isPassed ? 'flex-1' : 'w-full'"
        >
          확인
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  correctCount: {
    type: Number,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  isPassed: {
    type: Boolean,
    required: true,
  },
  questionResults: {
    type: Array,
    required: true,
  },
});

defineEmits(['close', 'retry']);
</script>
