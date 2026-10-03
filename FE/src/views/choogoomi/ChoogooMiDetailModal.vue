<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/70 z-20 p-4"
  >
    <div
      class="bg-ivory rounded-4xl w-[40vh] max-w-sm flex flex-col shadow-lg max-h-[80vh] min-h-[60vh]"
    >
      <!-- 고정 헤더 -->
      <div class="p-8 pb-4 flex-shrink-0">
        <div class="w-full flex justify-end">
          <button @click="$emit('close')">
            <img
              src="@/assets/img/icons/system/system_close.png"
              alt="close"
              class="w-8 h-8"
            />
          </button>
        </div>
        <div class="w-full flex items-center justify-center">
          <img
            :src="selectedChoogooMi.img"
            :alt="selectedChoogooMi.label"
            class="w-40 h-45 object-contain"
          />
        </div>
        <div class="text-limegreen-800 text-xl font-bold text-center">
          {{ selectedChoogooMi.label }}
        </div>
        <div class="w-10 h-[2px] bg-gray-100 m-4 rounded-full mx-auto"></div>
        <div
          class="w-full text-center text-green text-md mb-4 whitespace-pre-line break-keep"
        >
          {{ selectedChoogooMi.summary }}
        </div>
      </div>

      <!-- 스크롤 가능한 내용 영역 -->
      <div class="flex-1 px-8">
        <div
          class="text-limegreen-800 text-sm text-center whitespace-pre-line leading-relaxed break-keep"
        >
          {{ selectedChoogooMi.explain }}
        </div>
      </div>

      <!-- 고정 하단 버튼 -->
      <div class="p-8 pt-4 flex-shrink-0 flex justify-center">
        <button
          class="w-36 h-12 bg-limegreen-500 text-ivory rounded-lg py-2 text-xl! disabled:opacity-50"
          @click="$emit('select')"
        >
          선택
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedChoogooMi: { type: Object, required: true },
});

defineEmits(['close', 'select']);
</script>
