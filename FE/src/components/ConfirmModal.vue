<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="bg-ivory rounded-4xl p-8 w-[40vh] flex flex-col items-center shadow-lg"
    >
      <div class="mb-4">
        <slot name="icon">
          <!-- 기본 아이콘 -->
          <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#D9E6C3" />
            <path
              d="M12 8v4"
              stroke="#8B9A5B"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#8B9A5B" />
          </svg>
        </slot>
      </div>
      <div class="text-limegreen-900 text-2xl font-jua mb-2">{{ title }}</div>
      <div class="text-gray-300 text-base mb-6 text-center whitespace-pre-line">
        {{ message }}
      </div>
      <!-- 버튼 영역 -->
      <div class="flex gap-4">
        <button
          class="w-28 h-12 bg-limegreen-100 text-limegreen-900 rounded-lg py-2 text-lg font-bold"
          @click="$emit('cancel')"
        >
          {{ cancelBtn }}
        </button>
        <button
          class="w-28 h-12 bg-limegreen-500 text-limegreen-900 rounded-lg py-2 text-lg font-bold"
          @click="$emit('confirm')"
        >
          {{ confirmBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '알림' },
  message: { type: String, required: true },
  cancelBtn: { type: String, default: '취소' },
  confirmBtn: { type: String, default: '확인' },
});
</script>
