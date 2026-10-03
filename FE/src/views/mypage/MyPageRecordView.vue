<template>
  <div class="relative flex justify-center w-full min-h-screen">
    <TopNavigation :show-back="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-2 w-full px-6">
      <!-- 타이틀 -->
      <div
        class="flex text-limegreen-900 text-2xl justify-center h-14 items-center mt-16"
      >
        매칭 기록
      </div>
      <!--랭킹 기록 영역-->
      <div class="flex flex-1 items-center justify-center gap-4">
        <!--좌버튼-->
        <div>
          <button
            class="bg-limegreen-100 w-7 h-7 rounded-[10px] disabled:opacity-50"
            @click="prevPage"
            :disabled="!canGoPrev"
          >
            <img :src="back" alt="" />
          </button>
        </div>
        <!--기록 카드-->
        <div class="grid grid-cols-2 grid-rows-2 gap-4">
          <RecordCard
            v-for="record in pagedRecordsWithImages"
            :key="record.id"
            :choogoomi-image="record.imageUrl"
            :round-number="record.roundNumber"
            :start-date="record.startDate"
            :ranking="record.ranking"
            :score="record.score"
          />
        </div>

        <!--우버튼-->
        <div>
          <button
            class="bg-limegreen-100 w-7 h-7 rounded-[10px] disabled:opacity-50"
            @click="nextPage"
            :disabled="!canGoNext"
          >
            <img :src="back" alt="" style="transform: scaleX(-1)" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';

import { getRankingHistory } from '@/api/ranking';
import back from '@/assets/img/icons/system/system_back.png';
import TopNavigation from '@/components/TopNavigation.vue';
import { CHOOGOOMI_MAP } from '@/constants/choogoomiMap';

import RecordCard from './components/RecordCard.vue';

const RECORDS = reactive([]);

const page = ref(0); //현재 페이지 번호
const PAGE_SIZE = 4; //한 페이지에 표시할 카드 개수

//총 페이지수
const totalPages = computed(() => Math.ceil(RECORDS.length / PAGE_SIZE));

// 화면에 보여줄 데이터 추출
const pagedRecords = computed(() => {
  // 전체 개수

  // 4개씩 슬라이스
  const start = page.value * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return RECORDS.slice(start, end);
});

// 최신 페이지면 우버튼 비활성화
const canGoNext = computed(() => page.value > 0);

// 가장 오래된 페이지면 좌버튼 비활성화
const canGoPrev = computed(() => page.value < totalPages.value - 1);

function prevPage() {
  if (canGoPrev.value) page.value++;
}

function nextPage() {
  if (canGoNext.value) page.value--;
}

//한 페이지에 표시할 기록들 배열에 추구미 이미지 경로 추가
const pagedRecordsWithImages = computed(() =>
  pagedRecords.value
    .slice(0, -1) // 마지막 요소 제외
    .map(record => {
      const choogoomi = CHOOGOOMI_MAP.find(
        c => c.choogoomiName === record.choogooMi
      );
      const imageUrl = new URL(
        choogoomi.userLevel[0].image_url,
        import.meta.url
      ).href;

      return {
        ...record,
        imageUrl,
      };
    })
);

onMounted(async () => {
  try {
    const result = await getRankingHistory();
    Object.assign(RECORDS, result);
  } catch (error) {
    console.log(error);
  }
});
</script>
