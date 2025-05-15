import React from 'react';
import PlusIcon from '../assets/icons/PlusIcon';
import AddThreadForm from './AddThreadForm';

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
          <AddThreadForm />
        </div>
      </dialog>
    </div>
  );
}
