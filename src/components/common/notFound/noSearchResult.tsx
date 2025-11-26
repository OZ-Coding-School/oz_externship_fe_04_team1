import Search from '@/assets/search.svg'
import Button from '@/components/common/Button'

const NoSearchReult = () => {
  return (
    <div className="h-[382px] w-[854px] justify-center rounded-[16px] border border-gray-200 bg-gray-50 p-[25px] text-center">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-[24px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gray-100">
            <img
              src={Search}
              alt="icon"
              className="flex h-[32px] w-[32px] items-center justify-center"
            />
          </div>
        </div>

        <p className="mb-[8px] text-[20px] font-bold text-gray-700">
          검색 결과가 없습니다
        </p>
        <p className="mb-[24px] text-[16px] text-gray-700">
          다른 키워드로 검색해보시거나 필터를 조정해주세요
        </p>
        <div className="flex gap-3">
          <Button size="lg">필터초기화</Button>
          <Button size="lg" variant="outline">
            새로운 검색
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NoSearchReult
