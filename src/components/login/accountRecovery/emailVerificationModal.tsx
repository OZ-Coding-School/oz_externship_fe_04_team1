import { useForm } from 'react-hook-form'
import {
  useSendEmailRecovery,
  useVerifyCodeRecovery,
} from '@/hooks/quries/accountRecovery'
import { showToast } from '@/components/common/toast/Toast'
import { useState, useRef } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import accountemail from '@/assets/email.svg'
import closeIcon from '@/assets/icons/close.svg'
import SuccessVerification from './successVerification'
import { Timer, type TimerRefProps } from '@/components/common/timer/Timer'
import { getErrorDetail } from '@/utils/getErrorDetail'
interface EmailRegisterFieldProps {
  email: string
  verificationCode: string
}

interface EmailVerificationProps {
  onClose: () => void
}

export default function EmailVerificationModal({
  onClose,
}: EmailVerificationProps) {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<EmailRegisterFieldProps>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      verificationCode: '',
    },
  })

  const [codeError, setCodeError] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const sendEmailMutation = useSendEmailRecovery()
  const verifyCodeMutation = useVerifyCodeRecovery()
  const suffixRef = useRef<TimerRefProps>(null)
  const email = watch('email')
  const verificationCode = watch('verificationCode')

  const handleSendCode = async () => {
    // trigger를 사용할 시 해당 (email) 필드를 찾고 register의 정해진 규칙을 실행 시키는 비동기 함수
    const isValid = await trigger('email')
    if (!isValid) return

    sendEmailMutation.mutate(email, {
      onSuccess: (data) => {
        showToast.success('전송 완료!', data.detail)
        setIsEmailSent(true)
        suffixRef.current?.start()
      },
      onError: (err: any) => {
        if (err?.response?.status === 400) {
          const msg = err?.response?.data?.error_detail
          showToast.error('전송 실패', msg)
        }
      },
    })
  }

  const handleVerifyCode = async () => {
    const isValid = await trigger('verificationCode')

    if (!isValid) return

    verifyCodeMutation.mutate(
      { email, code: verificationCode },
      {
        onSuccess: () => setCodeError('success'),
        onError: (err: any) => {
          if (err?.response?.status === 400) {
            const msg = err?.response?.data?.error_detail
            setCodeError(msg)
          }
        },
      }
    )
  }

  const handleSubmit = () => {
    if (!isEmailSent) {
      showToast.error('이메일 전송', '이메일로 인증코드를 전송해주세요')
      return
    }
    if (codeError !== 'success') {
      showToast.error('인증 실패', '인증번호를 입력해주세요')
      return
    }
    setShowSuccessModal(true)
  }

  const handleFinalClose = () => {
    setShowSuccessModal(false)
    onClose()
  }

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
            {/* 이메일 인증번호 전송 */}
            <div className="mb-4">
              <div className="flex gap-3">
                <Input
                  id="email"
                  {...register('email', {
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: '올바른 이메일 형식이 아닙니다',
                    },
                  })}
                  className={`w-[230px] ${errors.email ? 'border-danger-500 focus:border-danger-500' : ''}`}
                  placeholder="가입한 이메일을 입력해주세요"
                />
                <Button
                  type="button"
                  disabled={!email || !!errors.email}
                  className={`bg-gray-200 ${email ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                  variant="outline"
                  onClick={handleSendCode}
                >
                  인증코드전송
                </Button>
              </div>
              {errors.email && (
                <p className="text-danger-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 이메일 인증코드 확인 */}
            <div className="mb-10">
              <div className="flex gap-3">
                <div className="relative w-[230px]">
                  <Input
                    id="verificationCode"
                    {...register('verificationCode', {
                      required: '인증번호를 입력해주세요',
                      pattern: {
                        value: /^\d{6}$/,
                        message: '6자리 숫자를 입력해주세요',
                      },
                      onChange: () => {
                        clearErrors('verificationCode')
                        setCodeError('')
                      },
                    })}
                    disabled={!isEmailSent}
                    className="w-full"
                    placeholder="인증번호를 입력해주세요"
                  />
                  <Timer ref={suffixRef} seconds={300} />
                </div>
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={!isEmailSent || !verificationCode}
                  className={`bg-gray-200 ${verificationCode && isEmailSent ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
                  variant="outline"
                >
                  인증코드확인
                </Button>
              </div>
              {(errors.verificationCode || codeError) && (
                <p
                  className={`text-sm ${codeError === 'success' ? 'text-success-600' : 'text-danger-500'}`}
                >
                  {errors.verificationCode?.message ||
                    (codeError === 'success'
                      ? '이메일 인증이 완료되었습니다.'
                      : codeError)}
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
          </form>
        </div>
      </div>
      {showSuccessModal && <SuccessVerification onClose={handleFinalClose} />}
    </div>
  )
}
