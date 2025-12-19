import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useUserData from '@/hooks/quries/useUserData'
import { useForm, useWatch } from 'react-hook-form'
import type { CertifyNumber } from '@/types/certifyNumber'
import { useSendCode } from '@/hooks/quries/useSendCode'
import { showToast } from '@/components/common/toast/Toast'
import { useRef, useState } from 'react'
import { useEditPhoneNumber } from '@/hooks/quries/useEditPhoneNumber'
import { Timer, type TimerRefProps } from '@/components/common/timer/Timer'
interface EditPhoneNumberProps {
  onClose: () => void
}
function EditPhoneNumber({ onClose }: EditPhoneNumberProps) {
  const { data: userData } = useUserData()
  const [isSendCode, setIsSendCode] = useState(false)
  const [isCertify, setIsCertify] = useState(false)
  const { mutate: sendCode } = useSendCode()
  const { mutate: editPhoneNumber } = useEditPhoneNumber()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CertifyNumber>({
    defaultValues: {
      phone_number: userData?.phone_number,
      code: '',
    },
    mode: 'onChange',
  })
  const phoneNumberRegister = {
    required: { value: true, message: '휴대폰 번호는 필수 항목입니다' },
    pattern: {
      value: /^[0-9]{11}$/,
      message: '휴대폰 번호를 11자리 숫자로 입력해주세요',
    },
  }
  const phoneCertify = {
    required: { value: true, message: '' },
    pattern: { value: /^[0-9]{6}$/, message: '인증번호 6자리를 입력해주세요' },
  }
  const currentPhoneNumber = useWatch({
    control,
    name: 'phone_number',
  })
  const isPhoneValid = /^[0-9]{11}$/.test(currentPhoneNumber || '')
  const onSubmit = (data: CertifyNumber) => {
    editPhoneNumber(data, {
      onSuccess: () => {
        showToast.success('성공', '인증번호가 확인되었습니다')
        setIsCertify(true)
      },
      onError: (err: any) => {
        const status = err.statusCode
        if (status === 400) {
          showToast.error('실패', '인증 코드가 유효하지 않습니다')
        } else if (status === 409) {
          showToast.error('실패', '이미 등록된 휴대폰 번호입니다')
        }
      },
    })
  }
  const timeRef = useRef<TimerRefProps>(null)
  const [isExpired, setIsExpired] = useState(false)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-basic-white flex w-[512px] flex-col rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
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
        <label
          htmlFor="phone_number"
          className="flex flex-col gap-2 text-sm text-gray-700"
        >
          휴대폰 번호
          <div className="relative flex gap-2">
            <Input
              id="phone_number"
              {...register('phone_number', phoneNumberRegister)}
            />
            <Button
              variant={isSendCode ? 'secondary' : 'primary'}
              type="button"
              onClick={() => {
                sendCode(
                  { phone_number: currentPhoneNumber },
                  {
                    onSuccess: () => {
                      showToast.success('성공', '인증번호가 전송되었습니다')
                      timeRef.current?.start(5)
                      setIsSendCode(true)
                      setIsExpired(false)
                    },
                  }
                )
              }}
              disabled={
                !isPhoneValid || isCertify || (isSendCode && !isExpired)
              }
              className="w-[150px]"
            >
              <span
                className={
                  isSendCode && !isExpired && !isCertify
                    ? 'relative right-[20px]'
                    : ''
                }
              >
                {isSendCode ? '재전송' : '인증하기'}
              </span>
            </Button>

            <span
              className={
                isSendCode && !isExpired && !isCertify
                  ? 'absolute right-[12px] flex h-full items-center text-sm font-medium text-gray-900 opacity-50'
                  : 'hidden'
              }
            >
              (
              <Timer
                ref={timeRef}
                onExpire={() => {
                  if (isCertify) return
                  setIsExpired(true)
                  showToast.error('실패', '인증번호가 만료되었습니다')
                }}
                className="text-sm text-gray-900"
              />
              )
            </span>
          </div>
          {errors.phone_number && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.phone_number.message}
            </p>
          )}
        </label>
        <label
          htmlFor="code"
          className="flex flex-col gap-2 text-sm text-gray-700"
        >
          인증번호
          <div className="flex gap-2">
            <Input
              placeholder="인증번호 6자리 입력"
              id="code"
              {...register('code', phoneCertify)}
            />
            <Button
              variant={isValid ? 'primary' : 'secondary'}
              disabled={!isValid}
              type="submit"
            >
              인증번호 확인
            </Button>
            {/* 확인눌렀을때 확인하는 로직 필요 + 토스트 알림 */}
          </div>
          {isSendCode ? (
            <div
              className={isCertify ? 'hidden' : 'pl-1 text-xs text-gray-500'}
            >
              인증번호가 오지 않나요? 스팸함을 확인하거나 재전송해주세요
            </div>
          ) : (
            ''
          )}
        </label>
        {errors.code && (
          <p className="text-danger-500 pl-1 text-xs">{errors.code.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-3 px-6 py-7">
        <Button variant="primary" disabled={!isCertify} onClick={onClose}>
          변경완료
        </Button>
      </div>
    </form>
  )
}
export default EditPhoneNumber
