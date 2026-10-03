<template>
  <div>
    <LoadingScreen v-if="isLoading" class="h-screen" />
    <template v-else>
      <TopNavigation />
      <div
        class="relative flex flex-col main_wrapper bg-ivory min-h-screen mt-20"
      >
        <!-- 프로필 박스 -->
        <div class="flex flex-col items-center">
          <!-- 프로필 캐릭터 -->
          <img
            :src="choogoomiImage"
            alt="캐릭터 이미지"
            class="w-38 mx-auto mt-8"
          />

          <!-- 추구미 유형명 -->
          <span
            class="bg-green text-white px-4 py-1 rounded-full text-sm text-center tracking-wide"
          >
            {{ choogoomi.choogoomiType }}
          </span>

          <!-- 닉네임 -->
          <p class="text-limegreen-800 text-lg text-center my-[2px]">
            {{ USER_PROFILE.nickname }}
          </p>

          <!-- 레벨 박스 -->
          <div class="p-1 w-70 max-w-[400px] mx-auto">
            <!-- 레벨 표시 바 - 전체 -->
            <div class="bg-limegreen-100 h-[9px] rounded-xl mb-[2px]">
              <!-- 레벨 표시 바 - 현재 레벨 -->
              <div
                class="bg-green h-full rounded-xl"
                :style="{ width: experienceProgress + '%' }"
              ></div>
            </div>

            <!-- 현재 레벨 & 점수 -->
            <div class="text-center text-limegreen-700 text-sm">
              {{ levelInfo }}
            </div>
          </div>

          <!-- 현재 순위 & 최근 성적 -->
          <div
            class="flex justify-between text-center w-full max-w-[400px] px-30 my-1"
          >
            <div>
              <span class="text-[14px] text-limegreen-700">현재 순위</span
              ><br />
              <span class="text-[17px] text-green">{{
                USER_PROFILE.userRanking + '위'
              }}</span>
            </div>
            <div>
              <span class="text-[14px] text-limegreen-700">최근 성적</span
              ><br />
              <span class="text-[17px] text-green"
                >{{ matchingRecord.win }}승 {{ matchingRecord.draw }}무
                {{ matchingRecord.lose }}패</span
              >
            </div>
          </div>
        </div>

        <!-- 연동 계좌 목록 박스 -->
        <div
          class="flex flex-grow flex-col bg-limegreen-500 rounded-t-[30px] px-3 py-2 w-full h-full mt-4 mx-auto"
        >
          <p class="text-lg text-limegreen-900 pt-4 pb-3 px-4">
            연동 계좌 목록
          </p>

          <!-- 연동 계좌 목록 -->
          <div
            class="max-h-[calc(100vh-580px)] overflow-scroll [&::-webkit-scrollbar]:hidden mb-1 px-3 space-y-2"
          >
            <div
              v-for="(account, i) in ACCOUNTS"
              :key="i"
              @click="goToTransaction(account)"
              class="bg-ivory rounded-xl px-3 py-2 flex items-center cursor-pointer"
            >
              <!-- 은행 로고 -->
              <img
                :src="account.bankLogo"
                alt="은행 로고"
                class="size-12 object-contain"
              />
              <!-- 계좌 정보 -->
              <div class="flex-1 flex-col ml-4">
                <p
                  class="bg-limegreen-100 text-limegreen-600 text-[10px] px-1.5 py-[2px] rounded-[5px] w-fit"
                >
                  {{ account.accountName }}
                </p>
                <p class="text-limegreen-900 text-[11px] my-[1px]">
                  {{ account.bankName }} {{ account.accountNum }}
                </p>
                <p class="text-limegreen-800 text-[14px]">
                  {{ Number(account.accountBalance).toLocaleString() }}원
                </p>
              </div>
              <!-- 새로고침 -->
              <div
                class="text-gray-300 text-[10px] flex items-end gap-1 scale-90 mt-[-25px]"
                @click.stop="refreshAccount(account, i)"
              >
                {{ account.date }}
                <div
                  class="size-3 border rounded-full flex items-center justify-center"
                >
                  <img
                    :src="icon_refresh"
                    alt="새로고침 아이콘"
                    class="size-1.5"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 계좌 추가 버튼 -->
          <div
            class="bg-ivory rounded-xl my-1 mx-3 flex justify-center items-center cursor-pointer"
            @click="addAccount()"
          >
            <img :src="icon_plus" alt="추가하기 아이콘" class="size-7 m-1" />
          </div>
        </div>
      </div>

      <BottomNavigation />

      <div v-if="showModal">
        <RewardModal
          v-if="!isLevel4"
          :title="'레벨 ' + USER_PROFILE.userLevel + ' 달성 \n 축하합니다!'"
          message="꾸준한 미션 수행으로 추구미를 향해 멋지게 성장하고 있어요 👏
         기프티콘 발송을 위해 휴대폰 번호를 입력해주세요.
         입력된 번호는 보상 발송 목적 외에는 사용되지 않으며, 사용 후 즉시 폐기됩니다."
          caution="‼️ 기회는 단 한 번뿐 ‼️
  잘못 입력하면 보상을 받을 수 없어요."
          @submit="handlePhoneSubmit"
          @close="showModal = false"
        />
        <RewardModal
          v-else
          :title="'레벨 ' + USER_PROFILE.userLevel + ' 달성 \n 축하합니다!'"
          message="지금까지의 노력이 쌓여 멋진 결과를 만들어냈어요 👏
보상을 받기 위해 정확한 휴대폰 번호를 입력해주세요.
⚠️ 기회는 한 번뿐! 잘못 입력하면 보상을 받을 수 없어요."
          caution="‼️ 기회는 단 한 번뿐 ‼️
  잘못 입력하면 보상을 받을 수 없어요."
          @submit="handlePhoneSubmit"
          @close="router.push({ name: 'choogoomi' })"
          :buttonText="'추구미 선택'"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { userInfo } from '@/api/authApi';
import { fetchAccounts, updateAccountFromCodef } from '@/api/bankApi';
import { fetchTransactionsFromCodef } from '@/api/bankApi';
import { updateRankingData } from '@/api/ranking';
import icon_plus from '@/assets/img/icons/feature/icon_plus.png';
import icon_refresh from '@/assets/img/icons/feature/icon_refresh.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import RewardModal from '@/components/RewardModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { BANK_LIST } from '@/constants/bankList';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap';
import { useChoogoomiStore } from '@/stores/choogoomiStore';
import { getLevel, LEVEL_THRESHOLDS } from '@/utils/levelUtils';
import { getMatchingRecordStats } from '@/utils/matchingUtils';

const choogoomiStore = useChoogoomiStore(); // 추구미 유형 저장

const router = useRouter();
const isLoading = ref(true);
const ACCOUNTS = ref([]); // 계좌목록 데이터
const userLevel = ref(0); // 레벨
const isLevel4 = ref(true); // 레벨 4 여부
const USER_PROFILE = ref({}); // 프로필 정보
// 추구미 유형 정보 - 추구미 유형명, 캐릭터
const choogoomi = ref({});
const choogoomiImage = ref(''); // 추구미 캐릭터 이미지 URL

const matchingRecord = ref({}); //승패 데이터

// 은행 ID로 은행 정보를 찾아 반환하는 함수
const getBankInfo = bankId =>
  BANK_LIST.find(bank => bank.bankId === bankId || bank.id === bankId);

// 레벨 업 보상 모달 표시 여부
const showModal = ref(false);

// 경험치 바 퍼센트 계산
const experienceProgress = computed(() => {
  const currentScore = USER_PROFILE.value.userScore
    ? USER_PROFILE.value.userScore
    : 0;
  const currentLevel = userLevel.value;

  // 최대 레벨에 도달한 경우
  if (currentLevel >= LEVEL_THRESHOLDS.length - 1) {
    return 100;
  }

  const nextLevelThreshold = LEVEL_THRESHOLDS[currentLevel + 1];
  const threshold = nextLevelThreshold - LEVEL_THRESHOLDS[currentLevel];
  const currentScoreValue = currentScore - LEVEL_THRESHOLDS[currentLevel];
  const percentage = (currentScoreValue / threshold) * 100;

  // 현재 레벨에서의 진행도 계산
  // 퍼센트 계산 (0-100 사이 값)
  return percentage;
});

// 레벨 정보 텍스트 계산
const levelInfo = computed(() => {
  const currentScore = USER_PROFILE.value.userScore
    ? USER_PROFILE.value.userScore
    : 0;
  const currentLevel = userLevel.value;

  // 최대 레벨에 도달한 경우
  if (currentLevel >= LEVEL_THRESHOLDS.length - 1) {
    return `Lv.${currentLevel} (MAX) / ${currentScore}점`;
  }

  return `Lv.${currentLevel} / ${currentScore}점`;
});

// 컴포넌트가 마운트될 때 실행
onMounted(async () => {
  try {
    // 랭킹 데이터 업데이트 (초기 사용자도 랭킹 데이터에 추가)
    await updateRankingData();

    // 사용자 프로필 정보를 API로부터 받아옴
    const profileData = await userInfo();
    choogoomiStore.initializeChoogoomiType(profileData);

    // 받아온 프로필 정보에 레벨 추가하여 저장
    USER_PROFILE.value = {
      ...profileData,
      // 레벨 -> 점수 이용하여 계산
      userLevel: getLevel(profileData.userScore),
    };

    userLevel.value = USER_PROFILE.value.userLevel;

    // 추구미 이름 & 레벨 -> 캐릭터 이미지 URL
    choogoomi.value = CHOOGOOMI_MAP.find(
      item => item.choogoomiName === USER_PROFILE.value.choogooMi
    );
    choogoomiImage.value = new URL(
      choogoomi.value.userLevel[userLevel.value].image_url,
      import.meta.url
    ).href;

    //승패 기록 가져오기
    matchingRecord.value = await getMatchingRecordStats();

    // 레벨 업 여부에 따라 보상 모달 표시 여부 결정
    showModal.value = USER_PROFILE.value.isLevelUp;
    isLevel4.value = USER_PROFILE.value.userLevel === 4;

    // 계좌목록 데이터를 API로부터 받아옴
    const data = await fetchAccounts();

    // 받아온 계좌 목록에 은행 이름과 로고 정보를 추가하여 저장
    ACCOUNTS.value = data.map(account => {
      const bankInfo = getBankInfo(account.bankId);
      return {
        ...account,
        bankLogo: bankInfo.icon,
        bankName: bankInfo.name,
        date: account.fetchedDate,
      };
    });

    await updateRankingData();
    // 명예의 전당 데이터 가져오기
    isLoading.value = false;
  } catch (err) {
    console.error('계좌 가져오기 실패:', err);
  }
});

// 계좌 새로고침 함수
const refreshAccount = async (account, index) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 14);

    const updated = await updateAccountFromCodef({
      bankId: account.bankId,
      accountNum: account.accountNum,
    });

    await fetchTransactionsFromCodef({
      account: account.accountNum,
      organization: account.bankId,
      startDate: startDate.toISOString().split('T')[0],
      endDate: updated.fetchedDate,
    });

    const bankInfo = getBankInfo(updated.bankId);
    ACCOUNTS.value[index] = {
      ...updated,
      bankLogo: bankInfo.icon,
      bankName: bankInfo.name,
      date: updated.fetchedDate,
    };
  } catch (err) {
    console.error('계좌 새로고침 실패:', err);
  }
};

// 계좌 클릭 -> 해당 계좌의 거래 내역 페이지로 이동하는 함수
const goToTransaction = async account => {
  router.push({
    name: 'transaction',
    params: {
      accountNum: account.accountNum,
      accountName: account.accountName,
      bankId: account.bankId,
    },
    query: {
      accountBalance: account.accountBalance,
      bankName: account.bankName,
    },
  });
};

// 계좌 추가 페이지로 이동하는 함수
const addAccount = () => {
  router.push({
    name: 'assetSelect',
  });
};

// 보상 모달에서 전화번호 제출 시 호출되는 함수
function handlePhoneSubmit(phoneNumber) {
  console.log('제출된 전화번호:', phoneNumber);
}
</script>
