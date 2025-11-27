import Button from '../Button'
import BaseBookmarkCard from './BaseBookmarkCard'
import { Bookmark, Users, Calendar, Eye } from 'lucide-react'
import type { StudyBookmarkProps } from '@/types/mypage'

function StudyBookmark({
  title,
  thumbnail_img_url,
  expected_headcount,
  close_at,
  view_count,
  bookmark_count,
  lectures,
  tags,
  isBookmarked,
  onBookmarkClick,
  onViewClick,
}: StudyBookmarkProps) {
  return (
    <BaseBookmarkCard title={title} thumbnail_img_url={thumbnail_img_url}>
      <div className="flex flex-1 flex-col">
        <h4 className="pb-1 text-sm font-semibold text-gray-900 md:pb-2 md:text-lg">
          {title}
        </h4>

        <div className="flex flex-wrap items-center gap-2 pb-3 text-xs text-gray-600 md:gap-4 md:text-sm">
          <p className="flex items-center gap-0.5">
            <Users className="hidden h-3.5 w-3.5 md:block" />
            <span className="md:hidden">모집 {expected_headcount}명</span>
            <span className="hidden md:inline">
              모집 인원: {expected_headcount}명
            </span>
          </p>
          <p className="hidden items-center gap-0.5 md:flex">
            <Calendar className="h-3.5 w-3.5" />
            마감일: {close_at}
          </p>
          <p className="flex items-center gap-0.5">
            <Eye className="hidden h-3.5 w-3.5 md:block" />
            <span className="md:hidden">• 조회</span>
            <span className="hidden md:inline">조회 {view_count}</span>
          </p>
          <p className="hidden items-center gap-0.5 md:flex">
            <Bookmark className="h-3.5 w-3.5" />
            북마크 {bookmark_count}
          </p>
        </div>

        <div className="hidden pb-3 text-gray-700 md:block">
          <span className="block pb-1 text-sm">강의 목록:</span>
          {lectures.map((lecture) => (
            <div key={lecture.id} className="text-sm text-gray-600">
              • {lecture.title} - {lecture.instructor}
            </div>
          ))}
        </div>
        <div className="hidden flex-wrap gap-2 md:flex">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="badge-yellow px-2 py-1 text-xs whitespace-nowrap text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button onClick={onBookmarkClick} className="cursor-pointer">
          <Bookmark
            className={`text-primary-500 h-5 w-4 ${isBookmarked ? 'fill-primary-500' : ''}`}
          />
        </button>
        <Button onClick={onViewClick} className="py-1 md:py-2">
          <span className="md:hidden">보기</span>
          <span className="hidden md:inline">공고 보기</span>
        </Button>
      </div>
    </BaseBookmarkCard>
  )
}

export default StudyBookmark
