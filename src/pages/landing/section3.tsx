function section3() {
  const features = [
    {
      id: 1,
      image: '이미지1',
      title: '리액트 완벽 마스터 강의',
      name: '김개발',
      star: 4.8,
      price: '59,000원',
    },
    {
      id: 2,
      image: '이미지2',
      title: '파이썬 데이터 사이언스',
      name: '이데이터',
      star: 4.9,
      price: '99,000원',
    },
    {
      id: 3,
      image: '이미지3',
      title: 'AWS 클라우드 아키텍처',
      name: '한클라우드',
      star: 4.8,
      price: '129,000원',
    },
  ]

  return (
    <section className="flex min-h-[500px] w-full justify-center px-20 py-16 sm:min-h-[615px]">
      <div className="flex w-full max-w-[1440px] flex-col">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">인기 강의</h2>
            <p className="text-1xl mb-8 text-gray-600">
              지금 가장 많은 사람들이 수강하는 강의들
            </p>
          </div>
          <button className="text-primary-600 mb-8 cursor-pointer text-sm font-medium hover:underline">
            모든 강의 보기 →
          </button>
        </div>

        <div className="flex w-full flex-col gap-6 sm:flex-row">
          {features.map((features) => (
            <div
              key={features.id}
              className="flex-1 items-center rounded-[12px] border-[1px] border-gray-200"
            >
              <div className="h-[217px]">{features.image}</div>
              <div className="p-5">
                <p className="mb-2 flex-1 text-[18px] font-semibold">
                  {features.title}
                </p>
                <p className="mb-3 font-light text-gray-600">{features.name}</p>
                <p className="mb-3 text-gray-600">{features.star}</p>
                <p className="text-[18px] font-bold">{features.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default section3
