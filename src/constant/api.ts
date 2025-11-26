export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_PATHS = {
  USER: {
    // 유저 정보를 가져오는 api
    GET: '/api/v1/accounts/me',
  },
} as const
