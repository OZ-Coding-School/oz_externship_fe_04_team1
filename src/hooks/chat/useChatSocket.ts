import type {
  ChatMessage,
  ChatMessageResponse,
  ChatParticipant,
  ServerToClientWebSocketMsg,
} from '@/types/chat'
import { useQueryClient, type InfiniteData } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

interface UseChatSocketOptions {
  groupId: number
  accessToken?: string | null
  enabled?: boolean
}

export enum SocketStatus {
  CONNECTING = 'connecting',
  OPEN = 'open',
  CLOSED = 'closed',
  ERROR = 'error',
}

export function useChatSocket({
  groupId,
  accessToken,
  enabled = true,
}: UseChatSocketOptions) {
  const queryClient = useQueryClient()
  const socketRef = useRef<WebSocket | null>(null)
  const [status, setStatus] = useState<SocketStatus>(SocketStatus.CLOSED)
  const [participants, setParticipants] = useState<ChatParticipant[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    if (!accessToken || !groupId || !enabled) return

    setStatus(SocketStatus.CONNECTING)

    const url = `wss://api.ozcoding.site/ws/chatrooms/${groupId}/?token=${accessToken}`
    const socket = new WebSocket(url)
    socketRef.current = socket

    // 연결 성공
    socket.onopen = () => {
      setStatus(SocketStatus.OPEN)
    }

    // 서버에서 메시지 수신
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as ServerToClientWebSocketMsg

      switch (data.type) {
        case 'presence':
          setParticipants(data.members)
          break

        case 'user_join':
          setParticipants((prev) => {
            const exists = prev.some(
              (participant) => participant.id === data.user.id
            )
            if (exists) return prev
            return [...prev, data.user]
          })
          break

        case 'user_leave':
          setParticipants((prev) =>
            prev.filter((participant) => participant.id !== data.user.id)
          )
          break

        case 'history':
          setMessages(data.messages)
          break

        case 'message': {
          const { type: _, ...msg } = data

          queryClient.setQueryData<InfiniteData<ChatMessageResponse>>(
            ['chatMessages', groupId],
            (prev) => {
              if (!prev?.pages?.length) return prev

              const firstPage = prev.pages[0]

              // 이미 있으면 무시
              if (
                firstPage.results.some(
                  (existingMsg) => existingMsg.id === msg.id
                )
              ) {
                return prev
              }

              const pages = [...prev.pages]
              pages[0] = {
                ...firstPage,
                results: [...firstPage.results, msg],
              }

              return { ...prev, pages }
            }
          )

          queryClient.invalidateQueries({ queryKey: ['chatRooms'] })
          break
        }
      }
    }

    // 에러 처리
    socket.onerror = () => {
      setStatus(SocketStatus.ERROR)
    }

    // 종료 처리
    socket.onclose = () => {
      setStatus(SocketStatus.CLOSED)
    }

    // cleanup 페이지 이동, 언마운트 시 소켓 닫기
    return () => {
      socket.close()
      socketRef.current = null
    }
  }, [groupId, accessToken, enabled, queryClient])

  // 클라이언트 → 서버 메시지 전송
  const sendMessage = (content: string) => {
    const socket = socketRef.current
    if (!socket || socket.readyState !== WebSocket.OPEN) return
    socket.send(JSON.stringify({ content }))
  }

  return {
    status,
    participants,
    messages,
    sendMessage,
  }
}
