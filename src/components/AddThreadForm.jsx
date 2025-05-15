import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import useInput from '../hooks/useInput';

export default function AddThreadForm() {
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
  };

  return (
    <form>
      <label className="floating-label mt-3">
        <span>Judul</span>
        <input
          type="text"
          placeholder="Judul"
          className="input input-md input-primary w-full"
          value={title}
          disabled={isLoading.button}
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
          disabled={isLoading.button}
          onChange={onCategoryChange}
        />
      </label>
      <textarea
        className="textarea textarea-primary mt-3 w-full"
        placeholder="Tulis pesan disini"
        value={body}
        disabled={isLoading.button}
        onChange={onBodyChange}
      ></textarea>
      <button
        type="button"
        className="btn btn-primary mt-3 w-full"
        disabled={isLoading.button}
        onClick={() => onAddThread({ title, body, category })}
      >
        {isLoading.button ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <span className="text-sm">Buat</span>
        )}
      </button>
    </form>
  );
}
