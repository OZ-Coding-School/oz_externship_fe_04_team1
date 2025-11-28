function EditPassWord() {
  return (
    <div className="mx-8 border-t-2 border-solid border-gray-200 py-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-gray-900">비밀번호</span>
          <span className="text-sm text-gray-600">
            보안을 위해 정기적으로 비밀번호를 변경해주세요
          </span>
        </div>
        <button className="text-basic-white cursor-pointer rounded-lg bg-gray-500 px-6 py-2">
          {/* 버튼 클릭하면 비밀번호 변경 모달 열리게 구현해야함 */}
          비밀번호 변경
        </button>
      </div>
    </div>
  )
}
export default EditPassWord
