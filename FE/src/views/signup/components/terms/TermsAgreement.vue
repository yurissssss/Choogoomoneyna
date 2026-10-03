<template>
  <!-- 전체 배경 -->
  <div class="min-h-screen bg-ivory flex flex-col px-6 relative">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <!-- 상단 네비게이션 -->

    <div class="flex flex-col items-center pt-12">
      <p class="text-2xl text-limegreen-900">약관 동의</p>
    </div>
    <!-- 메인 컨테이너 -->
    <div class="flex-1 flex flex-col pt-8 pb-6 gap-24">
      <!-- 약관 동의 박스 -->
      <div
        class="pb-20 bg-white border-2 border-limegreen-500 rounded-lg p-6 flex flex-col gap-y-4"
      >
        <!-- 전체 동의 섹션 (흰색 배경) -->
        <div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center mr-3 cursor-pointer"
                :class="
                  allAgreed
                    ? 'bg-limegreen-500 border-limegreen-500'
                    : 'bg-limegreen-100'
                "
                @click="toggleAllAgreement"
              >
                <svg
                  v-if="allAgreed"
                  class="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4 text-ivory bg-limegreen-100 rounded-full"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span class="text-limegreen-800 font-medium text-lg"
                >약관에 모두 동의 합니다</span
              >
            </div>
          </div>
        </div>

        <hr class="border-limegreen-100" />
        <!-- 개별 약관 목록 -->
        <div class="flex-1 space-y-4 flex flex-col gap-y-4">
          <div
            v-for="(term, index) in terms"
            :key="index"
            class="flex flex-col gap-y-2"
          >
            <div class="flex">
              <div class="flex items-center flex-1">
                <div
                  class="w-5 h-5 rounded-full flex items-center justify-center mr-3 cursor-pointer"
                  :class="term.agreed ? 'bg-limegreen-500' : 'bg-limegreen-100'"
                  @click="toggleTerm(index)"
                >
                  <svg
                    v-if="term.agreed"
                    class="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-4 h-4 text-ivory bg-limegreen-100 rounded-full"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <span class="text-limegreen-900 font-medium">{{
                    term.title
                  }}</span>
                  <span v-if="term.required" class="text-limegreen-900">
                    (필수)</span
                  >
                </div>
              </div>
            </div>
            <!-- 약관 내용 표시 부분만 수정 -->
            <div
              class="text-gray-600 text-xs bg-limegreen-100 rounded-lg p-1 overflow-y-auto max-h-30 leading-relaxed whitespace-pre-line [&::-webkit-scrollbar]:hidden"
            >
              {{ term.content }}
            </div>
          </div>
        </div>
      </div>

      <!-- 다음 버튼 -->
      <button
        class="w-full bg-limegreen-500 text-limegreen-900 font-bold text-xl py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-limegreen-600"
        :disabled="!canProceed"
        @click="handleNext"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import TopNavigation from '@/components/TopNavigation.vue';

const router = useRouter();

// 약관 데이터

const terms = ref([
  {
    id: 'service',
    title: '서비스 이용약관',
    required: true,
    agreed: false,
    content: `
    추구미 가계부 서비스 이용에 관한 기본 규칙입니다.

    - 회원가입 시 정확한 정보를 입력해주세요.
    - 타인의 계정을 사용하거나 허위 정보 입력을 금지합니다.
    - 서비스는 시스템 점검 등으로 일시 중단될 수 있습니다.
    - 회사는 서비스 개선을 위해 기능을 변경할 수 있습니다.
    - 부적절한 이용 시 서비스 이용이 제한될 수 있습니다.`,
  },
  {
    id: 'privacy',
    title: '개인정보 처리방침',
    required: true,
    agreed: false,
    content: `
    - 수집하는 정보: 이메일, 닉네임, 은행 연동 정보
    - 이용 목적: 서비스 제공, 가계부 관리, 금융 분석
    - 보관 기간: 회원 탈퇴 시까지 (법령에 의한 보관 제외)
    - 제3자 제공: 법령에 의한 경우를 제외하고는 제공하지 않습니다.
    - 개인정보는 암호화하여 안전하게 보관합니다.
    - 회원은 언제든지 개인정보 수정, 삭제를 요청할 수 있습니다.`,
  },
]);

// 전체 동의 상태
const allAgreed = computed(() => {
  return terms.value.every(term => term.agreed);
});

// 다음 버튼 활성화 조건 (필수 약관만 체크하면 됨)
const canProceed = computed(() => {
  return terms.value.filter(term => term.required).every(term => term.agreed);
});

// 개별 약관 토글
const toggleTerm = index => {
  terms.value[index].agreed = !terms.value[index].agreed;
};

// 전체 동의 토글
const toggleAllAgreement = () => {
  const newState = !allAgreed.value;
  terms.value.forEach(term => {
    term.agreed = newState;
  });
};

// 다음 단계로 진행
const handleNext = () => {
  if (canProceed.value) {
    // 약관 동의 정보를 다음 단계로 전달하거나 저장
    const agreementData = terms.value.reduce((acc, term) => {
      acc[term.id] = term.agreed;
      return acc;
    }, {});

    console.log('약관 동의 데이터:', agreementData);
    emit('next');
  }
};

// Props로 전달받을 수 있는 이벤트
const emit = defineEmits(['next']);
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>
