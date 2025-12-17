import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import type { SignupFormValuesWithValidation } from '@/types/signup'
import { useFormContext, useWatch } from 'react-hook-form'

type SmsVerificationSectionProps = {
  onSmsSubmit: (phone_number: string) => void
  onVerifySms: (phone_number: string, code: string) => void
  onSmsChange: () => void
  isSendingSms: boolean
  isVerifyingSms: boolean
  smsSendError: string | null
  isSmsSent: boolean
}

function SmsVerificationSection({
  onSmsSubmit,
  onVerifySms,
  onSmsChange,
  isSendingSms,
  isVerifyingSms,
  smsSendError,
  isSmsSent,
}: SmsVerificationSectionProps) {
  const [code, setCode] = useState('')

  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext<SignupFormValuesWithValidation>()
  const phone_number = useWatch({ name: 'phone_number' })
  const smsVerified = useWatch({ name: 'smsVerified' })

  const phoneRegister = register('phone_number', {
    required: '휴대폰 인증을 해주세요.',
    pattern: {
      value: /^[0-9]{11}$/,
      message: '휴대폰 번호를 11자리 숫자로 입력해주세요.',
    },
    onChange: () => {
      onSmsChange()
      setCode('')
    },
  })

  const handleSmsSubmit = () => {
    if (errors.phone_number) return
    onSmsSubmit(phone_number)
    setCode('')
    setValue('smsVerified', null)
    clearErrors('smsVerified')
  }

  const handleVerifySms = () => {
    if (!code || code.length !== 6) return
    onVerifySms(phone_number, code)
  }

  return (
    <div>
      <FormField
        htmlFor="phone_number"
        label="휴대전화"
        errorMsg={errors.phone_number?.message}
        require
      >
        <div className="flex gap-2.5">
          <Input
            {...phoneRegister}
            id="phone_number"
            autoComplete="tel"
            type="tel"
            className="h-12 flex-1"
            placeholder="01012345678"
            error={!!errors.phone_number || !!smsSendError || isSendingSms}
          />
          <Button
            disabled={!phone_number || isSendingSms || !!errors.phone_number}
            className={`w-[112px] text-base ${phone_number ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleSmsSubmit}
          >
            {isSendingSms
              ? '전송 중...'
              : isSmsSent
                ? '재전송'
                : '인증번호전송'}
          </Button>
        </div>
        {smsSendError && (
          <p className="text-danger-500 pt-2 pl-1 text-sm">{smsSendError}</p>
        )}
      </FormField>
      <FormField htmlFor="smsVerificationCode" className="gap-4">
        <div className="flex gap-2.5">
          <Input
            id="smsVerificationCode"
            className="h-12 flex-1"
            autoComplete="one-time-code"
            value={code}
            error={smsVerified === false}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증번호 6자리를 입력해주세요"
          />
          <Button
            disabled={
              code.length !== 6 ||
              !!errors.phone_number ||
              !isSmsSent ||
              isVerifyingSms
            }
            className={`w-[112px] text-base ${code.length === 6 ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleVerifySms}
          >
            {isVerifyingSms ? '확인 중...' : '인증번호확인'}
          </Button>
        </div>
        {smsVerified !== null && (
          <p
            className={`pt-2 pl-1 text-sm ${smsVerified ? 'text-success-600' : 'text-danger-500'}`}
          >
            {smsVerified
              ? '휴대폰 인증이 완료되었습니다.'
              : '휴대폰 인증을 실패했습니다.'}
          </p>
        )}
      </FormField>
    </div>
  )
}
export default SmsVerificationSection
