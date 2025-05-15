import { http, HttpResponse } from 'msw';

const baseUrl = 'https://forum-api.dicoding.dev/v1';

const fakeLoginResponse = {
  status: 'success',
  message: 'ok',
  data: {
    token: 'test-token',
  },
};

const fakeUserProfileResponse = {
  status: 'success',
  message: 'ok',
  data: {
    user: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};

const fakeRegisterResponse = {
  status: 'success',
  message: 'User created',
  data: {
    user: {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};

const fakeCreateThreadResponse = {
  status: 'success',
  message: 'Thread created',
  data: {
    thread: {
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
  },
};

const fakeUpVoteThreadResponse = {
  status: 'success',
  message: 'Thread upvoted',
  data: {
    vote: {
      id: 'vote-1',
      userId: 'users-1',
      threadId: 'thread-1',
      voteType: 1,
    },
  },
};

const fakeDownVoteThreadResponse = {
  status: 'success',
  message: 'Thread downvoted',
  data: {
    vote: {
      id: 'vote-1',
      userId: fakeUpVoteThreadResponse.data.vote.userId,
      threadId: fakeUpVoteThreadResponse.data.vote.threadId,
      voteType: -1,
    },
  },
};

const fakeNeutralVoteThreadResponse = {
  status: 'success',
  message: 'Thread vote neutralized',
  data: {
    vote: {
      id: 'vote-1',
      userId: fakeUpVoteThreadResponse.data.vote.userId,
      threadId: fakeUpVoteThreadResponse.data.vote.threadId,
      voteType: 0,
    },
  },
};

const handlers = [
  http.post(`${baseUrl}/login`, () => {
    return HttpResponse.json(fakeLoginResponse);
  }),
  http.get(`${baseUrl}/users/me`, () => {
    return HttpResponse.json(fakeUserProfileResponse);
  }),
  http.post(`${baseUrl}/register`, () => {
    return HttpResponse.json(fakeRegisterResponse);
  }),
  http.post(`${baseUrl}/threads`, () => {
    return HttpResponse.json(fakeCreateThreadResponse);
  }),
  http.post(`${baseUrl}/threads/${fakeUpVoteThreadResponse.data.vote.threadId}/up-vote`, () => {
    return HttpResponse.json(fakeUpVoteThreadResponse);
  }),
  http.post(`${baseUrl}/threads/${fakeDownVoteThreadResponse.data.vote.threadId}/down-vote`, () => {
    return HttpResponse.json(fakeDownVoteThreadResponse);
  }),
  http.post(
    `${baseUrl}/threads/${fakeNeutralVoteThreadResponse.data.vote.threadId}/neutral-vote`,
    () => {
      return HttpResponse.json(fakeNeutralVoteThreadResponse);
    }
  ),
];

export default handlers;
export {
  fakeLoginResponse,
  fakeUserProfileResponse,
  fakeRegisterResponse,
  fakeCreateThreadResponse,
  fakeUpVoteThreadResponse,
  fakeDownVoteThreadResponse,
  fakeNeutralVoteThreadResponse,
};
