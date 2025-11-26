import Data from '@/assets/data.svg'
import Plus from '@/assets/plus.svg'
import Button from '@/components/common/Button'

const NoData = () => {
  return (
    <div className="h-[382px] w-[854px] justify-center rounded-[16px] border border-gray-200 bg-gray-50 p-[25px] text-center">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-[24px]">
          <div className="bg-primary-50 flex h-[80px] w-[80px] items-center justify-center rounded-full">
            <img
              src={Data}
              alt="icon"
              className="flex h-[32px] w-[32px] items-center justify-center"
            />
          </div>
        </div>

        <p className="mb-[8px] text-[20px] font-bold text-gray-700">
          아직 데이터가 없습니다
        </p>
        <p className="mb-[24px] text-[16px] text-gray-700">
          첫 항목을 추가해 보세요
        </p>
        <div>
          <Button size="lg" className="w-37">
            <img src={Plus} alt="icon" />
            새로 만들기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NoData
