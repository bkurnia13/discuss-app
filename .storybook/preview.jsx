import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { setupStore } from '../src/states';
import '../src/App.css';
import ThemeSwitcher from '../src/components/ThemeSwitcher';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

const initialState = {
  threads: [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ],
  users: [
    {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&amp;background=random',
    },
  ],
};

export const store = setupStore(initialState);

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <div className="flex items-center mb-3">
          <span className="mr-3">Toggle Theme</span>
          <ThemeSwitcher />
        </div>
        <Story />
      </BrowserRouter>
    </Provider>
  ),
];
