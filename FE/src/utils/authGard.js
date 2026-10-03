import { useAuthStore } from '@/stores/authStore';

// 로그인 상태 확인
export const isLoggedIn = async () => {
  const authStore = useAuthStore();
  // 토큰이 없으면 로그인 상태가 아님
  if (!authStore.accessToken) {
    return false;
  }
  // 토큰이 있으면 로그인 상태
  return true;
};
