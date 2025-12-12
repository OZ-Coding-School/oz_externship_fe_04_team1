import { FINDTYPE, type StepIndicatorType } from '@/types/findAccount'
import StepProgress from './StepProgress'
import { Check, KeyRound } from 'lucide-react'
import Button from '../common/Button'
import { useNavigate } from 'react-router'
import Input from '../common/Input'
import { useForm, useWatch } from 'react-hook-form'

type CompleteStepProps = {
  type: FINDTYPE
  currentStep: StepIndicatorType
}

type SetPasswordForm = {
  password: string
  password_confirm: string
}

function CompleteStep({ type, currentStep }: CompleteStepProps) {
  const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SetPasswordForm>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      password_confirm: '',
    },
  })
  const password = useWatch({ control, name: 'password', defaultValue: '' })

  const COMPLETE_CONTENT = {
    [FINDTYPE.FIND_EMAIL]: {
      icon: Check,
      title: '이메일 찾기 완료',
      description: '입력하신 정보로 가입 이메일을 찾았습니다',
    },
    [FINDTYPE.FIND_PASSWORD]: {
      icon: KeyRound,
      title: '비밀번호 재설정',
      description: '새로운 비밀번호를 입력해주세요',
    },
  }

  const isEmailFinding = type === FINDTYPE.FIND_EMAIL
  const { icon: Icon, title, description } = COMPLETE_CONTENT[type]

  const passwordRegister = register('password', {
    required: true,
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  })

  const passwordConfirmRegister = register('password_confirm', {
    required: true,
    validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
  })

  const handlePasswordReset = () => {
    // api 작업
    console.log('비밀번호 재설정 성공')
  }
  return (
    <div className="flex flex-col">
      <StepProgress type={type} currentStep={currentStep} />
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="bg-success-100 mb-3 flex size-15 items-center justify-center rounded-full">
          <Icon className="text-success-600" size={24} />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="pb-6 text-sm text-gray-600">{description}</p>
      </div>
      {isEmailFinding ? (
        <>
          <div className="mt-3 mb-20 flex justify-center rounded-lg border-1 border-gray-200 bg-gray-50 p-8">
            {/* 이메일 찾기 api 응답값으로 변경할 예정 */}
            kim***@gmail.com
          </div>
          <div className="flex h-[50px] justify-between gap-3">
            <button
              onClick={() => navigate('/login')}
              className="bg-success-500 hover:bg-success-600 w-full cursor-pointer rounded-lg text-white"
            >
              로그인하기
            </button>
            <Button
              onClick={() => navigate('/find-password')}
              variant="outline"
              className="w-full"
            >
              비밀번호 찾기
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-gray-700">
              새 비밀번호
            </label>
            <Input
              id="password"
              type="password"
              className="w-full"
              placeholder="8자 이상 입력해주세요"
              {...passwordRegister}
            />
            {errors.password?.message && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password_confirm" className="text-gray-700">
              비밀번호 확인
            </label>
            <Input
              id="password_confirm"
              type="password"
              className="w-full"
              placeholder="새 비밀번호를 다시 입력해주세요"
              {...passwordConfirmRegister}
            />
            {errors.password_confirm?.message && (
              <p className="text-sm text-red-500">
                {errors.password_confirm.message}
              </p>
            )}
          </div>
          <button
            disabled={!isValid}
            type="submit"
            onClick={handleSubmit(handlePasswordReset)}
            className="bg-success-500 hover:bg-success-600 h-12 cursor-pointer rounded-lg text-white disabled:cursor-not-allowed"
          >
            비밀번호 변경 완료
          </button>
        </div>
      )}
    </div>
  )
}

export default CompleteStep
