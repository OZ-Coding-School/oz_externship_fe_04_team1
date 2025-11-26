function Footer() {
  return (
    <div className="flex min-h-[313px] w-full bg-gray-900 px-6 py-12">
      <div className="flex w-full flex-col gap-8">
        <div className="flex max-w-[1440px] flex-col gap-8 border-b border-gray-300/50 pb-8 md:mx-auto md:flex-row">
          <div className="flex max-w-[592px] flex-col flex-wrap gap-4">
            <h2 className="text-primary-400 text-2xl font-bold">StudyHub</h2>
            <span className="text-base text-gray-300">
              IT 전문가로 성장하는 여정에 함께합니다. 최고의 강의와 스터디
              그룹으로 실무 역량을 키워보세요.
            </span>
          </div>
          <div className="flex w-[280px] flex-col gap-2 text-base text-gray-300">
            <h4 className="text-basic-white mb-2 font-semibold">서비스</h4>
            <span>강의 목록</span>
            <span>스터디 그룹</span>
            <span>구인 공고</span>
          </div>
          <div className="flex w-[280px] flex-col gap-2 text-base text-gray-300">
            <h4 className="text-basic-white mb-2 font-semibold">지원</h4>
            <span>고객센터</span>
            <span>FAQ</span>
            <span>개인정보처리방침</span>
          </div>
        </div>
        <span className="text-center text-base text-gray-400">
          © 2024 StudyHub. All rights reserved.
        </span>
      </div>
    </div>
  )
}
export default Footer
