<template>
  <div
    :class="[
      'flex flex-col items-center justify-center bg-limegreen-100 rounded-2xl border-3 cursor-pointer transition-all shadow-xl border-limegreen-500',
      ,
      'w-32 h-40',
      'hover:shadow-md',
    ]"
    @click="$emit('click')"
  >
    <img :src="img" :alt="label" class="w-24 h-24 mb-2 object-contain" />
    <span :class="['text-sm text-center font-bold text-limegreen-900']">
      {{ label }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  img: { type: String, required: true },
  label: { type: String, required: true },
});

defineEmits(['click']);
</script>
