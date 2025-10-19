import React, { useState } from 'react';
import Header from './Header';
import SecondaryHeader from './SecondaryHeader';
import Banner from './Banner';
import DealsSection from './DealsSection';
import SignInPrompt from './SignInPrompt';
import Footer from './Footer';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="bg-gray-100">
      <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SecondaryHeader />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 -mt-32 relative z-20">
          {/* Placeholder for other content if any */}
        </div>
        <div className="px-4">
          <DealsSection title="Deals picked just for you" selectedCategory={selectedCategory} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

// export default HomePage;
