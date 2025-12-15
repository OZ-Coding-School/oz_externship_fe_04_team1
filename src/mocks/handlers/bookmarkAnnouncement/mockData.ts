import type { BookmarkAnnouncement } from '@/types/bookmarkAnnouncement'
import vueImg from '@/assets/images/vueImg.png'
import deepLearningImg from '@/assets/images/deepLearningImg.png'
import unityImg from '@/assets/images/unityImg.png'

export const bookmarkAnnouncement: BookmarkAnnouncement = {
  next: '/api/bookmarks?cursor=abc123&page_size=6',
  previous: null,
  results: [
    {
      id: 1,
      recruitment: [
        {
          uuid: 'sdawdasdawdsdadawd',
          title: 'Vue.js 프론트엔드 개발팀 모집(초보)',
          thumbnail_img_url: vueImg,
          expected_headcount: 5,
          close_at: '2024-04-15T00:00:05.875842+09:00',
          views_count: 245,
          bookmark_count: 38,
          lecture: [
            {
              id: 1,
              title: 'Vue.js 완벽 가이드',
              instructor: '엄준식',
            },
            {
              id: 2,
              title: 'Nuxt.js 심화',
              instructor: 'Chill Guy',
            },
          ],
          tags: [
            { id: 1, name: 'Vue.js' },
            { id: 2, name: '프론트엔드' },
            { id: 3, name: '팀프로젝트' },
          ],
        },
      ],
    },
    {
      id: 2,
      recruitment: [
        {
          uuid: 'asdashjdiodefnidjasd',
          title: '딥러닝 AI 프로젝트 스터디원 모집',
          thumbnail_img_url: deepLearningImg,
          expected_headcount: 3,
          close_at: '2024-05-12T00:00:05.875842+09:00',
          views_count: 289,
          bookmark_count: 52,
          lecture: [
            {
              id: 1,
              title: '딥러닝 완벽 마스터',
              instructor: '원영적 사고',
            },
            {
              id: 2,
              title: 'TensorFlow 실전',
              instructor: '마라탕탕 후루후루',
            },
          ],
          tags: [
            { id: 1, name: '딥러닝' },
            { id: 2, name: 'AI' },
            { id: 3, name: '머신러닝' },
          ],
        },
      ],
    },
    {
      id: 3,
      recruitment: [
        {
          uuid: 'asdjiasfhasufaskdaskdas',
          title: 'Unity 게임 개발 프로젝트팀 멤버 모집',
          thumbnail_img_url: unityImg,
          expected_headcount: 5,
          close_at: '2025-02-18T00:00:05.875842+09:00',
          views_count: 412,
          bookmark_count: 105,
          lecture: [
            {
              id: 1,
              title: 'Unity 게임 개발 마스터',
              instructor: '매끈매끈하다 매끈매끈한',
            },
            {
              id: 2,
              title: 'C# 게임 프로그래밍',
              instructor: '푱푱하다 푱푱한',
            },
          ],
          tags: [
            { id: 1, name: 'Unity' },
            { id: 2, name: 'C#' },
            { id: 3, name: '게임개발' },
            { id: 4, name: '3D게임' },
          ],
        },
      ],
    },
    {
      id: 4,
      recruitment: [
        {
          uuid: 'sdawdasdawdsdadawd',
          title: 'Vue.js 프론트엔드 개발팀 모집',
          thumbnail_img_url: vueImg,
          expected_headcount: 5,
          close_at: '2024-04-15T00:00:05.875842+09:00',
          views_count: 245,
          bookmark_count: 38,
          lecture: [
            {
              id: 1,
              title: 'Vue.js 완벽 가이드',
              instructor: '엄준식',
            },
            {
              id: 2,
              title: 'Nuxt.js 심화',
              instructor: 'Chill Guy',
            },
          ],
          tags: [
            { id: 1, name: 'Vue.js' },
            { id: 2, name: '프론트엔드' },
            { id: 3, name: '팀프로젝트' },
          ],
        },
      ],
    },
    {
      id: 5,
      recruitment: [
        {
          uuid: 'asdashjdiodefnidjasd',
          title: '딥러닝 AI 프로젝트 스터디원 모집',
          thumbnail_img_url: deepLearningImg,
          expected_headcount: 3,
          close_at: '2024-05-12T00:00:05.875842+09:00',
          views_count: 289,
          bookmark_count: 52,
          lecture: [
            {
              id: 1,
              title: '딥러닝 완벽 마스터',
              instructor: '원영적 사고',
            },
            {
              id: 2,
              title: 'TensorFlow 실전',
              instructor: '마라탕탕 후루후루',
            },
          ],
          tags: [
            { id: 1, name: '딥러닝' },
            { id: 2, name: 'AI' },
            { id: 3, name: '머신러닝' },
          ],
        },
      ],
    },
    {
      id: 6,
      recruitment: [
        {
          uuid: 'asdjiasfhasufaskdaskdas',
          title: 'Unity 게임 개발 프로젝트팀 멤버 모집',
          thumbnail_img_url: unityImg,
          expected_headcount: 5,
          close_at: '2025-02-18T00:00:05.875842+09:00',
          views_count: 412,
          bookmark_count: 105,
          lecture: [
            {
              id: 1,
              title: 'Unity 게임 개발 마스터',
              instructor: '매끈매끈하다 매끈매끈한',
            },
            {
              id: 2,
              title: 'C# 게임 프로그래밍',
              instructor: '푱푱하다 푱푱한',
            },
          ],
          tags: [
            { id: 1, name: 'Unity' },
            { id: 2, name: 'C#' },
            { id: 3, name: '게임개발' },
            { id: 4, name: '3D게임' },
          ],
        },
      ],
    },
  ],
}
