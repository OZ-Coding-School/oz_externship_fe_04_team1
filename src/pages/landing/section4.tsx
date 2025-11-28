import Button from '@/components/common/Button'

function section4() {
  return (
    <section className="bg-primary-500 flex min-h-[400px] w-full justify-center px-20 py-16 sm:min-h-[292px]">
      <div className="flex w-full max-w-[1280px] flex-col">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-50">
            지금 시작하여 전문가가 되어보세요!
          </h2>
          <p className="mb-8 text-[20px] text-gray-50">
            수백 개의 강의와 활발한 스터디 그룹이 여러분을 기다리고 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="text-primary-500 border-none px-8 font-normal hover:bg-gray-200"
            >
              무료로 시작하기
            </Button>
            <Button
              size="lg"
              variant={'outline'}
              className="hover:bg-primary-400 border-gray-50 bg-transparent px-8 text-gray-50"
            >
              스터디 그룹 만들기
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default section4
