import Button from '../Button'
import BaseBookmarkCard from './BaseBookmarkCard'
import { Bookmark, Users, Calendar, Eye } from 'lucide-react'
import type { AnnouncementBookMarkType } from '@/types/mypage'
interface StudyBookMarkProps {
  announcementBookmarkData: AnnouncementBookMarkType
  onBookmarkClick: () => void
  onViewClick: () => void
  className?: string
}
function StudyBookmark({
  announcementBookmarkData,
  onBookmarkClick,
  onViewClick,
  className,
}: StudyBookMarkProps) {
  return (
    <BaseBookmarkCard
      title={announcementBookmarkData.title}
      thumbnail_img_url={announcementBookmarkData.thumbnail_img_url}
      className={className}
    >
      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 제목 */}
        <h4 className="pb-1 text-sm font-semibold text-gray-900 sm:pb-2 sm:text-lg">
          {announcementBookmarkData.title}
        </h4>

        <div className="flex flex-wrap items-center gap-2 pb-3 text-xs text-gray-600 sm:gap-4 sm:text-sm">
          {/* 모집 인원 정보 */}
          <p className="flex items-center gap-0.5">
            <Users className="hidden h-3.5 w-3.5 sm:block" />
            <span className="sm:hidden">
              모집 {announcementBookmarkData.expected_headcount}명
            </span>
            <span className="hidden sm:inline">
              모집 인원: {announcementBookmarkData.expected_headcount}명
            </span>
          </p>
          {/* 마감일 정보 (데스크톱만 표시) */}
          <p className="hidden items-center gap-0.5 sm:flex">
            <Calendar className="h-3.5 w-3.5" />
            마감일:{' '}
            {announcementBookmarkData.close_at
              .slice(0, 10)
              .split('-')
              .join('.')}
          </p>
          {/* 조회수 정보 */}
          <p className="flex items-center gap-0.5">
            <Eye className="hidden h-3.5 w-3.5 sm:block" />
            <span className="sm:hidden">
              조회 {announcementBookmarkData.views_count}
            </span>
            <span className="hidden sm:inline">
              조회 {announcementBookmarkData.views_count}
            </span>
          </p>
          {/* 북마크 수 (데스크톱만 표시) */}
          <p className="hidden items-center gap-0.5 sm:flex">
            <Bookmark className="h-3.5 w-3.5" />
            북마크 {announcementBookmarkData.bookmark_count}
          </p>
        </div>

        {/* 강의 목록 (데스크톱만 표시) */}
        <div className="hidden pb-3 text-gray-700 sm:block">
          <span className="block pb-1 text-sm">강의 목록:</span>
          {announcementBookmarkData?.lecture?.map((lecture) => (
            <div key={lecture.id} className="text-sm text-gray-600">
              • {lecture.title} - {lecture.instructor}
            </div>
          ))}
        </div>
        {/* 태그 목록 (데스크톱만 표시) */}
        <div className="hidden flex-wrap gap-2 sm:flex">
          {announcementBookmarkData.tags.map((tag) => (
            <span
              key={tag.id}
              className="badge-yellow px-2 py-1 text-xs whitespace-nowrap text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      {/* 액션 버튼 영역 - 북마크 토글 버튼 및 공고 보기 버튼 */}
      <div className="flex shrink-0 justify-end gap-2">
        <button onClick={onBookmarkClick} className="cursor-pointer">
          <Bookmark className="text-primary-500 fill-primary-500 h-5 w-4" />
        </button>
        <Button onClick={onViewClick} className="py-1 sm:py-2">
          <span className="sm:hidden">보기</span>
          <span className="hidden sm:inline">공고 보기</span>
        </Button>
      </div>
    </BaseBookmarkCard>
  )
}

export default StudyBookmark
