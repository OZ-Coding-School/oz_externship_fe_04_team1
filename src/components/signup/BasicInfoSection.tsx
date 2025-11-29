import { useState } from 'react'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'

function BasicInfoSection() {
  const [nickname, setNickname] = useState('') // 버튼 스타일 용으로 임시 사용
  const [gender, setGender] = useState<'M' | 'F' | null>(null)

  return (
    <div className="flex flex-col gap-11">
      {/* 이름 */}
      <FormField htmlFor="name" require label="이름">
        <Input
          id="name"
          className="h-12"
          placeholder="이름을 입력해주세요"
          required
        />
      </FormField>

      {/* 닉네임 */}
      <FormField htmlFor="nickname" require label="닉네임">
        <div className="flex justify-center gap-3">
          <Input
            className="h-12 flex-1"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            required
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
            }}
          />
          <Button
            disabled={!nickname}
            className={`w-[112px] text-base ${nickname ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
          >
            중복 확인
          </Button>
        </div>
      </FormField>

      {/* 생년월일 */}
      <FormField htmlFor="birth" label="생년월일" require>
        <Input
          className="h-12"
          id="birth"
          placeholder="8자리 입력해주세요 (ex.20000101)"
          required
        />
      </FormField>

      {/* 성별 */}
      <FormField htmlFor="gender" label="성별" require>
        <div className="flex gap-4">
          <button
            type="button"
            className={`rounded-full ${gender === 'M' ? 'gender-click-color' : 'before-gender-click-color'}`}
            onClick={() => setGender('M')}
          >
            남
          </button>
          <button
            type="button"
            className={`rounded-full ${gender === 'F' ? 'gender-click-color' : 'before-gender-click-color'}`}
            onClick={() => setGender('F')}
          >
            여
          </button>
        </div>
      </FormField>
    </div>
  )
}

export default BasicInfoSection
