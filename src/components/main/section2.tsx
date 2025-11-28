import book from '@/assets/images/book.svg'
import study from '@/assets/images/study.svg'
import professional from '@/assets/images/professional.svg'
function section2() {
  const features = [
    {
      id: 1,
      icon: book,
      title: '다양한 IT 강의',
      description:
        '프론트엔드부터 백엔드, 데이터사이언스까지 모든 분야의 전문강의를 제공합니다.',
    },
    {
      id: 2,
      icon: study,
      title: '스터디 그룹',
      description:
        '같은 목표를 가진 사람들과 함께 학습하며 서로 동기부여하고 성장할 수 있습니다.',
    },
    {
      id: 3,
      icon: professional,
      title: '전문 강사진',
      description:
        '실무 경험이 풍부한 전문가들이 직접 제작한 고품질의 강의 콘텐츠를 만나보세요.',
    },
  ]

  return (
    <section className="flex min-h-[400px] w-full justify-center px-20 py-16 sm:min-h-[472px]">
      <div className="flex w-full max-w-[1440px] flex-col">
        <div className="flex flex-col text-center sm:items-center sm:justify-center">
          <h2 className="mb-4 text-3xl font-bold">
            왜 StudyHub를 선택해야 할까요?
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            체계적인 학습과 실무경험을 동시에 얻을 수 있는 최적의 플랫폼입니다.
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 sm:flex-row">
          {features.map((features) => (
            <div
              key={features.id}
              className="flex flex-1 flex-col items-center p-6 text-center"
            >
              <img src={features.icon} alt={features.title} className="mb-4" />
              <p className="mb-3 text-xl font-bold">{features.title}</p>
              <p className="text-base text-gray-600">{features.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default section2
