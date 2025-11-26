import { Star, Calendar, Clock3, Users, SquarePen } from 'lucide-react'
import Button from '../Button'

type StudyCardProps = {
  thumbnail?: string
  title: string
  leader?: boolean
  duration: string
  endDate: string
  participants: number
  rating: number
  review?: string
}

function StudyCompleteCard({
  thumbnail,
  title,
  leader = false,
  duration,
  endDate,
  participants,
  rating,
  review,
}: StudyCardProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating))
  return (
    <div className="max-h-[500px] w-full max-w-[382px] min-w-[318px] rounded-lg border border-gray-200">
      {/* thumbnail */}
      <div className="relative w-full pt-[56.25%]">
        <img
          className="absolute inset-0 h-full w-full rounded-t-lg object-cover"
          src={thumbnail}
          alt={title}
        />
      </div>

      {/* content */}
      <div className="p-5">
        <div className="flex items-center justify-between pb-3">
          <h4 className="text-lg font-medium">{title}</h4>
          {leader && (
            <span className="bg-primary-100 text-primary-800 rounded-full px-2 py-1 text-xs">
              리더
            </span>
          )}
        </div>

        <ul className="flex flex-col gap-2 pb-4 text-sm text-gray-600">
          <li className="flex items-center gap-1">
            <Clock3 className="h-4 w-3" /> 기간: {duration}
          </li>
          <li className="flex items-center gap-1">
            <Calendar className="h-4 w-3" />
            종료: {endDate}
          </li>
          <li className="flex items-center gap-1">
            <Users className="h-4 w-3" />
            참여자: {participants}명
          </li>
        </ul>
        {/* review */}
        {review ? (
          <div className="mb-4 flex flex-col gap-2 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center justify-between text-gray-600">
              <div className="flex items-center">
                {stars.map((filled, idx) => (
                  <Star
                    key={idx}
                    className={`text-primary-400 h-7 w-5 ${filled ? 'fill-yellow-400' : ''}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {rating}/5
                </span>
              </div>
              <SquarePen className="h-[17px] w-4" />
            </div>
            <p className="line-clamp-3 text-sm text-gray-600">{review}</p>
          </div>
        ) : (
          <div>
            <div className="bg-primary-50 text-primary-800 mb-4 flex h-[53px] items-center justify-center rounded-lg text-sm font-normal">
              아직 리뷰를 작성하지 않았습니다
            </div>
            <Button variant="primary" className="h-10 w-full p-2">
              리뷰 작성
            </Button>
          </div>
        )}
        {/* button도 프롭스로 받아서 onClick을 외부에서 처리시켜야하나요??.. */}
      </div>
    </div>
  )
}

export default StudyCompleteCard
