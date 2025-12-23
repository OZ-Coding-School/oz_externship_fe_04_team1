import alertIcon from '@/assets/icons/alertIcon.svg'
import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import DeleteReasonModal from '@/components/common/DeleteReasonModal'
import { ToastAlert } from '@/components/common/toast/ToastAlert'
import { useForm } from 'react-hook-form'
import type { WithDraw } from '@/types/withDraw'
import Input from '@/components/common/Input'
import { useDeleteUser } from '@/hooks/quries/useDeleteUser'
import { showToast } from '@/components/common/toast/Toast'
import { useNavigate } from 'react-router'
import LoginStateStore from '@/store/loginStateStore'
import { ROUTE_PATHS } from '@/constant/route'
import { useState } from 'react'
interface WithDrawProps {
  onClose: () => void
}
function WithDrawModal({ onClose }: WithDrawProps) {
  const navigate = useNavigate()
  const setLoginState = LoginStateStore((set) => set.setLoginState)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<WithDraw>({ mode: 'onChange' })
  const { mutate: deleteUser } = useDeleteUser()
  const options = [
    { label: '더 이상 필요하지 않음', value: 'NO_LONGER_NEEDED' },
    { label: '흥미/관심 부족', value: 'LACK_OF_INTEREST' },
    { label: '사용이 너무 어려움', value: 'TOO_DIFFICULT' },
    { label: '더 나은 서비스 발견', value: 'FOUND_BETTER_SERVICE' },
    { label: '개인 정보 문제', value: 'PRIVACY_CONCERNS' },
    { label: '서비스 품질 불량', value: 'POOR_SERVICE_QUALITY' },
    { label: '기술적 문제', value: 'TECHNICAL_ISSUES' },
    { label: '콘텐츠 부족', value: 'LACK_OF_CONTENT' },
    { label: '기타', value: 'OTHER' },
  ]
  const onSubmit = (data: WithDraw) => {
    deleteUser(data, {
      onSuccess: () => {
        showToast.success('성공', '회원탈퇴가 정상적으로 처리되었습니다')
        setLoginState('GUEST')
        onClose()
        navigate(ROUTE_PATHS.HOME)
      },
    })
  }
  const reasonRegister = {
    required: { value: true, message: '탈퇴 사유를 선택해주세요' },
  }
  const checkRegister = {
    required: { value: true, message: '회원 탈퇴에 동의해야 합니다' },
  }
  const reasonDetailRegister = {
    required: { value: true, message: '탈퇴 사유를 작성해주세요' },
  }
  const [dropDownOpen, setDropDownOpen] = useState(false)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-basic-white flex h-[620px] w-[448px] flex-col rounded-xl ${dropDownOpen ? 'overflow-y-auto' : 'overflow-hidden'}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 헤더부분 */}
      <div className="flex items-center justify-between border-b-2 border-solid border-gray-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-danger-50 flex h-[40px] w-[40px] items-center justify-center rounded-full">
            <img
              src={alertIcon}
              alt="alertIcon"
              className="h-[19px] w-[19px]"
            />
          </div>
          <span className="text-lg font-semibold text-gray-900">회원 탈퇴</span>
        </div>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="h-[20px] w-[20px] cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 메인부분 */}
      <div className="relative flex flex-col gap-6 border-b-2 border-solid border-gray-200 px-6 pt-6 pb-11">
        <ToastAlert
          type="alert"
          title="회원 탈퇴 안내"
          message="• 탈퇴 즉시 서비스 이용이 중단됩니다
        • 2주간 계정 복구가 가능합니다
        • 2주 후 모든 개인정보가 완전히 삭제됩니다"
        />
        {/* 폼 부분 */}
        <label htmlFor="reason" className="flex flex-col gap-1">
          <div className="flex gap-1">
            <span className="text-sm text-gray-700">탈퇴 사유</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <DeleteReasonModal
            defaultValue="탈퇴 사유를 선택해주세요"
            options={options.map((v) => v.label)}
            onOpen={() => setDropDownOpen(true)}
            onClose={() => setDropDownOpen(false)}
            onChange={(label) => {
              const option = options.find((v) => v.label === label)
              setDropDownOpen(false)
              if (option) setValue('reason', option.value as any)
              // 계속 타입 오류 발생해서 임시로 any로 지정
            }}
          />
          <Input
            id="reason"
            type="hidden"
            {...register('reason', reasonRegister)}
          />
          {errors.reason && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.reason.message}
            </p>
          )}
        </label>
        <label htmlFor="reason_detail" className="flex flex-col gap-1">
          <div className="flex gap-1">
            <span className="text-sm text-gray-700">탈퇴 상세 사유</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <textarea
            id="reason_detail"
            className="bg-basic-white h-[80px] resize-none rounded-lg border border-solid border-gray-300 px-3 py-2 text-sm"
            placeholder="탈퇴 사유를 입력해주세요"
            {...register('reason_detail', reasonDetailRegister)}
          />
          {errors.reason_detail && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.reason_detail.message}
            </p>
          )}
        </label>
        {/* 체크박스 부분 */}
        <label htmlFor="check" className="flex gap-2">
          <input
            id="check"
            type="checkbox"
            {...register('agree_check', checkRegister)}
          />
          <div className="flex gap-1">
            <span className="text-sm text-gray-700">
              회원 탈퇴에 동의합니다
            </span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
        </label>
        {errors.agree_check && (
          <p className="text-danger-500 absolute bottom-[20px] pl-1 text-xs">
            {errors.agree_check.message}
          </p>
        )}
      </div>
      {/* 버튼 부분 */}
      <div className="flex justify-end gap-3 p-3 md:p-6">
        <Button variant="outline" onClick={onClose} type="button">
          취소
        </Button>
        <Button variant="danger" type="submit" disabled={!isValid}>
          회원 탈퇴
        </Button>
      </div>
    </form>
  )
}
export default WithDrawModal
