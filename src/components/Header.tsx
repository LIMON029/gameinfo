import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-2 sm:px-4 py-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🌈 Heartopia 도감
        </h1>
      </div>
    </header>
  );
};

export default Header;