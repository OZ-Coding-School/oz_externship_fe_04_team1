// import CourseCard from '@/components/common/cards/CourseCard'
import { useEffect, useState } from 'react'
import { getCourseInformationApi } from '@/api/courseInformation'
import { type CourseCardProps } from '@/types/mypage'
import CourseCard from '@/components/common/cards/CourseCard'
function Section3() {
  const [courses, setCourses] = useState<CourseCardProps[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourseInformationApi()
        setCourses(data)
      } catch (error) {
        console.error('강의 목록 불러오기 실패:', error)
      }
    }
    fetchCourses()
  }, [])

  return (
    <section className="flex min-h-[500px] w-full justify-center px-20 py-16 sm:min-h-[615px]">
      <div className="flex w-full max-w-[1440px] flex-col px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">인기 강의</h2>
            <p className="mb-8 text-base text-gray-600">
              지금 가장 많은 사람들이 수강하는 강의들
            </p>
          </div>
          <button className="text-primary-600 mb-8 cursor-pointer text-sm font-medium hover:underline">
            모든 강의 보기 →
          </button>
        </div>

        <div className="flex w-full flex-col gap-6 sm:flex-row sm:gap-6 md:h-[388px] md:w-[389px]">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              thumbnail_img_url={course.thumbnail_img_url}
              title={course.title}
              instructor={course.instructor}
              average_rating={course.average_rating}
              reviewCount={course.reviewCount}
              discounted_price={course.discounted_price}
              original_price={course.original_price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section3
