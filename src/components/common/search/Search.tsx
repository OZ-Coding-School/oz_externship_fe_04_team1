import Input from '@/components/common/Input'
import { SearchIcon } from 'lucide-react'
interface SearchProps {
  placeHolder: string
  className?: string
}
function Search({ placeHolder, className }: SearchProps) {
  // 검색 기능을 백엔드에서 api 제공? 아니면 프론트에서 구현?
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute m-3 h-[16px] w-[16px] text-gray-400" />
      <Input
        placeholder={placeHolder}
        className={`w-[350px] pl-10 ${className}`}
      />
    </div>
  )
}
export default Search
