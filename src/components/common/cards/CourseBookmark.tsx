import { Bookmark, Clock3 } from 'lucide-react'
import Button from '../Button'
import BaseBookmarkCard from './BaseBookmarkCard'
import type { CourseBookmarkProps } from '@/types/mypage'

// 플랫폼별 표시 텍스트 설정
const PLATFORM_CONFIG = {
  INFLEARN: 'Inflearn',
  UDEMY: 'Udemy',
} as const

// 난이도별 표시 텍스트 설정
const DIFFICULTY_CONFIG = {
  EASY: '초급',
  NORMAL: '중급',
  HARD: '고급',
} as const

// 플랫폼별 배지 스타일 설정
const PLATFORM_STYLES = {
  INFLEARN: 'badge-green',
  UDEMY: 'badge-purple',
} as const

// 난이도별 배지 스타일 설정
const DIFFICULTY_STYLES = {
  EASY: 'badge-green',
  NORMAL: 'badge-yellow',
  HARD: 'badge-red',
} as const

function CourseBookmark({
  title,
  instructor,
  total_class_time,
  original_price,
  discounted_price,
  difficulty,
  thumbnail_img_url,
  platform,
  isBookmarked = false,
  onBookmarkClick,
  onViewClick,
}: CourseBookmarkProps) {
  // 배지 공통 스타일 클래스
  const BADGE_BASE_CLASS = 'px-1.5 py-[2px] text-xs font-medium md:px-2 md:py-1'

  return (
    <BaseBookmarkCard title={title} thumbnail_img_url={thumbnail_img_url}>
      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 제목 */}
        <h4 className="pb-1 text-sm font-semibold text-gray-900 md:pb-2 md:text-lg">
          {title}
        </h4>
        {/* 강사명 */}
        <p className="pb-2 text-xs font-normal text-gray-600 md:pb-3 md:text-base">
          {instructor}
        </p>

        <div className="flex items-center gap-2 pb-2 md:gap-3 md:pb-0">
          {/* 플랫폼 배지 */}
          <span className={`${PLATFORM_STYLES[platform]} ${BADGE_BASE_CLASS}`}>
            {PLATFORM_CONFIG[platform]}
          </span>
          {/* 난이도 배지 */}
          <span
            className={`${DIFFICULTY_STYLES[difficulty]} ${BADGE_BASE_CLASS}`}
          >
            {DIFFICULTY_CONFIG[difficulty]}
          </span>
          {/* 총 강의 시간 (데스크톱만 표시) */}
          <div className="hidden items-center gap-1 text-gray-600 md:flex">
            <Clock3 className="h-3.5 w-3.5" />
            <span className="text-sm">{total_class_time}</span>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between md:flex-col md:items-end">
        <div className="flex flex-col items-start md:items-end">
          {/* 할인된 가격 */}
          <p className="text-sm font-bold text-gray-900 md:text-lg">
            ₩{discounted_price.toLocaleString()}
          </p>
          {/* 원래 가격 */}
          {original_price && (
            <p className="pb-2 text-xs font-normal text-gray-500 line-through md:pb-3 md:text-sm">
              ₩{original_price.toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* 북마크 토글 버튼 */}
          <button onClick={onBookmarkClick} className="cursor-pointer">
            <Bookmark
              className={`text-primary-500 h-5 w-4 ${isBookmarked ? 'fill-primary-500' : ''}`}
            />
          </button>
          {/* 강의 상세 보기 버튼 (반응형 텍스트) */}
          <Button className="py-1 md:py-2" onClick={onViewClick}>
            <span className="md:hidden">보기</span>
            <span className="hidden md:inline">강의 보기</span>
          </Button>
        </div>
      </div>
    </BaseBookmarkCard>
  )
}

export default CourseBookmark
