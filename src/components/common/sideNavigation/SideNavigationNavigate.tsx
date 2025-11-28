import profileIcon from '@/assets/icons/modalProfileIcon.svg'
import acticeProfileIcon from '@/assets/icons/profileImg.svg'
import bookMarkIcon from '@/assets/icons/bookMark.svg'
import applyIcon from '@/assets/icons/applyIcon.svg'
import completeStudyIcon from '@/assets/icons/completeStudyIcon.svg'
import activeBookMarkIcon from '@/assets/icons/yellowBookmark.svg'
import activeApplyIcon from '@/assets/icons/yellowApplyIcon.svg'
import activeCompleteStudyIcon from '@/assets/icons/activeCompleteStudyIcon.svg'
import { useNavigate } from 'react-router'
import { ROUTE_PATHS } from '@/constant/route'
import MyPageStateStore from '@/store/mypageStateStore'
function SideNaigationNavigate() {
  const myPageState = MyPageStateStore((state) => state.myPageState)
  const setMyPageState = MyPageStateStore((state) => state.setMyPageState)
  const navigate = useNavigate()
  return (
    // 전역 상태를 이용해 활성화 되는 항목 설정
    <div className="flex flex-col items-center gap-2">
      <div
        className={
          myPageState === 'MY_INFORMATION'
            ? 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg bg-[#fef9c3]'
            : 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg'
        }
        onClick={() => {
          setMyPageState('MY_INFORMATION')
          navigate(ROUTE_PATHS.MYPAGE.MY_INFORMATION)
        }}
      >
        <img
          src={
            myPageState === 'MY_INFORMATION' ? acticeProfileIcon : profileIcon
          }
          alt="profileImg"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span
            className={
              myPageState === 'MY_INFORMATION'
                ? 'text-primary-800 h-[20px] text-sm'
                : 'h-[20px] text-sm text-gray-700'
            }
          >
            내 정보
          </span>
          <span className="text-xs text-gray-500">개인 정보 조회 및 수정</span>
        </div>
      </div>
      <div
        className={
          myPageState === 'BOOKMARK_ANNOUNCEMENT'
            ? 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg bg-[#fef9c3]'
            : 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg'
        }
        onClick={() => {
          setMyPageState('BOOKMARK_ANNOUNCEMENT')
          navigate(ROUTE_PATHS.MYPAGE.BOOKMARK_ANNOUNCEMENT)
        }}
      >
        <img
          src={
            myPageState === 'BOOKMARK_ANNOUNCEMENT'
              ? activeBookMarkIcon
              : bookMarkIcon
          }
          alt="bookMarkIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span
            className={
              myPageState === 'BOOKMARK_ANNOUNCEMENT'
                ? 'text-primary-800 h-[20px] text-sm'
                : 'h-[20px] text-sm text-gray-700'
            }
          >
            북마크한 공고
          </span>
          <span className="text-xs text-gray-500">저장한 강의 목록</span>
        </div>
      </div>
      <div
        className={
          myPageState === 'BOOKMARK_STUDY'
            ? 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg bg-[#fef9c3]'
            : 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg'
        }
        onClick={() => {
          setMyPageState('BOOKMARK_STUDY')
          navigate(ROUTE_PATHS.MYPAGE.BOOKMARK_STUDY)
        }}
      >
        <img
          src={
            myPageState === 'BOOKMARK_STUDY' ? activeBookMarkIcon : bookMarkIcon
          }
          alt="bookMarkIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span
            className={
              myPageState === 'BOOKMARK_STUDY'
                ? 'text-primary-800 h-[20px] text-sm'
                : 'h-[20px] text-sm text-gray-700'
            }
          >
            북마크한 강의
          </span>
          <span className="text-xs text-gray-500">저장한 강의 목록</span>
        </div>
      </div>
      <div
        className={
          myPageState === 'APPLY_LIST'
            ? 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg bg-[#fef9c3]'
            : 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg'
        }
        onClick={() => {
          setMyPageState('APPLY_LIST')
          navigate(ROUTE_PATHS.MYPAGE.APPLY_LIST)
        }}
      >
        <img
          src={myPageState === 'APPLY_LIST' ? activeApplyIcon : applyIcon}
          alt="applyIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span
            className={
              myPageState === 'APPLY_LIST'
                ? 'text-primary-800 h-[20px] text-sm'
                : 'h-[20px] text-sm text-gray-700'
            }
          >
            지원 내역
          </span>
          <span className="text-xs text-gray-500">스터지 지원 현황</span>
        </div>
      </div>
      <div
        className={
          myPageState === 'COMPLETE_STUDY'
            ? 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg bg-[#fef9c3]'
            : 'flex h-[62px] w-[210px] cursor-pointer items-center gap-4 rounded-lg'
        }
        onClick={() => {
          setMyPageState('COMPLETE_STUDY')
          navigate(ROUTE_PATHS.MYPAGE.COMPLETE_STUDY)
        }}
      >
        <img
          src={
            myPageState === 'COMPLETE_STUDY'
              ? activeCompleteStudyIcon
              : completeStudyIcon
          }
          alt="completeStudyIcon"
          className="relative left-[5px] h-[20px] px-[10px]"
        />
        <div className="flex flex-col gap-0.5">
          <span
            className={
              myPageState === 'COMPLETE_STUDY'
                ? 'text-primary-800 h-[20px] text-sm'
                : 'h-[20px] text-sm text-gray-700'
            }
          >
            완료된 스터디
          </span>
          <span className="text-xs text-gray-500">수료한 스터디 목록</span>
        </div>
      </div>
    </div>
  )
}
export default SideNaigationNavigate
