<template>
  <button
    class="flex flex-col w-30 py-1 justify-center items-center bg-white border-3 border-limegreen-500 rounded-[10px] shadow"
    @click="handleModal"
  >
    <div class="text-limegreen-800 text-sm mt-1 whitespace-pre-line">
      {{ formattedDateRange }}
    </div>
    <div class="flex h-30 justify-center items-center">
      <img class="h-[80%]" :src="choogoomiImage" alt="" />
    </div>
    <div class="text-limegreen-800 text-normal">{{ ranking }}위</div>
    <div class="text-gray-300 text-sm my-1">{{ score }}점</div>
  </button>
  <MatchingResultModal
    v-if="isResultModal"
    :round-number="roundNumber"
    :title="formattedDateRange"
    @close="handleModal"
  />
</template>
<script setup>
import { computed, ref } from 'vue';

import MatchingResultModal from '@/views/matching/components/MatchingResultModal.vue';

const { choogoomiImage, roundNumber, startDate, ranking, score } = defineProps({
  choogoomiImage: { type: String, required: true },
  roundNumber: { type: Number, required: true },
  startDate: { type: Number, required: true },
  ranking: { type: Number, required: true },
  score: { type: Number, required: true },
});

const isResultModal = ref(false);

const handleModal = () => {
  isResultModal.value = !isResultModal.value;
};

// 날짜 포맷 계산
const formattedDateRange = computed(() => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // 7일간 범위

  const format = date =>
    `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;

  return `${format(start)} \n~ ${format(end)}`;
});
</script>
