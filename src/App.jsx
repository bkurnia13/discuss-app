import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
// import LoginPage from './pages/LoginPage';
// import DetailPage from './pages/DetailPage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main className="mb-32 px-3 sm:px-6 md:px-12 lg:px-24">
        <HomePage />
        {/* <LoginPage /> */}
        {/* <DetailPage /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
