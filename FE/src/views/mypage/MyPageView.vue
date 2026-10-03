<template>
  <div class="relative flex justify-center min-h-screen w-full">
    <LoadingScreen v-if="isLoading" class="z-index-10" />
    <template v-else>
      <TopNavigation :show-back="false" :show-logo-text="true" />
      <div
        class="bg-ivory flex flex-grow w-full flex-col items-center justify-center gap-1 px-6"
      >
        <!-- 프로필-->
        <div class="relative flex flex-col items-center gap-2.5 w-full -top-4">
          <!-- 캐릭터 -->
          <div
            class="flex flex-col items-center justify-center gap-1 bg-limegreen-100 rounded-full w-[150px] h-[150px]"
          >
            <img
              :src="choogoomiImage"
              alt="저축실천형 캐릭터"
              class="w-[100px] h-[100px] mt-5"
            />
            <!-- 추구미 유형명 -->
            <div class="relative">
              <button
                class="group flex justify-center items-center gap-1 bg-green text-white px-2 py-1 rounded-full relative"
                @click="showChoogoomiEditModal = true"
                :disabled="!isEditable"
              >
                <div
                  class="flex text-center text-xs tracking-widest items-center leading-none text-[14px]"
                >
                  {{ userInfo.choogoomiName }}
                </div>
                <div class="flex justify-center items-center">
                  <img :src="edit" alt="수정 아이콘" class="h-3 w-3" />
                </div>

                <div
                  v-if="!isEditable"
                  class="absolute left-full top-1/2 -translate-y-1/2 w-30 ml-2 whitespace-pre-wrap bg-ivory border-2 border-limegreen-500 text-limegreen-700 text-xs rounded-[10px] px-2 py-1.5 z-10 hidden group-hover:block shadow-[2px_2px_6px_0px] shadow-limegreen-500"
                >
                  변경 가능 시간<br />
                  : 매달 첫째 주 일요일
                </div>
              </button>
            </div>
          </div>

          <!-- 닉네임 -->
          <p class="text-limegreen-800 text-normal text-center mt-1">
            {{ userInfo.nickname }}
          </p>

          <!-- 레벨 -->
          <div class="flex flex-col gap-1 w-[60%]">
            <div class="bg-limegreen-100 h-2 rounded-full">
              <div
                class="bg-green h-full rounded-full"
                :style="{
                  width: `${(userInfo.userScore / LEVEL_THRESHOLDS[userLevel + 1]) * 100}%`,
                }"
              ></div>
            </div>
            <div class="text-center text-limegreen-700 text-xs">
              Lv.{{ userLevel }} / {{ userInfo.userScore }}점
            </div>
          </div>

          <!-- 현재 순위 & 최근 성적 -->
          <div class="flex justify-between text-center items-center text-sm">
            <div class="flex flex-col gap-1">
              <div class="text-limegreen-700">현재 순위</div>
              <div class="text-green">{{ userInfo.userRanking }}위</div>
            </div>
            <!-- 현재 순위와 최근 성적 구별선 -->
            <div class="h-[70%] bg-limegreen-100 w-0.5 mx-8"></div>
            <div class="flex flex-col gap-1">
              <div class="text-limegreen-700">최근 성적</div>
              <div class="text-green">
                {{ matchingRecord.win }}승 {{ matchingRecord.draw }}무
                {{ matchingRecord.lose }}패
              </div>
            </div>
          </div>
        </div>
        <!--버튼 영역-->
        <div class="px-4 w-full">
          <div class="flex flex-col gap-2.5">
            <MyPageBtn text="나의 자산 분석 리포트" to="mypageAssetReport" />
            <MyPageBtn text="나의 매칭 기록" to="mypageRecord" />
            <MyPageBtn text="사전 조사 다시하기" to="mypageSurvey" />
            <MyPageBtn
              v-if="!isKakao(userInfo.nickname)"
              text="회원 정보 수정"
              to="mypageEditInfo"
            />
            <button
              class="w-full bg-ivory border-2 border-limegreen-500 text-limegreen-500 h-12 rounded-[10px]"
              @click="showModal = true"
            >
              로그아웃
            </button>
          </div>
        </div>
        <ConfirmModal
          v-if="showModal"
          title="로그아웃"
          message="정말 로그아웃하시겠습니까?"
          :cancelBtn="'취소'"
          :confirmBtn="'로그아웃'"
          @cancel="showModal = false"
          @confirm="logout"
        />

        <ConfirmModal
          v-if="showChoogoomiEditModal"
          title="추구 유형 수정"
          :message="'추구 유형을 수정하면\n모든 랭킹과 점수가 초기화됩니다.\n그래도 수정하시겠습니까?'"
          :cancelBtn="'취소'"
          :confirmBtn="'확인'"
          @cancel="showChoogoomiEditModal = false"
          @confirm="router.push('/choogoomi')"
        />
      </div>
    </template>
  </div>
  <BottomNavigation />
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

import axiosInstance from '@/api/axios';
import edit from '@/assets/img/icons/feature/icon_edit.png';
import BottomNavigation from '@/components/BottomNavigation.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import TopNavigation from '@/components/TopNavigation.vue';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';
import { isEditableDay } from '@/utils/dateUtils';
import { getLevel, LEVEL_THRESHOLDS } from '@/utils/levelUtils';
import { getMatchingRecordStats } from '@/utils/matchingUtils';

import MyPageBtn from './components/MyPageBtn.vue';

//모달창 상태 관리
const showModal = ref(false);
const showChoogoomiEditModal = ref(false);

// 로딩 상태 관리
const isLoading = ref(true);

//추구미 이미지와 레벨 저장
const choogoomiImage = ref('');
const userLevel = ref(0);

const authStore = useAuthStore();

//api로 받아온 유저정보 저장
const userInfo = reactive({
  choogoomiName: '',
  nickname: '',
  userScore: null,
  userRanking: null,
  isLevelUp: false,
});

//승패 결과 저장
const matchingRecord = ref({});

//추구미 수정 가능한 날인지
const isEditable = isEditableDay();

const logout = () => {
  authStore.clearAuth();
  router.push('/login');
};

const isKakao = nickname => {
  return nickname.includes('_');
};

onMounted(async () => {
  try {
    const { data } = await axiosInstance.get('/api/users/main-profile');

    //userScore로 레벨 계산
    userLevel.value = getLevel(data.userScore);

    //추구미 알파벳을 유형명으로 매핑
    const choogoomi = CHOOGOOMI_MAP.find(
      c => c.choogoomiName === data.choogooMi
    );
    const choogoomiName = choogoomi.choogoomiType;
    choogoomiImage.value = new URL(
      choogoomi.userLevel[userLevel.value].image_url,
      import.meta.url
    ).href;

    // userInfo 업데이트
    userInfo.choogoomiName = choogoomiName;
    userInfo.nickname = data.nickname;
    userInfo.userScore = data.userScore;
    userInfo.userRanking = data.userRanking;
    userInfo.isLevelUp = data.isLevelUp;

    //승패 기록 가져오기
    matchingRecord.value = await getMatchingRecordStats();

    isLoading.value = false; //로딩 끝
  } catch (error) {
    console.error('프로필 정보 불러오기 실패');
  }
});
</script>
