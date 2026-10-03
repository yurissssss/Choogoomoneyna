<template>
  <div class="min-h-screen flex flex-col items-center relative px-6">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <!-- 은행 목록 컨테이너 -->

    <div class="mt-12 flex flex-col gap-2 items-center">
      <div class="text-limegreen-900 text-2xl">자산 연동</div>
      <div class="text-limegreen-700 text-sm mt-4">
        자산 연동을 통해 리포트 생성을 위한 데이터를 수집합니다.
      </div>
    </div>
    <div
      class="font-spoqa text-[16px] bg-limegreen-100 w-full rounded-2xl p-6 flex flex-col gap-3 max-h-[calc(100vh-300px)] overflow-y-auto [&::-webkit-scrollbar]:hidden mt-8"
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
import { useRouter } from 'vue-router';

import BankIcon from '@/components/BankIcon.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { BANK_LIST } from '@/constants/bankList';

const selectedBankId = ref(null);
const isProcessing = ref(false);
const router = useRouter();

const confirmSelection = () => {
  if (!selectedBankId.value || isProcessing.value) return;

  console.log('selectedBankId', selectedBankId.value);

  isProcessing.value = true;

  router.push({
    name: 'assetConnect',
    params: { bankId: selectedBankId.value },
  });
};
</script>
