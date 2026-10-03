// axios 라이브러리 불러오기 -> 커스텀 인스턴스 만들기
import axiosInstance from './axios';

// 계좌 연동 (CODEF)
export const fetchBankFromCodef = async ({
  selectedBankId,
  userBankId,
  userBankPassword,
}) => {
  try {
    const response = await axiosInstance.post('/api/codef/account/add', {
      bankId: selectedBankId,
      userBankId: userBankId,
      userBankPassword: userBankPassword,
    });
    return response.data;
  } catch (error) {
    console.error('은행 목록 불러오기 실패:', error);
    throw error;
  }
};

// 계좌 한 개 업데이트 (CODEF)
export const updateAccountFromCodef = async ({ bankId, accountNum }) => {
  try {
    const response = await axiosInstance.post('/api/codef/account/update', {
      bankId: bankId,
      accountNum: accountNum,
    });
    return response.data;
  } catch (error) {
    console.error('계좌 업데이트 실패:', error);
    throw error;
  }
};

// 거래내역 목록 연동 (CODEF)
export const fetchTransactionsFromCodef = async ({
  account,
  organization,
  startDate,
  endDate,
}) => {
  try {
    const response = await axiosInstance.post(`/api/codef/transaction/add`, {
      account,
      organization,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    console.error('거래내역 조회 실패:', error);
    throw error;
  }
};

// 계좌 목록 조회 (DB)
export const fetchAccounts = async () => {
  try {
    const response = await axiosInstance.get('/account/db');
    return response.data;
  } catch (error) {
    console.error('계좌 목록 불러오기 실패:', error);
    throw error; // 필요 시 상위 컴포넌트에서 catch 처리
  }
};

// 거래내역 목록 조회 (DB)
export const fetchTransactions = async accountNum => {
  try {
    const { data } = await axiosInstance.get(
      `/transaction/db?account=${accountNum}`
    );
    return data;
  } catch (e) {
    console.error('거래내역 조회 실패: ', e);
    throw new Error('거래내역 조회 실패');
  }
};
