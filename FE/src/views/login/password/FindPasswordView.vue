<template>
  <div class="flex justify-center w-full relative h-screen">
    <TopNavigation :showBack="true" :show-logo-text="false" />
    <div class="bg-ivory flex flex-col gap-7 w-full px-6 mt-12 h-screen">
      <!-- 타이틀 -->
      <div class="flex flex-col gap-6">
        <div class="flex text-2xl justify-center text-limegreen-900">
          비밀번호 재설정
        </div>
        <!-- 입력 폼 -->
        <form class="flex flex-col mt-8 gap-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="mb-2 block text-limegreen-900"
              >이메일</label
            >
            <div class="flex flex-col gap-3">
              <div class="flex gap-3">
                <div class="relative flex-2">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="userData.email"
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    class="border-2 border-limegreen-500 w-full h-11 rounded-lg bg-white pl-10 pr-3 py-3 focus:outline-none placeholder:text-[#BDBFB5]"
                  />
                </div>

                <button
                  class="flex-1 w-full h-11 text-white font-thin bg-limegreen-500 rounded-lg disabled:opacity-50"
                  @click="sendEmail"
                  type="button"
                  :disabled="isSendingEmail"
                >
                  {{ isSendingEmail ? '전송 중...' : '인증 요청' }}
                </button>
              </div>
              <div class="flex gap-3">
                <div class="relative flex-2">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 16H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <input
                    v-model="userData.verificationCode"
                    id="email-code"
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    class="border-2 border-limegreen-500 w-full h-11 rounded-lg bg-white pl-10 pr-3 py-3 placeholder:text-[#BDBFB5]"
                  />
                </div>
                <button
                  class="flex-1 w-full h-11 text-white font-thin bg-limegreen-500 rounded-lg disabled:opacity-50"
                  @click="verify"
                  type="button"
                  :disabled="isVerifyingEmail"
                >
                  {{ isVerifyingEmail ? '확인 중...' : '확인' }}
                </button>
              </div>
              <p
                class="h-3 text-xs"
                :class="emailErrorMessage ? 'text-red-500' : 'text-transparent'"
              >
                {{ emailErrorMessage }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-3">
            <div>
              <label for="password" class="mb-1 block text-limegreen-900"
                >새 비밀번호</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-200"
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
                  v-model="userData.newPassword"
                  id="password"
                  type="password"
                  placeholder="비밀번호 입력"
                  style="font-family: Arial, sans-serif"
                  class="border-2 border-limegreen-500 w-full h-11 rounded-lg bg-white pl-10 pr-3 py-3 placeholder:font-jua placeholder:text-[#BDBFB5]"
                  @input="validatePassword"
                />
              </div>
            </div>
            <div>
              <label for="password2" class="mb-1 block text-limegreen-900"
                >새 비밀번호 확인</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-200"
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
                  v-model="userData.newPasswordConfirm"
                  id="password2"
                  type="password"
                  placeholder="비밀번호 확인"
                  style="font-family: Arial, sans-serif"
                  class="border-2 border-limegreen-500 w-full h-11 rounded-lg bg-white pl-10 pr-3 py-3 placeholder:font-jua placeholder:text-[#BDBFB5]"
                  @input="validatePassword"
                />
              </div>
            </div>
            <p
              class="h-3 text-xs"
              :class="{
                'text-red-500': pwdErrorMessage && !isPwdChecked,
                'text-gray-500': pwdErrorMessage && isPwdChecked,
                'text-transparent': !pwdErrorMessage,
              }"
            >
              {{ pwdErrorMessage }}
            </p>
          </div>
          <button
            type="submit"
            class="bg-limegreen-500 text-white mt-2 w-[342px] rounded-lg py-3 text-lg font-normal disabled:opacity-50 fixed bottom-20 left-1/2 -translate-x-1/2"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '처리 중...' : '확인' }}
          </button>
        </form>
      </div>
    </div>
    <AlertModal
      v-if="isSendEmailSuccess"
      title="이메일 인증"
      :message="
        isSendEmailSuccess
          ? '인증 이메일이 발송되었습니다.'
          : '다시 시도해주세요!'
      "
      @close="isSendEmailSuccess = false"
    />
  </div>
  <AlertModal
    v-if="isPasswordResetSuccess"
    title="비밀번호 재설정 성공"
    message="비밀번호가 성공적으로 재설정되었습니다."
    @close="handlePasswordResetModalClose"
  />
  <AlertModal
    v-if="isPasswordResetFailed"
    title="비밀번호 재설정 실패"
    message="비밀번호 재설정에 실패했습니다."
    @close="handlePasswordResetModalClose"
  />
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  findPassword,
  sendPasswordResetEmail,
  verifyCode,
} from '@/api/authApi';
import AlertModal from '@/components/AlertModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';

const router = useRouter();

//항목별 표시할 에러메세지
const emailErrorMessage = ref('');
const pwdErrorMessage = ref('');

const password2 = ref(''); //비밀번호 확인

//항목별 인증 여부 확인
const isEmailChecked = ref(false);
const isPwdChecked = ref(false);

const isSendEmailSuccess = ref(false);
const isPasswordResetSuccess = ref(false);
const isPasswordResetFailed = ref(false);

// 로딩 상태 관리
const isSendingEmail = ref(false);
const isVerifyingEmail = ref(false);
const isSubmitting = ref(false);

// 비밀번호 재설정 dto 항목
const userData = reactive({
  email: '',
  verificationCode: '',
  newPassword: '',
  newPasswordConfirm: '',
});

//이메일 인증번호 전송
const sendEmail = async () => {
  if (isSendingEmail.value) return; // 중복 요청 방지

  // 이메일 입력 확인
  if (!userData.email.trim()) {
    emailErrorMessage.value = '이메일을 입력해주세요.';
    return;
  }
  isSendingEmail.value = true;
  try {
    // API에서 기대하는 객체 형식으로 전송
    await sendPasswordResetEmail({ email: userData.email });
    isSendEmailSuccess.value = true;
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    emailErrorMessage.value = '이메일 전송 중 오류가 발생했습니다.';
  } finally {
    isSendingEmail.value = false;
  }
};

//이메일 인증번호 확인
const verify = async () => {
  if (isVerifyingEmail.value) return; // 중복 요청 방지

  // 인증번호 입력 확인
  if (!userData.verificationCode.trim()) {
    emailErrorMessage.value = '인증번호를 입력해주세요.';
    return;
  }

  isVerifyingEmail.value = true;
  try {
    // API에서 기대하는 객체 형식으로 전송
    const verifyPayload = {
      email: userData.email,
      code: userData.verificationCode,
    };
    const result = await verifyCode(verifyPayload);
    console.log('인증 결과:', result);

    if (result) {
      emailErrorMessage.value = '인증이 완료되었습니다.';
      isEmailChecked.value = true;
    } else {
      emailErrorMessage.value = '인증번호가 올바르지 않습니다.';
      isEmailChecked.value = false;
    }
  } catch (e) {
    console.error('인증 오류:', e);
    isEmailChecked.value = false;
    emailErrorMessage.value = '인증번호가 올바르지 않습니다.';
  } finally {
    isVerifyingEmail.value = false;
  }
};

//비밀번호 실시간 일치 여부 확인
const validatePassword = () => {
  //유효성
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/;

  if (!passwordRegex.test(userData.newPassword)) {
    pwdErrorMessage.value =
      '8~20자리 영문, 숫자, 특수문자 조합으로 입력해주세요.';
    isPwdChecked.value = false;
    return false;
  }

  // 비밀번호가 입력되지 않은 경우
  if (!userData.newPassword.trim() || !userData.newPasswordConfirm.trim()) {
    pwdErrorMessage.value = '';
    isPwdChecked.value = false;
    return false;
  }

  // 둘 다 입력된 경우 비교
  if (userData.newPassword !== userData.newPasswordConfirm) {
    pwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    isPwdChecked.value = false;
    return false;
  }

  // 비밀번호가 일치하는 경우
  pwdErrorMessage.value = '비밀번호가 일치합니다.';
  isPwdChecked.value = true;
  return true;
};

// 비밀번호 재설정 처리
const handleSubmit = async () => {
  if (isSubmitting.value) return; // 중복 요청 방지

  let hasError = false;

  // 이메일 확인
  if (!isEmailChecked.value) {
    emailErrorMessage.value = '이메일 인증을 해주세요.';
    hasError = true;
  }

  // 비밀번호 확인
  if (!userData.newPassword.trim()) {
    pwdErrorMessage.value = '비밀번호를 입력해주세요.';
    hasError = true;
  } else if (!userData.newPasswordConfirm.trim()) {
    pwdErrorMessage.value = '비밀번호 확인을 입력해주세요.';
    hasError = true;
  } else if (!validatePassword()) {
    hasError = true;
  }

  if (hasError) return;

  isSubmitting.value = true;
  try {
    const response = await findPassword(
      userData.email,
      userData.verificationCode,
      userData.newPassword,
      userData.newPasswordConfirm
    );
    if (response) {
      // 성공 메시지 표시
      isPasswordResetSuccess.value = true;
    } else {
      isPasswordResetFailed.value = true;
    }
  } catch (error) {
    console.error('비밀번호 재설정 오류:', error);
    isPasswordResetFailed.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const handlePasswordResetModalClose = () => {
  isPasswordResetSuccess.value = false;
  router.push('/login');
};
</script>
