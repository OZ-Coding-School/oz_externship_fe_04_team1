import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import type { SignupFormValues } from '@/types/signup'
import { useFormContext, useWatch } from 'react-hook-form'

function PhoneVerificationSection() {
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('')
  const [isPhoneSent, setIsPhoneSent] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean | null>(null)

  const {
    register,
    formState: { errors },
  } = useFormContext<SignupFormValues>()
  const phone = useWatch({ name: 'phone_number' })

  const phoneRegister = register('phone_number', {
    required: '휴대폰 인증을 해주세요.',
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: '휴대폰 번호를 10~11자리 숫자로 입력해주세요.',
    },
  })

  const handlePhoneSubmit = () => {
    console.log('휴대폰 인증 시작')
    setIsPhoneSent(true)
  }

  const handleVerifyPhone = () => {
    console.log('휴대폰 인증 성공')
    setIsPhoneVerified(true)
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
            error={!!errors.phone_number}
          />
          <Button
            disabled={!phone}
            className={`w-[112px] text-base ${phone ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handlePhoneSubmit}
          >
            {isPhoneSent ? '재전송' : '인증번호전송'}
          </Button>
        </div>
      </FormField>
      <FormField htmlFor="phoneVerificationCode" className="gap-4">
        <div className="flex gap-2.5">
          <Input
            id="phoneVerificationCode"
            className="h-12 flex-1"
            autoComplete="one-time-code"
            value={phoneVerificationCode}
            onChange={(e) => setPhoneVerificationCode(e.target.value)}
            placeholder="인증번호 6자리를 입력해주세요"
          />
          <Button
            disabled={!(phoneVerificationCode.length === 6)}
            className={`w-[112px] text-base ${phoneVerificationCode.length === 6 ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleVerifyPhone}
          >
            인증번호확인
          </Button>
        </div>
        {isPhoneVerified !== null && (
          <p
            className={`pt-2 pl-1 text-sm ${isPhoneVerified ? 'text-success-600' : 'text-danger-500'}`}
          >
            {isPhoneVerified
              ? '휴대폰 인증이 완료되었습니다.'
              : '휴대폰 인증을 실패했습니다.'}
          </p>
        )}
      </FormField>
    </div>
  )
}
export default PhoneVerificationSection
