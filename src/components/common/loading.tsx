import LoadingUi from '@/assets/loading.png'

const Loading = () => {
  return (
    <div className="h-[278px] w-full max-w-[854px] justify-center rounded-[16px] border border-gray-200 bg-gray-50 p-[25px] text-center">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="pb-[24px]">
          <div className="flex items-center justify-center pt-12 pb-6">
            <img
              src={LoadingUi}
              alt="loading"
              className="h-12 w-12 animate-spin"
            />
          </div>
          <p className="mb-[8px] text-[20px] font-bold text-gray-900">
            데이터를 불러오고 <br className="sm:hidden" />
            있습니다
          </p>
        </div>
      </div>
    </div>
  )
}
export default Loading
