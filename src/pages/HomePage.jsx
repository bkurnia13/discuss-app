import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { sortCategoryFromThreads } from '../states/category/action';
import PopularCategory from '../components/PopularCategory';
import DiscussItem from '../components/DiscussItem';
import DiscussItemSkeleton from '../components/DiscussItemSkeleton';
import AddThread from '../components/AddThread';

export default function HomePage() {
  const dispatch = useDispatch();
  const { isLoading, authUser, users = [], threads = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortCategoryFromThreads(threads));
  }, [threads]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  return (
    <>
      <PopularCategory />
      <div className="grid lg:grid-cols-2 lg:gap-x-4 mb-32">
        {isLoading.skeleton ? (
          <>
            <DiscussItemSkeleton key="discuss-item-skeleton-1" />
            <DiscussItemSkeleton key="discuss-item-skeleton-2" />
          </>
        ) : (
          threadList.map((thread) => <DiscussItem key={thread.id} thread={thread} />)
        )}
      </div>
      {authUser && <AddThread />}
    </>
  );
}
