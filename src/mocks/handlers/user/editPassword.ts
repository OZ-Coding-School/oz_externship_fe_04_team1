import { API_PATHS } from '@/constant/api'
import { http, HttpResponse } from 'msw'
import type { EditPassword } from '@/types/editPassword'
import { editPassword } from './mockData'
export const editPassWordHandler = [
  http.patch(API_PATHS.USER.PATCH_PASSWORD, async ({ request }) => {
    const { current_password } = (await request.json()) as EditPassword
    if (current_password !== editPassword.current_password) {
      return HttpResponse.json(
        {
          error_detail: {
            current_password: ['현재 비밀번호가 일치하지 않습니다'],
          },
        },
        { status: 400 }
      )
    }
    return HttpResponse.json({}, { status: 200 })
  }),
]
