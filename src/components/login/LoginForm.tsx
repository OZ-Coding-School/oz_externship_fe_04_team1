import { Link } from 'react-router'
import Button from '../common/Button'
import Input from '../common/Input'
import { ROUTE_PATHS } from '@/constant/route'
import { useForm, type UseFormSetError } from 'react-hook-form'
import type { ReqLoginFormData } from '@/types/login'

type LoginFormProps = {
  onSubmit: (
    data: ReqLoginFormData,
    setError: UseFormSetError<ReqLoginFormData>
  ) => void
  loggingIn: boolean
}

function LoginForm({ onSubmit, loggingIn }: LoginFormProps) {
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

  const handleLoginSubmit = (data: ReqLoginFormData) => {
    onSubmit(data, setError)
  }

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
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
    </form>
  )
}

export default LoginForm
