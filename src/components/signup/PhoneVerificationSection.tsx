import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'

function PhoneVerificationSection() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <FormField htmlFor="phone" label="휴대전화" require>
        <div className="flex gap-2.5">
          <Input
            id="phone"
            autoComplete="tel"
            type="tel"
            className="h-12 flex-1"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="01012345678"
          />
          <Button
            disabled={!phoneNumber}
            className={`w-[112px] text-base ${phoneNumber ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
          >
            인증번호전송
          </Button>
        </div>
      </FormField>
      <div className="flex gap-2.5">
        <Input
          id="phoneVerificationCode"
          className="h-12 flex-1"
          autoComplete="one-time-code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="인증번호 6자리를 입력해주세요"
        />
        <Button
          disabled={!verificationCode}
          className={`w-[112px] text-base ${verificationCode ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
        >
          인증번호확인
        </Button>
      </div>
    </div>
  )
}
export default PhoneVerificationSection
