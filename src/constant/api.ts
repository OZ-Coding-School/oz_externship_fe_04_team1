export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_PATHS = {
  USER: {
    // 유저 정보를 가져오는 api
    GET: '/api/v1/accounts/me',
  },
  COURSE: {
    // 강의 정보를 가져오는 api
    GET: '/api/v1/lectures/recommands',
  },
  BOOKMARK: {
    // 북마크된 공고 조회 가져오는 apu
    ANNOUNCEMENT: {
      GET: '/api/v1/recruitment-bookmarks',
    },
    // 북마크된 강의 조회 가져오는 api
    STUDY: {
      GET: '/api/v1/lecture-bookmarks',
    },
  },
  APPLY: {
    // 지원 내역 가져오는 api
    LIST: {
      GET: '/api/v1/applications/mine',
    },
    // 지원 내역 상세 가져오는 api
    DETAIL: {
      GET: (id: number) => `/api/v1/applications/${id}`,
    },
  },
} as const
