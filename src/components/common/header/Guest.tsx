import { useNavigate } from 'react-router'

function Guest() {
  const navigate = useNavigate()
  return (
    <div className="ml-auto flex items-center">
      <div className="flex items-center gap-8 text-base text-gray-700">
        <div className="hidden md:flex md:gap-8">
          <a href="" className="hover:text-primary-600 cursor-pointer">
            강의 목록
          </a>
          {/* 클릭하면 강의목록 페이지 렌더링 */}
          <a href="" className="hover:text-primary-600 cursor-pointer">
            스터디 그룹
          </a>
          {/* 스터디 그룹은 로그인 안되어있으면 로그인 페이지 알림 ui */}
          <a href="" className="hover:text-primary-600 cursor-pointer">
            구인 공고
          </a>
          {/* 클릭하면 구인공고 페이지 렌더링 */}
        </div>
        <span className="hover:text-primary-600 text-base md:cursor-pointer md:text-lg">
          로그인
        </span>
        {/* 클릭하면 로그인 페이지 렌더링 */}
      </div>
      {/* 클릭하면 회원가입 페이지 렌더링 */}
      <button
        onClick={() => navigate('/signup')}
        className="bg-primary-500 text-basic-white ml-4 h-[40px] w-[90.89px] cursor-pointer rounded-lg text-base md:text-lg"
      >
        회원가입
      </button>
    </div>
  )
}
export default Guest
