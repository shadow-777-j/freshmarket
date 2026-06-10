import React from 'react';

// Added 'cartCount' right here inside the props curly braces
function Navbar({ activeTab, setActiveTab, cartCount = 0 }) {
  return (
    <nav className="bg-purple-900 text-yellow-300 p-6 shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo - clicking resets to home/all */}
        <div 
          onClick={() => setActiveTab('all')} 
          className="text-2xl font-extrabold tracking-widest uppercase cursor-pointer"
        >
          FreshMarket
        </div>

        {/* Links converted to State Toggles */}
        <div className="space-x-6 font-semibold">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`transition ${activeTab === 'all' ? 'text-white border-b-2 border-yellow-400' : 'hover:text-yellow-100'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('fruit')} 
            className={`transition ${activeTab === 'fruit' ? 'text-white border-b-2 border-yellow-400' : 'hover:text-yellow-100'}`}
          >
            Fruits
          </button>
          <button 
            onClick={() => setActiveTab('veg')} 
            className={`transition ${activeTab === 'veg' ? 'text-white border-b-2 border-yellow-400' : 'hover:text-yellow-100'}`}
          >
            Vegetables
          </button>
          <button 
            onClick={() => setActiveTab('grocery')} 
            className={`transition ${activeTab === 'grocery' ? 'text-white border-b-2 border-yellow-400' : 'hover:text-yellow-100'}`}
          >
            Others
          </button>
        </div>

        {/* Right Side Controls: Cart Counter + Auth */}
        <div className="flex items-center space-x-6">
          {/* Live basket counter badge layout */}
          <div className="font-bold text-base bg-purple-950 px-4 py-2 rounded-xl border border-purple-700 shadow-inner">
            🛒 Basket: <span className="text-white ml-1 font-extrabold">{cartCount}</span>
          </div>

          <button className="text-yellow-300 hover:text-white font-semibold">Login</button>
          <button className="bg-yellow-400 text-purple-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-300 transition shadow-lg">
            Register
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;