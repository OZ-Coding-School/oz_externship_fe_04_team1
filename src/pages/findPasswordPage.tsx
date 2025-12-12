import StepIndicator from '@/components/find/StepIndicator'
import { FINDTYPE } from '@/types/findAccount'

function FindPasswordPage() {
  return (
    <StepIndicator
      title={'비밀번호 찾기'}
      subTitle={'가입한 이메일로 비밀번호를 재설정할 수 있습니다.'}
      type={FINDTYPE.FIND_PASSWORD}
    />
  )
}

export default FindPasswordPage
