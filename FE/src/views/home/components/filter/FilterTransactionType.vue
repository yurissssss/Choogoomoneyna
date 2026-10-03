<template>
  <!-- 드롭다운 전체 wrapper -->
  <div class="relative w-18 text-xs text-limegreen-700" ref="dropdownRef">
    <!-- 드롭다운 버튼 -->
    <div
      class="flex justify-between items-center gap-2 pl-4 pr-3 py-1 rounded-xl bg-ivory border-2 border-limegreen-500 cursor-pointer hover:bg-limegreen-100"
      @click="toggleDropdown"
    >
      <!-- 현재 선택된 항목 표시 (한글 라벨) -->
      <span>{{ TRANSACTION_TYPE_MAP[selectedType] }}</span>
      <!-- ▼ 토글 아이콘 -->
      <img :src="icon_toggle" alt="토글 아이콘" class="size-2.5" />
    </div>

    <!-- 드롭다운 목록 - 'isOpen: true'일 때만 표시 -->
    <ul
      v-if="isOpen"
      class="absolute top-full mt-0.5 left-0 w-full bg-ivory text-limegreen-700 border-2 border-limegreen-500 rounded-lg shadow z-50 overflow-y-auto"
    >
      <li
        v-for="transactionType in transactionTypeList"
        :key="transactionType"
        @click="selectType(transactionType)"
        :class="[
          'px-4 py-2 cursor-pointer hover:bg-limegreen-100 transition',
          {
            ' font-bold text-green': transactionType === selectedType,
          },
        ]"
      >
        <!-- 드롭다운 항목 한글 라벨로 표시 - 전체/입금/출금 -->
        {{ TRANSACTION_TYPE_MAP[transactionType] || transactionType }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

import icon_toggle from '@/assets/img/icons/feature/icon_toggle.png';

// 드롭다운 옵션 영문key - 한글라벨 매핑
const TRANSACTION_TYPE_MAP = {
  All: '전체',
  Input: '입금',
  Output: '출금',
};

// 드롭다운 항목 (영문 key)
const transactionTypeList = ['All', 'Input', 'Output'];

// 선택된 거래유형을 부모 컴포넌트로 전달할 emit 선언
const emit = defineEmits(['selectedType']);

// 현재 선택된 거래유형 상태값 - 기본값: 'All'
const selectedType = ref('All');

// 드롭다운 열림 여부 상태값 - 기본값: 'false'
const isOpen = ref(false);

// 드롭다운 외부 클릭 감지 상태값 - 기본값: 'null'
const dropdownRef = ref(null);

// 드롭다운 열기/닫기 toggle
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 외부 클릭 시 드롭다운 닫기
const clickOuterHandler = e => {
  // dropdownRef 영역 바깥쪽을 클릭 -> 닫기
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

// 컴포넌트 마운트 시 이벤트 리스너 등록
onMounted(() => {
  document.addEventListener('click', clickOuterHandler);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOuterHandler);
});

// 드롭다운 항목 클릭 시 실행되는 함수
const selectType = type => {
  // 선택된 항목으로 상태 변경
  selectedType.value = type;
  // 부모 컴포넌트에 영문 key로 emit - All / imput / Output
  emit('selectedType', type);
  // 드롭다운 닫기
  isOpen.value = false;
};
</script>
