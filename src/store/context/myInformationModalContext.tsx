import { createContext, useContext, useState, type ReactNode } from 'react'
import type { MyInformationModalVariant } from '@/types/myInformationModal'
// 기본정보 모달 상태를 다루는 context -> 내정보 수정, 휴대폰 번호 수정, 비밀번호 변경, 회원 탈퇴
type MyInformationModalContextType = {
  informationModalState: MyInformationModalVariant
  setInformationModalState: (value: MyInformationModalVariant) => void
}
const MyInformationModalContext =
  createContext<MyInformationModalContextType | null>(null)

export const MyInformationModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [informationModalState, setInformationModalState] =
    useState<MyInformationModalVariant>(null)
  // 모달처음에는 Null상태
  return (
    <MyInformationModalContext.Provider
      value={{ informationModalState, setInformationModalState }}
    >
      {children}
    </MyInformationModalContext.Provider>
  )
}

export const useMyInformationModal = () => useContext(MyInformationModalContext)
