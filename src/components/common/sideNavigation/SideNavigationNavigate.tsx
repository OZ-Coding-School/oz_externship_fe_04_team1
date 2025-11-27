import profileIcon from '@/assets/icons/modalProfileIcon.svg'
import bookMarkIcon from '@/assets/icons/bookMark.svg'
import applyIcon from '@/assets/icons/applyIcon.svg'
import completeStudyIcon from '@/assets/icons/completeStudyIcon.svg'
function SideNaigationNavigate() {
  return (
    // 각 항목 active 되었을때 스타일 구현해야함
    <div className="flex flex-col items-center gap-2">
      <div className="bg-red- flex h-[62px] w-[210px] items-center gap-4 rounded-lg">
        <img
          src={profileIcon}
          alt="profileImg"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span className="h-[20px] text-sm text-gray-700">내 정보</span>
          <span className="text-xs text-gray-500">개인 정보 조회 및 수정</span>
        </div>
      </div>
      <div className="bg-red- flex h-[62px] w-[210px] items-center gap-4 rounded-lg">
        <img
          src={bookMarkIcon}
          alt="bookMarkIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span className="h-[20px] text-sm text-gray-700">북마크한 공고</span>
          <span className="text-xs text-gray-500">저장한 강의 목록</span>
        </div>
      </div>
      <div className="bg-red- flex h-[62px] w-[210px] items-center gap-4 rounded-lg">
        <img
          src={bookMarkIcon}
          alt="bookMarkIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span className="h-[20px] text-sm text-gray-700">북마크한 강의</span>
          <span className="text-xs text-gray-500">저장한 강의 목록</span>
        </div>
      </div>
      <div className="bg-red- flex h-[62px] w-[210px] items-center gap-4 rounded-lg">
        <img
          src={applyIcon}
          alt="applyIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span className="h-[20px] text-sm text-gray-700">지원 내역</span>
          <span className="text-xs text-gray-500">스터지 지원 현황</span>
        </div>
      </div>
      <div className="bg-red- flex h-[62px] w-[210px] items-center gap-4 rounded-lg">
        <img
          src={completeStudyIcon}
          alt="completeStudyIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span className="h-[20px] text-sm text-gray-700">완료된 스터디</span>
          <span className="text-xs text-gray-500">수료한 스터디 목록</span>
        </div>
      </div>
    </div>
  )
}
export default SideNaigationNavigate
