import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useUserData from '@/hooks/quries/useUserData'
import { useState } from 'react'
interface EditModalProps {
  onClose: () => void
}
function EditModal({ onClose }: EditModalProps) {
  const { data: userData } = useUserData()
  // 사용자의 수정 상태 관리용
  const [editGender, setEditGender] = useState(userData[0]?.gender)
  const [editUserName, setEditUserName] = useState(userData[0]?.name)
  const [editUserNickName, setEditUserNickName] = useState(
    userData[0]?.nickname
  )
  const [editUserBirthDay, setEditUserBirthDay] = useState(
    userData[0]?.birthday
  )
  // 추후 useEffect 이용해서 폼에 초기값 가져오는것 구현하기
  return (
    <div
      className="bg-basic-white z-10 h-[600px] w-[450px] flex-col overflow-y-auto rounded-xl md:h-[730px] md:w-[512px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-[89px] w-full items-center justify-between border-b-2 border-solid border-gray-200 px-6 py-7">
        <span className="text-lg font-semibold text-gray-900">프로필 수정</span>
        <img
          src={closeIcon}
          alt="colseIcon"
          onClick={onClose}
          className="h-[20px] w-[20px] cursor-pointer"
        />
      </div>
      {/* 사진~성별까지의 부분 */}
      <div className="mt-11 flex flex-col gap-3 border-b-2 border-solid border-gray-200 px-6 pb-10">
        {/* 프로필 사진 변경 부분 */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={userData[0]?.profile_img_url}
            alt="profileImg"
            className="h-[96px] w-[96px] rounded-full"
          />
          <span className="text-primary-600 cursor-pointer text-sm">
            프로필 사진 변경
          </span>
          {/* 프로필 사진 변경을 누르면 finder나오게 구현하기 */}
        </div>
        {/* 이름 부분*/}
        <div className="flex flex-col gap-2">
          <span>이름</span>
          <Input
            value={editUserName}
            onChange={(e) => setEditUserName(e.target.value)}
          />
        </div>
        {/*닉네임 부분*/}
        <div className="flex flex-col gap-2">
          <span>닉네임</span>
          <Input
            value={editUserNickName}
            onChange={(e) => setEditUserNickName(e.target.value)}
          />
        </div>
        {/*생년월일*/}
        <div className="flex flex-col gap-2">
          <span>생년월일</span>
          <Input
            value={editUserBirthDay.split('-').join('')}
            onChange={(e) => setEditUserBirthDay(e.target.value)}
          />
          {/*api 명세서 상 생년월일이 2000-05-05 이런식으로 내려와서 피그마에서 요구한대로 구현*/}
          {/* 추후 변경하기 버튼 누를시 2000-05-05 형태로 변환 시키기 */}
        </div>
        {/*성별 부분*/}
        <div className="flex flex-col gap-2">
          <span>성별</span>
          <div className="flex gap-5">
            {/* 선택하면  */}
            <Button
              className={
                editGender === 'M'
                  ? 'border-primary-600 bg-primary-100 text-primary-600 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid px-7 py-4'
                  : 'border-gray-250 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid bg-gray-200 px-8 py-4 text-gray-600'
              }
              onClick={() => setEditGender('M')}
            >
              남
            </Button>
            <Button
              className={
                editGender === 'F'
                  ? 'border-primary-600 bg-primary-100 text-primary-600 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid px-7 py-4'
                  : 'border-gray-250 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid bg-gray-200 px-8 py-4 text-gray-600'
              }
              onClick={() => setEditGender('F')}
            >
              여
            </Button>
          </div>
        </div>
      </div>
      {/* 취소, 변경하기 버튼 */}
      <div className="mt-3 flex items-center justify-end gap-3 px-6 pb-4 md:pb-0">
        <button
          className="bg-basic-white cursor-pointer rounded-lg border-2 border-solid border-gray-300 px-6 py-2 text-base text-gray-900"
          onClick={onClose}
        >
          취소
        </button>
        <button className="bg-primary-500 text-basic-white text-bas cursor-pointer rounded-lg px-7 py-2">
          변경하기
        </button>
        {/* 변경하기 누르면 patch 로직 구현  + 토스트 ui*/}
      </div>
    </div>
  )
}
export default EditModal
