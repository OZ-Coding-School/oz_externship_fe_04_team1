import FindAccountLayout from '@/components/findAccount/common/FindAccountLayout'
import EmailCompleteStep from '@/components/findAccount/findEmail/EmailCompleteStep'
import EmailAuthStep from '@/components/findAccount/findEmail/EmailAuthStep'
import EmailVerifyStep from '@/components/findAccount/findEmail/EmailVerifyStep'
import {
  StepIndicatorType,
  type FindEmailFormData,
  type ReqVerifyPhoneCode,
  type ReqVerifyUserIdentity,
} from '@/types/findAccount'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  useFindEmailByPhone,
  useVerifyUserIdentity,
} from '@/hooks/quries/findAccount/findEmail'
import { showToast } from '@/components/common/toast/Toast'
import { getErrorDetail } from '@/utils/getErrorDetail'

function FindEmailPage() {
  const [currentStep, setCurrentStep] = useState(StepIndicatorType.AUTH)
  const [foundEmail, setFoundEmail] = useState<string>('')
  const methods = useForm<FindEmailFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      code: '',
    },
  })

  const { mutate: verifyUserIdentify } = useVerifyUserIdentity()
  const { mutate: findEamilByPhone } = useFindEmailByPhone()

  // 이름, 전화번호를 서버에 전달
  const handleVerifyUserIdentity = (data: ReqVerifyUserIdentity) => {
    verifyUserIdentify(data, {
      onSuccess: () => {
        showToast.success('인증번호', '발송 완료')
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

  // 인증 코드와 전화번호를 서버에 전달
  const handleVerifyCode = (data: ReqVerifyPhoneCode) => {
    findEamilByPhone(data, {
      onSuccess: (response) => {
        setFoundEmail(response.email)
        setCurrentStep(StepIndicatorType.COMPLETE)
      },
      onError: (error) => {
        showToast.error(getErrorDetail(error, '인증에 실패했습니다.'), '')
      },
    })
  }

  return (
    <FormProvider {...methods}>
      <FindAccountLayout
        title="이메일 찾기"
        subTitle="가입시 입력한 정보로 이메일을 찾을 수 있습니다."
      >
        {currentStep === StepIndicatorType.AUTH && (
          <EmailAuthStep
            currentStep={currentStep}
            onVerifyUserIdentity={handleVerifyUserIdentity}
          />
        )}
        {currentStep === StepIndicatorType.VERIFY && (
          <EmailVerifyStep
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onVerifyCode={handleVerifyCode}
            onVerifyUserIdentity={handleVerifyUserIdentity}
          />
        )}
        {currentStep === StepIndicatorType.COMPLETE && (
          <EmailCompleteStep currentStep={currentStep} email={foundEmail} />
        )}
      </FindAccountLayout>
    </FormProvider>
  )
}

export default FindEmailPage
