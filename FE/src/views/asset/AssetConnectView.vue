<template>
  <!-- 화면 전체 배경 -->
  <div class="min-h-screen bg-ivory flex flex-col items-center px-4 relative">
    <!-- 상단 네비게이션 -->
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="flex flex-col gap-2 items-center mt-12">
      <div class="text-limegreen-900 text-2xl">자산 연동</div>
      <div class="text-limegreen-700 text-sm mt-4">
        자산 연동을 통해 리포트 생성을 위한 데이터를 수집합니다.
      </div>
    </div>
    <div class="w-full flex flex-col gap-4 mt-20">
      <!-- 은행 아이콘 -->
      <BankIcon :assets="bankIcon" :alt="bankName" :size="20" class="mb-4" />
      <!-- 자산 연동 폼 -->
      <form
        class="w-full flex flex-col gap-2 mt-6"
        @submit.prevent="connectAsset"
      >
        <!-- 아이디 입력 -->
        <div class="flex flex-col gap-2">
          <label class="text-limegreen-900 text-base">아이디</label>
          <div class="relative">
            <img
              src="@/assets/img/icons/feature/icon_id.png"
              alt="아이디 입력"
              class="absolute left-7 top-1/2 -translate-y-1/2 size-5"
            />
            <input
              type="text"
              v-model="userBankId"
              placeholder="아이디를 입력해주세요."
              class="w-full bg-limegreen-100 rounded-[10px] px-16 h-11 text-limegreen-900 placeholder:text-gray-200 placeholder:font-jua font-spoqa! outline-none"
            />
          </div>
        </div>
        <!-- 비밀번호 입력 -->
        <div class="flex flex-col gap-2">
          <label class="text-limegreen-900 text-base">비밀번호</label>
          <div class="relative">
            <img
              src="@/assets/img/icons/feature/icon_password.png"
              alt="비밀번호 입력"
              class="absolute left-7 top-1/2 -translate-y-1/2 size-5"
            />
            <input
              type="password"
              v-model="userBankPassword"
              placeholder="비밀번호를 입력해주세요."
              class="w-full bg-limegreen-100 rounded-[10px] px-16 h-11 text-limegreen-900 placeholder:text-gray-200 placeholder:font-jua font-spoqa! outline-none"
            />
          </div>
        </div>
        <!-- 자산 연동 버튼 -->
        <div class="w-full mt-10">
          <button
            type="submit"
            :disabled="isInputEmpty || isConnecting"
            class="w-full bg-limegreen-500! h-14! text-limegreen-900! rounded-[10px] py-3 mt-4 text-2xl! disabled:opacity-50"
          >
            {{ isConnecting ? '연결 중...' : '자산 연결' }}
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- 조건에 따라서 자산 연동 결과 모달 표시 -->
  <ConnectModal
    v-if="isModalOpen"
    :title="modalType === false ? '자산 연동 실패' : '자산 연동 성공!'"
    :message="
      modalType === false
        ? '다시 연동을 시도해 주세요.'
        : `${bankName} 자산 연동에 성공했습니다!`
    "
    @next="handleModalClose"
    @additional-connect="handleAdditionalConnect"
    @close="handleModalClose"
  />
  <AlertModal
    v-if="isAlreadyAddedAccounts"
    title="계좌를 확인해주세요."
    :message="`이미 연동된 계좌입니다.`"
    @close="handleAlreadyModalClose"
  />

  <LoadingModal v-if="isLoading" />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fetchBankFromCodef, fetchTransactionsFromCodef } from '@/api/bankApi';
import AlertModal from '@/components/AlertModal.vue';
import BankIcon from '@/components/BankIcon.vue';
import LoadingModal from '@/components/LoadingModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { BANK_LIST } from '@/constants/bankList';

import ConnectModal from './ConnectModal.vue';

const router = useRouter();
const route = useRoute();
const selectedBankId = computed(() => route.params.bankId);

// 폼 데이터
const userBankId = ref('');
const userBankPassword = ref('');

// 상태 관리
const isConnecting = ref(false);
const isModalOpen = ref(false);
const modalType = ref(true); // true: 성공, false: 실패
const isLoading = ref(false);
const isAlreadyAddedAccounts = ref(false); // 이미 연동된 계좌 모달

// Computed
const bankName = computed(() => {
  return BANK_LIST.find(bank => bank.bankId === selectedBankId.value)?.name;
});

const bankIcon = computed(() => {
  return BANK_LIST.find(bank => bank.bankId === selectedBankId.value)?.icon;
});

const isInputEmpty = computed(() => {
  return !userBankId.value.trim() || !userBankPassword.value.trim();
});

// 자산 연결 함수
const connectAsset = async () => {
  if (isConnecting.value) return;
  isConnecting.value = true;
  isLoading.value = true; // 로딩 모달 시작

  try {
    // 계좌 연동
    const bankInfo = await fetchBankFromCodef({
      selectedBankId: selectedBankId.value,
      userBankId: userBankId.value,
      userBankPassword: userBankPassword.value,
    });

    if (bankInfo === 'Already added Accounts') {
      isLoading.value = false;
      isAlreadyAddedAccounts.value = true;
      return;
    }

    // 연동된 계좌의 계좌 번호 리스트 만들기
    const accountList = bankInfo.map(account => {
      return { accountNum: account.accountNum, bankId: account.bankId };
    });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);

    // 연동된 계좌의 거래 내역 불러오기
    await Promise.all(
      accountList.map(account =>
        fetchTransactionsFromCodef({
          account: account.accountNum,
          organization: account.bankId,
          startDate: startDate.toISOString().split('T')[0].replace(/-/g, ''),
          endDate: endDate.toISOString().split('T')[0].replace(/-/g, ''),
        })
      )
    );
    console.log(accountList);

    // 로딩 모달 숨기고 성공 모달 표시
    isLoading.value = false;
    modalType.value = true;
    isModalOpen.value = true;
  } catch (error) {
    console.error('자산 연동 실패:', error);
    // 로딩 모달 숨기고 실패 모달 표시
    isLoading.value = false;
    modalType.value = false;
    isModalOpen.value = true;
  } finally {
    isConnecting.value = false;
  }
};

// 모달 닫기 핸들러
const handleModalClose = () => {
  isModalOpen.value = false;
  // 성공한 경우에만 추구미 선택 페이지로 이동
  if (modalType.value === true) {
    router.push({ name: 'assetReport' });
  }
};

const handleAlreadyModalClose = () => {
  isAlreadyAddedAccounts.value = false;
};

const handleAdditionalConnect = () => {
  router.push({ name: 'assetSelect' });
};
</script>
