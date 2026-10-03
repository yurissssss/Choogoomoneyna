<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="bg-ivory flex min-h-screen w-[390px] justify-center rounded-[10px] shadow-lg"
    >
      <LoadingScreen v-if="showSplash" @loading-complete="true" />
      <!-- 메인 콘텐츠 영역에 상단 패딩 추가 -->
      <div v-else class="w-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import LoadingScreen from './components/LoadingScreen.vue';
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
const showSplash = ref(false);

onMounted(() => {
  authStore.initializeAuth();
  // setTimeout(() => {
  //   showSplash.value = false;
  // }, 5000);
});

// const onLoadingComplete = () => {
//   setTimeout(() => {
//     showSplash.value = false;
//   }, 100);
// };
</script>
