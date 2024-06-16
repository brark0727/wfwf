import { getToken } from './tokenManager';
export async function apiRequest(url, method = 'POST', body = null, token = null) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`); // Bearer 제거 후 토큰만 전송
  }

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.text(); // 에러 발생 시에만 텍스트로 변환
    try {
      const jsonErrorData = JSON.parse(errorData);
      throw new Error(jsonErrorData.message || 'Something went wrong');
    } catch (e) {
      throw new Error('Something went wrong');
    }
  }

  const responseData = await response.text();
  return responseData ? JSON.parse(responseData) : {}; // 응답 본문이 있을 경우만 JSON으로 변환
}
