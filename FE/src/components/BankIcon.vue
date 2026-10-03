<template>
  <div class="flex flex-col items-center">
    <img :src="assets" :alt="alt" :class="`size-${size}`" />
  </div>
</template>

<script setup>
defineProps({
  assets: { type: String, required: true },
  alt: { type: String, default: '은행 아이콘' },
  size: { type: Number, default: 10 },
});
</script>
