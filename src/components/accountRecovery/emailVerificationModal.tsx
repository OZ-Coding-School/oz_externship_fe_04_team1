import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import accountemail from '@/assets/email.svg'
import { useState } from 'react'
import {
  validateEmail,
  validateCode,
} from '@/components/accountRecovery/validation'
import { showToast } from '@/components/common/toast/Toast'
import closeIcon from '@/assets/icons/close.svg'
import SuccessVerification from '@/components/accountRecovery/successVerification'
interface EmailVerificationProps {
  onClose: () => void
  email?: string
}
export default function EmailVerificationModal({
  onClose,
}: EmailVerificationProps) {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const [codeError, setCodeError] = useState('')
  const [showSuccessModal, setShowSuccesModal] = useState(false)

  // 이메일 인증코드 전송
  const handleSendCode = () => {
    const error = validateEmail(email)
    setEmailError(error)
    if (error) {
      return
    }
    showToast.success('전송 완료!', '이메일을 확인해주세요.')
    console.log('인증코드 전송:', email)
  }
  // 인증코드 검사
  const handleVerifyCode = () => {
    const error = validateCode(verificationCode)
    setCodeError(error)
    if (error) {
      return
    }
    console.log('인증번호:', verificationCode)
  }
  // 최종 확인버튼
  const handleComplete = () => {
    setShowSuccesModal(true)
  }
  const handleFinalClose = () => {
    setShowSuccesModal(false)
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* 기존 모달 박스 */}
      <div className="flex h-[480px] w-[396px] flex-col rounded-xl bg-white p-6">
        <div className="flex h-6 justify-end">
          <img
            src={closeIcon}
            alt="closeIcon"
            className="cursor-pointer"
            onClick={onClose}
          />
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
            <div className="mb-4">
              <div className="flex gap-3">
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  className={`w-[230px] ${emailError ? 'border-danger-500 focus:border-danger-500' : ''}`}
                  placeholder="가입한 이메일을 입력해주세요"
                />

                <Button
                  disabled={!email || !!emailError}
                  className={`bg-gray-200 ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                  variant="outline"
                  onClick={handleSendCode}
                >
                  인증코드전송
                </Button>
              </div>
              {email && <p className="text-danger-500 text-sm">{emailError}</p>}
            </div>

            {/* 이메일 인증코드 확인 */}
            <div className="mb-10">
              <div className="flex gap-3">
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  className="w-[230px]"
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                    setCodeError('')
                  }}
                  placeholder="인증번호 6자리를 입력해주세요"
                />
                <Button
                  onClick={handleVerifyCode}
                  disabled={!verificationCode}
                  className={`bg-gray-200 ${verificationCode ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                  variant="outline"
                >
                  인증코드확인
                </Button>
              </div>
              {verificationCode && (
                <p className="text-danger-500 text-sm">{codeError}</p>
              )}
            </div>

            <Button className="px-20 py-3" onClick={handleComplete}>
              확인
            </Button>
            {showSuccessModal && (
              <SuccessVerification onClose={handleFinalClose} />
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
