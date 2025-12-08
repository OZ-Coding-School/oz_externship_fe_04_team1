import Input from '@/components/common/Input'
import { SearchIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'
interface SearchProps {
  placeHolder: string
  className?: string
}
function Search({ placeHolder, className }: SearchProps) {
  const [, setSearchParams] = useSearchParams()
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute m-3 h-[16px] w-[16px] text-gray-400" />
      <Input
        placeholder={placeHolder}
        className={`w-[350px] pl-10 ${className}`}
        onChange={(e) => {
          setSearchParams({ search: e.target.value })
        }}
      />
    </div>
  )
}
export default Search
