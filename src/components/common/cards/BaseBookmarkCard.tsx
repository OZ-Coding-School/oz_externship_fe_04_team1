import type { ReactNode } from 'react'

type BaseBookmarkCardProps = {
  title: string
  thumbnail_img_url?: string
  children: ReactNode
}

function BaseBookmarkCard({
  title,
  thumbnail_img_url,
  children,
}: BaseBookmarkCardProps) {
  return (
    <div className="flex h-fit w-[318px] gap-3 rounded-xl border border-gray-200 p-[13px] md:w-[838px] md:max-w-[838px] md:min-w-[838px] md:items-center md:gap-6 md:p-[25px]">
      <img
        className="h-[48px] w-[64px] rounded-lg object-cover md:h-[94px] md:w-[160px]"
        src={thumbnail_img_url}
        alt={title}
      />
      <div className="flex flex-1 flex-col md:flex-row md:items-start">
        {children}
      </div>
    </div>
  )
}

export default BaseBookmarkCard
