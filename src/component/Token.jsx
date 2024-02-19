import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000", // 기본 URL 설정
    headers: {
        "Content-Type": "application/json", // 모든 요청에 대해 JSON 요청임을 명시
    },
});

// 요청 전에 실행될 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // 사용자 토큰 가져오기
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 토큰을 헤더에 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
