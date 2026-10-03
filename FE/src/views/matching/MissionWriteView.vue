<template>
  <div class="relative flex justify-center w-full h-screen">
    <TopNavigation :showBack="true" :showLogoText="false" />
    <div class="bg-ivory flex flex-col gap-10 w-full mt-10 px-6">
      <!-- 타이틀 -->
      <div class="flex flex-col text-center gap-6">
        <div class="tfont-bold text-2xl justify-center">
          {{ MISSION_INFO.missionTitle }}
        </div>
        <div class="text-limegreen-700 text-sm whitespace-pre-line">
          {{ MISSION_INFO.missionContent }}
        </div>
        <div class="text-red text-sm">(100자 이상)</div>
      </div>
      <div
        class="flex flex-col gap-5 bg-limegreen-100 px-4 rounded-lg text-center h-100"
      >
        <!-- 사용자 입력 -->
        <div class="relative w-full justify-start text-[13px] mt-2">
          <textarea
            v-model="inputText"
            placeholder="내용을 입력하세요"
            class="w-full h-92 px-4 pt-4 resize-none text-left text-limegreen-800 outline-none border-none focus:outline-none focus:ring-0 placeholder:text-limegreen-500"
            maxlength="500"
          ></textarea>
          <div class="absolute bottom-0 right-3 text-sm">
            <p
              :class="
                inputText.length < 100 || inputText.length == 500
                  ? 'text-red'
                  : 'text-green'
              "
            >
              {{ inputText.length + '/500' }}
            </p>
          </div>
        </div>
      </div>

      <!-- 제출 버튼 -->
      <button
        @click="handleNext"
        :disabled="inputText.length < 100"
        :class="[
          'w-full text-lg py-4 rounded-lg',
          inputText.length < 100
            ? 'bg-ivory text-limegreen-500 border border-limegreen-500 cursor-not-allowed'
            : 'bg-limegreen-500 text-white',
        ]"
      >
        제출
      </button>
    </div>
    <BottomNavigation />

    <AlertModal
      v-if="showSuccessModal"
      title="미션 성공"
      :message="MISSION_INFO.missionTitle"
      @close="handleSuccessClose"
    />

    <AlertModal
      v-if="showFailModal"
      title="미션 인증 실패"
      :message="MISSION_INFO.missionTitle"
      @close="handleRetry"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { validateWriteMission } from '@/api/matchingApi';
import AlertModal from '@/components/AlertModal.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import TopNavigation from '@/components/TopNavigation.vue';

const route = useRoute();

// 전달받은 미션 정보
const MISSION_INFO = {
  missionId: Number(route.query.id),
  missionTitle: route.query.title,
  missionContent: route.query.content,
  missionScore: route.query.score,
};

const inputText = ref('');
const showSuccessModal = ref(false); // 미션 성공 모달
const showFailModal = ref(false); // 미션 인증 실패 모달

const router = useRouter();

// 미션 완료 여부 조건: 100자 이상 작성
const isMissionCompleted = computed(() => {
  return inputText.value.length >= 100;
});

// 미션 제출 후 성공 여부 판단
const submitMission = async missionId => {
  try {
    const data = await validateWriteMission(missionId, inputText.value);
    // 미션 성공 여부 판단하기 위해 응답 데이터에 접근
    const list = data.missionProgressDTOList;
    const missionIdNumber = Number(missionId);
    const missionData = list.find(
      item => Number(item.missionId) === missionIdNumber
    );
    // 해당 미션 점수가 0이 아닌 경우 성공
    const isSuccess = Number(missionData.score) !== 0;
    return isSuccess;
  } catch (error) {
    throw new Error(error);
  }
};
// 미션 성공 여부 판단 후 모달 표시
const handleNext = async () => {
  if (!isMissionCompleted.value) {
    return;
  }
  const isSuccess = await submitMission(MISSION_INFO.missionId);
  if (isSuccess) {
    showSuccessModal.value = true;
    return;
  }
  showFailModal.value = true;
  return;
};

// 미션 성공 모달 닫기
const handleSuccessClose = () => {
  showSuccessModal.value = false;
  router.push('/matching');
};

// 미션 인증 실패 모달 닫기
const handleRetry = () => {
  showFailModal.value = false;
  router.go(-1);
};
</script>
