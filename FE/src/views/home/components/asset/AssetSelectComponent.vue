<template>
  <div
    class="min-h-screen flex flex-col items-center relative justify-center px-6"
  >
    <TopNavigation
      :show-back="true"
      :show-logo-text="true"
      :logo-text="'자산 연동'"
    />
    <!-- 은행 목록 컨테이너 -->
    <div
      class="font-spoqa text-[16px] bg-limegreen-100 w-full rounded-2xl p-6 flex flex-col gap-3 max-h-[calc(100vh-300px)] overflow-y-auto [&::-webkit-scrollbar]:hidden"
    >
      <div
        v-for="bank in BANK_LIST"
        :key="bank.bankId"
        class="flex items-center p-4 bg-white rounded-[10px] cursor-pointer transition-all duration-200 border-2 border-transparent hover:-translate-y-0.5 hover:shadow-md"
        :class="{
          'bg-limegreen-500!': selectedBankId === bank.bankId,
        }"
        @click="selectedBankId = bank.bankId"
      >
        <div class="flex items-center justify-center mr-4">
          <BankIcon :assets="bank.icon" :alt="bank.name" :size="10" />
        </div>
        <div
          :class="selectedBankId === bank.bankId ? 'text-white' : 'text-black'"
        >
          {{ bank.name }}
        </div>
      </div>
    </div>

    <!-- 선택 버튼 -->
    <div class="w-[332px] bottom-10 fixed">
      <button
        class="w-full bg-limegreen-500 text-limegreen-900 rounded-[10px] h-12 text-[22px]! disabled:opacity-50"
        :disabled="!selectedBankId || isProcessing"
        @click="confirmSelection"
      >
        {{ isProcessing ? '처리 중...' : '선택' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import BankIcon from '@/components/BankIcon.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { BANK_LIST } from '@/constants/bankList';

// Emit 정의
const emit = defineEmits(['next']);

const props = defineProps({
  selectedBankId: { type: String, default: null },
});

const selectedBankId = ref(props.selectedBankId);
const isProcessing = ref(false);

const confirmSelection = () => {
  if (!selectedBankId.value || isProcessing.value) return;

  isProcessing.value = true;

  // 선택된 은행 ID를 부모로 전달
  emit('next', selectedBankId.value);

  // 처리 상태는 네비게이션으로 인해 자동으로 리셋됨
};
</script>
