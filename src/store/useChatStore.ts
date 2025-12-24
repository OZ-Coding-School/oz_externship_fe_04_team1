import { create } from 'zustand'

type ChatView = 'list' | 'room'

interface ChatState {
  isOpen: boolean
  currentView: ChatView
  selectedGroupId: number | null
  toggleOpen: () => void
  openList: () => void
  openGroup: (groupId: number) => void
  close: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  currentView: 'list',
  selectedGroupId: null,

  // 채팅 위젯 열기/닫기
  toggleOpen: () =>
    set((state) =>
      state.isOpen
        ? { isOpen: false, currentView: 'list', selectedGroupId: null }
        : { isOpen: true, currentView: 'list', selectedGroupId: null }
    ),

  // 채팅 리스트 화면 (채팅창에서 뒤로가기 클릭 시)
  openList: () =>
    set({
      currentView: 'list',
      selectedGroupId: null,
    }),

  // 특정 채팅창으로 이동
  openGroup: (groupId) =>
    set({
      isOpen: true,
      currentView: 'room',
      selectedGroupId: groupId,
    }),

  // 닫기
  close: () =>
    set({
      isOpen: false,
      currentView: 'list',
      selectedGroupId: null,
    }),
}))
