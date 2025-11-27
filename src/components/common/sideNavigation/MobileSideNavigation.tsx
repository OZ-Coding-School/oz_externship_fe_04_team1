import profileIcon from '@/assets/icons/modalProfileIcon.svg'
import bookMarkIcon from '@/assets/icons/bookMark.svg'
import applyIcon from '@/assets/icons/applyIcon.svg'
import completeStudyIcon from '@/assets/icons/completeStudyIcon.svg'

function MobileSideNagigation() {
  return (
    // 활성화된 부분 스타일링 추가해야함
    <div className="h-[162px] w-[352px] rounded-xl border-2 border-solid border-gray-200">
      <div className="flex h-1/2 w-full">
        <div className="flex w-1/2 flex-col items-center justify-center gap-[9px] rounded-xl">
          <img
            src={profileIcon}
            alt="profileIcon"
            className="h-[24px] w-[24px]"
          />
          <span className="text-xs text-gray-600">내정보</span>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center gap-[9px] rounded-r-xl">
          <img
            src={bookMarkIcon}
            alt="bookMarkIcon"
            className="h-[24px] w-[24px]"
          />
          <span className="text-xs text-gray-600">북마크</span>
        </div>
      </div>
      <div className="flex h-1/2 w-full">
        <div className="flex w-1/2 flex-col items-center justify-center gap-[9px] rounded-b-xl">
          <img src={applyIcon} alt="applyIcon" className="h-[24px] w-[24px]" />
          <span className="text-xs text-gray-600">지원내역</span>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center gap-[9px] rounded-r-xl">
          <img
            src={completeStudyIcon}
            alt="completeStudyIcon"
            className="h-[24px] w-[24px]"
          />
          <span className="text-xs text-gray-600">완료스터디</span>
        </div>
      </div>
    </div>
  )
}
export default MobileSideNagigation
