<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
    <div
      class="relative bg-ivory rounded-4xl py-6 px-4 w-[40vh] flex flex-col items-center shadow-lg"
    >
      <div class="absolute right-4 top-4 size-7 cursor-pointer">
        <img :src="system_close" alt="닫기 아이콘" @click="$emit('close')" />
      </div>
      <div class="text-limegreen-900 text-xl mt-9 mb-2">{{ title }}</div>
      <br />
      <div
        class="text-limegreen-700 text-sm mb-10 text-center"
        v-html="message"
      ></div>
      <button
        class="w-36 h-12 bg-limegreen-500 text-ivory rounded-lg py-2 text-lg font-bold"
        @click="$emit('confirm')"
      >
        <p>네!</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import system_close from '@/assets/img/icons/system/system_close.png';

defineProps({
  title: { type: String, default: '알림' },
  message: { type: String, required: true },
});
</script>
