import Search from '@/assets/search.svg'
interface NoSearchResultProps {
  searchResult: string
}
const NoSearchReult = ({ searchResult }: NoSearchResultProps) => {
  return (
    <div className="h-[382px] w-full justify-center rounded-[16px] border border-gray-200 bg-gray-50 p-[25px] text-center md:w-[854px]">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="mb-[24px]">
          <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gray-100">
            <img
              src={Search}
              alt="icon"
              className="flex h-[32px] w-[32px] items-center justify-center"
            />
          </div>
        </div>

        <p className="mb-[8px] text-[20px] font-bold text-gray-700">
          {`'${searchResult}'`} 에 대한 검색 결과가 없습니다
        </p>
      </div>
    </div>
  )
}

export default NoSearchReult
