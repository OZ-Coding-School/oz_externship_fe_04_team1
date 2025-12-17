import Button from '@/components/common/Button'
import { showToast } from '@/components/common/toast/Toast'
import BasicInfoSection from '@/components/signup/BasicInfoSection'
import EmailVerificationSection from '@/components/signup/EmailVerificationSection'
import PasswordSection from '@/components/signup/PasswordSection'
import SmsVerificationSection from '@/components/signup/SmsVerificationSection'
import { ROUTE_PATHS } from '@/constant/route'
import {
  useCheckNickname,
  useSendEmail,
  useSendSms,
  useSubmitSignup,
  useVerifyEmailCode,
  useVerifySmsCode,
} from '@/hooks/quries/auth/useSignup'
import type {
  ApiError,
  ReqInfo,
  SignupFormValuesWithValidation,
} from '@/types/signup'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
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
      emailCode: '',
      smsVerified: null,
      smsCode: '',
      nicknameVerified: null,
    },
  })

  // 인증 상태 구독 (가입하기 버튼 활성화 조건에 사용)
  const [nicknameVerified, emailVerified, smsVerified] = methods.watch([
    'nicknameVerified',
    'emailVerified',
    'smsVerified',
  ])

  // 폼 전체 유효성
  const { isValid } = methods.formState

  // API 호출 및 로딩 상태 관리 (React Query Mutations)
  const { mutate: checkNickname, isPending: isCheckingNickname } =
    useCheckNickname()
  const { mutate: submitSignup, isPending: isSubmitPending } = useSubmitSignup()
  const { mutate: sendEmail, isPending: isSendingEmail } = useSendEmail()
  const { mutate: verifyEmailCode, isPending: isVerifyingEmail } =
    useVerifyEmailCode()
  const { mutate: sendSms, isPending: isSendingSms } = useSendSms()
  const { mutate: verifySmsCode, isPending: isVerifyingSms } =
    useVerifySmsCode()

  const navigate = useNavigate()

  // 에러 메시지
  const [nicknameError, setNicknameError] = useState<string | null>(null)
  const [emailSendError, setEmailSendError] = useState<string | null>(null)
  const [smsSendError, setSmsSendError] = useState<string | null>(null)

  // 인증번호 전송 여부
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isSmsSent, setIsSmsSent] = useState(false)

  // 닉네임 중복 확인
  const handleCheckNickname = (nickname: string) => {
    setNicknameError(null)
    checkNickname(
      { nickname },
      {
        onSuccess: () => {
          // 닉네임 사용 가능
          methods.setValue('nicknameVerified', true)
          setNicknameError(null)
        },
        // 이미 사용중인 닉네임
        onError: (error: ApiError) => {
          methods.setValue('nicknameVerified', false)
          if (error.statusCode === 409) {
            setNicknameError(error.error_detail)
          } else {
            setNicknameError('닉네임 확인 중 오류가 발생했습니다.')
          }
        },
      }
    )
  }

  // 이메일 변경 시 이메일 인증 관련 상태 리셋
  const handleEmailChange = () => {
    methods.setValue('emailVerified', null)
    methods.clearErrors('emailVerified')
    setIsEmailSent(false)
    setEmailSendError(null)
  }

  // 이메일 전송
  const handleEmailSubmit = (email: string) => {
    setEmailSendError(null)

    sendEmail(
      { email },
      {
        onSuccess: () => {
          setIsEmailSent(true)
          setEmailSendError(null)
        },
        onError: () => {
          setIsEmailSent(false)
          setEmailSendError('이메일 전송에 실패했습니다.')
        },
      }
    )
  }

  // 이메일 인증번호 확인
  const handleVerifyEmail = (email: string, code: string) => {
    verifyEmailCode(
      { email, code },
      {
        onSuccess: () => {
          methods.setValue('emailVerified', true)
          methods.clearErrors('emailVerified')
        },
        onError: () => {
          methods.setValue('emailVerified', false)
          methods.setError('emailVerified', {
            type: 'manual',
            message: '인증번호가 일치하지 않습니다',
          })
        },
      }
    )
  }

  // 휴대폰 번호 변경 시 SMS 관련 상태 리셋
  const handleSmsChange = () => {
    setIsSmsSent(false)
    setSmsSendError(null)
    methods.setValue('smsVerified', null)
    methods.clearErrors('smsVerified')
  }

  // sms 전송
  const handleSmsSubmit = (phone_number: string) => {
    setSmsSendError(null)

    sendSms(
      { phone_number },
      {
        onSuccess: () => {
          setIsSmsSent(true)
          setSmsSendError(null)
        },
        onError: () => {
          setIsSmsSent(false)
          setSmsSendError('SMS 전송에 실패했습니다.')
        },
      }
    )
  }

  // sms 인증번호 확인
  const handleVerifySms = (phone_number: string, code: string) => {
    verifySmsCode(
      { phone_number, code },
      {
        onSuccess: () => {
          methods.setValue('smsVerified', true)
          methods.clearErrors('smsVerified')
        },
        onError: () => {
          methods.setValue('smsVerified', false)
          methods.setError('smsVerified', {
            type: 'manual',
            message: '인증번호가 일치하지 않습니다',
          })
        },
      }
    )
  }

  const isSubmitDisabled =
    !isValid ||
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
      emailCode: _emailCode,
      smsCode: _smsCode,
      ...rest
    } = data
    const signupData: ReqInfo = {
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
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="my-14 flex h-fit w-[528px] flex-col gap-9 bg-white px-5 py-10"
        >
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
            nicknameError={nicknameError}
          />

          {/* 이메일 입력 */}
          <EmailVerificationSection
            onEmailSubmit={handleEmailSubmit}
            onVerifyEmail={handleVerifyEmail}
            onEmailChange={handleEmailChange}
            isSendingEmail={isSendingEmail}
            isVerifyingEmail={isVerifyingEmail}
            emailSendError={emailSendError}
            isEmailSent={isEmailSent}
          />

          {/* 휴대전화 입력 */}
          <SmsVerificationSection
            onSmsSubmit={handleSmsSubmit}
            onVerifySms={handleVerifySms}
            onSmsChange={handleSmsChange}
            isSendingSms={isSendingSms}
            isVerifyingSms={isVerifyingSms}
            smsSendError={smsSendError}
            isSmsSent={isSmsSent}
          />

          {/* 비밀번호 입력 */}
          <PasswordSection />
          <Button
            type="submit"
            className="h-[52px] w-full"
            disabled={isSubmitDisabled}
          >
            {isSubmitPending ? '가입 중...' : '가입하기'}
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
export default SignupPage
