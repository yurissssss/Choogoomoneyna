<template>
  <div
    class="flex flex-col gap-5 justify-center bg-limegreen-100 px-4 rounded-lg text-center h-100 w-full"
  >
    <div class="flex flex-col gap-3">
      <div class="text-green text-xl">{{ question.question }}</div>
      <div
        class="text-limegreen-800 text-base leading-6 whitespace-pre-line break-keep"
      >
        {{ question.subtitle }}
      </div>
    </div>
    <div
      :class="[
        'grid items-center',
        question.type === 4 ? 'grid-cols-1 h-50' : 'grid-cols-2 h-45 gap-5',
      ]"
    >
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="$emit('select', option.value)"
        :class="[
          'flex justify-center items-center border-2 border-limegreen-500 rounded-lg p-2 text-base! whitespace-pre-line! break-keep! hover:-translate-y-0.3 hover:shadow-md',
          question.type === 2 ? 'h-35' : 'h-11',
          selectedOption === option.value
            ? 'bg-limegreen-500 text-ivory'
            : 'bg-ivory text-limegreen-700 hover:bg-white',
        ]"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  question: Object,
  selectedOption: Number,
});

defineEmits(['select']);
</script>
