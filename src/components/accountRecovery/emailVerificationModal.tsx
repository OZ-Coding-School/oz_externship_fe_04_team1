import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import accountemail from '@/assets/email.svg'
import { useState } from 'react'
interface Props {
  onVerify?: () => void
  onClose: () => void
  email?: string
}

export default function EmailVerificationModal({ onClose }: Props) {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* 기존 모달 박스 */}
      <div className="flex h-[437px] w-[396px] flex-col rounded-xl bg-white p-6">
        <div className="flex h-6 justify-end">
          <button className="h-6 cursor-pointer" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <img src={accountemail} alt="accountRecoverSvg" className="mb-4" />
          <p className="mb-4 text-lg font-bold">
            계정 다시 사용하기<span></span>
          </p>
          <p className="mb-10 text-sm text-gray-600">
            입력하신 이메일로 인증번호를 보내드릴게요.
          </p>
        </div>
        <div>
          <p className="mb-4">
            이메일<span className="text-danger-500 pl-0.5">*</span>
          </p>

          {/* 이메일 인증번호 전송  */}
          <form className="flex flex-col">
            <div className="mb-4 flex gap-3">
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[230px]"
                placeholder="가입한 이메일을 입력해주세요"
              />
              <Button
                disabled={!email}
                className={`bg-gray-200 ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                variant="outline"
              >
                인증코드전송
              </Button>
            </div>
            {/* 이메일 인증코드 확인 */}
            <div className="mb-10 flex gap-3">
              <Input
                id="verificationCode"
                value={verificationCode}
                className="w-[230px]"
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="인증번호 6자리를 입력해주세요"
              />
              <Button
                disabled={!verificationCode}
                className={`bg-gray-200 ${verificationCode ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                variant="outline"
              >
                인증코드확인
              </Button>
            </div>
            <Button className="px-20 py-3">확인</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
