<template>
  <!-- 전체 페이지 wrapper -->
  <div class="relative pt-17 px-6 bg-ivory">
    <TopNavigation :showBack="true" :showLogoText="false" />
    <!-- 계좌 정보 -->
    <div
      class="flex flex-col bg-limegreen-500 h-[110px] rounded-xl text-center justify-center p-4 mb-6"
    >
      <p
        class="bg-limegreen-100 text-limegreen-600 text-center text-[11px] px-[6px] py-[1px] mx-auto my-1 rounded-[5px] w-fit"
      >
        {{ accountName }}
      </p>
      <p class="text-limegreen-900 text-lg leading-tight mb-1">
        {{ bankName }} {{ accountNum }}
      </p>
      <p class="text-green text-[19px] leading-none">{{ totalBalance }}원</p>
    </div>

    <!-- 거래 내역 -->
    <div>
      <div class="flex justify-between items-center mt-6 mb-4">
        <!-- 왼쪽: 제목 -->
        <p class="text-limegreen-900 text-xl">거래 내역</p>

        <!-- 오른쪽: 거래유형 필터 - 전체/입금/출금 -->
        <FilterTransactionType @selectedType="onSelectedType" />
      </div>

      <!-- 거래 목록 - 스크롤 영역 -->
      <div
        class="max-h-[calc(100vh-300px)] overflow-scroll [&::-webkit-scrollbar]:hidden font-spoqa"
      >
        <div
          class="bg-limegreen-100 px-4 py-3 rounded-xl mb-3 flex justify-between items-start"
          v-for="(transaction, i) in filteredTransactions"
          :key="i"
        >
          <!-- 왼쪽: 날짜, 설명 -->
          <div class="text-left">
            <p class="text-xs text-limegreen-900 mb-1">
              {{ transaction.formattedTime }}
            </p>
            <p class="text-sm text-limegreen-800 text-medium">
              {{ transaction.trDesc3 }}
            </p>
          </div>

          <!-- 오른쪽: 금액, 잔액 -->
          <div class="text-right">
            <p class="text-limegreen-800 text-sm font-medium mt-5"></p>
            <p class="text-sm text-limegreen-800">
              {{ transaction.transactionType === 'Output' ? '출금' : '입금' }}
              {{
                transaction.transactionType === 'Output'
                  ? transaction.trAccountOut?.toLocaleString()
                  : transaction.trAccountIn?.toLocaleString()
              }}원
            </p>
            <p class="text-gray-300 text-xs">
              잔액 {{ transaction.trAfterBalance.toLocaleString() }}원
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { fetchTransactions } from '@/api/bankApi';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import FilterTransactionType from './components/filter/FilterTransactionType.vue';

// 현재 URL의 파라미터로부터 계좌 정보 추출
const route = useRoute();
const bankId = route.params.bankId;
const accountNum = route.params.accountNum;
const accountName = route.params.accountName;
const accountBalance = Number(route.query.accountBalance);
const bankName = route.query.bankName;

// 잔액 숫자로 포맷
const totalBalance = computed(() => accountBalance.toLocaleString());

// 필터에서 선택된 거래유형 - 거래 유형: All / Input / Output
const selectedType = ref('All');

// 필터링 시 실행되는 함수
const onSelectedType = transactionType => {
  selectedType.value = transactionType; // All, Input, Output
};

const TRANSACTIONS = ref([]);

onMounted(async () => {
  try {
    const data = await fetchTransactions(accountNum);

    TRANSACTIONS.value = data.map(transaction => {
      return {
        ...transaction,
        formattedTime: transaction.trTime.replace('T', ' ').slice(0, 16),
      };
    });
  } catch (err) {
    console.error('거래 내역 조회 실패:', err);
  }
});

// 필터 선택 결과에 따라 거래 내역 필터링
const filteredTransactions = computed(() => {
  if (selectedType.value === 'All') return TRANSACTIONS.value;
  return TRANSACTIONS.value.filter(transaction =>
    selectedType.value === 'Input'
      ? transaction.transactionType === 'Input'
      : transaction.transactionType === 'Output'
  );
});
</script>
