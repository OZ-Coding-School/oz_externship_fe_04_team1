import { Bookmark, Clock3 } from 'lucide-react'
import Button from '../Button'
import BaseBookmarkCard from './BaseBookmarkCard'
import type { StudyBookmarkType } from '@/types/mypage'
import { PLATFORM_CONFIG, DIFFICULTY_CONFIG } from '@/constant/badgeConstant'
interface CourseBookMarkProps {
  studyBookMarkData: StudyBookmarkType
  onBookmarkClick: () => void
  onViewClick: () => void
}
function CourseBookmark({
  studyBookMarkData,
  onBookmarkClick,
  onViewClick,
}: CourseBookMarkProps) {
  // 배지 공통 스타일 클래스
  const BADGE_BASE_CLASS = 'px-1.5 py-[2px] text-xs font-medium sm:px-2 sm:py-1'

  return (
    <BaseBookmarkCard
      title={studyBookMarkData.title}
      thumbnail_img_url={studyBookMarkData.thumbnail_img_url}
    >
      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 제목 */}
        <h4 className="pb-1 text-sm font-semibold text-gray-900 sm:pb-2 sm:text-lg">
          {studyBookMarkData.title}
        </h4>
        {/* 강사명 */}
        <p className="pb-2 text-xs font-normal text-gray-600 sm:pb-3 sm:text-base">
          {studyBookMarkData.instructor}
        </p>

        <div className="flex flex-wrap items-center gap-2 pb-2 sm:gap-3 sm:pb-0">
          {/* 플랫폼 배지 */}
          <span
            className={`${PLATFORM_CONFIG[studyBookMarkData.platform].style} ${BADGE_BASE_CLASS}`}
          >
            {PLATFORM_CONFIG[studyBookMarkData.platform].label}
          </span>
          {/* 난이도 배지 */}
          <span
            className={`${DIFFICULTY_CONFIG[studyBookMarkData.difficulty].style} ${BADGE_BASE_CLASS}`}
          >
            {DIFFICULTY_CONFIG[studyBookMarkData.difficulty].label}
          </span>
          {/* 총 강의 시간 (데스크톱만 표시) */}
          <div className="hidden items-center gap-1 text-gray-600 sm:flex sm:flex-wrap">
            <Clock3 className="h-3.5 w-3.5" />
            {studyBookMarkData.total_class_time >= 60 ? (
              <span className="text-sm">
                {Math.floor(studyBookMarkData.total_class_time / 60)} :{' '}
                {studyBookMarkData.total_class_time % 60}
              </span>
            ) : (
              <span className="text-sm">
                {studyBookMarkData.total_class_time}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between sm:flex-col sm:items-end">
        <div className="flex flex-col items-start sm:items-end">
          {/* 할인된 가격 */}
          <p className="text-sm font-bold text-gray-900 sm:text-lg">
            ₩{studyBookMarkData.discounted_price.toLocaleString()}
          </p>
          {/* 원래 가격 */}
          {studyBookMarkData.original_price && (
            <p className="pb-2 text-xs font-normal text-gray-500 line-through sm:pb-3 sm:text-sm">
              ₩{studyBookMarkData.original_price.toLocaleString()}
            </p>
          )}
        </div>

        <div className="items-cenflex-wrap flex gap-2">
          {/* 북마크 토글 버튼 */}
          <button onClick={onBookmarkClick} className="cursor-pointer">
            <Bookmark className="text-primary-500 fill-primary-500 h-5 w-4" />
          </button>
          {/* 강의 상세 보기 버튼 (반응형 텍스트) */}
          <Button className="py-1 sm:py-2" onClick={onViewClick}>
            <span className="sm:hidden">보기</span>
            <span className="hidden sm:inline">강의 보기</span>
          </Button>
        </div>
      </div>
    </BaseBookmarkCard>
  )
}

export default CourseBookmark
