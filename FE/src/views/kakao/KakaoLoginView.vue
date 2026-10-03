<template>
  <div class="flex justify-center items-center h-screen">
    <LoadingScreen />
  </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import { kakaoLogin, userInfo } from '@/api/authApi';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const code = route.query.code;
const router = useRouter();
const authStore = useAuthStore();

const handleKakaoLogin = async () => {
  try {
    await kakaoLogin(code); // localStorage에 토큰 저장됨
    authStore.initializeAuth(); // Pinia로 즉시 반영
    // await userInfo(); // 선택: 프로필 선조회
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleKakaoLogin();
});
</script>
