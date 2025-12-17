import Button from '@/components/common/Button'
import Arrow from '@/assets/arrow.svg'
const NotFound = () => {
  return (
    <div className="flex h-[513px] w-[854px] items-center rounded-[16px] border border-gray-200 bg-gray-50 p-[25px]">
      <div className="text-center">
        <h4 className="text-primary-500 text-[96px]">404</h4>
        <p className="mb-[8px] text-[20px] font-bold text-gray-700">
          찾으시는 페이지가 없습니다
        </p>

        <div className="flex h-[97px] w-[804px] items-center justify-center text-center">
          <p className="px-[130px] text-[16px] text-gray-700">
            방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수
            없습니다.입력하신 주소가 정확한지 다시 한번 확인해 주세요.
          </p>
        </div>
        <div>
          <Button size="lg" className="w-37">
            홈으로 가기
            <img src={Arrow} alt="icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
