import { useGetCourses } from '@/hooks/quries/course'
import CourseCard from '@/components/common/cards/CourseCard'

function Section3() {
  const { data: courses = [] } = useGetCourses()
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
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section3
