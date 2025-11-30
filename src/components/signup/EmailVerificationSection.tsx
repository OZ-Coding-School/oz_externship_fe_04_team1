import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'

function EmailVerificationSection() {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  return (
    <div>
      <FormField
        htmlFor="email"
        label="이메일"
        require
        info="로그인 시 아이디로 사용합니다."
      >
        <div className="flex gap-2.5">
          <Input
            id="email"
            className="h-12 flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
          <Button
            disabled={!email}
            className={`w-[112px] text-base ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
          >
            인증번호전송
          </Button>
        </div>
      </FormField>
      <FormField htmlFor="verificationCode" className="gap-4">
        <div className="flex gap-2.5">
          <Input
            id="emailVerificationCode"
            className="h-12 flex-1"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="전송된 코드를 입력해주세요."
          />
          <Button
            disabled={!verificationCode}
            className={`w-[112px] text-base ${verificationCode ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
          >
            인증번호확인
          </Button>
        </div>
      </FormField>
    </div>
  )
}

export default EmailVerificationSection
