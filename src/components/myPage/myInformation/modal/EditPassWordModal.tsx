import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { useForm } from 'react-hook-form'
import type { EditPassword } from '@/types/editPassword'
import { useEditPassword } from '@/hooks/quries/editPassword'
import { showToast } from '@/components/common/toast/Toast'
interface EditPassWordModalProps {
  onClose: () => void
}
function EditPassWordModal({ onClose }: EditPassWordModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EditPassword>({
    mode: 'onChange',
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  })
  const { mutate: editPassword } = useEditPassword()
  const passwordRegister = {
    required: { value: true, message: '현재 비밀번호는 필수 항목입니다.' },
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  }
  // 비밀번호는 db에 저장되어있지 않아서 토스트로 맞는지 안맞는지 변경하기 눌렀을때 보여주어야 할것 같다.
  const newPasswordRegister = {
    required: { value: true, message: '새 비밀번호는 필수 항목입니다.' },
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  }
  const newPasswordRepeatRegister = {
    required: { value: true, message: '새 비밀번호를 다시 입력해주세요' },
    validate: (value: string) =>
      value === watch('new_password') || '새 비밀번호와 일치하지 않습니다',
  }
  const onSubmit = (data: EditPassword) => {
    editPassword(data, {
      onSuccess: () => {
        showToast.success('성공', '비밀번호가 변경되었습니다')
        onClose()
      },
      onError: () => {
        showToast.error('실패', '현재 비밀번호가 일치하지 않습니다')
        // 현재 새 비밀번호가 일치하지 않는것은 버튼 비활성화로 처리를 해둔 상황 -> 그렇다면 현재 비밀번호만 처리하면 되지 않을까 하는 생각
      },
    })
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
          <label htmlFor="current_password" className="flex gap-1">
            <span className="text-gray-700b text-sm">현재 비밀번호</span>
            <span className="text-danger-500 text-sm">*</span>
          </label>
          <Input
            placeholder="현재 비밀번호를 입력해주세요"
            type="password"
            id="current_password"
            {...register('current_password', passwordRegister)}
          />
          {errors.current_password && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.current_password.message}
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
        <label htmlFor="confirm_password" className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-gray-700b text-sm">새 비밀번호 확인</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <Input
            id="confirm_password"
            type="password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            {...register('confirm_password', newPasswordRepeatRegister)}
          />
          {errors.confirm_password && (
            <p className="text-danger-500 pl-1 text-xs">
              {errors.confirm_password.message}
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
        <Button
          type="submit"
          className="cursor-pointer"
          variant={isValid ? 'primary' : 'secondary'}
          disabled={!isValid}
        >
          변경하기
        </Button>
      </div>
    </form>
  )
}
export default EditPassWordModal
