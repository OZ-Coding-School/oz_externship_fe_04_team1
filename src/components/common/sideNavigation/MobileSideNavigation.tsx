import profileIcon from '@/assets/icons/modalProfileIcon.svg'
import activeProfileIcon from '@/assets/icons/mobileActivemodalProfileIcon.svg'
import bookMarkIcon from '@/assets/icons/bookMark.svg'
import activeBookMarkIcon from '@/assets/icons/mobileActiveBookMark.svg'
import applyIcon from '@/assets/icons/applyIcon.svg'
import activeApplyIcon from '@/assets/icons/mobileActiveApplyIcon.svg'
import completeStudyIcon from '@/assets/icons/completeStudyIcon.svg'
import activeCompleteStudyIcon from '@/assets/icons/mobileActiveCompleteStudyIcon.svg'
import MyPageStateStore from '@/store/mypageStateStore'
function MobileSideNagigation() {
  const myPageState = MyPageStateStore((state) => state.myPageState)
  const setMyPageState = MyPageStateStore((state) => state.setMyPageState)
  return (
    <div className="h-[162px] w-[352px] rounded-xl border-2 border-solid border-gray-200">
      <div className="flex h-1/2 w-full">
        <div
          className={
            myPageState === 'MY_INFORMATION'
              ? 'bg-primary-500 flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-tl-xl'
              : 'bg-basic-white flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-xl'
          }
          onClick={() => {
            setMyPageState('MY_INFORMATION')
          }}
        >
          <img
            src={
              myPageState === 'MY_INFORMATION' ? activeProfileIcon : profileIcon
            }
            alt="profileIcon"
            className="h-[24px] w-[24px]"
          />
          <span
            className={
              myPageState === 'MY_INFORMATION'
                ? 'text-basic-white text-xs'
                : 'text-xs text-gray-600'
            }
          >
            내정보
          </span>
        </div>
        <div
          className={
            myPageState === 'BOOKMARK_ANNOUNCEMENT' ||
            myPageState === 'BOOKMARK_STUDY'
              ? 'bg-primary-500 flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-tr-xl'
              : 'bg-basic-white flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-r-xl'
          }
          onClick={() => {
            setMyPageState('BOOKMARK_ANNOUNCEMENT')
          }}
        >
          <img
            src={
              myPageState === 'BOOKMARK_ANNOUNCEMENT' ||
              myPageState === 'BOOKMARK_STUDY'
                ? activeBookMarkIcon
                : bookMarkIcon
            }
            alt="bookMarkIcon"
            className="h-[24px] w-[24px]"
          />
          <span
            className={
              myPageState === 'BOOKMARK_ANNOUNCEMENT' ||
              myPageState === 'BOOKMARK_STUDY'
                ? 'text-basic-white text-xs'
                : 'text-xs text-gray-600'
            }
          >
            북마크
          </span>
        </div>
      </div>
      <div className="flex h-1/2 w-full">
        <div
          className={
            myPageState === 'APPLY_LIST'
              ? 'bg-primary-500 flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-bl-xl'
              : 'bg-basic-white flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-b-xl'
          }
          onClick={() => {
            setMyPageState('APPLY_LIST')
          }}
        >
          <img
            src={myPageState === 'APPLY_LIST' ? activeApplyIcon : applyIcon}
            alt="applyIcon"
            className="h-[24px] w-[24px]"
          />
          <span
            className={
              myPageState === 'APPLY_LIST'
                ? 'text-basic-white text-xs'
                : 'text-xs text-gray-600'
            }
          >
            지원내역
          </span>
        </div>
        <div
          className={
            myPageState === 'COMPLETE_STUDY'
              ? 'bg-primary-500 flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-br-xl'
              : 'bg-basic-white flex w-1/2 cursor-pointer flex-col items-center justify-center gap-[9px] rounded-r-xl'
          }
          onClick={() => {
            setMyPageState('COMPLETE_STUDY')
          }}
        >
          <img
            src={
              myPageState === 'COMPLETE_STUDY'
                ? activeCompleteStudyIcon
                : completeStudyIcon
            }
            alt="completeStudyIcon"
            className="h-[24px] w-[24px]"
          />
          <span
            className={
              myPageState === 'COMPLETE_STUDY'
                ? 'text-basic-white text-xs'
                : 'text-xs text-gray-600'
            }
          >
            완료스터디
          </span>
        </div>
      </div>
    </div>
  )
}
export default MobileSideNagigation
