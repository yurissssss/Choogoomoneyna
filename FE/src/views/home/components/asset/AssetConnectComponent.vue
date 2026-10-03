<template>
  <!-- 화면 전체 배경 -->
  <div
    class="min-h-screen bg-ivory flex flex-col items-center justify-center px-4 relative"
  >
    <!-- 상단 네비게이션 -->
    <TopNavigation
      :show-back="true"
      :show-logo-text="true"
      :logo-text="'자산 연동'"
    />
    <!-- 은행 아이콘 -->
    <BankIcon :assets="bankIcon" :alt="bankName" :size="20" class="mb-4" />
    <!-- 자산 연동 폼 -->
    <form class="w-full flex flex-col gap-4" @submit.prevent="connectAsset">
      <!-- 아이디 입력 -->
      <div class="flex flex-col gap-2">
        <label class="text-limegreen-900 text-[16px]">아이디</label>
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
        <label class="text-limegreen-900 text-[16px]">비밀번호</label>
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
  />
</template>

<script setup>
import { computed, ref } from 'vue';

import axiosInstance from '@/api/axios';
import BankIcon from '@/components/BankIcon.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { BANK_LIST } from '@/constants/bankList';

import ConnectModal from './ConnectModal.vue';

// Props 정의
const props = defineProps({
  selectedBankId: { type: String, required: true, default: null },
});

// Emit 정의
const emit = defineEmits(['next', 'additional-connect']);

// 폼 데이터
const userBankId = ref('');
const userBankPassword = ref('');

// 상태 관리
const isConnecting = ref(false);
const isModalOpen = ref(false);
const modalType = ref(true); // true: 성공, false: 실패

// Computed
const bankName = computed(() => {
  return BANK_LIST.find(bank => bank.bankId === props.selectedBankId)?.name;
});

const bankIcon = computed(() => {
  return BANK_LIST.find(bank => bank.bankId === props.selectedBankId)?.icon;
});

const isInputEmpty = computed(() => {
  return !userBankId.value.trim() || !userBankPassword.value.trim();
});

// 자산 연결 함수
const connectAsset = async () => {
  if (isConnecting.value) return; // 중복 요청 방지

  isConnecting.value = true;
  try {
    // API 호출
    await axiosInstance.post('/api/codef/account/add', {
      bankId: props.selectedBankId,
      userBankId: userBankId.value,
      userBankPassword: userBankPassword.value,
    });

    // 임시로 성공으로 처리
    modalType.value = true;
    isModalOpen.value = true;
  } catch (error) {
    console.error('자산 연동 실패:', error);
    modalType.value = false;
    isModalOpen.value = true;
  } finally {
    isConnecting.value = false;
  }
};

// 모달 닫기 핸들러
const handleModalClose = () => {
  connectAsset();
  isModalOpen.value = false;
  emit('next');
};

const handleAdditionalConnect = () => {
  emit('additional-connect');
};
</script>
