import Input from '../common/Input'
import FormField from './FormField'

function PasswordSection() {
  return (
    <div>
      <FormField
        htmlFor="password"
        require
        label="비밀번호"
        info="8~15자의 영문 대소문자, 숫자, 특수문자 포함"
      >
        <Input
          id="name"
          type="password"
          className="h-12"
          placeholder="비밀번호를 입력해주세요"
          required
        />
      </FormField>
      <FormField htmlFor="passwordCheck" className="gap-4">
        <Input
          id="name"
          type="password"
          className="h-12"
          placeholder="비밀번호를 다시 입력해주세요"
          required
        />
      </FormField>
    </div>
  )
}
export default PasswordSection
