import { Link, useNavigate } from 'react-router'
import Button from '../common/Button'
import Input from '../common/Input'
import { ROUTE_PATHS } from '@/constant/route'
import { useForm, type UseFormSetError } from 'react-hook-form'
import type { ReqLoginFormData } from '@/types/login'
import { useState } from 'react'
import AccountRecoveryStep from './accountRecovery/accountRecoveryStep'
import { showToast } from '../common/toast/Toast'
import { useLoginWithEmail } from '@/hooks/quries/auth/useLogin'
import LoginStateStore from '@/store/loginStateStore'

function LoginForm() {
  const [isAccountRecoveryOpen, setIsAccountRecoveryOpen] = useState(false)
  const navigate = useNavigate()

  const { mutate: loginWithEmail, isPending: loggingIn } = useLoginWithEmail()
  const setLoginState = LoginStateStore((state) => state.setLoginState)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm<ReqLoginFormData>({
    mode: 'onSubmit',
  })

  const emailRegister = register('email', {
    required: true,
    onChange: () => {
      if (errors.root) {
        clearErrors('root')
      }
    },
  })

  const passwordRegister = register('password', {
    required: true,
    onChange: () => {
      if (errors.root) {
        clearErrors('root')
      }
    },
  })

  const handleLogin = (
    data: ReqLoginFormData,
    setError: UseFormSetError<ReqLoginFormData>
  ) => {
    loginWithEmail(data, {
      onSuccess: () => {
        setLoginState('USER')
        showToast.success('로그인', '성공')
        navigate(ROUTE_PATHS.HOME)
      },
      onError: (error) => {
        // 임시로 409를 status로 생각
        if (error.statusCode === 409) {
          setIsAccountRecoveryOpen(true)
          return
        }
        const errorMessage = error.error_detail || '로그인에 실패했습니다.'
        setError('root', { message: errorMessage })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit((data) => handleLogin(data, setError))}>
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="login-email">
            <Input
              {...emailRegister}
              id="login-email"
              className="h-12"
              placeholder="아이디(example@gmail.com)"
              autoComplete="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="login-password">
            <Input
              {...passwordRegister}
              className="h-12"
              id="login-password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="current-password"
            />
          </label>
          {errors.root && (
            <p className="mt-1 text-sm text-red-600">{errors.root.message}</p>
          )}
        </div>
      </div>
      <div className="text-primary-600 mt-1 flex items-center gap-2 text-sm font-normal">
        <Link to={ROUTE_PATHS.FIND_EMAIL}>아이디 찾기</Link>
        <span className="text-xl">|</span>
        <Link to={ROUTE_PATHS.FIND_PASSWORD}>비밀번호 찾기</Link>
      </div>
      <Button
        type="submit"
        variant="secondary"
        className="mt-2.5 h-[52px] w-full bg-gray-200 hover:bg-gray-300"
        disabled={!isValid || loggingIn}
      >
        {loggingIn ? '로그인 중...' : '일반회원 로그인'}
      </Button>
      <AccountRecoveryStep
        isOpen={isAccountRecoveryOpen}
        onClose={() => setIsAccountRecoveryOpen(false)}
      />
    </form>
  )
}

export default LoginForm
