import type { StudyApplicationCardProps } from '@/types/mypage'
import BaseBookmarkCard from './BaseBookmarkCard'

const STATUS_CONFIG = {
  PENDING: '대기중',
  ACCEPTED: '승인됨',
  REJECTED: '거절됨', // 이건 색이 어떻게 되는거지??
}

const STATUS_STYLE = {
  PENDING: 'badge-yellow',
  ACCEPTED: 'badge-green',
  REJECTED: '',
}

function StudyApplicationCard({
  title,
  expected_headcount,
  thumbnail_img_url,
  status,
  close_at,
  lectures,
  tags,
}: StudyApplicationCardProps) {
  return (
    <BaseBookmarkCard title={title} thumbnail_img_url={thumbnail_img_url}>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between pb-4">
          <h4 className="text-sm font-semibold text-gray-900 md:text-lg">
            {title}
          </h4>
          <p className="pl-4">
            <span className="text-sm text-gray-500">2024.02.10.오후 02:30</span>
            <span className={`${STATUS_STYLE[status]} ml-3 px-2 py-1`}>
              {STATUS_CONFIG[status]}
            </span>
          </p>
        </div>
        <div className="flex justify-between pb-4 text-sm text-gray-600">
          <p>모집 인원: {expected_headcount}명</p>
          <p>마감일: {close_at}</p>
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
    </BaseBookmarkCard>
  )
}

export default StudyApplicationCard
