function Guest() {
  return (
    <div className="ml-auto flex items-center">
      <div className="flex items-center gap-[32px] text-[18px] text-[#374151]">
        <div className="hidden md:flex md:gap-[32px]">
          <span className="cursor-pointer hover:text-[#CA8A04]">강의 목록</span>
          {/* 클릭하면 강의목록 페이지 렌더링 */}
          <span className="cursor-pointer hover:text-[#CA8A04]">
            스터디 그룹
          </span>
          {/* 스터디 그룹은 로그인 안되어있으면 로그인 페이지 알림 ui */}
          <span className="cursor-pointer hover:text-[#CA8A04]">구인 공고</span>
          {/* 클릭하면 구인공고 페이지 렌더링 */}
        </div>
        <span className="text-[16px] hover:text-[#CA8A04] md:cursor-pointer md:text-[18px]">
          로그인
        </span>
        {/* 클릭하면 로그인 페이지 렌더링 */}
      </div>
      <button className="ml-[16px] h-[40px] w-[90.89px] rounded-[8px] bg-[#EAB308] text-[16px] text-[#FFFFFF] md:text-[18px]">
        회원가입
      </button>
      {/* 클릭하면 회원가입 페이지 렌더링 */}
    </div>
  )
}
export default Guest
