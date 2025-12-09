import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import accountemail from '@/assets/email.svg'
import closeIcon from '@/assets/icons/close.svg'
import SuccessVerification from './successVerification'
interface EmailVerificationUIProps {
  email: string
  setEmail: (value: string) => void
  verificationCode: string
  setVerificationCode: (value: string) => void
  emailError: string
  setEmailError: (value: string) => void
  codeError: string
  setCodeError: (value: string) => void
  isEmailSent: boolean
  showSuccessModal: boolean
  handleSendCode: () => void
  handleVerifyCode: () => void
  handleSubmit: () => void
  handleFinalClose: () => void
  onClose: () => void
}
export default function EmailVerificationForm({
  email,
  setEmail,
  verificationCode,
  setVerificationCode,
  emailError,
  setEmailError,
  codeError,
  setCodeError,
  isEmailSent,
  showSuccessModal,
  handleSendCode,
  handleVerifyCode,
  handleSubmit,
  handleFinalClose,
  onClose,
}: EmailVerificationUIProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
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
          <p className="mb-4 text-lg font-bold">계정 다시 사용하기</p>
          <p className="mb-10 text-sm text-gray-600">
            입력하신 이메일로 인증번호를 보내드릴게요.
          </p>
        </div>

        <div>
          <p className="mb-4">
            이메일<span className="text-danger-500 pl-0.5">*</span>
          </p>

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
                  type="button"
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

            <div className="mb-10">
              <div className="flex gap-3">
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  disabled={!isEmailSent}
                  className="w-[230px]"
                  onChange={(e) => {
                    setVerificationCode(e.target.value)
                    setCodeError('')
                  }}
                  placeholder="인증번호 6자리를 입력해주세요"
                />
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={!isEmailSent || !verificationCode}
                  className={`bg-gray-200 ${verificationCode ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                  variant="outline"
                >
                  인증코드확인
                </Button>
              </div>
              {codeError && (
                <p
                  className={`text-sm ${codeError === 'success' ? 'text-success-600' : 'text-danger-500'}`}
                >
                  {codeError === 'success'
                    ? '이메일 인증이 완료되었습니다.'
                    : codeError}
                </p>
              )}
            </div>

            <Button
              className="min-h-[48px] px-20 py-3"
              disabled={!isEmailSent || codeError !== 'success'}
              type="button"
              onClick={handleSubmit}
            >
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
