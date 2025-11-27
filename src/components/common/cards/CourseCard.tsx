import type { CourseCardProps } from '@/types/mypage'
import { Star } from 'lucide-react'

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
  const stars = Array.from(
    { length: 5 },
    (_, i) => i < Math.floor(average_rating)
  )

  return (
    <div
      onClick={onClick}
      className="flex max-h-[388px] min-w-[389px] flex-col overflow-hidden rounded-xl border border-gray-200"
    >
      {/* thumbnail */}
      <img
        className="h-[217px] w-full rounded-t-xl object-cover"
        src={thumbnail_img_url}
        alt={title}
      />
      {/* content */}
      <div className="p-5">
        {/* title */}
        <h4 className="pb-2 text-lg font-semibold text-gray-900">{title}</h4>
        {/* instructor */}
        <p className="pb-3 text-gray-600">{instructor}</p>
        {/* Rating */}
        <div className="flex items-center gap-2 pb-3 text-gray-600">
          <div className="text-primary-400 flex items-center">
            {stars.map((filled, idx) => (
              <Star
                key={idx}
                className={`h-5 w-4 ${filled ? 'fill-primary-400' : ''}`}
              />
            ))}
          </div>
          <p>{average_rating}</p>
          <p>({reviewCount}명)</p>
        </div>
        {/* price */}
        <div className="flex items-center">
          <p className="text-lg font-bold text-gray-900">
            {discounted_price.toLocaleString()}원
          </p>
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
