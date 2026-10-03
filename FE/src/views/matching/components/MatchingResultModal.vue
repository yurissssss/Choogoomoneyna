<template>
  <div
    v-if="isLoaded"
    class="fixed inset-0 flex items-center justify-center bg-black/70 z-20"
  >
    <div
      class="flex flex-col gap-4 bg-limegreen-500 rounded-4xl p-5 items-center"
    >
      <!--지난주 매칭 결과-->
      <div class="flex flex-col gap-0.5 w-full mt-1">
        <div class="text-limegreen-900 text-lg">{{ title }}</div>
        <div class="bg-ivory flex rounded-2xl p-5 justify-center">
          <div
            class="flex w-full text-sm text-center justify-around items-center"
          >
            <div>
              <div class="text-limegreen-900">
                {{ matchingResult.myMissionProgressList[0].userNickname }}
              </div>
              <div class="text-green">{{ matchingResult.myTotalScore }}점</div>
            </div>
            <div class="text-limegreen-900 text-lg">VS</div>
            <div>
              <div class="text-limegreen-900">
                {{ matchingResult.opponentMissionProgressList[0].userNickname }}
              </div>
              <div class="text-green">
                {{ matchingResult.opponentTotalScore }}점
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--미션 목록-->
      <div class="flex flex-col w-full gap-0.5">
        <div class="text-limegreen-900 text-lg">미션 목록</div>
        <div class="flex flex-col gap-2 text-sm">
          <!--나의 미션-->
          <MissionListCard :missions="matchingResult.myMissionProgressList" />
          <!--상대방 미션-->
          <MissionListCard
            :missions="matchingResult.opponentMissionProgressList"
          />
        </div>
      </div>
      <button
        class="bg-ivory w-36 h-12 rounded-2xl text-limegreen-900"
        @click="$emit('close')"
      >
        확인
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

import { getResultByRound } from '@/api/matchingApi';

import MissionListCard from './MissionListCard.vue';

const props = defineProps({
  roundNumber: { type: Number, required: true },
  title: { type: String, required: true },
});

const matchingResult = reactive({
  myMissionProgressList: [],
  opponentMissionProgressList: [],
  myTotalScore: 0,
  opponentTotalScore: 0,
});

const isLoaded = ref(false);

onMounted(async () => {
  try {
    const result = await getResultByRound(props.roundNumber);
    Object.assign(matchingResult, result);
    isLoaded.value = true;
  } catch (error) {
    console.log(error);
  }
});
</script>
