import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'

function EmailVerificationSection() {
  const [email, setEmail] = useState('')

  return (
    <FormField
      htmlFor="email"
      label="이메일"
      require
      info="로그인 시 아이디로 사용합니다."
    >
      <div className="flex gap-2.5">
        <Input
          className="h-12 flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          disabled={!email}
          className={`w-[112px] text-base ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
        >
          중복 확인
        </Button>
      </div>
    </FormField>
  )
}

export default EmailVerificationSection
