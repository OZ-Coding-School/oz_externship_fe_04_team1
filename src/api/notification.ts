import { axiosInstance } from './axios'

export const readAllNotificationsApi = () =>
  axiosInstance.post('/api/v1/notifications/read-all', undefined, {
    headers: { Authorization: 'Bearer mock-token' },
  })

export const readNotificationApi = (id: string | number) =>
  axiosInstance.post(`/api/v1/notifications/${id}/read`, undefined, {
    headers: { Authorization: 'Bearer mock-token' },
  })
