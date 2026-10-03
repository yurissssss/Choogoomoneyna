<template>
  <nav class="w-full absolute top-0 left-0 right-0 z-10">
    <div class="grid grid-cols-3 items-center h-14">
      <!-- 왼쪽 영역: 뒤로가기 버튼 -->
      <div class="flex justify-start">
        <button
          v-if="showBack"
          @click="goBack"
          class="flex items-center justify-center size-10 hover:scale-110 transition-all duration-200"
        >
          <img
            src="@/assets/img/icons/system/system_back.png"
            alt="back"
            class="size-10"
          />
        </button>
      </div>

      <!-- 중앙 영역: 로고 텍스트  -->
      <div class="flex justify-center items-center">
        <!-- 로고 텍스트 표시 -->
        <p v-if="showLogoText && logoText" class="text-xl font-jua">
          {{ logoText }}
        </p>
      </div>

      <!-- 오른쪽 영역: 빈 공간 (균형을 위해) -->
      <div class="flex justify-end">
        <div class="w-10"></div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  showBack: {
    type: Boolean,
    default: false,
  }, // 뒤로가기 버튼 표시 여부
  showLogoText: {
    type: Boolean,
    default: true,
  }, // 로고 텍스트 표시 여부
  logoText: {
    type: String,
    default: 'CHOOGOOMONEYNA!',
  }, // 로고 텍스트
});

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* 필요 시 스타일 조정 */
</style>
