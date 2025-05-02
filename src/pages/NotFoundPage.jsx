import React from 'react';
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: 'calc(100vh - 88px)' }}
    >
      <p className="text-8xl font-bold">404</p>
      <p className="text-lg">Halaman tidak ditemukan.</p>
      <Link to="/" className="text-base hover:underline text-primary">
        Kembali ke halaman utama.
      </Link>
    </div>
  );
}
