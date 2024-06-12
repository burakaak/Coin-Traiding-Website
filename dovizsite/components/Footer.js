import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container mx-auto py-4 text-center text-gray-500 text-sm">
        Made By Burak Bodur  <span className="text-red-500">💰</span> | {new Date().getFullYear()}
      </div>
    </footer>
  );
}
