import { ReviewType } from '../types';

export const reviewsData: ReviewType[] = [
  {
    id: '1',
    user: {
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/5.jpg',
    },
    rating: 4,
    comment:
      'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    date: '2023-09-09T09:23:20.316Z',
  },
  {
    id: '2',
    user: {
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 3,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2023-10-09T09:23:20.316Z',
  }
];
