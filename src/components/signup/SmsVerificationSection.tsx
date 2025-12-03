import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import type { SignupFormValuesWithValidation } from '@/types/signup'
import { useFormContext, useWatch } from 'react-hook-form'
import { useSendSms, useVerifySmsCode } from '@/hooks/quries/auth/useSignup'

function SmsVerificationSection() {
  const [code, setCode] = useState('')
  const [isSmsSent, setIsSmsSent] = useState(false)
  const [isSmsVerified, setIsSmsVerified] = useState<boolean | null>(null)
  const [smsSendError, setSmsSendError] = useState<string | null>(null)
  const { mutate: sendSms } = useSendSms()
  const { mutate: verifySmsCode } = useVerifySmsCode()

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SignupFormValuesWithValidation>()
  const phone_number = useWatch({ name: 'phone_number' })

  const phoneRegister = register('phone_number', {
    required: '휴대폰 인증을 해주세요.',
    pattern: {
      value: /^[0-9]{10,11}$/,
      message: '휴대폰 번호를 10~11자리 숫자로 입력해주세요.',
    },
    onChange: () => {
      setIsSmsSent(false)
      setIsSmsVerified(null)
      setCode('')
      setSmsSendError(null)
      setValue('smsVerified', false)
    },
  })

  const handleSmsSubmit = () => {
    if (errors.phone_number) return
    setSmsSendError(null)

    sendSms(
      { phone_number },
      {
        onSuccess: () => {
          setIsSmsSent(true)
          setIsSmsVerified(null)
          setCode('')
        },
        onError: (error) => {
          setSmsSendError(error.message)
        },
      }
    )
    setIsSmsSent(true)
  }

  const handleVerifySms = () => {
    if (!code || code.length !== 6) return
    verifySmsCode(
      { phone_number, code },
      {
        onSuccess: () => {
          setIsSmsVerified(true)
          setValue('smsVerified', true)
        },
        onError: () => {
          setIsSmsVerified(false)
          setValue('smsVerified', false)
        },
      }
    )
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
            error={!!errors.phone_number || !!smsSendError}
          />
          <Button
            disabled={!phone_number}
            className={`w-[112px] text-base ${phone_number ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleSmsSubmit}
          >
            {isSmsSent ? '재전송' : '인증번호전송'}
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
            error={isSmsVerified === false}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증번호 6자리를 입력해주세요"
          />
          <Button
            disabled={code.length !== 6 || !!errors.phone_number || !isSmsSent}
            className={`w-[112px] text-base ${code.length === 6 ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleVerifySms}
          >
            인증번호확인
          </Button>
        </div>
        {isSmsVerified !== null && (
          <p
            className={`pt-2 pl-1 text-sm ${isSmsVerified ? 'text-success-600' : 'text-danger-500'}`}
          >
            {isSmsVerified
              ? '휴대폰 인증이 완료되었습니다.'
              : '휴대폰 인증을 실패했습니다.'}
          </p>
        )}
      </FormField>
    </div>
  )
}
export default SmsVerificationSection
