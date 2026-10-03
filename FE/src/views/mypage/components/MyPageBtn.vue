<template>
  <button
    class="bg-limegreen-500 h-12 rounded-[10px] text-white"
    @click="router.push({ name: to })"
  >
    {{ text }}
  </button>
</template>
<script setup>
import router from '@/router';

defineProps({
  text: { type: String },
  to: { type: String },
});
</script>
