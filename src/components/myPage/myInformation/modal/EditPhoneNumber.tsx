import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useUserData from '@/hooks/quries/useUserData'
import { useState } from 'react'
interface EditPhoneNumberProps {
  onClose: () => void
}
function EditPhoneNumber({ onClose }: EditPhoneNumberProps) {
  const { data } = useUserData()
  const [editPhoneNumber, setEditPhoneNumber] = useState(data[0]?.phone_number)
  const [certifyNumber, setCertifyNumber] = useState<string>('')
  const isValidCode = /^\d{6}$/.test(certifyNumber)
  // 6자리 숫자 입력받기 위한 boolean값

  return (
    <>
      {/* 모달 헤더 부분 */}
      <div className="flex h-[89px] items-center justify-between border-b-2 border-solid border-gray-200 px-6 py-7">
        <span className="text-lg font-semibold text-gray-900">
          휴대폰 번호 변경
        </span>
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
          className="h-[20px] w-[20px] cursor-pointer"
        />
      </div>
      {/* 메인부분 */}
      <div className="mt-9 flex flex-col gap-3 border-b-2 border-solid border-gray-200 px-6 pb-8">
        {/* 휴대폰번호 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">휴대폰 번호</span>
          <div className="flex gap-2">
            <Input
              value={editPhoneNumber}
              onChange={(e) => setEditPhoneNumber(e.target.value)}
            />
            <Button variant="primary">인증하기</Button>
            {/* 추후 인증하기 눌렀을때 로직 구현하기 */}
            {/* 인증하기 누르면 variant = "secondary" 하고 disabled처리 + 로직 구현하기 + 인증번호가 오지 않나요? 이부분 나타나게*/}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">인증번호</span>
          <div className="flex gap-2">
            <Input
              placeholder="인증번호 6자리 입력"
              defaultValue={certifyNumber}
              onChange={(e) => setCertifyNumber(e.target.value)}
            />
            <Button
              variant={isValidCode ? 'primary' : 'secondary'}
              disabled={!isValidCode}
            >
              확인
            </Button>
            {/* 확인눌렀을때 확인하는 로직 필요 + 토스트 알림 */}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 px-6 py-7">
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button
          variant={isValidCode ? 'primary' : 'secondary'}
          disabled={!isValidCode}
        >
          변경하기
        </Button>
        {/* 변경하기 늘렀을때의 로직 추가 */}
      </div>
    </>
  )
}
export default EditPhoneNumber
