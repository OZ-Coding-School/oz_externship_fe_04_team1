import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import { useFormContext, useWatch } from 'react-hook-form'
import type { SignupFormValuesWithValidation } from '@/types/signup'

type EmailVerificationSectionProps = {
  onEmailSubmit: (email: string) => void
  onVerifyEmail: (email: string, code: string) => void
  onEmailChange: () => void
  isSendingEmail: boolean
  isVerifyingEmail: boolean
  emailSendError: string | null
  isEmailSent: boolean
}

function EmailVerificationSection({
  onEmailSubmit,
  onVerifyEmail,
  onEmailChange,
  isSendingEmail,
  isVerifyingEmail,
  emailSendError,
  isEmailSent,
}: EmailVerificationSectionProps) {
  const [code, setCode] = useState('')

  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext<SignupFormValuesWithValidation>()
  const email = useWatch({ name: 'email' })
  const emailVerified = useWatch({ name: 'emailVerified' })

  const emailRegister = register('email', {
    required: '이메일 인증을 해주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
    onChange: () => {
      onEmailChange()
      setCode('')
    },
  })

  const handleEmailSubmit = () => {
    if (errors.email || !email) return
    onEmailSubmit(email)
    setCode('')
    clearErrors('emailVerified')
  }

  const handleVerifyEmail = () => {
    if (!code || code.length !== 6 || !email) return
    onVerifyEmail(email, code)
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
            error={!!errors.email || !!emailSendError || isSendingEmail}
            autoComplete="email"
            className="h-12 flex-1"
            placeholder="example@gmail.com"
            disabled={isSendingEmail}
          />
          <Button
            disabled={!email || !!errors.email || isSendingEmail}
            className={`w-[112px] text-base ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleEmailSubmit}
          >
            {isSendingEmail
              ? '전송 중...'
              : isEmailSent
                ? '재전송'
                : '인증번호전송'}
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
            error={emailVerified === false}
            onChange={(e) => setCode(e.target.value)}
            placeholder="전송된 코드를 입력해주세요."
          />
          <Button
            disabled={
              !email || !!errors.email || !isEmailSent || isVerifyingEmail
            }
            className={`w-[112px] text-base ${code.length === 6 ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={handleVerifyEmail}
          >
            {isVerifyingEmail ? '확인 중...' : '인증번호확인'}
          </Button>
        </div>
        {emailVerified !== null && (
          <p
            className={`pt-2 pl-1 text-sm ${emailVerified ? 'text-success-600' : 'text-danger-500'}`}
          >
            {emailVerified
              ? '이메일 인증이 완료되었습니다.'
              : errors.emailVerified?.message}
          </p>
        )}
      </FormField>
    </div>
  )
}

export default EmailVerificationSection
