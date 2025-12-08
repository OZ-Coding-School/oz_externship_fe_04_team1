import { useEffect, useRef, useState } from 'react'

type DeleteReasonModalProps = {
  options: string[]
  defaultValue: string
  className: string
  onChange?: (value: string) => void
}

function DeleteReasonModal({
  options,
  defaultValue,
  className,
  onChange,
}: DeleteReasonModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 모달 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 선택 영역 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-9 cursor-pointer items-center justify-between rounded-lg bg-white px-4 py-2 text-sm outline-1 outline-gray-300 ${!selected ? 'text-gray-500' : ''}`}
      >
        {selected ?? defaultValue}
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
                onChange?.(option)
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

export default DeleteReasonModal
