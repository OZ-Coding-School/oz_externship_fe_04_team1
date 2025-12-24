import { axiosInstance } from '@/api/axios'
import { API_PATHS } from '@/constant/api'
import type { ChatMessageResponse, ChatRoomListResponse } from '@/types/chat'

// 채팅방 목록 조회
export async function fetchChatRooms(params?: {
  cursor?: string
  page_size?: number
}): Promise<ChatRoomListResponse> {
  const response = await axiosInstance.get<ChatRoomListResponse>(
    API_PATHS.CHAT.ROOMS,
    { params }
  )
  return response.data
}

// 채팅방 정보 조회
export async function fetchChatRoom(groupId: number | string) {
  const response = await axiosInstance.get(API_PATHS.CHAT.ROOM(groupId))
  return response.data
}

// 특정 채팅방의 메시지 내역
export async function fetchChatMessages(
  groupId: number | string,
  params?: { cursor?: string; page_size?: number }
): Promise<ChatMessageResponse> {
  const response = await axiosInstance.get<ChatMessageResponse>(
    API_PATHS.CHAT.MESSAGES(groupId),
    { params }
  )
  return response.data
}

// 메시지 생성
export async function createChatMessage(
  groupId: number | string,
  content: string
) {
  const response = await axiosInstance.post(
    API_PATHS.CHAT.CREATE_MESSAGE(groupId),
    { content }
  )
  return response.data
}

// 멤버별 읽음 처리
export async function updateLastReadMessage(
  groupId: number | string,
  memberId: number | string
): Promise<{ detail: string }> {
  const response = await axiosInstance.post<{ detail: string }>(
    API_PATHS.CHAT.MEMBER_READ(groupId, memberId)
  )
  return response.data
}

// 채팅방 읽음 처리 (내 읽음)
export async function markChatRoomAsRead(groupId: number | string) {
  const response = await axiosInstance.post(API_PATHS.CHAT.ROOM_READ(groupId))
  return response.data
}

// 메시지 상세 조회
export async function fetchChatMessageDetail(messageId: number | string) {
  const response = await axiosInstance.get(
    API_PATHS.CHAT.MESSAGE_DETAIL(messageId)
  )
  return response.data
}
