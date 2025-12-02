import type { StudyApplicationCardProps } from '@/types/mypage'
import BaseBookmarkCard from './BaseBookmarkCard'
import { STATUS_CONFIG } from '@/constant/badgeConstant'
import { STATUS_STYLE } from '@/constant/badgeConstant'
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
  onClick,
}: StudyApplicationCardProps) {
  return (
    <BaseBookmarkCard
      title={title}
      thumbnail_img_url={thumbnail_img_url}
      className="cursor-pointer"
      onClick={onClick}
    >
      {/* 콘텐츠 영역 sm이상 */}
      <div className="flex w-full flex-1 flex-col">
        {/* 헤더 영역 sm이상 - 스터디 제목과 지원 일시 및 상태 표시 */}
        <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-2 sm:pb-4">
          <h4 className="text-sm font-semibold text-gray-900 sm:text-lg">
            {title}
          </h4>
          <p className="flex flex-wrap items-center pl-4">
            {/* 지원한 일시 */}
            <span className="text-sm text-gray-500">
              {create_at.slice(0, 10)} {create_at.slice(11, 16)}
            </span>
            <span className={`${STATUS_STYLE[status]} ml-3 px-2 py-1`}>
              {STATUS_CONFIG[status]}
            </span>
          </p>
        </div>
        {/* 헤더 영역 sm이하 - 스터디 제목과 지원 일시 및 상태 표시 */}
        <div className="flex items-center justify-between gap-2 pb-4 sm:hidden">
          <h4 className="flex flex-wrap text-sm font-semibold text-gray-900">
            {title}
          </h4>
          {/* 상태 버튼 */}
          <p className="flex flex-nowrap items-center">
            <span
              className={`${STATUS_STYLE[status]} px-2 py-1 whitespace-nowrap`}
            >
              {STATUS_CONFIG[status]}
            </span>
          </p>
        </div>
        {/* 모집 인원 및 마감일 */}
        <div className="flex flex-wrap justify-between text-sm text-gray-600 sm:pb-4">
          <p className="hidden sm:block">모집 인원: {expected_headcount}명</p>
          <p className="block sm:hidden">모집 {expected_headcount}명</p>
          <span className="text-sm text-gray-500 sm:hidden">
            {create_at.slice(0, 10)}
          </span>
          <p className="hidden sm:block">마감일: {close_at.slice(0, 10)}</p>
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
        <div className="hidden sm:block">
          <div className="mt-2 flex flex-wrap gap-2">
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
        <div className="block sm:hidden">
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="badge-yellow px-2 py-1 text-xs whitespace-nowrap text-gray-600"
              >
                {tag.name}
              </span>
            ))}
            +{tags.length - 3}
          </div>
        </div>
      </div>
    </BaseBookmarkCard>
  )
}

export default StudyApplicationCard
