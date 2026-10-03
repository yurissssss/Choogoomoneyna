import { defineStore } from 'pinia';

import { login } from '@/api/authApi';

export const useAuthStore = defineStore('auth', {
  // 저장소 상태 정의
  state: () => ({
    accessToken: null,
    refreshToken: null,
  }),

  // Getters (computed properties)
  getters: {
    // ✅ 토큰 존재 여부로 로그인 상태 판별
    isLoggedIn: state => !!state.accessToken,
  },

  // 저장소 액션 정의
  actions: {
    // ✅ localStorage에서 토큰 복원 (앱 시작 시 호출)
    initializeAuth() {
      try {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedAccessToken) {
          this.accessToken = storedAccessToken;
          console.log('✅ AccessToken을 localStorage에서 Pinia로 복원');
        }

        if (storedRefreshToken) {
          this.refreshToken = storedRefreshToken;
          console.log('✅ RefreshToken을 localStorage에서 Pinia로 복원');
        }
      } catch (error) {
        console.error('토큰 복원 중 오류:', error);
        this.clearAuth();
      }
    },

    // 액세스 토큰 설정
    setAccessToken(token) {
      this.accessToken = token;
      // ✅ Pinia와 localStorage 동시 저장
      localStorage.setItem('accessToken', token);
    },

    // 리프레시 토큰 설정
    setRefreshToken(token) {
      this.refreshToken = token;
      // ✅ Pinia와 localStorage 동시 저장
      localStorage.setItem('refreshToken', token);
    },
    // ✅ 인증 정보 완전 초기화 (로그아웃 시)
    clearAuth() {
      this.accessToken = null;
      this.refreshToken = null;

      // ✅ localStorage에서도 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('choogoomiType');

      console.log('✅ 인증 정보 초기화 완료');
    },

    // ✅ 로그인 액션
    async login(email, password) {
      try {
        const response = await login(email, password);

        // ✅ 토큰 저장 (Pinia + localStorage)
        this.setAccessToken(response.accessToken);
        this.setRefreshToken(response.refreshToken);

        //이메일도 localStorage에 저장
        localStorage.setItem('userEmail', email);

        console.log('✅ 로그인 성공 - 토큰 저장 완료');
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
