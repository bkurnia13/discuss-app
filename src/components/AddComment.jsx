import React from 'react';

export default function AddComment() {
  return (
    <div className="px-6 py-4 border-y border-base-300">
      <form>
        <textarea
          className="textarea textarea-primary textarea-md w-full"
          placeholder="Beri komentar"
        ></textarea>
        <button type="submit" className="btn btn-primary w-full mt-3" disabled>
          <span className="loading loading-spinner"></span>
          {/* Kirim */}
        </button>
      </form>
    </div>
  );
}
