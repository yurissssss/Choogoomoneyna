import { defineStore } from 'pinia';

import { userInfo } from '@/api/authApi';
import { updateChoogooMi } from '@/api/userApi';

const CHOOGOOMI_TYPE = {
  A: '지출제로형',
  B: '합리소비형',
  C: '저축실천형',
  D: '투자도전형',
  E: '금융탐구형',
};

export const useChoogoomiStore = defineStore('choogoomi', {
  state: () => ({
    choogoomiType: localStorage.getItem('choogoomiType') || '',
  }),
  actions: {
    async initializeChoogoomiType(userData = null) {
      if (!localStorage.getItem('choogoomiType')) {
        try {
          // userData가 전달되면 그것을 사용, 없으면 API 호출
          const data = userData || (await userInfo());
          if (data.choogooMi) {
            this.choogoomiType = CHOOGOOMI_TYPE[data.choogooMi];
            localStorage.setItem('choogoomiType', this.choogoomiType);
          }
        } catch (error) {
          console.error('사용자 정보 불러오기 실패:', error);
        }
      }
    },
    async setChoogoomiType(type) {
      try {
        await updateChoogooMi(type);
        this.choogoomiType = CHOOGOOMI_TYPE[type];
        localStorage.setItem('choogoomiType', this.choogoomiType);
      } catch (error) {
        console.error('추구미 선택 실패:', error);
      }
    },
  },
});
