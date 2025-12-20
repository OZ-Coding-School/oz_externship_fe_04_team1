import { ROUTE_PATHS } from '@/constant/route'
import { useNavigate } from 'react-router'
import { showToast } from '../toast/Toast'

function Guest() {
  const navigate = useNavigate()
  return (
    <div className="ml-auto flex items-center">
      <div className="flex items-center gap-8 text-base text-gray-700">
        <div className="hidden md:flex md:gap-8">
          <a
            href="https://learn.ozcoding.site/courses"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary-600 cursor-pointer"
          >
            강의 목록
          </a>
          {/* 클릭하면 강의목록 페이지 렌더링 */}
          <p
            className="hover:text-primary-600 cursor-pointer"
            onClick={() => {
              showToast.error('실패', '로그인 후 이용할 수 있는 서비스입니다')
              navigate(ROUTE_PATHS.LOGIN)
            }}
          >
            스터디 그룹
          </p>
          {/* 스터디 그룹은 로그인 안되어있으면 로그인 페이지 알림 토스트 */}
          <a
            href="https://learn.ozcoding.site/recruitments"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary-600 cursor-pointer"
          >
            구인 공고
          </a>
          {/* 클릭하면 구인공고 페이지 렌더링 */}
        </div>
        <span
          onClick={() => navigate(ROUTE_PATHS.LOGIN)}
          className="hover:text-primary-600 cursor-pointer text-base md:text-lg"
        >
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
