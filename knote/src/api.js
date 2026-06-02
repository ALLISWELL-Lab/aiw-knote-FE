// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // 백엔드 주소
  headers: {
    'Content-Type': 'application/json',
  },
  // 로그인 상태 유지 위해 쿠키 포함
  withCredentials: true,
});

export default api;