import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useForm } from 'react-hook-form'
import type { EditPassword } from '@/types/editPassword'
interface EditPassWordModalProps {
  onClose: () => void
}
function EditPassWordModal({ onClose }: EditPassWordModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditPassword>({ mode: 'onBlur' })
  const onSubmit = (data: EditPassword) => {
    console.log(data)
  }
  const passwordRegister = {
    require: { value: true, message: '현재 비밀번호는 필수 항목입니다.' },
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  }
  // 비밀번호는 db에 저장되어있지 않아서 토스트로 맞는지 안맞는지 변경하기 눌렀을때 보여주어야 할것 같다.
  const newPasswordRegister = {
    require: { value: true, message: '새 비밀번호는 필수 항목입니다.' },
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  }
  const newPasswordRepeatRegister = {
    require: { value: true, message: '새 비밀번호를 다시 입력해주세요' },
    validate: (value: string) =>
      value === watch('new_password') || '새 비밀번호와 일치하지 않습니다',
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-basic-white w-[448px] flex-col gap-6 rounded-xl border pb-8"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b-2 border-gray-200 px-6 py-8">
        <span className="text-lg font-semibold text-gray-900">
          비밀번호 변경
        </span>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 폼 */}
      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex gap-1">
            <span className="text-gray-700b text-sm">현재 비밀번호</span>
            <span className="text-danger-500 text-sm">*</span>
          </label>
          <Input
            placeholder="현재 비밀번호를 입력해주세요"
            type="password"
            id="password"
            {...register('password', passwordRegister)}
          />
          {errors.password && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.password.message}
            </p>
          )}
        </div>
        <label htmlFor="new_password" className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-gray-700b text-sm">새 비밀번호</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <Input
            id="new_password"
            placeholder="새 비밀번호를 입력해주세요(8자 이상)"
            type="password"
            {...register('new_password', newPasswordRegister)}
          />
          {errors.new_password && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.new_password.message}
            </p>
          )}
        </label>
        <label htmlFor="repeat_new_password" className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-gray-700b text-sm">새 비밀번호 확인</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <Input
            id="repeat_new_password"
            type="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            {...register('repeat_new_password', newPasswordRepeatRegister)}
          />
          {errors.repeat_new_password && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.repeat_new_password.message}
            </p>
          )}
        </label>
      </div>
      {/* 버튼 */}
      <div className="mt-6 flex justify-end gap-3 px-6">
        <Button
          variant="outline"
          type="button"
          onClick={onClose}
          className="cursor-pointer"
        >
          취소
        </Button>
        <Button type="submit" className="cursor-pointer">
          변경하기
        </Button>
      </div>
    </form>
  )
}
export default EditPassWordModal
