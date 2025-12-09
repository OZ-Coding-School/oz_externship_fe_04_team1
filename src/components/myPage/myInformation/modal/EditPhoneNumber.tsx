import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useUserData from '@/hooks/quries/useUserData'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { CertifyNumber } from '@/types/certifyNumber'
interface EditPhoneNumberProps {
  onClose: () => void
}
function EditPhoneNumber({ onClose }: EditPhoneNumberProps) {
  const { data: userData } = useUserData()
  // 6자리 숫자 입력받기 위한 boolean값
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertifyNumber>({
    defaultValues: {
      phone_number: userData[0]?.phone_number,
      code: '',
    },
    mode: 'onBlur',
  })
  const phoneNumberRegister = {
    required: { value: true, message: '휴대폰 번호는 필수 항목입니다' },
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: '휴대폰 번호를 10~11자리 숫자로 입력해주세요',
    },
  }
  const phoneCertify = {
    required: { value: true, message: '' },
    pattern: { value: /^[0-9]{6}$/, message: '인증번호 6자리를 입력해주세요' },
  }
  const onSubmit = (data: CertifyNumber) => {
    console.log(data)
  }
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
          <div className="flex gap-2">
            <Input
              id="phone_number"
              {...register('phone_number', phoneNumberRegister)}
            />
            <Button variant="primary" type="button">
              인증하기
            </Button>
            {/* 추후 인증하기 눌렀을때 로직 구현하기 */}
            {/* 인증하기 누르면 variant = "secondary" 하고 + 로직 구현하기 + 인증번호가 오지 않나요? + 재전송 이부분 나타나게 -> 타이머는 어떻게 할건지...*/}
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
              variant={errors.code ? 'secondary' : 'primary'}
              disabled={!!errors.code}
              type="button"
            >
              확인
            </Button>
            {/* 확인눌렀을때 확인하는 로직 필요 + 토스트 알림 */}
          </div>
        </label>
        {errors.code && (
          <p className="text-danger-500 pl-1 text-xs">{errors.code.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-3 px-6 py-7">
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button
          variant={errors.code ? 'secondary' : 'primary'}
          disabled={!!errors.code}
          type="submit"
        >
          변경하기
        </Button>
        {/* 변경하기 늘렀을때의 로직 추가  + 휴대폰 번호 전송시 중간에 - 넣어서 요청 보내야함*/}
      </div>
    </form>
  )
}
export default EditPhoneNumber
