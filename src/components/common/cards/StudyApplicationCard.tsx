import type { StudyApplicationCardProps } from '@/types/mypage'
import BaseBookmarkCard from './BaseBookmarkCard'

// 스터디 지원 상태별 텍스트 설정
const STATUS_CONFIG = {
  PENDING: '대기중',
  ACCEPTED: '승인됨',
  REJECTED: '거절됨',
}

// 스터디 지원 상태별 배지 스타일 설정
const STATUS_STYLE = {
  PENDING: 'badge-yellow',
  ACCEPTED: 'badge-green',
  REJECTED: 'badge-red',
}
// 카드를 눌렀을 때 스터디 그룹 공고 상세페이지로 넘어가도록 구현 (요구사항에는 없으나 리펙토링할 때 참고)
function StudyApplicationCard({
  title,
  expected_headcount,
  thumbnail_img_url,
  status,
  close_at,
  lectures,
  tags,
  create_at,
}: StudyApplicationCardProps) {
  return (
    <BaseBookmarkCard title={title} thumbnail_img_url={thumbnail_img_url}>
      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 헤더 영역 - 스터디 제목과 지원 일시 및 상태 표시 */}
        <div className="flex items-center justify-between pb-4">
          <h4 className="text-sm font-semibold text-gray-900 md:text-lg">
            {title}
          </h4>
          <p className="pl-4">
            {/* 지원한 일시 */}
            <span className="text-sm text-gray-500">{create_at}</span>
            <span className={`${STATUS_STYLE[status]} ml-3 px-2 py-1`}>
              {STATUS_CONFIG[status]}
            </span>
          </p>
        </div>
        {/* 모집 인원 및 마감일 */}
        <div className="flex justify-between pb-4 text-sm text-gray-600">
          <p>모집 인원: {expected_headcount}명</p>
          <p>마감일: {close_at}</p>
        </div>
        {/* 강의 목록 (데스크톱만 표시) */}
        <div className="hidden pb-3 text-gray-700 md:block">
          <span className="block pb-1 text-sm">강의 목록:</span>
          {lectures.map((lecture) => (
            <div key={lecture.id} className="text-sm text-gray-600">
              • {lecture.title} - {lecture.instructor}
            </div>
          ))}
        </div>
        {/* 태그 목록 (데스크톱만 표시) */}
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
    </BaseBookmarkCard>
  )
}

export default StudyApplicationCard
