import { useState } from 'react'
import { validateEmail, validateCode } from '../accountRecovery/validation'
import {
  useSendEmailRecovery,
  useVerifyCodeRecovery,
} from '@/hooks/quries/accountRecovery'
import { showToast } from '@/components/common/toast/Toast'
import EmailVerificationForm from '../accountRecovery/emailVerificationForm'

interface EmailVerificationProps {
  onClose: () => void
}
export default function EmailVerificationModal({
  onClose,
}: EmailVerificationProps) {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const [codeError, setCodeError] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [showSuccessModal, setShowSuccesModal] = useState(false)

  const sendEmailMutation = useSendEmailRecovery()
  const verifyCodeMutation = useVerifyCodeRecovery()

  // 이메일 인증코드 전송
  const handleSendCode = () => {
    const error = validateEmail(email)
    setEmailError(error)
    if (error) {
      return
    }
    sendEmailMutation.mutate(email, {
      onSuccess: () => {
        showToast.success('전송 완료!', '이메일을 확인해주세요.')
        setIsEmailSent(true)
      },
      onError: () =>
        showToast.error('전송 실패', '이메일을 다시 한번 확인해주세요.'),
    })
  }

  // 인증코드 검사
  const handleVerifyCode = () => {
    const error = validateCode(verificationCode)
    setCodeError(error)
    if (error) {
      return
    }

    verifyCodeMutation.mutate(
      { email, code: verificationCode },
      {
        onSuccess: () => setCodeError('success'),
        onError: () => setCodeError('인증번호가 일치하지 않습니다'),
      }
    )
  }

  // 최종 확인버튼
  const handleSubmit = () => {
    if (!isEmailSent) {
      showToast.error('이메일 전송', '이메일로 인증코드를 전송해주세요')
      return
    }
    if (codeError !== 'success') {
      showToast.error('인증 실패', '인증번호를 입력해주세요')
      return
    }
    setShowSuccesModal(true)
  }
  const handleFinalClose = () => {
    setShowSuccesModal(false)
    onClose()
  }
  return (
    <EmailVerificationForm
      {...{
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
      }}
    />
  )
}
