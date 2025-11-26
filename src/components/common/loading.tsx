import LoadingUi from '@/assets/loading.png'

const Loading = () => {
  return (
    <div className="h-[278px] w-[854px] justify-center rounded-[16px] border border-gray-200 bg-gray-50 p-[25px] text-center">
      <div className="flex h-full flex-col items-center justify-center px-[210px] text-center">
        <div className="pb-[24px]">
          <div className="flex items-center justify-center pt-12 pb-6">
            <img
              src={LoadingUi}
              alt="loading"
              className="h-12 w-12 animate-spin"
            />
          </div>
          <p className="mb-[8px] text-[20px] font-bold text-gray-900">
            데이터를 불러오고 있습니다
          </p>
          <p className="mb-[24px] text-[16px] text-gray-700">
            첫 항목을 추가해 보세요
          </p>
        </div>
      </div>
    </div>
  )
}
export default Loading
