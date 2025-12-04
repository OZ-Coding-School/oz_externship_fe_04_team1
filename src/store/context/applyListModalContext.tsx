import { createContext, useContext, useState, type ReactNode } from 'react'
import type { ApplyListModalState } from '@/types/applyListModal'
// 기본정보 모달 상태를 다루는 context -> 내정보 수정, 휴대폰 번호 수정, 비밀번호 변경, 회원 탈퇴
export type ApplyListModalContextType = {
  applyListModalState: ApplyListModalState
  setApplyListModalState: (value: ApplyListModalState) => void
  applyListId: number | null
  setApplyListId: (value: number) => void
}
const ApplyListModalContext = createContext<ApplyListModalContextType | null>(
  null
)

export const ApplyListModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [applyListModalState, setApplyListModalState] =
    useState<ApplyListModalState>('close')
  // 모달처음에는 close상태
  const [applyListId, setApplyListId] = useState<number | null>(null)
  return (
    <ApplyListModalContext.Provider
      value={{
        applyListModalState,
        setApplyListModalState,
        applyListId,
        setApplyListId,
      }}
    >
      {children}
    </ApplyListModalContext.Provider>
  )
}

export const useApplyListModal = () => useContext(ApplyListModalContext)
