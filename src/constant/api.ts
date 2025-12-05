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
  SIGNUP: {
    // 회원가입 post api
    SUBMIT: {
      POST: '/api/v1/accounts/signup',
    },
    // 닉네임 중복 get api
    NICKNAME_CHECK: {
      GET: '/api/v1/accounts/signup/check-nickname',
    },
    // 이메일 인증 발송 post api
    EMAIL_SEND: {
      POST: '/api/v1/accounts/signup/send-email',
    },
    // 이메일 인증 코드 발송 post api
    EMAIL_VERIFY: {
      POST: '/api/v1/accounts/signup/verify-email',
    },
    // SMS 인증 발송 post api
    SMS_SEND: {
      POST: '/api/v1/accounts/signup/send-sms',
    },
    // SMS 인증 코드 발송 post api
    SMS_VERIFY: {
      POST: '/api/v1/accounts/signup/verify-sms',
    },
  },

  COMPLETE: {
    // 개인 스터디 조회 가져오는 api
    STUDY: {
      GET: '/api/v1/study-groups',
    },
  },
  // 계정 복구
  ACCOUNT_RECOVERY: {
    // 이메일 인증 발송 post api
    SEND_EMAIL: {
      POST: '/api/v1/accounts/restore/send-email',
    },
    // // 이메일 인증 코드 발송 post api
    VERIFY: {
      POST: '/api/v1/accounts/restore',
    },
  },
} as const
