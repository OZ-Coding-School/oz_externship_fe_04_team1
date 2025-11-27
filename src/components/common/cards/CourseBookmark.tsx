import { Bookmark, Clock3 } from 'lucide-react'
import Button from '../Button'
import BaseBookmarkCard from './BaseBookmarkCard'
import type { CourseBookmarkProps } from '@/types/mypage'

const PLATFORM_CONFIG = {
  INFLEARN: 'Inflearn',
  UDEMY: 'Udemy',
} as const

const DIFFICULTY_CONFIG = {
  EASY: '초급',
  NORMAL: '중급',
  HARD: '고급',
} as const

const PLATFORM_STYLES = {
  INFLEARN: 'platformInflearn',
  UDEMY: 'platformUdemy',
} as const

const DIFFICULTY_STYLES = {
  EASY: 'difficultyBeginner',
  NORMAL: 'difficultyIntermediate',
  HARD: 'difficultyAdvanced',
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
  const BADGE_BASE_CLASS =
    'rounded px-1.5 py-[2px] text-xs font-medium md:px-2 md:py-1'

  return (
    <BaseBookmarkCard title={title} thumbnail_img_url={thumbnail_img_url}>
      <div className="flex flex-1 flex-col">
        <h4 className="pb-1 text-sm font-semibold text-gray-900 md:pb-2 md:text-lg">
          {title}
        </h4>
        <p className="pb-2 text-xs font-normal text-gray-600 md:pb-3 md:text-base">
          {instructor}
        </p>
        <div className="flex items-center gap-2 pb-2 md:gap-3 md:pb-0">
          <span className={`${PLATFORM_STYLES[platform]} ${BADGE_BASE_CLASS}`}>
            {PLATFORM_CONFIG[platform]}
          </span>
          <span
            className={`${DIFFICULTY_STYLES[difficulty]} ${BADGE_BASE_CLASS}`}
          >
            {DIFFICULTY_CONFIG[difficulty]}
          </span>
          <div className="hidden items-center gap-1 text-gray-600 md:flex">
            <Clock3 className="h-3.5 w-3.5" />
            <span className="text-sm">{total_class_time}</span>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between md:flex-col md:items-end">
        <div className="flex flex-col items-start md:items-end">
          <p className="text-sm font-bold text-gray-900 md:text-lg">
            ₩{discounted_price.toLocaleString()}
          </p>
          {original_price && (
            <p className="pb-2 text-xs font-normal text-gray-500 line-through md:pb-3 md:text-sm">
              ₩{original_price.toLocaleString()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onBookmarkClick} className="cursor-pointer">
            <Bookmark
              className={`text-primary-500 h-5 w-4 ${isBookmarked ? 'fill-primary-500' : ''}`}
            />
          </button>
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
