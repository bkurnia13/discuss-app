import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import DiscussItemHeader from './DiscussItemHeader';
import DiscussItemBody from './DiscussItemBody';
import DiscussItemFooter from './DiscussItemFooter';
import AddComment from './AddComment';
import CommentItem from './CommentItem';
import DiscussItemSkeleton from './DiscussItemSkeleton';
import NotFoundPage from '../pages/NotFoundPage';

export default function DiscussDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const authUser = useSelector((states) => states.authUser);
  const threadDetail = useSelector((states) => states.threadDetail);
  const isLoading = useSelector((states) => states.isLoading);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (isLoading.skeleton) {
    return (
      <div className="w-full lg:w-2/3 mt-6 mx-auto">
        <DiscussItemSkeleton />
      </div>
    );
  }

  if (!threadDetail) {
    return <NotFoundPage />;
  }

  return (
    <div className="card w-full lg:w-2/3 bg-base-200 card-md shadow-md mt-6 mb-32 mx-auto">
      <div className="card-body p-0 gap-0">
        <DiscussItemHeader {...threadDetail.owner} createdAt={threadDetail.createdAt} />
        <DiscussItemBody {...threadDetail} />
        <DiscussItemFooter
          {...threadDetail}
          authUser={authUser}
          totalComments={threadDetail.comments.length}
        />

        {authUser ? (
          <AddComment />
        ) : (
          <p className="text-center text-sm border-y border-base-300 py-4">
            <span>Silakan </span>
            <Link to="/login" className="link link-primary no-underline hover:underline">
              Login
            </Link>
            <span> untuk memberi komentar.</span>
          </p>
        )}

        <div className="px-6 py-4">
          <span className="font-semibold text-sm">{`Komentar (${threadDetail.comments.length})`}</span>
          {threadDetail.comments.map((comment) => (
            <CommentItem key={comment.id} authUser={authUser} {...comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
