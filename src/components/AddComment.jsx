import React from 'react';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddComment } from '../states/threadDetail/action';

export default function AddComment() {
  const dispatch = useDispatch();
  const threadDetail = useSelector((states) => states.threadDetail);
  const isLoading = useSelector((states) => states.isLoading);

  const [content, onContentChange, setContent] = useInput('');

  const onAddComment = (content) => {
    const threadId = threadDetail.id;
    dispatch(asyncAddComment({ threadId, content }));
    setContent('');
  };

  return (
    <div className="px-6 py-4 border-y border-base-300">
      <form>
        <textarea
          className="textarea textarea-primary textarea-md w-full"
          placeholder="Beri komentar"
          value={content}
          onChange={onContentChange}
          disabled={isLoading.button}
        ></textarea>
        <button
          type="button"
          className="btn btn-primary w-full mt-3"
          disabled={isLoading.button}
          onClick={() => onAddComment(content)}
        >
          {isLoading.button ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span className="text-sm">Kirim</span>
          )}
        </button>
      </form>
    </div>
  );
}
