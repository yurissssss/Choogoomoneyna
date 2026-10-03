import axiosInstance from './axios';

export const updateChoogooMi = async choogooMi => {
  try {
    await axiosInstance.put('api/choogoomi/update', {
      choogooMi: choogooMi,
    });
  } catch {
    throw new Error('추구미 선택 실패');
  }
};

export const submitSurvey = async surveyAnswers => {
  try {
    const response = await axiosInstance.post(
      'api/survey/submit',
      surveyAnswers
    );
    return response.data;
  } catch {
    throw new Error('설문 제출 실패');
  }
};

export const createReport = async () => {
  try {
    const response = await axiosInstance.post('api/report/create');
    return response.data;
  } catch {
    throw new Error('리포트 생성 실패');
  }
};

export const getReportList = async () => {
  try {
    const response = await axiosInstance.get('api/report/list');
    return response.data;
  } catch {
    throw new Error('리포트 목록 조회 실패');
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get('api/users/main-profile');
    return response.data;
  } catch {
    throw new Error('유저 데이터 조회 실패');
  }
};
