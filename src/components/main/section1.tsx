import Button from '@/components/common/Button'
import image from '@/assets/images/mainImage.png'
function section1() {
  return (
    <section className="bg-primary-50 flex w-full justify-center">
      <div className="flex w-full max-w-[1500px] flex-col gap-12 px-8 py-5 sm:max-w-[1440px] sm:flex-row sm:py-20">
        <div className="flex flex-1 flex-col text-center sm:text-left">
          <h1 className="mb-6 leading-none font-bold">
            <div className="text-5xl text-gray-950">IT 전문 지식을</div>
            <div className="text-primary-600 text-5xl">함께 배워나가세요</div>
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            최고의 강사진과 함께하는 IT 강의와 스터디 그룹으로 실무역량을
            키워보세요.
          </p>
          {/* flex flex-col gap-4 sm:justify-center */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="px-8">
              강의 둘러보기
            </Button>
            <Button
              size="lg"
              variant={'outline'}
              className="hover:bg-primary-200 text-primary-600 border-primary-600 bg-transparent px-5"
            >
              스터디 그룹 참여
            </Button>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden rounded-xl shadow-xl sm:h-[389px] sm:w-[584px]">
          <img src={image} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default section1
