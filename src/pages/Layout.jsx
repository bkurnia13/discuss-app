import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'sonner';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="px-3 sm:px-6 md:px-12 lg:px-24">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" expand richColors closeButton />
    </>
  );
}
