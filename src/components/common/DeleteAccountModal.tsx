import { useState } from 'react'

const options = [
  '더 이상 필요하지 않음',
  '흥미/관심 부족',
  '사용이 너무 어려움',
  '더 나은 서비스 발견',
  '개인 정보 문제',
  '서비스 품질 불량',
  '기술적 문제',
  '콘텐츠 부족',
  '기타',
]

function DeleteAccountModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="relative w-[400px]">
      {/* 선택 영역 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 cursor-pointer items-center justify-between rounded-lg bg-white px-4 py-2 text-sm outline-1 outline-gray-300"
      >
        {selected}
        <span>▾</span>
      </div>

      {/* 옵션 */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg bg-white shadow-md outline-1 outline-gray-300">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setSelected(option)
                setIsOpen(false)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DeleteAccountModal
