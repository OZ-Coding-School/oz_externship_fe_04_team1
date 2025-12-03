import { useFormContext, useWatch } from 'react-hook-form'
import Input from '../common/Input'
import FormField from './FormField'
import type { SignupFormValues } from '@/types/signup'

function PasswordSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupFormValues>()
  const password = useWatch({ name: 'password' })

  const passwrodRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  })

  const passwordConfirmRegister = register('password_confirm', {
    required: '비밀번호를 다시 입력해주세요.',
    validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
  })

  return (
    <div>
      <FormField
        htmlFor="password"
        require
        label="비밀번호"
        info="8~15자의 영문 대소문자, 숫자, 특수문자 포함"
        errorMsg={errors.password?.message}
      >
        <Input
          {...passwrodRegister}
          id="password"
          type="password"
          autoComplete="new-password"
          className="h-12"
          error={!!errors.password}
          placeholder="비밀번호를 입력해주세요"
        />
      </FormField>
      <FormField
        htmlFor="password_confirm"
        className="gap-4"
        errorMsg={errors.password_confirm?.message}
      >
        <Input
          {...passwordConfirmRegister}
          id="password_confirm"
          type="password"
          autoComplete="new-password"
          className="h-12"
          error={!!errors.password_confirm}
          placeholder="비밀번호를 다시 입력해주세요"
        />
      </FormField>
    </div>
  )
}
export default PasswordSection
