export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const API_PATHS = {
  USER: {
    // 유저 정보를 가져오는 api + 탈퇴 api + 수정 api
    GET: '/api/v1/accounts/me',
    // 비밀번호를 변경하는 api
    PATCH_PASSWORD: '/api/v1/accounts/find-password',
    // 인증번호 전송하는 api
    SEND_CODE: '/api/v1/accounts/change-phone/send-sms',
    // 휴대폰 번호 변경하는 api
    PATCH_PHONE_NUMBER: '/api/v1/accounts/change-phone',
  },
  COURSE: {
    // 강의 정보를 가져오는 api
    GET: '/api/v1/lectures/recommands',
  },
  BOOKMARK: {
    // 북마크된 공고 조회 가져오는 api(6개씩)
    ANNOUNCEMENT: {
      GET: '/api/v1/recruitment-bookmarks',
      // 북마크 공고 삭제 api
      DELETE: (uuid: string) => `/api/v1/recruitment-bookmarks/${uuid}`,
    },
    // 북마크된 강의 조회 가져오는 api
    STUDY: {
      GET: '/api/v1/lecture-bookmarks',
      // 북마크 강의 삭제 api
      DELETE: (id: number) => `/api/v1/lecture-bookmarks/${id}`,
    },
  },

  APPLY: {
    // 지원 내역 가져오는 api
    LIST: {
      GET: '/api/v1/applications/mine',
    },
    // 지원 내역 상세 가져오는 api
    DETAIL: {
      BASE: (id: number) => `/api/v1/applications/${id}`,
    },
  },
  SIGNUP: {
    // 회원가입 post api
    SUBMIT: {
      POST: '/api/v1/accounts/signup',
    },
    // 닉네임 중복 get api
    NICKNAME_CHECK: {
      GET: '/api/v1/accounts/check-nickname',
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
    REVIEW: {
      POST: (group_id: number) => `/api/v1/study-groups/${group_id}/reviews`,
      PATCH: (group_id: number, review_id: number) =>
        `/api/v1/study-groups/${group_id}/reviews/${review_id}`,
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

  LOGIN: {
    //이메일 로그인 post api
    EMAIL: {
      POST: '/api/v1/accounts/login',
    },
    // 카카오 로그인 get api
    KAKAO: {
      GET: '/api/v1/accounts/social-login/kakao',
    },
    // 네이버 로그인 get api
    NAVER: {
      GET: '/api/v1/accounts/social-login/naver',
    },
  },

  REFRESH_TOKEN: {
    POST: '/api/v1/accounts/token/refresh',
  },

  LOGOUT: {
    POST: '/api/v1/accounts/logout',
  },
  S3: {
    GET: '/api/v1/s3-presigned-url',
  },

  FIND_ACCOUNT: {
    // 이메일 찾기
    EMAIL: {
      IDENTITY: {
        POST: '/api/v1/accounts/find-email/send-sms',
      },
      VERIFY_CODE: {
        POST: '/api/v1/accounts/find-email',
      },
    },
    // 비밀번호 찾기
    PASSWORD: {
      SEND_EMAIL: {
        POST: '/api/v1/accounts/find-password/send-email',
      },
      VERIFY_CODE: {
        POST: '/api/v1/accounts/find-password/verify-email',
      },
      RESET_PASSWORD: {
        POST: '/api/v1/accounts/find-password',
      },
    },
  },
} as const
