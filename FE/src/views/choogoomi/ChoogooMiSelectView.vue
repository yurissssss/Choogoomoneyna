<template>
  <div class="bg-ivory flex flex-col items-center">
    <p
      class="w-full h-20 flex items-center justify-center text-2xl text-limegreen-900"
    >
      추구미 선택
    </p>
    <div
      class="text-center text-base text-gray-300 whitespace-pre-line break-keep"
    >
      <span>어떤 스타일로 자산을 관리하고 싶으신가요?</span>
      <br />
      <span> 나에게 맞는 '추구미'를 선택해보세요! </span>
    </div>
    <div class="min-w-xs mt-10">
      <!-- 첫 번째 행: 2개 -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-8 mb-8">
        <ChoogooMiCard
          v-for="character in CHOOGOOMI_CHARACTERS.slice(0, 2)"
          :key="character.choogoomiId"
          :img="character.img"
          :label="character.label"
          :selected="selected === character.choogoomiId"
          @click="select(character.choogoomiId)"
        />
      </div>

      <!-- 두 번째 행: 1개 (가운데 정렬) -->
      <div class="flex justify-center mb-8">
        <ChoogooMiCard
          :img="CHOOGOOMI_CHARACTERS[2].img"
          :label="CHOOGOOMI_CHARACTERS[2].label"
          :selected="selected === CHOOGOOMI_CHARACTERS[2].choogoomiId"
          @click="select(CHOOGOOMI_CHARACTERS[2].choogoomiId)"
        />
      </div>

      <!-- 세 번째 행: 2개 -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-8">
        <ChoogooMiCard
          v-for="character in CHOOGOOMI_CHARACTERS.slice(3, 5)"
          :key="character.choogoomiId"
          :img="character.img"
          :label="character.label"
          :selected="selected === character.choogoomiId"
          @click="select(character.choogoomiId)"
        />
      </div>
    </div>
    <ChoogooMiDetailModal
      v-if="isModalOpen"
      :selected-choogoo-mi="selectedChoogooMi"
      @close="isModalOpen = false"
      @select="confirmSelection"
    />
    <AlertModal
      v-if="isErrorModalOpen"
      title="오류"
      message="회원가입 중 문제가 발생했습니다. 다시 시도해주세요."
      @close="handleError"
    />
    <AlertModal
      v-if="isSuccessModalOpen"
      title="추구미 선택 완료"
      message="추구미 선택이 완료되었습니다."
      @close="handleSuccess"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import AlertModal from '@/components/AlertModal.vue';
import { CHOOGOOMI_CHARACTERS } from '@/constants/ChoogoomiList';
import { useChoogoomiStore } from '@/stores/choogoomiStore';

import ChoogooMiCard from './ChoogooMiCard.vue';
import ChoogooMiDetailModal from './ChoogooMiDetailModal.vue';

const router = useRouter();
const choogoomiStore = useChoogoomiStore();

const selected = ref(null);
const isModalOpen = ref(false);
const isErrorModalOpen = ref(false);
const isSuccessModalOpen = ref(false);

// 선택한 카드의 index 저장
const select = idx => {
  selected.value = idx;
  isModalOpen.value = true;
};

// 추구미 선택 확정
const confirmSelection = async () => {
  try {
    // API 호출: 선택한 추구미로 업데이트
    // 선택한 추구미 LocalStorage에 저장
    await choogoomiStore.setChoogoomiType(selected.value);
    isSuccessModalOpen.value = true;
  } catch (error) {
    console.error('추구미 선택 실패:', error);
    // 에러 처리 - 에러 모달 표시
    isErrorModalOpen.value = true;
  } finally {
    isModalOpen.value = false;
  }
};

// 선택된 캐릭터 정보
const selectedChoogooMi = computed(() => {
  return selected.value !== null
    ? CHOOGOOMI_CHARACTERS.find(char => char.choogoomiId === selected.value)
    : null;
});

const handleError = () => {
  isErrorModalOpen.value = false;
  // 에러 발생 시 다시 선택할 수 있도록 모달만 닫기
};

const handleSuccess = () => {
  isSuccessModalOpen.value = false;
  router.push('/');
};
</script>
