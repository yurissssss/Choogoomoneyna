<template>
  <div
    class="flex flex-col gap-5 justify-center bg-limegreen-100 px-4 py-6 rounded-lg text-center w-full"
  >
    <!-- 질문 헤더 -->
    <div class="flex flex-col gap-3">
      <div class="text-green text-2xl font-bold">Q{{ quizData.id }}</div>
      <div
        class="text-limegreen-800 text-lg font-medium leading-relaxed px-2 whitespace-pre-line break-keep"
      >
        {{ quizData.question }}
      </div>
    </div>

    <!-- 선택지 -->
    <div
      :class="[
        'grid gap-3 px-2',
        optionLayout === '2' && 'grid-cols-2 w-full h-40 text-6xl',
      ]"
    >
      <button
        v-for="(option, index) in quizData.options"
        :key="index"
        @click="$emit('select', option.value)"
        :class="[
          'flex justify-center items-center border-2 border-limegreen-500 rounded-lg p-4 text-sm font-medium whitespace-pre-line transition-all duration-200',
          'min-h-[3rem]',
          selectedOption === option.value
            ? 'bg-limegreen-500 text-ivory border-limegreen-500 shadow-md'
            : 'bg-ivory text-limegreen-700 hover:bg-ivory hover:text-limegreen-800 hover:shadow-md',

          // 2컬럼일 때 텍스트 크기 조정
          optionLayout === '2' ? 'text-base font-semibold' : '',
        ]"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  quizData: {
    type: Object,
    required: true,
  },
  selectedOption: {
    type: Number,
    default: null,
  },
});

defineEmits(['select']);

// 옵션 레이아웃 결정 4지선다와 2지선다 구분
const optionLayout = computed(() => {
  const options = props.quizData.options;

  // 2지선다 질문은 2컬럼으로
  if (options.length === 2) return '2';
  return '4';
});
</script>
