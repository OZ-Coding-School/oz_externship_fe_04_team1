import type { ReactNode } from 'react'
import noImage from '@/assets/images/noImage.png'
type BaseBookmarkCardProps = {
  title: string
  thumbnail_img_url?: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

function BaseBookmarkCard({
  title,
  thumbnail_img_url,
  className,
  children,
  onClick,
}: BaseBookmarkCardProps) {
  return (
    <div
      className={`${className} flex h-fit w-full max-w-[318px] gap-3 rounded-xl border-2 border-gray-200 p-[13px] sm:max-w-[838px] sm:items-center sm:gap-6 sm:p-[25px]`}
      onClick={onClick}
    >
      <img
        className="h-[48px] w-[64px] rounded-lg object-cover sm:h-[94px] sm:w-[160px]"
        src={thumbnail_img_url}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = noImage
          // 현재 북마크된 강의 + 지원 내역에서만 forbidden에러로 발생. -> 추후에 null로 바뀌면 해당 컴포넌트에서 null로 내려주어야함
        }}
      />
      <div className="flex flex-1 flex-col flex-wrap sm:flex-row sm:items-start">
        {children}
      </div>
    </div>
  )
}

export default BaseBookmarkCard
