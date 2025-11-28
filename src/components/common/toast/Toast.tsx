import { toast, type ToastOptions, Slide } from 'react-toastify'
import { ToastAlert } from '@/components/common/toast/ToastAlert'

const defaultOptions: ToastOptions = {
  position: 'top-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  transition: Slide,
  closeButton: false,
  icon: false,
  className: 'bg-transparent shadow-none p-0 border-none m-0',
}
//  함수호출 부분 ->나중에 showToast.success('제목','메시지') 이렇게 작성하시면 됩니다.
// 얘도 export default 가 아니므로 import { showToast } from '@/components/common/toast/Toast' 이렇게 받아오기
export const showToast = {
  success: (title: string, message: string) => {
    toast.success(
      <ToastAlert type="success" title={title} message={message} />,
      defaultOptions
    )
  },
  warning: (title: string, message: string) => {
    toast.warning(
      <ToastAlert type="warning" title={title} message={message} />,
      defaultOptions
    )
  },
  error: (title: string, message: string) => {
    toast.error(
      <ToastAlert type="error" title={title} message={message} />,
      defaultOptions
    )
  },
}
