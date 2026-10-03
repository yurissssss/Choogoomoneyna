<template>
  <div class="flex justify-center">
    <div class="bg-ivory flex w-full flex-col gap-8 px-4">
      <!-- 동물 캐릭터 이미지 -->
      <div class="flex justify-center pt-20">
        <img
          src="../../assets/img/icons/system/system_login.png"
          alt="login_logo"
        />
      </div>
      <!-- 입력 폼 -->
      <div class="flex flex-col gap-4">
        <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="mb-2 block text-limegreen-900"
              >이메일 ID</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="size-6 text-[#BDBFB5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <input
                v-model="email"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                class="w-full h-11 rounded-[10px] bg-limegreen-100 pl-10 pr-4 py-3 focus:outline-none placeholder:text-[#BDBFB5] text-limegreen-900"
              />
            </div>
          </div>
          <div>
            <label for="password" class="mb-2 block text-limegreen-900"
              >비밀번호</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="size-6 text-[#BDBFB5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                v-model="password"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                class="w-full rounded-[10px] h-11 font-spoqa! placeholder:font-jua bg-limegreen-100 pl-10 pr-4 py-3 focus:outline-none placeholder:text-[#BDBFB5] text-limegreen-900"
              />
            </div>
            <div class="flex justify-end pt-4 text-gray-300 underline">
              <button type="button" @click="navigateToFindPassword">
                비밀번호를 잊으셨나요?
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-[10px] h-13 text-xl! text-ivory bg-limegreen-500"
          >
            로그인
          </button>
        </form>
        <!-- 하단 버튼 -->
        <div class="flex flex-col gap-y-4">
          <div class="flex gap-2">
            <button
              class="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#ffe812] h-12 text-black shadow-sm"
              @click="handleKakaoLogin"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="h-5 w-5"
              >
                <path
                  d="M12 2C6.477 2 2 5.805 2 10.111c0 2.7 2.09 5.06 5.25 6.44-.22.77-.8 2.8-.91 3.25 0 0-.02.16.08.22.1.06.23-.02.23-.02.3-.04 3.37-2.23 4.13-2.77.41.04.83.06 1.25.06 5.523 0 10-3.805 10-8.111C22 5.805 17.523 2 12 2z"
                />
              </svg>
              카카오 로그인
            </button>
            <button
              type="button"
              class="text-limegreen-900 flex-1 rounded-[10px] bg-transparent border-2 border-limegreen-500 h-12"
              @click="goToSignup"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AlertModal
    v-if="showAlert"
    title="알림"
    :message="alertMessage"
    @close="showAlert = false"
  />
  <AlertModal
    v-if="showModal"
    :title="modalType === 'fail' ? '로그인 실패' : '로그인 성공'"
    :message="
      modalType === 'fail' ? '로그인을 다시 시도해보세요' : '환영합니다!'
    "
    @close="handleModalClose"
  >
    <template #icon>
      <img
        v-if="modalType === 'fail'"
        src="../../assets/img/icons/system/system_login_fail.svg"
      />
      <svg v-else width="56" height="56" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#D9E6C3" />
        <path
          d="M8 12l3 3 5-5"
          stroke="#8B9A5B"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </template>
  </AlertModal>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AlertModal from '@/components/AlertModal.vue';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showModal = ref(false);
const modalType = ref('fail');
const alertMessage = ref('');
const showAlert = ref(false);

const handleLogin = async () => {
  if (showAlert.value) return; // 모달이 떠 있으면 로그인 동작 막기
  if (!email.value) {
    alertMessage.value = '이메일을 입력해 주세요!';
    showAlert.value = true;
    return;
  }
  if (!password.value) {
    alertMessage.value = '비밀번호를 입력해 주세요!';
    showAlert.value = true;
    return;
  }
  // response 값이 true 면 로그인 성공, false 면 로그인 실패
  const response = await authStore.login(email.value, password.value);
  showModal.value = true;
  modalType.value = response ? 'success' : 'fail';
};

const handleModalClose = () => {
  showModal.value = false;
  // 토큰이 있으면 메인 페이지로 이동
  if (authStore.accessToken) {
    router.push('/');
  } else {
    // 토큰이 없으면 로그인 페이지로 이동
    router.push('/login');
  }
};

const navigateToFindPassword = () => {
  router.push('/find-password');
};

const goToSignup = () => {
  router.push('/signup');
};

const handleKakaoLogin = () => {
  window.location.href = import.meta.env.VITE_KAKAO_API_URL;
};
</script>
