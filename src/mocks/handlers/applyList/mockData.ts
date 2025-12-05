import type { ApplyList } from '@/types/applyList'
import deepLearningApplyImg from '@/assets/images/deepLearningApplyImg.png'
import toongToong from '@/assets/images/toongToong.png'
export const applyList: ApplyList[] = [
  {
    id: 1,
    status: 'PENDING',
    recruitment: {
      title: '프론트엔드 DevOps 스터디',
      thumbnail_img_url: toongToong,
      expected_headcount: 5,
      close_at: '2025-10-03T00:00:05.875842+09:00',
      end_at: '2026-03-10T00:00:05.875842+09:00',
      lectures: [
        {
          id: 1,
          title: 'AWS 클라우드 아키텍처',
          instructor: '엄준식',
        },
        {
          id: 2,
          title: 'Docker & Kubernetes',
          instructor: 'Chill Guy',
        },
      ],
      tags: [
        {
          id: 1,
          name: 'DevOps',
        },
        {
          id: 2,
          name: 'AWS',
        },
        {
          id: 3,
          name: '클라우드',
        },
        {
          id: 4,
          name: '인프라',
        },
      ],
    },
    created_at: '2025-09-28T14:30:05.875842+09:00',
  },
  {
    id: 2,
    status: 'ACCEPTED',
    recruitment: {
      title: '딥러닝 AI 프로젝트 스터디원 모집',
      expected_headcount: 3,
      thumbnail_img_url: deepLearningApplyImg,
      close_at: '2024-05-12T00:00:05.875842+09:00',
      end_at: '2025-01-12T00:00:05.875842+09:00',
      lectures: [
        {
          id: 1,
          title: '딥러닝 완벽 마스터',
          instructor: '엄준식',
        },
        {
          id: 2,
          title: 'TensorFlow 실전',
          instructor: 'Chill Guy',
        },
      ],
      tags: [
        {
          id: 1,
          name: '딥러닝',
        },
        {
          id: 2,
          name: 'AI',
        },
        {
          id: 3,
          name: '머신러닝',
        },
        {
          id: 4,
          name: 'Python',
        },
      ],
    },

    created_at: '2024-04-15T11:15:05.875842+09:00',
  },
  {
    id: 3,
    status: 'REJECTED',
    recruitment: {
      title: '프론트엔드 DevOps 스터디',
      thumbnail_img_url: toongToong,
      expected_headcount: 5,
      close_at: '2025-06-02T00:00:05.875842+09:00',
      end_at: '2026-10-10T00:00:05.875842+09:00',
      lectures: [
        {
          id: 1,
          title: 'AWS 클라우드 아키텍처',
          instructor: '엄준식',
        },
        {
          id: 2,
          title: 'Docker & Kubernetes',
          instructor: 'Chill Guy',
        },
      ],
      tags: [
        {
          id: 1,
          name: 'DevOps',
        },
        {
          id: 2,
          name: 'AWS',
        },
        {
          id: 3,
          name: '클라우드',
        },
        {
          id: 4,
          name: '인프라',
        },
      ],
    },

    created_at: '2025-06-09T14:30:05.875842+09:00',
  },
  {
    id: 4,
    status: 'CANCELED',
    recruitment: {
      title: '딥러닝 AI 프로젝트 스터디원 모집',
      thumbnail_img_url: deepLearningApplyImg,
      expected_headcount: 3,
      close_at: '2025-11-02T00:00:05.875842+09:00',
      end_at: '2026-04-10T00:00:05.875842+09:00',
      lectures: [
        {
          id: 1,
          title: '딥러닝 완벽 마스터',
          instructor: '엄준식',
        },
        {
          id: 2,
          title: 'TensorFlow 실전',
          instructor: 'Chill Guy',
        },
      ],
      tags: [
        {
          id: 1,
          name: '딥러닝',
        },
        {
          id: 2,
          name: 'AI',
        },
        {
          id: 3,
          name: '머신러닝',
        },
        {
          id: 4,
          name: 'Python',
        },
      ],
    },

    created_at: '2025-10-31T11:15:05.875842+09:00',
  },
]
