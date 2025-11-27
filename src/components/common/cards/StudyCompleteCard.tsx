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
    <div className="max-h-[500px] w-[318px] rounded-lg border border-gray-200 md:w-[384px]">
      {/* thumbnail */}
      <img
        className="h-[179px] w-full rounded-t-lg object-cover md:h-[216px]"
        src={thumbnail}
        alt={title}
      />

      {/* content */}
      <div className="p-3 md:p-5">
        <div className="flex items-center justify-between pb-2 md:pb-3">
          <h4 className="text-md font-medium md:text-lg">{title}</h4>
          {leader && (
            <span className="bg-primary-100 text-primary-800 rounded-full px-2 py-1 text-xs">
              리더
            </span>
          )}
        </div>

        <ul className="flex flex-col gap-1 pb-4 text-xs text-gray-600 md:gap-2 md:text-sm">
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
          <>
            <div className="mb-3 flex flex-col gap-2 rounded-lg bg-gray-50 p-4 md:mb-4">
              <div className="flex items-center justify-between text-gray-600">
                <div className="flex items-center">
                  {stars.map((filled, idx) => (
                    <Star
                      key={idx}
                      className={`text-primary-400 h-7 w-5 ${filled ? 'fill-yellow-400' : ''}`}
                    />
                  ))}
                  <span className="text-md ml-2 font-medium text-gray-700">
                    {rating}/5
                  </span>
                </div>
                <SquarePen className="hidden h-[17px] w-4 md:block" />
              </div>
              <p className="line-clamp-2 text-xs text-gray-600 md:text-sm">
                {review}
              </p>
            </div>
            <Button
              variant="primary"
              className="block w-full p-2 md:hidden md:h-[40px]"
            >
              리뷰 수정
            </Button>
          </>
        ) : (
          <>
            <div className="bg-primary-50 text-primary-800 mb-3 flex items-center justify-center rounded-lg p-2 text-xs font-normal md:mb-4 md:h-[53px] md:text-sm">
              아직 리뷰를 작성하지 않았습니다
            </div>
            <Button variant="primary" className="w-full p-2 md:h-[40px]">
              리뷰 작성
            </Button>
          </>
        )}
        {/* button도 프롭스로 받아서 onClick을 외부에서 처리시켜야하나요??.. */}
      </div>
    </div>
  )
}

export default StudyCompleteCard
