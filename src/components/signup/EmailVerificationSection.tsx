import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import { useFormContext, useWatch } from 'react-hook-form'
import type { SignupFormValuesWithValidation } from '@/types/signup'
import { useSendEmail, useVerifyEmailCode } from '@/hooks/quries/auth/useSignup'

function EmailVerificationSection() {
  const [code, setCode] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null) // null 시도 안함 boolean 시도했음 (true 성공 false 실패)
  const [emailSendError, setEmailSendError] = useState<string | null>(null)
  const { mutate: sendEmail } = useSendEmail()
  const { mutate: verifyEmailCode } = useVerifyEmailCode()

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SignupFormValuesWithValidation>()
  const email = useWatch({ name: 'email' })

  const emailRegister = register('email', {
    required: '이메일 인증을 해주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
    onChange: () => {
      setIsEmailSent(false)
      setIsEmailVerified(null)
      setCode('')
      setEmailSendError(null)
      setValue('emailVerified', false)
    },
  })

  const handleEmailSubmit = () => {
    if (errors.email) return
    setEmailSendError(null)
    // api작업
    sendEmail(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true)
          setIsEmailVerified(null)
          setCode('')
        },
        onError: (error) => {
          setEmailSendError(error.message)
        },
      }
    )
  }

  const handleVerifyEmail = () => {
    if (!code || code.length !== 6) return
    // api작업
    verifyEmailCode(
      { email, code },
      {
        onSuccess: () => {
          setIsEmailVerified(true)
          setValue('emailVerified', true)
        },
        onError: () => {
          // 에러 처리할 때 서버에서 주는 에러 메시지를 화면에 표시하는게 일반적인가? ( 하지만 지금 명세서에 에러가 어떤 식으로 던져지는지 명확하지 않음..)
          setIsEmailVerified(false)
          setValue('emailVerified', false)
        },
      }
    )
  }

  return (
    <div>
      <FormField
        htmlFor="email"
        label="이메일"
        require
        info="로그인 시 아이디로 사용합니다."
        errorMsg={errors.email?.message}
      >
        <div className="flex gap-2.5">
          <Input
            {...emailRegister}
            id="email"
            type="email"
            error={!!errors.email || !!emailSendError}
            autoComplete="email"
            className="h-12 flex-1"
            placeholder="example@gmail.com"
          />
          <Button
            disabled={!email}
            className={`w-[112px] text-base ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleEmailSubmit}
          >
            {isEmailSent ? '재전송' : '인증번호전송'}
          </Button>
        </div>
        {emailSendError && (
          <p className="text-danger-500 pt-2 pl-1 text-sm">{emailSendError}</p>
        )}
      </FormField>
      <FormField className="gap-4" htmlFor="emailVerificationCode">
        <div className="flex gap-2.5">
          <Input
            id="emailVerificationCode"
            autoComplete="one-time-code"
            className="h-12 flex-1"
            value={code}
            error={isEmailVerified === false}
            onChange={(e) => setCode(e.target.value)}
            placeholder="전송된 코드를 입력해주세요."
          />
          <Button
            disabled={!email || !!errors.email || !isEmailSent}
            className={`w-[112px] text-base ${code.length === 6 ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleVerifyEmail}
          >
            인증번호확인
          </Button>
        </div>
        {isEmailVerified !== null && (
          <p
            className={`pt-2 pl-1 text-sm ${isEmailVerified ? 'text-success-600' : 'text-danger-500'}`}
          >
            {isEmailVerified
              ? '이메일 인증이 완료되었습니다.'
              : '인증번호가 일치하지 않습니다'}
          </p>
        )}
      </FormField>
    </div>
  )
}

export default EmailVerificationSection
