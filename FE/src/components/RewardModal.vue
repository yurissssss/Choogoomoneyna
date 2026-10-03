<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
    <div
      class="bg-ivory rounded-4xl px-7 py-8 w-[40vh] flex flex-col text-center items-center shadow-lg"
    >
      <div class="my-4 text-3xl">🎉</div>
      <div
        class="text-green text-lg mb-3 whitespace-pre-line leading-tight break-keep"
      >
        {{ title }}
      </div>
      <div
        class="text-limegreen-700 text-sm mb-6 text-center whitespace-pre-line break-keep"
      >
        {{ message }}
      </div>
      <div
        class="text-gray-300 text-sm mb-6 text-center whitespace-pre-line break-keep"
      >
        {{ caution }}
      </div>
      <div class="mb-6 w-full relative">
        <div class="absolute left-4 top-1/2 -translate-y-1/2">
          <img :src="icon_phone" alt="전화번호 아이콘" class="size-4" />
        </div>
        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="전화번호를 입력해주세요."
          class="w-full pl-10 pr-4 py-3 rrounded-[10px] bg-limegreen-100 focus:outline-none placeholder:text-gray-200 text-limegreen-800"
        />
      </div>
      <button
        class="w-36 h-12 bg-limegreen-500 text-limegreen-900 rounded-lg py-2 text-lg font-bold"
        @click="handleSubmit"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import icon_phone from '@/assets/img/icons/feature/icon_phone.png';

const phoneNumber = ref('');

defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  caution: {
    type: String,
    required: true,
  },
  buttonText: { type: String, default: '받기' },
});

const emit = defineEmits(['submit', 'close']);

const handleSubmit = () => {
  emit('submit', phoneNumber.value);
  emit('close');
};
</script>
