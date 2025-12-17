import type { TimerRefProps } from '@/components/common/timer/Timer'
import { showToast } from '@/components/common/toast/Toast'
import FindAccountLayout from '@/components/findAccount/common/FindAccountLayout'
import PasswordAuthStep from '@/components/findAccount/findPassword/PasswordAuthStep'
import PasswordCompleteStep from '@/components/findAccount/findPassword/PasswordComplete'
import PasswordVerifyStep from '@/components/findAccount/findPassword/PasswordVerifyStep'
import { ROUTE_PATHS } from '@/constant/route'
import {
  usePasswordResetWithEmail,
  useResetPassword,
  useVerifyPasswordResetCode,
} from '@/hooks/quries/findAccount/findPassword'
import {
  StepIndicatorType,
  type FindPasswordFormData,
  type ReqVerifyEmailCode,
  type ReqResetPassword,
  type ReqVerifyWithEmail,
} from '@/types/findAccount'
import { getErrorDetail } from '@/utils/getErrorDetail'
import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function FindPasswordPage() {
  const [currentStep, setCurrentStep] = useState(StepIndicatorType.AUTH)
  const methods = useForm<FindPasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      password: '',
      password_confirm: '',
    },
  })
  const navigate = useNavigate()
  const timerRef = useRef<TimerRefProps>(null)

  const { mutate: passwordResetWithEmail } = usePasswordResetWithEmail()
  const { mutate: verifyPasswordResetCode } = useVerifyPasswordResetCode()
  const { mutate: resetPassword } = useResetPassword()

  // 이메일 서버에 전달
  const handleVerifyWithEmail = (data: ReqVerifyWithEmail) => {
    passwordResetWithEmail(data, {
      onSuccess: () => {
        showToast.success('인증번호', '발송 완료')
        if (currentStep === StepIndicatorType.VERIFY) {
          // 재전송: 타이머만 재시작
          timerRef.current?.start()
        } else {
          setCurrentStep(StepIndicatorType.VERIFY)
        }
        setCurrentStep(StepIndicatorType.VERIFY)
      },
      onError: (error) => {
        showToast.error(
          getErrorDetail(error, '사용자 정보 확인에 실패했습니다.'),
          ''
        )
        setCurrentStep(StepIndicatorType.AUTH)
      },
    })
  }

  // 이메일과 인증 코드를 서버에 전달
  const handleVerifyCode = (data: ReqVerifyEmailCode) => {
    verifyPasswordResetCode(data, {
      onSuccess: () => {
        showToast.success('이메일 인증', '성공')
        setCurrentStep(StepIndicatorType.COMPLETE)
      },
      onError: (error) => {
        showToast.error(getErrorDetail(error, '인증에 실패했습니다.'), '')
        setCurrentStep(StepIndicatorType.VERIFY)
      },
    })
  }

  // 이메일과 새 비밀번호를 서버에 전달
  const handleResetPassword = (data: ReqResetPassword) => {
    resetPassword(data, {
      onSuccess: () => {
        showToast.success('비밀번호 변경', '성공')
        navigate(ROUTE_PATHS.LOGIN)
      },
      onError: (error) => {
        showToast.error(
          getErrorDetail(
            error,
            '비밀번호 변경에 실패했습니다. 다시 시도해주세요.'
          ),
          ''
        )
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <FindAccountLayout
        title="비밀번호 찾기"
        subTitle="가입하신 이메일을 입력하면 인증코드를 보내드립니다."
      >
        {currentStep === StepIndicatorType.AUTH && (
          <PasswordAuthStep
            onVerifyWithEmail={handleVerifyWithEmail}
            currentStep={currentStep}
          />
        )}
        {currentStep === StepIndicatorType.VERIFY && (
          <PasswordVerifyStep
            timerRef={timerRef}
            onVerifyCode={handleVerifyCode}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onVerifyWithEmail={handleVerifyWithEmail}
          />
        )}
        {currentStep === StepIndicatorType.COMPLETE && (
          <PasswordCompleteStep
            onResetPassword={handleResetPassword}
            currentStep={currentStep}
          />
        )}
      </FindAccountLayout>
    </FormProvider>
  )
}

export default FindPasswordPage
