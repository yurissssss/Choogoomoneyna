import axiosInstance from '@/api/axios';

export const fetchRankingList = async () => {
  try {
    const response = await axiosInstance.get('/api/ranking/list/top50');
    return response.data;
  } catch {
    return false;
  }
};

export const fetchLastRankingList = async () => {
  try {
    const response = await axiosInstance.get('/api/ranking/list/previous/top3');
    return response.data;
  } catch {
    return false;
  }
};

export const updateRankingData = async () => {
  try {
    await axiosInstance.put('/api/ranking/update');
    return true;
  } catch {
    return false;
  }
};

//주별 랭킹, 점수, 추구미 정보 리스트 가져오기
export const getRankingHistory = async () => {
  try {
    const { data } = await axiosInstance.get('api/ranking/history');
    return data;
  } catch (error) {
    console.log(error);
  }
};
