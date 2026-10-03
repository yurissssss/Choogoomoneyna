import axios from 'axios';

import axiosInstance from './axios';

export const checkName = async name => {
  try {
    const { data } = await axiosInstance.get(
      `api/users/signup/check-nickname`,
      {
        params: {
          nickname: name,
        },
      }
    );
    return data;
  } catch {
    throw new Error('이름 중복 체크 실패');
  }
};

//이메일로 인증코드 전송
export const sendCode = async email => {
  try {
    const { data } = await axiosInstance.post(
      'api/email-auth/signup/send',
      email
    );
    return data;
  } catch {
    throw new Error('이메일 전송 실패');
  }
};

//인증코드 검증
export const verifyCode = async verifyEmail => {
  try {
    const { data } = await axiosInstance.post(
      'api/email-auth/signup/verify',
      verifyEmail
    );
    return data;
  } catch {
    throw new Error('인증코드 검증 실패');
  }
};

//회원가입
export const signup = async signupData => {
  try {
    const { data } = await axiosInstance.post('api/users/signup', signupData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(data);
    return data;
  } catch {
    throw new Error('회원가입 실패');
  }
};

// 로그인
export const login = async (email, password) => {
  try {
    const { data } = await axiosInstance.post('api/users/login', {
      email,
      password,
    });
    return data;
  } catch {
    throw new Error('로그인 실패');
  }
};

// 유저 프로필 정보
export const userInfo = async () => {
  try {
    const { data } = await axiosInstance.get('api/users/main-profile');
    return data;
  } catch {
    throw new Error('유저 프로필 정보 불러오기 실패');
  }
};

//비밀번호 재설정 이메일 발송
export const sendPasswordResetEmail = async email => {
  try {
    const { data } = await axiosInstance.post(
      'api/email-auth/signup/send',
      email
    );
    return data;
  } catch {
    throw new Error('이메일 전송 실패');
  }
};

// 비밀번호 재설정
export const findPassword = async (
  email,
  verificationCode,
  newPassword,
  newPasswordConfirm
) => {
  try {
    await axiosInstance.put('api/users/signup/password/reset', {
      email,
      verificationCode,
      newPassword,
      newPasswordConfirm,
    });
    return true;
  } catch {
    return false;
  }
};

export const kakaoLogin = async code => {
  try {
    const { data } = await axios.post(
      'http://localhost:8080/api/v1/oauth2/kakao/login',
      {
        code,
      }
    );
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return true;
  } catch {
    throw new Error('카카오 로그인 실패');
  }
};
