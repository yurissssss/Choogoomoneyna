<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="bg-ivory rounded-[10px] p-6 w-[340px] flex flex-col items-center shadow-lg"
    >
      <!-- 연동 아이콘 -->
      <div class="mb-4">
        <img
          v-if="modalType === true"
          src="@/assets/img/icons/feature/icon_connection.png"
          alt="연결 성공"
          class="size-11"
        />
        <img
          v-else
          src="@/assets/img/icons/feature/icon_failure.png"
          alt="연동 실패"
          class="size-11"
        />
      </div>
      <!-- 제목 -->
      <div class="text-limegreen-700 text-2xl font-jua mb-2">
        {{ title }}
      </div>
      <!-- 설명 -->
      <div class="text-gray-300 text-lg mb-8 text-center">{{ message }}</div>
      <!-- 버튼 영역 -->
      <div class="flex gap-4 w-full" v-if="modalType === true">
        <button
          class="flex-1 h-12 bg-limegreen-500 text-ivory rounded-[10px] text-[20px]"
          @click="handleAddtionalConnect"
        >
          추가 연동
        </button>
        <button
          class="flex-1 h-12 border-1 border-limegreen-500 text-limegreen-500 rounded-[10px] text-[20px]"
          @click="handleConfirm"
        >
          확인
        </button>
      </div>
      <div class="flex justify-center w-full" v-else>
        <button
          @click="$emit('close')"
          class="w-32 h-12 bg-limegreen-500 text-ivory rounded-[10px] text-[20px]"
        >
          재연동 시도
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['next', 'additional-connect']);

defineProps({
  title: { type: String, default: '자산 연동 성공!' },
  message: { type: String, required: true },
  modalType: { type: Boolean, default: true },
});

const handleConfirm = () => {
  emit('next');
  return;
};

const handleAddtionalConnect = () => {
  emit('additional-connect');
};
</script>
