<template>
  <div class="min-h-screen flex items-center justify-center w-full bg-ivory">
    <div class="flex flex-col gap-7 w-full max-w-md">
      <TermsAgreement
        v-if="!termsAgreement"
        @next="handleTermsNext"
        @back="handleTermsBack"
      />
      <!-- 타이틀 -->
      <div v-else class="min-h-screen flex flex-col relative">
        <!-- 상단 타이틀 -->
        <TopNavigation :show-back="true" :show-logo-text="false" />
        <div class="flex text-2xl justify-center mt-16 text-limegreen-900">
          회원가입
        </div>

        <!-- 중앙 폼 영역 -->
        <div class="flex-1 flex items-center justify-center px-6">
          <form
            id="signup-form"
            class="flex flex-col gap-4 w-full"
            @submit.prevent="handleSubmit"
          >
            <div class="flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="nickname" class="block mb-1 text-limegreen-900"
                  >닉네임</label
                >
                <div class="flex gap-2 relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <img
                      src="@/assets/img/icons/feature/icon_nickname.png"
                      alt="닉네임"
                      class="w-5 h-5"
                    />
                  </div>
                  <input
                    v-model="member.nickname"
                    id="nickname"
                    type="text"
                    placeholder="한글,영문,숫자 2~7자리"
                    class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3 pl-10"
                    @input="isNameChecked = false"
                  />
                  <button
                    class="flex-1 w-full h-11 text-white bg-limegreen-500 rounded-lg disabled:opacity-50"
                    @click="handleCheckName"
                    type="button"
                    :disabled="isNameChecking"
                  >
                    {{ isNameChecking ? '확인 중...' : '중복 확인' }}
                  </button>
                </div>
              </div>
              <p
                class="h-3 text-xs"
                :class="
                  nameErrorMessage ? 'text-limegreen-700' : 'text-transparent'
                "
              >
                {{ nameErrorMessage }}
              </p>
            </div>

            <div>
              <label for="email" class="mb-1 block text-limegreen-900"
                >이메일</label
              >
              <div class="flex flex-col gap-4">
                <div class="flex gap-2 relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <img
                      src="@/assets/img/icons/feature/icon_email.png"
                      alt="이메일"
                      class="w-5 h-5"
                    />
                  </div>
                  <input
                    v-model="email.email"
                    id="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3 pl-10"
                  />
                  <button
                    class="flex-1 w-full h-11 text-white font-thin bg-limegreen-500 rounded-lg disabled:opacity-50"
                    @click="send"
                    type="button"
                    :disabled="isSendingEmail"
                  >
                    {{ isSendingEmail ? '전송 중...' : '인증 요청' }}
                  </button>
                </div>
                <div class="flex gap-2 relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <img
                      src="@/assets/img/icons/feature/icon_email.png"
                      alt="이메일"
                      class="w-5 h-5"
                    />
                  </div>
                  <input
                    v-model="verifyEmail.code"
                    id="email-code"
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3 pl-10"
                  />
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
                  :class="
                    emailErrorMessage
                      ? 'text-limegreen-700'
                      : 'text-transparent'
                  "
                >
                  {{ emailErrorMessage }}
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div>
                <label for="password" class="mb-1 block text-limegreen-900"
                  >비밀번호</label
                >
                <div class="flex gap-2 relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <img
                      src="@/assets/img/icons/feature/icon_password.png"
                      alt="비밀번호"
                      class="w-5 h-5"
                    />
                  </div>
                  <input
                    v-model="member.password"
                    id="password"
                    type="password"
                    placeholder="비밀번호 입력"
                    style="font-family: Arial, sans-serif"
                    class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3 placeholder:font-jua pl-10"
                    @input="validatePassword"
                  />
                </div>
              </div>
              <div>
                <label for="password2" class="mb-1 block text-limegreen-900"
                  >비밀번호 확인</label
                >
                <div class="flex gap-2 relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <img
                      src="@/assets/img/icons/feature/icon_password.png"
                      alt="비밀번호 확인"
                      class="w-5 h-5"
                    />
                  </div>
                  <input
                    v-model="password2"
                    id="password2"
                    type="password"
                    placeholder="비밀번호 확인"
                    style="font-family: Arial, sans-serif"
                    class="border-2 border-limegreen-500 flex-2 w-full h-11 rounded-lg bg-white px-3 py-3 placeholder:font-jua pl-10"
                    @input="validatePassword"
                  />
                </div>
              </div>
              <p
                class="h-3 text-xs"
                :class="pwdErrorMessage ? 'text-red-500' : 'text-transparent'"
              >
                {{ pwdErrorMessage }}
              </p>
            </div>
          </form>
        </div>

        <!-- 하단 버튼 -->
        <div class="pb-8 pt-4 flex justify-center">
          <button
            type="submit"
            form="signup-form"
            class="bg-limegreen-500 text-white w-[342px] rounded-lg py-3 text-lg font-normal disabled:opacity-50"
            :disabled="isSubmitting"
            @click="handleSubmit"
          >
            {{ isSubmitting ? '처리 중...' : '회원가입 완료' }}
          </button>
        </div>
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
    v-if="isSignupSuccess"
    title="회원가입"
    message="회원가입이 완료되었습니다."
    @close="handleSignupModalClose"
  />
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { checkName, sendCode, signup, verifyCode } from '@/api/authApi';
import AlertModal from '@/components/AlertModal.vue';
import TopNavigation from '@/components/TopNavigation.vue';

import TermsAgreement from './components/terms/TermsAgreement.vue';

const termsAgreement = ref(false);
const router = useRouter();

//항목별 표시할 에러메세지
const nameErrorMessage = ref('');
const emailErrorMessage = ref('');
const pwdErrorMessage = ref('');

const password2 = ref(''); //비밀번호 확인

//항목별 인증 여부 확인
const isNameChecked = ref(false);
const isEmailChecked = ref(false);
const isPwdChecked = ref(false);

const isSendEmailSuccess = ref(false);
const isSignupSuccess = ref(false);
// 로딩 상태 관리
const isNameChecking = ref(false);
const isSendingEmail = ref(false);
const isVerifyingEmail = ref(false);
const isSubmitting = ref(false);

//회원가입 dto 항목
const member = reactive({
  nickname: '',
  email: '',
  password: '',
  choogooMi: '',
});

const handleTermsNext = () => {
  termsAgreement.value = true;
};

const handleTermsBack = () => {
  termsAgreement.value = false;
};

//이메일 전송용
const email = reactive({
  email: '',
});

//이메일 인증코드 확인용
const verifyEmail = reactive({
  email: email.email,
  code: '',
});

//닉네임 중복 체크
const handleCheckName = async () => {
  if (isNameChecking.value) return; // 중복 요청 방지
  const nicknameRegex = /^[A-Za-z0-9가-힣]{2,7}$/; //영문+숫자 2~7자리

  if (!member.nickname.trim()) {
    nameErrorMessage.value = '닉네임을 입력하세요.';
    isNameChecked.value = false;
    return;
  }

  if (!nicknameRegex.test(member.nickname)) {
    nameErrorMessage.value = '닉네임은 2~7자리 한글, 영문, 숫자만 가능합니다.';
    isNameChecked.value = false;
    return;
  }

  isNameChecking.value = true;
  try {
    const result = await checkName(member.nickname);

    if (result) {
      nameErrorMessage.value = '이미 사용중인 닉네임 입니다.';
      isNameChecked.value = false;
    } else {
      nameErrorMessage.value = '사용 가능한 닉네임 입니다.';
      isNameChecked.value = true;
    }
  } catch (error) {
    nameErrorMessage.value = '중복 확인 중 오류가 발생했습니다.';
    isNameChecked.value = false;
  } finally {
    isNameChecking.value = false;
  }
};

//이메일 인증번호 전송
const send = async () => {
  if (isSendingEmail.value) return; // 중복 요청 방지

  if (!email.email.trim()) {
    emailErrorMessage.value = '이메일을 입력해주세요.';
    return;
  }

  isSendingEmail.value = true;
  try {
    await sendCode(email);
    isSendEmailSuccess.value = true;
  } catch (error) {
    emailErrorMessage.value = '이메일 전송 중 오류가 발생했습니다.';
  } finally {
    isSendingEmail.value = false;
  }
};

//이메일 인증번호 확인
const verify = async () => {
  if (isVerifyingEmail.value) return; // 중복 요청 방지

  if (!verifyEmail.code.trim()) {
    emailErrorMessage.value = '인증번호를 입력해주세요.';
    return;
  }

  const verifyPayload = {
    email: email.email,
    code: verifyEmail.code,
  };

  isVerifyingEmail.value = true;
  try {
    const result = await verifyCode(verifyPayload);

    if (result) {
      emailErrorMessage.value = '인증이 완료되었습니다.';
      isEmailChecked.value = true;
    } else {
      emailErrorMessage.value = '인증번호가 올바르지 않습니다.';
      isEmailChecked.value = false;
    }
  } catch (e) {
    console.error(e);
    isEmailChecked.value = false;
    emailErrorMessage.value = '인증번호가 올바르지 않습니다.';
  } finally {
    isVerifyingEmail.value = false;
  }
};

//비밀번호 일치 여부 확인
const validatePassword = () => {
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,20}$/;

  if (!passwordRegex.test(member.password)) {
    pwdErrorMessage.value =
      '8~20자리 영문, 숫자, 특수문자 조합으로 입력해주세요.';
    isPwdChecked.value = false;
    return false;
  }

  if (!member.password.trim() || !password2.value.trim()) {
    pwdErrorMessage.value = '비밀번호를 입력해주세요.';
    return false;
  }
  if (member.password !== password2.value) {
    pwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    isPwdChecked.value = false;
    return false;
  }
  pwdErrorMessage.value = '';
  isPwdChecked.value = true;
  return true;
};

//회원가입 처리
const handleSubmit = async () => {
  if (isSubmitting.value) return; // 중복 요청 방지

  let hasError = false;

  if (!isNameChecked.value) {
    nameErrorMessage.value = '닉네임 중복확인을 해주세요.';
    hasError = true;
  }

  if (!isEmailChecked.value) {
    emailErrorMessage.value = '이메일 인증을 해주세요.';
    hasError = true;
  }

  if (!isPwdChecked.value) {
    pwdErrorMessage.value = '비밀번호가 일치하지 않습니다.';
    hasError = true;
  }

  if (hasError) return;

  isSubmitting.value = true;
  try {
    // 이메일 필드에 인증된 이메일 넣기
    member.email = email.email;

    // 회원가입 데이터를 부모로 전달
    const signupData = {
      nickname: member.nickname,
      email: member.email,
      password: member.password,
      choogooMi: member.choogooMi,
    };

    await signup(signupData);

    isSignupSuccess.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const handleSignupModalClose = () => {
  isSignupSuccess.value = false;
  router.push('/login');
};
</script>
