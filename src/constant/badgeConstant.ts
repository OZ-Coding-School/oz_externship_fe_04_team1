// 스터디 지원 상태별 텍스트 설정
export const STATUS_CONFIG = {
  PENDING: '대기중',
  ACCEPTED: '승인됨',
  REJECTED: '거절됨',
  CANCELED: '취소됨',
}

// 스터디 지원 상태별 배지 스타일 설정
export const STATUS_STYLE = {
  PENDING: 'badge-yellow',
  ACCEPTED: 'badge-green',
  REJECTED: 'badge-red',
  CANCELED: 'badge-gray',
}
// 스터디 경험 여부별 텍스트 설정
export const HAS_STUDY_CONFIG = {
  YES: '경험 있음',
  NO: '경험 없음',
}
// 스터디 경험 여부별 배지 스타일 설정
export const HAS_STUDY_STATUS_STYLE = {
  YES: 'badge-green',
  NO: 'badge-red',
}

// 플랫폼별 표시 텍스트 설정
export const PLATFORM_CONFIG = {
  INFLEARN: 'Inflearn',
  UDEMY: 'Udemy',
} as const

// 난이도별 표시 텍스트 설정
export const DIFFICULTY_CONFIG = {
  EASY: '초급',
  NORMAL: '중급',
  HARD: '고급',
} as const

// 플랫폼별 배지 스타일 설정
export const PLATFORM_STYLES = {
  INFLEARN: 'badge-green',
  UDEMY: 'badge-purple',
} as const

// 난이도별 배지 스타일 설정
export const DIFFICULTY_STYLES = {
  EASY: 'badge-green',
  NORMAL: 'badge-yellow',
  HARD: 'badge-red',
} as const
