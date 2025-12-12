import StepIndicator from '@/components/find/StepIndicator'
import { FINDTYPE } from '@/types/findAccount'

function FindEmailPage() {
  return (
    <StepIndicator
      title={'이메일 찾기'}
      subTitle={'가입 시 입력한 정보로 이메일을 찾을 수 있습니다.'}
      type={FINDTYPE.FIND_EMAIL}
    />
  )
}

export default FindEmailPage
