import Button from '@/components/common/Button'
import { showToast } from '@/components/common/toast/Toast'
import BasicInfoSection from '@/components/signup/BasicInfoSection'
import EmailVerificationSection from '@/components/signup/EmailVerificationSection'
import PasswordSection from '@/components/signup/PasswordSection'
import SmsVerificationSection from '@/components/signup/SmsVerificationSection'
import { ROUTE_PATHS } from '@/constant/route'
import {
  useCheckNickname,
  useSubmitSignup,
} from '@/hooks/quries/auth/useSignup'
import type { SignupFormValuesWithValidation } from '@/types/signup'
import { FormProvider, useForm, type FieldErrors } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

function SignupPage() {
  const methods = useForm<SignupFormValuesWithValidation>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      birthday: '',
      gender: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirm: '',
      emailVerified: null,
      smsVerified: null,
      nicknameVerified: null,
    },
  })
  const [nicknameVerified, emailVerified, smsVerified] = methods.watch([
    'nicknameVerified',
    'emailVerified',
    'smsVerified',
  ])
  const { mutate: checkNickname, isPending: isCheckingNickname } =
    useCheckNickname()
  const { mutate: submitSignup, isPending: isSubmitPending } = useSubmitSignup()
  const navigate = useNavigate()

  // 제출 버튼 클릭 시 오류가 난 첫번째 인풋으로 포커스
  const onError = (errors: FieldErrors<SignupFormValuesWithValidation>) => {
    const firstErrorField = Object.keys(errors)[0]
    methods.setFocus(firstErrorField as keyof SignupFormValuesWithValidation)
  }

  // 닉네임 중복 확인
  const handleCheckNickname = (nickname: string) => {
    checkNickname(
      { nickname },
      {
        onSuccess: () => {
          // 닉네임 사용 가능
          methods.setValue('nicknameVerified', true)
        },
        // 이미 사용중인 닉네임
        onError: () => {
          methods.setValue('nicknameVerified', false)
        },
      }
    )
  }

  const isSubmitDisabled =
    nicknameVerified !== true ||
    emailVerified !== true ||
    smsVerified !== true ||
    isSubmitPending

  const handleSubmit = (data: SignupFormValuesWithValidation) => {
    const {
      password_confirm: _password_confirm,
      emailVerified: _emailVerified,
      smsVerified: _smsVerified,
      nicknameVerified: _nicknameVerified,
      ...rest
    } = data
    const signupData = {
      ...rest,
      birthday: formatBirthday(rest.birthday),
    }
    submitSignup(signupData, {
      onSuccess: () => {
        showToast.success('회원가입', '성공')
        navigate(ROUTE_PATHS.LOGIN)
      },
      onError: (error) => {
        showToast.error('회원가입 실패', error.message)
      },
    })
  }

  const formatBirthday = (birthday: string): string => {
    if (birthday.length === 8) {
      const year = birthday.slice(0, 4)
      const month = birthday.slice(4, 6)
      const day = birthday.slice(6, 8)
      return `${year}-${month}-${day}`
    }
    return birthday
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-gray-50">
      {/* 회원가입 폼 */}
      <FormProvider {...methods}>
        <div className="my-14 flex h-fit w-[528px] flex-col gap-9 bg-white px-5 py-10">
          {/* 헤더 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">회원가입</h2>
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?
              <Link className="text-primary-600 pl-3" to={'/login'}>
                로그인하기
              </Link>
            </p>
          </div>
          {/* 기본적인 정보 입력 (이름, 닉네임, 생년월일, 성별) */}
          <BasicInfoSection
            isCheckingNickname={isCheckingNickname}
            onCheckNickname={handleCheckNickname}
          />

          {/* 이메일 입력 */}
          <EmailVerificationSection />

          {/* 휴대전화 입력 */}
          <SmsVerificationSection />

          {/* 비밀번호 입력 */}
          <PasswordSection />
          <Button
            onClick={methods.handleSubmit(handleSubmit, onError)}
            className="h-[52px] w-full"
            disabled={isSubmitDisabled}
          >
            {isSubmitPending ? '가입 중...' : '가입하기'}
          </Button>
        </div>
      </FormProvider>
    </div>
  )
}
export default SignupPage
