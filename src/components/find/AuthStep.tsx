import type { Dispatch, SetStateAction } from 'react'
import { FINDTYPE, StepIndicatorType } from '@/types/findAccount'
import StepProgress from './StepProgress'
import { UserRoundSearch, LockOpen } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'
import { Link } from 'react-router'
import { ROUTE_PATHS } from '@/constant/route'
import useFindAccountStore from '@/store/findAccountStore'

type AuthStepProps = {
  type: FINDTYPE
  currentStep: StepIndicatorType
  setStep: Dispatch<SetStateAction<StepIndicatorType>>
}

function AuthStep({ type, currentStep, setStep }: AuthStepProps) {
  const { name, phoneNumber, email, setName, setPhoneNumber, setEmail } =
    useFindAccountStore()

  const AUTH_CONTENT = {
    [FINDTYPE.FIND_EMAIL]: {
      icon: UserRoundSearch,
      title: '회원 정보 입력',
      description: '가입 시 입력한 이름과 휴대폰번호를 입력해주세요',
    },
    [FINDTYPE.FIND_PASSWORD]: {
      icon: LockOpen,
      title: '이메일 입력',
      description: '가입하신 이메일을 입력하면 인증코드를 보내드립니다',
    },
  }

  const handleNext = () => {
    setStep(StepIndicatorType.VERIFY)
  }

  const isEmailFind = type === FINDTYPE.FIND_EMAIL
  const { icon: Icon, title, description } = AUTH_CONTENT[type]

  return (
    <div className="flex flex-col">
      <StepProgress type={type} currentStep={currentStep} />
      <div className="mt-4 flex flex-col items-center justify-center">
        <Icon className="bg-primary-100 text-primary-600 mb-4 size-16 rounded-full p-5.5" />
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="pb-6 text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex flex-col pt-5">
        {isEmailFind ? (
          <>
            <label htmlFor="name" className="pb-1 text-gray-700">
              이름
            </label>
            <Input
              id="name"
              className="mb-6 w-full"
              placeholder="실명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="tel" className="pb-1 text-gray-700">
              휴대전화
            </label>
            <Input
              id="tel"
              className="mb-6 w-full"
              placeholder="01012345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </>
        ) : (
          <>
            <label htmlFor="email" className="pb-1 text-gray-700">
              이메일
            </label>
            <Input
              id="email"
              className="mb-6 w-full"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        <Button onClick={handleNext} className="h-12 cursor-pointer">
          인증 코드 전송
        </Button>
      </div>
      <Link
        className="text-primary-600 flex justify-center pt-6 text-sm"
        to={ROUTE_PATHS.LOGIN}
      >
        로그인으로 돌아가기
      </Link>
    </div>
  )
}

export default AuthStep
