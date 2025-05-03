import React from 'react';
import PlusIcon from '../assets/icons/PlusIcon';

export default function AddThread() {
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
              />
            </label>
            <label className="floating-label mt-3">
              <span>Kategori</span>
              <input
                type="text"
                placeholder="Kategori"
                className="input input-md input-primary w-full"
              />
            </label>
            <textarea
              className="textarea textarea-primary mt-3 w-full"
              placeholder="Tulis pesan disini"
            ></textarea>
            <button type="submit" className="btn btn-primary mt-3 w-full">
              {/* <span className="loading loading-spinner"></span> */}
              <span className="text-sm">Buat</span>
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
