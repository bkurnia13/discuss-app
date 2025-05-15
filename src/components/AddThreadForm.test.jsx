/**
 * AddThread component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call add thread function when create button is clicked
 */

import React from 'react';
import { setupStore } from '../states/index';
import { Provider } from 'react-redux';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupServer } from 'msw/node';
import handlers from '../utils/fakeApi';
import { fakeCreateThreadResponse } from '../utils/fakeApi';
import * as threadsAction from '../states/threads/action';
import AddThreadForm from './AddThreadForm';

expect.extend(matchers);

const initialState = {
  isLoading: {
    button: false,
    skleton: false,
  },
};

const store = setupStore(initialState);
const title = 'Thread Pertama';
const category = 'General';
const body = 'Ini adalah thread pertama';

describe('AddThread component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <AddThreadForm />
      </Provider>
    );

    const titleInput = await screen.getByPlaceholderText('Judul');

    // action
    await userEvent.type(titleInput, title);

    // assert
    expect(titleInput).toHaveValue(title);
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <AddThreadForm />
      </Provider>
    );

    const categoryInput = await screen.getByPlaceholderText('Kategori');

    // action
    await userEvent.type(categoryInput, category);

    // assert
    expect(categoryInput).toHaveValue(category);
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(
      <Provider store={store}>
        <AddThreadForm />
      </Provider>
    );

    const bodyInput = await screen.getByPlaceholderText(/\bpesan\b/i);

    // action
    await userEvent.type(bodyInput, body);

    // assert
    expect(bodyInput).toHaveValue(body);
  });

  it('should call add thread function when create button is clicked', async () => {
    // setup mock server
    const server = setupServer(...handlers);
    server.listen();

    // arrange
    const asyncAddThreadSpy = vi.spyOn(threadsAction, 'asyncAddThread');

    render(
      <Provider store={store}>
        <AddThreadForm />
      </Provider>
    );

    const titleInput = await screen.getByPlaceholderText('Judul');
    await userEvent.type(titleInput, title);
    const categoryInput = await screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, category);
    const bodyInput = await screen.getByPlaceholderText(/\bpesan\b/i);
    await userEvent.type(bodyInput, body);
    const createButton = await screen.getByRole('button', { name: 'Buat' });

    // action
    await userEvent.click(createButton);

    // assert
    expect(asyncAddThreadSpy).toHaveBeenCalledWith({ title, category, body });
    expect(store.getState().threads[0]).toEqual(fakeCreateThreadResponse.data.thread);

    // end server
    server.resetHandlers();
    server.close();
    asyncAddThreadSpy.mockRestore();
  });
});
