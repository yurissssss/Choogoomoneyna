<template>
  <div
    v-if="isFailMatching"
    class="h-screen flex items-center justify-center bg-ivory"
  >
    <AlertModal
      title="매칭 시작 전입니다."
      :message="MATCHING_ERROR_MESSAGE"
      @close="handleRetry"
    />
  </div>
  <LoadingScreen v-else-if="isLoading" class="h-screen" />
  <div v-else class="relative flex justify-center">
    <TopNavigation />
    <div class="flex flex-col w-full min-h-[calc(100vh-120px)] bg-ivory mt-18">
      <!-- 매칭 참가자 프로필 -->
      <div class="flex justify-around px-10 items-center mb-2">
        <!-- 매칭 점수 비교 -->
        <!-- 나 -->
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="text-limegreen-900 text-lg mb-1">
            {{ myMatchingScore }}점
          </div>
          <img :src="myUserData.profileImageUrl" class="w-20" />
        </div>
        <div class="flex flex-col item-center justify-center text-center">
          <span class="bg-green text-white text-sm px-3 py-0.5 rounded-full">{{
            choogoomiStore.choogoomiType
          }}</span>
          <span class="text-limegreen-900 text-xl font-bold mt-3">VS</span>
        </div>
        <!-- 상대 -->
        <div class="flex flex-col flex-1 items-center justify-center">
          <div class="text-limegreen-900 text-lg mb-2">
            {{ opponentMatchingScore }}점
          </div>
          <img :src="opponentUserData.profileImageUrl" class="w-20" />
        </div>
      </div>

      <!-- 매칭 점수 게이지 바 (양쪽에서 채워짐) -->
      <div
        class="h-3 rounded-full mx-6 overflow-hidden bg-limegreen-100 relative"
      >
        <!-- 왼쪽: 나의 점수 (red) -->
        <div
          class="absolute left-0 top-0 bottom-0 bg-red"
          :style="{ width: myBarWidth }"
        ></div>
        <!-- 오른쪽: 상대 점수 (yellow) -->
        <div
          class="absolute right-0 top-0 bottom-0 bg-yellow"
          :style="{ width: opponentBarWidth }"
        ></div>
      </div>

      <!-- 프로필 정보 -->
      <div class="flex justify-around px-10 items-center mt-2 mb-4">
        <!-- 나 -->
        <div class="flex flex-col flex-1 justify-center items-center">
          <span
            class="bg-limegreen-100 text-limegreen-900 px-3 py-0.5 rounded-full text-sm z-10"
          >
            {{ myUserData.ranking }}위
          </span>
          <div class="text-lg text-limegreen-900">
            {{ myUserData.nickname }}
          </div>
          <div class="text-sm text-gray-300">
            {{
              'Lv.' + myUserData.level + ' / ' + myUserData.totalScore + '점'
            }}
          </div>
        </div>

        <!-- 상대 -->
        <div class="flex flex-col flex-1 justify-center items-center">
          <span
            class="bg-limegreen-100 text-limegreen-900 px-3 py-0.5 rounded-full text-sm z-10"
          >
            {{ opponentUserData.ranking }}위
          </span>
          <div class="text-lg text-limegreen-900">
            {{ opponentUserData.nickname }}
          </div>
          <div class="text-sm text-gray-300">
            {{
              'Lv.' +
              opponentUserData.level +
              ' / ' +
              opponentUserData.totalScore +
              '점'
            }}
          </div>
        </div>
      </div>

      <!-- 미션 목록 -->
      <div
        class="flex-1 bg-limegreen-500 rounded-t-[30px] px-6 py-2 w-full h-full mx-auto flex flex-col"
      >
        <div class="flex justify-between items-center mt-4 pb-3 px-2">
          <p class="text-lg text-limegreen-900">미션 목록</p>
          <div class="relative group ml-auto">
            <img
              :src="icon_info"
              class="size-4 flex items-center justify-center rounded-full group cursor-pointer"
            />

            <!-- hover 이벤트 - 미션별 점수 반영 시기 -->
            <div
              class="absolute right-0 -mr-2 top-full mt-1.5 w-75 bg-white border border-limegreen-500 text-xs rounded-xl shadow-lg drop-shadow-[0_8px_10px_rgba(163,230,53,0.6)] z-20 px-4 py-4 space-y-3 group-hover:block hidden"
            >
              <div v-for="(info, i) in MISSION_INFORMATION" :key="i">
                <p class="text-green-700 mb-0.5 text-lg">{{ info.title }}</p>
                <p
                  class="text-limegreen-700 leading-tight whitespace-pre-line text-sm"
                >
                  {{ info.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 나 -->
        <div class="bg-ivory p-3 rounded-xl">
          <span
            class="bg-limegreen-100 text-green px-2 py-1 rounded-lg text-base"
          >
            {{ myUserData.nickname }}
          </span>
          <div v-for="(mission, missionId) in myMissionList" :key="missionId">
            <div class="flex items-center mt-2">
              <div
                class="flex justify-between items-center bg-limegreen-100 w-full rounded-lg text-[13px] pl-2 py-2 text-limegreen-900"
                :class="{
                  'cursor-pointer hover:shadow-lg transition-all duration-300':
                    isClickableMission(mission),
                  'bg-limegreen-500': mission.score !== 0,
                }"
                @click="
                  isClickableMission(mission) &&
                  goToMission(mission.missionType, missionId)
                "
              >
                <div>
                  <span class="text-green">{{
                    '[' + mission.missionScore + '점] '
                  }}</span>
                  <span
                    class="text-limegreen-900"
                    :class="{ 'text-green': mission.score !== 0 }"
                  >
                    {{
                      (Object.keys(myMissionList)[0] === missionId
                        ? '공통 미션: '
                        : choogoomiStore.choogoomiType + ' 미션: ') +
                      mission.missionTitle
                    }}
                  </span>
                </div>
                <span
                  class="pr-2 text-gray-300 text-xs"
                  :class="{ 'text-black!': mission.score !== 0 }"
                >
                  {{ mission.score + '/' + mission.missionScore }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 상대 -->
        <div class="bg-ivory p-3 mt-4 rounded-xl">
          <span
            class="bg-limegreen-100 text-green px-2 py-1 rounded-lg text-base"
          >
            {{ opponentUserData.nickname }}
          </span>
          <div
            v-for="(mission, missionId) in opponentMissionList"
            :key="missionId"
          >
            <div class="flex items-center mt-2">
              <div
                class="flex justify-between items-center bg-limegreen-100 w-full rounded-lg text-[13px] pl-2 py-2 text-limegreen-900"
                :class="{ 'bg-limegreen-500': mission.score !== 0 }"
              >
                <div>
                  <span class="text-green">{{
                    '[' + mission.missionScore + '점] '
                  }}</span>
                  <span class="text-limegreen-900">
                    {{
                      (Object.keys(opponentMissionList)[0] === missionId
                        ? '공통 미션: '
                        : choogoomiStore.choogoomiType + ' 미션: ') +
                      mission.missionTitle
                    }}
                  </span>
                </div>
                <span
                  class="pr-2 text-gray-300 text-xs"
                  :class="{ 'text-black!': mission.score !== 0 }"
                >
                  {{ mission.score + '/' + mission.missionScore }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 퀴즈 안내 모달 -->
    <QuizAlertModal
      v-if="showModal"
      title="매칭 미션 퀴즈 안내"
      message="퀴즈는 매칭 기간(일주일) 동안 단 1번만 응시 가능합니다.<br/>❗️ 제출 후 재응시는 불가능합니다.<br/>준비가 되셨다면 신중하게 시작해 주세요!"
      @close="modalClose"
      @confirm="goToQuiz"
    />

    <!-- 매칭 결과 모달 -->
    <MatchingResultModal
      v-if="showResultModal && isMonday()"
      :round-number="lastweekResult.roundNumber - 1"
      title="지난주 매칭 결과"
      @close="closeResultModal"
    />

    <BottomNavigation />
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { fetchMatchingData } from '@/api/matchingApi';
import { getRankingHistory } from '@/api/ranking';
import icon_info from '@/assets/img/icons/feature/icon_info.png';
import AlertModal from '@/components/AlertModal.vue';
import BottomNavigation from '@/components/BottomNavigation.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap';
import { useChoogoomiStore } from '@/stores/choogoomiStore';
import { isMonday } from '@/utils/dateUtils';
import { getLevel } from '@/utils/levelUtils';

import MatchingResultModal from './components/MatchingResultModal.vue';
import QuizAlertModal from './components/QuizAlertModal.vue';

const router = useRouter();
const choogoomiStore = useChoogoomiStore();

// 클릭(인증) 가능한 미션인지 확인
//  -> 미션 타입 & 이미 수행했는지 확인
const isClickableMission = mission => {
  return (
    ['TEXT_INPUT', 'QUIZ'].includes(mission.missionType) &&
    mission.score !== mission.missionScore
  );
};

const isLoading = ref(false);
const isFailMatching = ref(false); // 매칭 데이터 불러오기 실패 모달
const MATCHING_ERROR_MESSAGE = '다음 주 월요일 09:00에 매칭이 시작됩니다.';

const showModal = ref(false); // 퀴즈 안내 모달
const showResultModal = ref(false); // 매칭 결과 모달
const selectedMission = ref(null); // 선택된 미션 (인증하려는 미션)

//지난주 매칭 결과 모달
const lastweekResult = reactive({});

// 사용자 프로필 정보
const myUserData = ref({});
const opponentUserData = ref({});
// 미션 정보
const myMissionList = ref({});
const opponentMissionList = ref({});

// 매칭 점수
const myMatchingScore = ref(0);
const opponentMatchingScore = ref(0);

// 게이지 바 너비 계산
// - 두 점수가 모두 0이면: 좌우 각각 1%
// - 그 외에는 점수 비율로 좌우 각각 퍼센트
const myBarWidth = computed(() => {
  const myScore = myMatchingScore.value;
  const opponentScore = opponentMatchingScore.value;
  const total = myScore + opponentScore;
  if (total === 0) return '1%';
  return `${(myScore / total) * 100}%`;
});

const opponentBarWidth = computed(() => {
  const myScore = myMatchingScore.value;
  const opponentScore = opponentMatchingScore.value;
  const total = myScore + opponentScore;
  if (total === 0) return '1%';
  return `${(opponentScore / total) * 100}%`;
});

// 추구미 캐릭터 경로 조회 헬퍼: 스토어의 한글 타입 라벨과 레벨로 이미지 경로 찾기
const getCharacterPath = (typeLabel, level) => {
  const characterData = CHOOGOOMI_MAP.find(e => e.choogoomiType === typeLabel);
  return characterData.userLevel[level].image_url;
};

// 페이지 로드 시 매칭 데이터 fetch 및 상태 초기화
onMounted(async () => {
  try {
    isLoading.value = true;
    const matchingData = await fetchMatchingData();
    await choogoomiStore.initializeChoogoomiType();

    //매칭 결과 모달에 띄울 데이터 가져오기
    const result = await getRankingHistory();
    //매칭 결과 중 가장 최근인 지난주 데이터(인덱스 0) 할당
    Object.assign(lastweekResult, result[0]);

    //지난주 매칭 결과를 가져온 뒤 모달 표시
    showResultModal.value = true;

    // 나의 프로필 정보
    const myData = matchingData.myMissionProgressList[0];

    const myRanking = matchingData.myRanking;
    const myNickname = myData.userNickname;
    const myTotalScore = matchingData.myTotalScore;
    const myLevel = getLevel(myTotalScore);
    const myCharacter = new URL(
      getCharacterPath(choogoomiStore.choogoomiType, myLevel),
      import.meta.url
    ).href;

    myUserData.value = {
      ranking: myRanking,
      profileImageUrl: myCharacter,
      nickname: myNickname,
      totalScore: myTotalScore,
      level: myLevel,
      matchingScore: 0,
    };

    // 상대의 프로필 정보
    const opponentData = matchingData.opponentMissionProgressList[0];

    const opponentRanking = matchingData.opponentRanking;
    const opponentNickname = opponentData.userNickname;
    const opponentTotalScore = matchingData.opponentTotalScore;
    const opponentLevel = getLevel(opponentTotalScore);
    const opponentCharacter = new URL(
      getCharacterPath(choogoomiStore.choogoomiType, opponentLevel),
      import.meta.url
    ).href;

    opponentUserData.value = {
      ranking: opponentRanking,
      profileImageUrl: opponentCharacter,
      nickname: opponentNickname,
      totalScore: opponentTotalScore,
      level: opponentLevel,
      matchingScore: 0,
    };

    // 나의 미션 리스트
    const myMission = matchingData.myMissionProgressList;

    myMissionList.value = Object.fromEntries(
      myMission.map(mission => [
        mission.missionId,
        {
          missionId: mission.missionId,
          missionTitle: mission.missionTitle,
          missionContent: mission.missionContent,
          missionScore: mission.missionScore,
          score: mission.score,
          missionType: mission.missionType,
        },
      ])
    );

    // 상대의 미션 리스트
    const opponentMission = matchingData.opponentMissionProgressList;

    opponentMissionList.value = Object.fromEntries(
      opponentMission.map(mission => [
        mission.missionId,
        {
          missionTitle: mission.missionTitle,
          missionContent: mission.missionContent,
          missionScore: mission.missionScore,
          score: mission.score,
          missionType: mission.missionType,
        },
      ])
    );

    // 나의 매칭 점수 계산
    myMatchingScore.value = myMission.reduce((acc, cur) => acc + cur.score, 0);

    // 상대의 매칭 점수 계산
    opponentMatchingScore.value = opponentMission.reduce(
      (acc, cur) => acc + cur.score,
      0
    );

    isLoading.value = false;
  } catch (err) {
    isLoading.value = false;
    isFailMatching.value = true;
  }
});

// hover 이벤트 - 미션 점수 반영 시기
const MISSION_INFORMATION = [
  {
    title: '✅ 즉시 반영되는 미션',
    description:
      '퀴즈나 텍스트 입력처럼 사용자가 직접 제출하는 미션은 제출과 동시에 점수가 바로 반영돼요.',
  },
  {
    title: '✅ 다음날 반영되는 미션',
    description:
      '"하루 무지출"처럼 실제 계좌 기록을 확인해야 하는 미션은 해당 날짜가 지난 뒤 다음날 자동으로 점수가 반영돼요.',
  },
  {
    title: '✅ 매칭 완료 후 반영되는 미션',
    description:
      '이번 주 지출 10만원 이하’처럼 7일간의 실제 계좌 기록을 확인해야 하는 미션은 해당 매칭이 끝난 뒤 자동으로 점수가 반영돼요.',
  },
];

// 미션 클릭 -> 미션별로 미션페이지 매핑
const goToMission = (missionType, missionId) => {
  const mission = myMissionList.value[missionId];
  if (!mission) return;

  // 글쓰기 미션 -> 미션 정보와 함께 페이지 이동
  if (missionType === 'TEXT_INPUT') {
    router.push({
      name: 'missionWrite',
      query: {
        id: mission.missionId,
        title: mission.missionTitle,
        content: mission.missionContent,
        score: mission.missionScore,
      },
    });
  } else if (missionType === 'QUIZ') {
    selectedMission.value = mission;
    showModal.value = true;
  }
};

// 매칭 결과 모달 닫기
const closeResultModal = () => {
  showResultModal.value = false;
};

// 퀴즈 미션 페이지로 이동
const goToQuiz = () => {
  if (!selectedMission.value) return;
  router.push({
    name: 'missionQuiz',
    query: {
      id: selectedMission.value.missionId,
      missionScore: selectedMission.value.missionScore,
      score: selectedMission.value.score,
    },
  });
};

// 퀴즈 모달 닫기
const modalClose = () => {
  showModal.value = false;
};

// 매칭 데이터 로딩 실패 모달 확인 → 홈으로 이동
const handleRetry = () => {
  router.replace({ name: 'home' });
};
</script>
