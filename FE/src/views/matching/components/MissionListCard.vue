<template>
  <div class="bg-ivory p-4 rounded-2xl">
    <!--닉네임-->
    <span class="bg-limegreen-100 text-green px-2 py-1 rounded-full text-sm">
      {{ missions[0].userNickname }}
    </span>
    <!--미션목록-->
    <div
      class="flex flex-col mt-2 gap-2"
      v-for="(mission, index) in missions"
      :key="mission.missionId"
    >
      <!--미션 하나-->
      <div
        class="flex justify-between bg-limegreen-100 p-1.5 rounded-[10px] items-center"
        :class="{ 'bg-limegreen-300': isMissionCompleted(mission) }"
      >
        <div class="flex gap-2">
          <div
            class="bg-limegreen-500 rounded-lg w-5 h-5 justify-center text-center"
          >
            {{ index + 1 }}
          </div>
          <div
            :class="[
              'text-sm',
              'mr-5',
              isMissionCompleted(mission) ? 'text-black' : 'text-gray-300',
            ]"
          >
            {{ mission.missionTitle }}
          </div>
        </div>
        <div
          :class="[
            'text-xs',
            'mr-1',
            isMissionCompleted(mission) ? 'text-black' : 'text-gray-300',
          ]"
        >
          {{ mission.score }}점
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  missions: { type: Array, required: true },
});

// 미션 완료 여부를 계산
const isMissionCompleted = mission => {
  return mission.missionScore === mission.score;
};
</script>
