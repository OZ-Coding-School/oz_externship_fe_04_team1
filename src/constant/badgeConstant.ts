// 스터디 지원 상태별 텍스트 및 스타일 설정
export const STATUS_CONFIG = {
  PENDING: { label: '대기중', style: 'badge-yellow' },
  ACCEPTED: { label: '승인됨', style: 'badge-green' },
  REJECTED: { label: '거절된', style: 'badge-red' },
  CANCELED: { label: '취소됨', style: 'badge-gray' },
}

// 스터디 경험 여부별 텍스트 및 스타일 설정
export const HAS_STUDY_CONFIG = {
  YES: { label: '경험 있음', style: 'badge-green' },
  NO: { label: '경험 없음', style: 'badge-red' },
}

// 플랫폼별 표시 텍스트 및 스타일 설정
export const PLATFORM_CONFIG = {
  INFLEARN: { label: 'Inflearn', style: 'badge-green' },
  UDEMY: { label: 'Udemy', style: 'badge-purple' },
} as const

// 난이도별 표시 텍스트 및 스타일 설정
export const DIFFICULTY_CONFIG = {
  EASY: { label: '초급', style: 'badge-green' },
  NORMAL: { label: '중급', style: 'badge-yellow' },
  HARD: { label: '고급', style: 'badge-red' },
} as const
