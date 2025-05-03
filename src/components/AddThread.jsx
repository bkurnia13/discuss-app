import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import useInput from '../hooks/useInput';
import PlusIcon from '../assets/icons/PlusIcon';

export default function AddThread() {
  const dispatch = useDispatch();
  const isLoading = useSelector((states) => states.isLoading);

  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setBody('');
  };

  const onAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    resetForm();
    document.getElementById('create-new-thread').close();
  };

  return (
    <div className="fixed bottom-30 sm:bottom-8 right-3 sm:right-6 md:right-12 lg:right-24">
      <button
        className="btn btn-circle btn-primary"
        onClick={() => document.getElementById('create-new-thread').showModal()}
      >
        <PlusIcon />
      </button>

      <dialog id="create-new-thread" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-center">Buat Diskusi Baru</h3>
          <form>
            <label className="floating-label mt-3">
              <span>Judul</span>
              <input
                type="text"
                placeholder="Judul"
                className="input input-md input-primary w-full"
                value={title}
                disabled={isLoading}
                onChange={onTitleChange}
              />
            </label>
            <label className="floating-label mt-3">
              <span>Kategori</span>
              <input
                type="text"
                placeholder="Kategori"
                className="input input-md input-primary w-full"
                value={category}
                disabled={isLoading}
                onChange={onCategoryChange}
              />
            </label>
            <textarea
              className="textarea textarea-primary mt-3 w-full"
              placeholder="Tulis pesan disini"
              value={body}
              disabled={isLoading}
              onChange={onBodyChange}
            ></textarea>
            <button
              type="button"
              className="btn btn-primary mt-3 w-full"
              disabled={isLoading}
              onClick={() => onAddThread({ title, body, category })}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span className="text-sm">Buat</span>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
