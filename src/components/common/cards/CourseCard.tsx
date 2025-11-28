import type { CourseCardProps } from '@/types/mypage'
import { Star } from 'lucide-react'

// 카드를 클릭하면 강의 상세페이지(예:React 完벽 마스터 강의 페이지)로 이동 ( url 이용 )
function CourseCard({
  thumbnail_img_url,
  title,
  instructor,
  average_rating,
  reviewCount,
  discounted_price,
  original_price,
  onClick,
}: CourseCardProps) {
  // 평점에 따른 별점 배열 생성 (5개 별 중 채워질 별 개수 계산)
  const stars = Array.from(
    { length: 5 },
    (_, i) => i < Math.floor(average_rating)
  )

  return (
    <div
      onClick={onClick}
      className="flex max-h-[388px] min-w-[389px] cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200"
    >
      {/* 썸네일 */}
      <img
        className="h-[217px] w-full rounded-t-xl object-cover"
        src={thumbnail_img_url}
        alt={title}
      />
      {/* 콘텐츠 영역 */}
      <div className="p-5">
        {/* 제목 */}
        <h4 className="pb-2 text-lg font-semibold text-gray-900">{title}</h4>
        {/* 강사명 */}
        <p className="pb-3 text-gray-600">{instructor}</p>
        {/* 평점 정보 - 별점, 평균 점수, 리뷰 수 */}
        <div className="flex items-center gap-2 pb-3 text-gray-600">
          {/* 별점 */}
          <div className="text-primary-400 flex items-center">
            {stars.map((filled, idx) => (
              <Star
                key={idx}
                className={`h-5 w-4 ${filled ? 'fill-primary-400' : ''}`}
              />
            ))}
          </div>
          {/* 평균 평점 */}
          <p>{average_rating}</p>
          {/* 리뷰 수 */}
          <p>({reviewCount}명)</p>
        </div>
        {/* 가격 */}
        <div className="flex items-center">
          {/* 할인된 가격 */}
          <p className="text-lg font-bold text-gray-900">
            {discounted_price.toLocaleString()}원
          </p>
          {/* 원래 가격 */}
          {original_price && (
            <p className="pl-2 text-sm text-gray-500 line-through">
              {original_price.toLocaleString()}원
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
