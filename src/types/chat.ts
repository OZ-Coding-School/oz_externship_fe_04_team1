// 채팅방 목록 응답
export interface ChatRoomListResponse {
  next: string | null
  previous: string | null
  results: ChatRoomListItem[]
}

// 채팅방 목록 아이템
export interface ChatRoomListItem {
  group_id: number
  group_name: string
  unread_count: number
  last_message: ChatRoomPreview | null
}

// 마지막 메시지 요약 정보
export interface ChatRoomPreview {
  id: number
  sender: {
    id: number
    nickname: string
  }
  content: string
  is_read: boolean
  created_at: string
}

// 특정 채팅방 메시지 목록 응답
export interface ChatMessageResponse {
  next: string | null
  previous: string | null
  results: ChatMessage[]
}

// 특정 채팅방 메시지 한 개
export interface ChatMessage {
  id: number
  sender: {
    id: number
    nickname: string
    profile_img_url: string
  }
  content: string
  created_at: string
  is_read: boolean
}

export interface ChatParticipant {
  id: number
  nickname: string
  is_online?: boolean
  is_host?: boolean
}

// WebSocket 메시지 타입
// 서버 → 클라이언트
export type ChatServerMessageType =
  | 'presence'
  | 'user_join'
  | 'user_leave'
  | 'history'
  | 'message'

// 접속 직후 현재 참여자 목록
export interface PresenceMessageType {
  type: 'presence'
  members: ChatParticipant[]
}

// 누군가 입장했을 때 broadcast
export interface UserJoinMessageType {
  type: 'user_join'
  user: ChatParticipant
}

// 누군가 퇴장했을 때 broadcast
export interface UserLeaveMessageType {
  type: 'user_leave'
  user: ChatParticipant
}

// 초기 메시지 목록
export interface HistoryMessageType {
  type: 'history'
  messages: ChatMessage[]
}

// 새 메시지가 도착했을 때 broadcast
export interface NewMessageType extends ChatMessage {
  type: 'message'
}

export type ServerToClientWebSocketMsg =
  | PresenceMessageType
  | UserJoinMessageType
  | UserLeaveMessageType
  | HistoryMessageType
  | NewMessageType

// 클라이언트 → 서버
export interface ChatMessageOutgoing {
  content: string
}
