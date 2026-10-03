<template>
  <div class="relative flex justify-center w-full h-full">
    <!-- 로딩 중일 때 LoadingScreen 표시 -->
    <LoadingScreen v-if="isLoading" />

    <!-- 정상 데이터 표시 -->
    <template v-else>
      <TopNavigation />
      <div class="mt-14 w-full">
        <div class="relative">
          <p class="text-lg text-limegreen-800 mb-3 text-center">명예의 전당</p>
          <div
            class="absolute top-1/2 left-1/2 translate-x-[45px] pb-3 -translate-y-1.5 group z-10"
          >
            <img
              :src="icon_info"
              alt="정보 아이콘"
              class="size-3.5 cursor-pointer"
            />
            <!-- hover 이벤트 -->
            <div
              class="absolute top-full -translate-x-[65%] w-75 bg-white border-none text-center rounded-xl shadow-sm drop-shadow-[0_8px_10px_rgba(183,202,112,0.5)] z-20 px-5 py-4 space-y-3 group-hover:block hidden"
            >
              <p class="text-green text-3xl mt-3 mb-3">
                {{ aboutReward.title }}
              </p>
              <p
                class="text-green text-[13px] leading-snug whitespace-pre-line"
              >
                {{ aboutReward.content }}
              </p>
              <div
                v-for="reward in REWARD_LIST"
                :key="reward.choogoomiName"
                class="text-xs leading-tight text-limegreen-800 whitespace-pre-line mt-2 space-y-1"
              >
                <div>
                  <p class="text-bold text-[13px] text-yellow">
                    {{ reward.choogoomiName }}
                  </p>
                </div>
                <div v-for="(reward, rank) in reward.rewards" :key="rank">
                  {{ rank + '등: ' + reward }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 지난주 랭킹 명예의 전당 -->
        <div class="flex gap-1 items-center mb-2 px-6">
          <!-- 2등 -->
          <div
            class="flex flex-1 flex-col items-center w-25 h-40 bg-[#DFF1F9] rounded-xl px-4 pt-3 pb-4"
          >
            <span class="text-gray-300 text-lg font-semibold">{{
              secondRankUser.ranking
            }}</span>
            <img
              :src="getProfileImage(secondRankUser)"
              class="bg-ivory rounded-full mt-2 size-15 object-cover"
            />
            <span
              class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
            >
              {{ getChoogoomiType(secondRankUser) }}
            </span>
            <div class="text-[13px] text-limegreen-800 mt-2">
              {{ secondRankUser.userNickname }}
            </div>
            <div class="text-[11px] text-gray-300">
              {{ secondRankUser.score }}점
            </div>
          </div>

          <!-- 1등 -->
          <div
            class="flex flex-col items-center h-50 w-32 bg-limegreen-100 rounded-xl px-4 pt-3 pb-4"
          >
            <span class="text-yellow text-2xl font-semibold">
              {{ firstRankUser.ranking }}
            </span>
            <img
              :src="getProfileImage(firstRankUser)"
              class="bg-ivory rounded-full mt-1 size-20"
            />
            <span
              class="bg-green text-white mt-[-7px] px-2.5 py-[2px] rounded-full text-xs text-center"
            >
              {{ getChoogoomiType(firstRankUser) }}
            </span>
            <div class="text-[13px] text-limegreen-800 mt-2">
              {{ firstRankUser.userNickname }}
            </div>
            <div class="text-[11px] text-gray-300">
              {{ firstRankUser.score }}점
            </div>
          </div>

          <!-- 3등 -->
          <div
            class="flex flex-1 flex-col items-center bg-[#FFE7E7] w-25 h-40 rounded-xl px-4 pt-3 pb-4"
          >
            <span class="text-[#F29C3A] text-lg font-semibold">
              {{ thirdRankUser.ranking }}
            </span>
            <img
              :src="getProfileImage(thirdRankUser)"
              class="bg-ivory rounded-full mt-2 size-15 object-cover"
            />
            <span
              class="bg-green text-white mt-[-7px] px-2.5 py-[3px] rounded-full text-[9px] text-center"
            >
              {{ getChoogoomiType(thirdRankUser) }}
            </span>
            <div class="text-[13px] text-limegreen-800 mt-2">
              {{ thirdRankUser.userNickname }}
            </div>
            <div class="text-[11px] text-gray-300">
              {{ thirdRankUser.score }}점
            </div>
          </div>
        </div>

        <!-- 이번주 실시간 랭킹 -->
        <div
          class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4"
        >
          <p class="text-lg text-limegreen-900 text-center pt-3 pb-4 px-4">
            실시간 랭킹
          </p>
          <div
            class="max-h-[calc(100vh-450px)] overflow-scroll [&::-webkit-scrollbar]:hidden bg-limegreen-500 mx-3 mb-1 space-y-2"
          >
            <div
              v-for="user in currentRankingList"
              :key="user.ranking"
              class="bg-white rounded-xl px-5 py-2 flex justify-between items-center"
            >
              <div class="flex items-center gap-3">
                <div class="text-lg font-semibold text-limegreen-800">
                  {{ user.ranking }}
                </div>
                <div class="flex flex-col items-center ml-1">
                  <img
                    :src="getProfileImage(user)"
                    class="bg-limegreen-100 rounded-full size-10"
                  />
                  <span
                    class="bg-green text-white mt-[-7px] px-2 py-[2.5px] rounded-full text-[7px] text-center"
                  >
                    {{ getChoogoomiType(user) }}
                  </span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-limegreen-900">{{
                    user.userNickname
                  }}</span>
                  <span class="text-xs text-gray-500">{{ user.score }}점</span>
                </div>
              </div>
              <div
                class="flex items-center text-xs font-semibold leaning-none"
                :class="{
                  'text-limegreen-900': user.ranking - user.beforeRanking === 0,
                  'text-red': user.ranking - user.beforeRanking < 0,
                  'text-blue-500': user.ranking - user.beforeRanking > 0,
                }"
              >
                <div v-if="user.beforeRanking" class="flex items-center">
                  <img
                    v-if="user.ranking - user.beforeRanking !== 0"
                    :src="rankChange"
                    class="size-2 mr-1"
                    :class="{
                      'rotate-180': user.ranking - user.beforeRanking > 0,
                      'icon-red': user.ranking - user.beforeRanking < 0,
                      'icon-blue': user.ranking - user.beforeRanking > 0,
                    }"
                  />
                  <span v-if="user.ranking - user.beforeRanking !== 0">
                    {{ Math.abs(user.ranking - user.beforeRanking) }}
                  </span>
                  <span v-else>-</span>
                </div>
                <span v-else>-</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />

      <RewardModal
        v-if="showModal"
        title="축하합니다!
상위 랭크에 도달했어요."
        message="보상(기프티콘) 발송을 위해 휴대폰 번호를 입력해주세요.
입력된 번호는 보상 발송 목적 외에는 사용되지 않으며, 사용 후 즉시 폐기됩니다."
        caution="‼️ 기회는 단 한 번뿐 ‼️
잘못 입력하면 보상을 받을 수 없어요."
        @submit="handlePhoneSubmit"
        @close="showModal = false"
      />
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { userInfo } from '@/api/authApi.js';
import {
  fetchLastRankingList,
  fetchRankingList,
  updateRankingData,
} from '@/api/ranking.js';
import icon_info from '@/assets/img/icons/feature/icon_info.png';
import rankChange from '@/assets/img/icons/feature/icon_rankChange.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import RewardModal from '@/components/RewardModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap.js';
import { REWARD_LIST } from '@/constants/rewardList.js';
import { getLevel } from '@/utils/levelUtils.js';

// 모달 표시 여부

const showModal = ref(false);

const aboutReward = {
  title: '🎁',
  content: `매주 월요일, 지난주 점수를 기준으로 집계됩니다.\n 순위별로 유형별 맞춤 상품이 차등 지급될 예정입니다.`,
};

const userProfile = ref({});

const lastRankingList = ref([]);
const currentRankingList = ref([]);
const firstRankUser = ref({});
const secondRankUser = ref({});
const thirdRankUser = ref({});

// 로딩 상태 관리 - 초기값은 true (로딩 중)
const isLoading = ref(true);

const fetchLastRankingData = async () => {
  const response = await fetchLastRankingList();
  return response;
};

const fetchCurrentRankingData = async () => {
  const response = await fetchRankingList();
  return response;
};
// 데이터 로딩 함수
const loadRankingData = async () => {
  try {
    isLoading.value = true;
    const userData = await userInfo();
    Object.assign(userProfile.value, userData);

    // 1. 랭킹 업데이트 (선택적)
    const updateResult = await updateRankingData();
    if (!updateResult) {
      console.warn('랭킹 업데이트 실패 - 기존 데이터 사용');
    }

    // 2. 데이터 로딩 (병렬 처리로 성능 향상)
    const [lastData, currentData] = await Promise.all([
      fetchLastRankingData(),
      fetchCurrentRankingData(),
    ]);

    // 3. 데이터 검증 및 할당
    if (lastData && currentData) {
      lastRankingList.value = lastData.map(user => ({ ...user }));
      currentRankingList.value = currentData.map(user => ({ ...user }));

      firstRankUser.value = lastRankingList.value[0] || {};
      secondRankUser.value = lastRankingList.value[1] || {};
      thirdRankUser.value = lastRankingList.value[2] || {};

      // 유저 닉네임이 지난주 랭킹 top3에 포함되면 모달 표시
      // 데이터 세팅 후 실행
      if (
        [firstRankUser, secondRankUser, thirdRankUser].some(
          user => user && user.value.userNickname === userProfile.value.nickname
        )
      ) {
        showModal.value = true;
      }

      //  모든 요청이 성공하면 로딩 완료
      isLoading.value = false;
    } else {
      throw new Error('필수 데이터 로딩 실패');
    }
  } catch (error) {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadRankingData();
});

// 쭈꾸미 유형 가져오기
const getChoogoomiType = userData => {
  const choogoomiName = userData.choogooMi;
  const choogoomiData = CHOOGOOMI_MAP.find(
    data => data.choogoomiName === choogoomiName
  );
  if (!choogoomiData) {
    return '알 수 없음';
  }
  return choogoomiData.choogoomiType;
};

const getProfileImage = userData => {
  // 사용자 레벨 계산
  const level = getLevel(userData.score);
  // 사용자 쭈꾸미 유형
  const choogoomiName = userData.choogooMi;
  // 유형에 맞는 레벨별 데이터 가져오기
  const choogoomiData = CHOOGOOMI_MAP.find(
    data => data.choogoomiName === choogoomiName
  );
  if (!choogoomiData) {
    // 기본 이미지 반환
    return new URL(
      '../../assets/img/characters/character_savings_profile.png',
      import.meta.url
    ).href;
  }
  const profileData =
    choogoomiData.userLevel[level] || choogoomiData.userLevel[0];
  return new URL(profileData.image_url, import.meta.url).href;
};

function handlePhoneSubmit(phoneNumber) {
  console.log('제출된 전화번호:', phoneNumber);
  showModal.value = false;
}
</script>

<style scoped>
/* 아이콘 색상 변경을 위한 CSS 필터 */
.icon-red {
  filter: brightness(0) saturate(100%) invert(15%) sepia(89%) saturate(7500%)
    hue-rotate(359deg) brightness(95%) contrast(107%);
}

.icon-blue {
  filter: brightness(0) saturate(100%) invert(26%) sepia(100%) saturate(4625%)
    hue-rotate(213deg) brightness(95%) contrast(106%);
}
</style>
