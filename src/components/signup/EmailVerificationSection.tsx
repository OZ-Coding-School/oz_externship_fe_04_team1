import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import { useFormContext, useWatch } from 'react-hook-form'
import type { SignupFormValues } from '@/types/signup'

function EmailVerificationSection() {
  const [emailVerificationCode, setEmailVerificationCode] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null) // null 시도 안함 boolean 시도했음 (true 성공 false 실패)

  const {
    register,
    formState: { errors },
  } = useFormContext<SignupFormValues>()
  const email = useWatch({ name: 'email' })

  const emailRegister = register('email', {
    required: '이메일 인증을 해주세요.',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  })

  const handleEmailSubmit = () => {
    if (!email || errors.email) return
    // api작업
    console.log('이메일 인증 시작 : ', email)
    setIsEmailSent(true)
    setIsEmailVerified(null)
    setEmailVerificationCode('')
  }

  const handleVerifyEmail = () => {
    // api작업
    console.log('인증번호 확인 : ', emailVerificationCode)
    setIsEmailVerified(true) // api 작업 성공시
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
            error={!!errors.email}
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
      </FormField>
      <FormField className="gap-4" htmlFor="emailVerificationCode">
        <div className="flex gap-2.5">
          <Input
            id="emailVerificationCode"
            autoComplete="one-time-code"
            className="h-12 flex-1"
            value={emailVerificationCode}
            onChange={(e) => setEmailVerificationCode(e.target.value)}
            placeholder="전송된 코드를 입력해주세요."
          />
          <Button
            disabled={!(emailVerificationCode.length === 6)}
            className={`w-[112px] text-base ${emailVerificationCode.length === 6 ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
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
              : '이메일 인증을 실패했습니다.'}
          </p>
        )}
      </FormField>
    </div>
  )
}

export default EmailVerificationSection
