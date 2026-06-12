import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import About from './components/About';
import FruitCard from './components/FruitCard';
import Basket from './components/Basket';
import { products } from './data';

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // AUTH STATE
  const [authView, setAuthView] = useState('all');

  // REGISTRATION / LOGIN FORM STATES
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', agreeTerms: false });
  const [loginForm, setLoginForm] = useState({ username: '', password: '', rememberMe: false });

  // Main site support contact section state
  const [formData, setFormData] = useState({ name: '', email: '', issue: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cart Handlers
  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (indexToRemove) => setCart(cart.filter((_, index) => index !== indexToRemove));
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // Category filter extractions
  const fruits = products.filter(item => item.category === 'fruit');
  const vegetables = products.filter(item => item.category === 'veg');
  const groceries = products.filter(item => item.category === 'grocery');
  const gridStyle = "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto";

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.agreeTerms) {
      alert("Please check and agree to the Terms & Conditions first! 📜");
      return;
    }
    alert(`Account created successfully for ${registerForm.name}! 🎉`);
    setAuthView('all');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome back, ${loginForm.username}! 🔓`);
    setAuthView('all');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.issue) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', issue: '' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-purple-950 pb-20 selection:bg-yellow-400 selection:text-purple-950">
      
      {/* ================= REALISTIC SHORELINE WAVE LOADER (1000186287.jpg Style) ================= */}
      <AnimatePresence>
        {showLoader && (
          <motion.div 
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-end overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Main Ocean Container - Matches the deep jade background of 1000186287.jpg */}
            <motion.div
              className="w-full relative bg-gradient-to-t from-[#0b332d] via-[#114b43] to-[#14534a]"
              initial={{ height: "0vh" }}
              animate={{ height: ["0vh", "100vh", "100vh", "0vh"] }}
              transition={{ 
                times: [0, 0.4, 0.65, 1],
                duration: 3.4, 
                ease: [0.76, 0, 0.24, 1] 
              }}
              onAnimationComplete={() => setShowLoader(false)}
            >
              
              {/* Crest Wrapper containing our layered fluid paths */}
              <div className="absolute top-0 left-0 w-full transform -translate-y-[98%] leading-[0]">
                
                {/* LAYER 1: Deep Turquoise Transition Swell */}
                <svg viewBox="0 0 1440 240" className="w-full h-auto absolute top-0 left-0 fill-[#16a34a]/20">
                  <motion.path 
                    animate={{
                      d: [
                        "M0,128C120,149,240,171,360,165.3C480,160,600,128,720,112C840,96,960,96,1080,112C1200,128,1320,160,1440,176L1440,240L0,240Z",
                        "M0,160C120,139,240,117,360,122.7C480,128,600,160,720,165.3C840,171,960,149,1080,133.3C1200,117,1320,107,1440,112L1440,240L0,240Z",
                        "M0,128C120,149,240,171,360,165.3C480,160,600,128,720,112C840,96,960,96,1080,112C1200,128,1320,160,1440,176L1440,240L0,240Z"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    fill="#0f766e"
                  />
                </svg>

                {/* LAYER 2: Vibrant Tropical Turquoise Shallows (From the image body) */}
                <svg viewBox="0 0 1440 240" className="w-full h-auto absolute top-4 left-0">
                  <motion.path 
                    animate={{
                      d: [
                        "M0,96C96,117,192,139,288,133.3C384,128,480,96,576,96C672,96,768,128,864,138.7C960,149,1056,139,1152,117C1248,96,1344,64,1440,53.3L1440,240L0,240Z",
                        "M0,64C96,96,192,128,288,122.7C384,117,480,75,576,80C672,85,768,139,864,149.3C960,160,1056,128,1152,112C1248,96,1344,96,1440,112L1440,240L0,240Z",
                        "M0,96C96,117,192,139,288,133.3C384,128,480,96,576,96C672,96,768,128,864,138.7C960,149,1056,139,1152,117C1248,96,1344,64,1440,53.3L1440,240L0,240Z"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    fill="#2dd4bf"
                  />
                </svg>

                {/* LAYER 3: Detailed White Sea Foam Border (The breaking edge in 1000186287.jpg) */}
                <svg viewBox="0 0 1440 240" className="w-full h-auto relative z-10">
                  <motion.path 
                    animate={{
                      d: [
                        "M0,80C48,96,96,112,144,106.7C192,101,240,75,288,74.7C336,75,384,101,432,112C480,123,528,117,576,101C624,85,672,59,720,58.7C768,59,816,85,864,96C912,107,960,101,1008,90.7C1056,80,1104,64,1152,64C1200,64,1248,80,1296,85.3C1344,91,1392,85,1416,82.7L1440,80L1440,240L0,240Z",
                        "M0,64C48,75,96,85,144,96C192,107,240,117,288,112C336,107,384,85,432,80C480,75,528,85,576,96C624,107,672,117,720,112C768,107,816,85,864,74.7C912,64,960,43,1008,48C1056,53,1104,85,1152,90.7C1200,96,1248,75,1296,64C1344,53,1392,53,1416,53.3L1440,53.3L1440,240L0,240Z",
                        "M0,80C48,96,96,112,144,106.7C192,101,240,75,288,74.7C336,75,384,101,432,112C480,123,528,117,576,101C624,85,672,59,720,58.7C768,59,816,85,864,96C912,107,960,101,1008,90.7C1056,80,1104,64,1152,64C1200,64,1248,80,1296,85.3C1344,91,1392,85,1416,82.7L1440,80L1440,240L0,240Z"
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                    fill="#ffffff"
                  />
                </svg>

              </div>
              
              {/* Overlay brand text using an elegant, minimalist sand color layout */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 1, 0], y: 0 }}
                  transition={{ times: [0, 0.15, 0.75, 1], duration: 2.6 }}
                  className="text-4xl md:text-5xl font-black tracking-[0.3em] text-[#fef08a] uppercase drop-shadow-[0_4px_12px_rgba(11,51,45,0.5)] font-sans"
                >
                  FreshMarket
                </motion.h1>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= HEADER NAVBAR LAYER ================= */}
      <nav className="flex items-center justify-between px-8 py-4 bg-purple-900/40 backdrop-blur-md border-b border-purple-800/30 sticky top-0 z-50">
        <div 
          className="text-xl font-black tracking-wider text-yellow-300 cursor-pointer" 
          onClick={() => { setActiveTab('all'); setAuthView('all'); }}
        >
          FRESHMARKET
        </div>
        
        <div className="flex space-x-6 text-sm font-medium">
          <button onClick={() => { setActiveTab('all'); setAuthView('all'); }} className={`pb-1 border-b-2 transition-colors ${activeTab === 'all' && authView === 'all' ? 'border-yellow-400 text-yellow-300' : 'border-transparent text-purple-200 hover:text-white'}`}>Home</button>
          <button onClick={() => { setActiveTab('fruit'); setAuthView('all'); }} className={`pb-1 border-b-2 transition-colors ${activeTab === 'fruit' && authView === 'all' ? 'border-yellow-400 text-yellow-300' : 'border-transparent text-purple-200 hover:text-white'}`}>Fruits</button>
          <button onClick={() => { setActiveTab('veg'); setAuthView('all'); }} className={`pb-1 border-b-2 transition-colors ${activeTab === 'veg' && authView === 'all' ? 'border-yellow-400 text-yellow-300' : 'border-transparent text-purple-200 hover:text-white'}`}>Vegetables</button>
          <button onClick={() => { setActiveTab('grocery'); setAuthView('all'); }} className={`pb-1 border-b-2 transition-colors ${activeTab === 'grocery' && authView === 'all' ? 'border-yellow-400 text-yellow-300' : 'border-transparent text-purple-200 hover:text-white'}`}>Others</button>
        </div>

        <div className="flex items-center space-x-4">
          <div onClick={() => setIsBasketOpen(true)} className="bg-purple-900/80 px-4 py-1.5 rounded-full border border-purple-700 text-xs font-bold cursor-pointer">
            🛒 Basket: {cart.length}
          </div>
          <button onClick={() => setAuthView('login')} className="text-purple-200 text-sm font-medium hover:text-white transition">Login</button>
          <button onClick={() => setAuthView('register')} className="bg-yellow-400 text-purple-950 font-black px-4 py-1.5 rounded-full text-xs hover:bg-yellow-300 transition-all">Register</button>
        </div>
      </nav>
      
      <Basket isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} cart={cart} onRemove={removeFromCart} totalPrice={totalPrice} />

      {/* ================= CONDITION 1: MAIN E-COMMERCE STORE VIEWS ================= */}
      {authView === 'all' && (
        <>
          {activeTab === 'all' && <About />} 
          
          {cart.length > 0 && (
            <div className="max-w-6xl mx-auto px-10 mt-12">
              <div onClick={() => setIsBasketOpen(true)} className="bg-gradient-to-r from-yellow-400 to-amber-300 text-purple-950 p-5 rounded-2xl flex justify-between items-center font-bold shadow-2xl transition-all duration-300 transform hover:scale-[1.01] cursor-pointer">
                <span className="flex items-center gap-2 text-lg">🛒 Basket Summary: {cart.length} items selected (Click to view)</span>
                <span className="text-xl bg-purple-950 text-yellow-300 px-4 py-1.5 rounded-xl shadow">Total Checkout: ₹{totalPrice}</span>
              </div>
            </div>
          )}
          
          <div className="max-w-6xl mx-auto p-10 space-y-24">
            {activeTab === 'fruit' && (
              <div>
                <h2 className="text-2xl font-black text-yellow-300 mb-6 border-b border-purple-800/60 pb-3 tracking-widest uppercase flex items-center gap-2 max-w-4xl mx-auto">🍇 Organic Harvest Fruits</h2>
                <div className={gridStyle}>{fruits.map((item) => <FruitCard key={item.id} product={item} onAdd={addToCart} />)}</div>
              </div>
            )}

            {activeTab === 'veg' && (
              <div>
                <h2 className="text-2xl font-black text-yellow-300 mb-6 border-b border-purple-800/60 pb-3 tracking-widest uppercase flex items-center gap-2 max-w-4xl mx-auto">🥕 Earth-Grown Vegetables</h2>
                <div className={gridStyle}>{vegetables.map((item) => <FruitCard key={item.id} product={item} onAdd={addToCart} />)}</div>
              </div>
            )}

            {activeTab === 'grocery' && (
              <div>
                <h2 className="text-2xl font-black text-yellow-300 mb-6 border-b border-purple-800/60 pb-3 tracking-widest uppercase flex items-center gap-2 max-w-4xl mx-auto">🥞 Pantry Essentials</h2>
                <div className={gridStyle}>{groceries.map((item) => <FruitCard key={item.id} product={item} onAdd={addToCart} />)}</div>
              </div>
            )}

            {activeTab === 'all' && (
              <div className="text-center py-6 border-t border-purple-900/60">
                <p className="text-purple-300/40 text-sm tracking-wide font-light">Select any category section from the menu tab header to view our farm-fresh active inventory items.</p>
              </div>
            )}

            <hr className="border-purple-900" />

            {/* Support Form Section */}
            <div className="max-w-3xl mx-auto bg-gradient-to-b from-purple-900/40 to-purple-950/20 p-8 md:p-12 rounded-3xl border border-purple-500/10 backdrop-blur-md shadow-2xl">
              <div className="text-center mb-8">
                <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs bg-purple-900/60 px-4 py-1.5 rounded-full border border-purple-800 inline-block mb-3">Support Center</span>
                <h2 className="text-3xl font-extrabold text-white">Report an Issue / Contact Us</h2>
                <p className="text-purple-200/60 mt-2 font-light">Have a query or notice an issue with your farm batch? Drop it here instantly.</p>
              </div>

              {formSubmitted ? (
                <div className="bg-emerald-950/50 border border-emerald-500/30 p-6 rounded-2xl text-center text-emerald-400 font-semibold animate-pulse">🎉 Issue Logged Successfully! Our fresh care squad will reach out inside 24 hours.</div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-purple-200">Your Full Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Joel" className="w-full bg-purple-950/60 border border-purple-800 rounded-xl px-4 py-3 text-white placeholder-purple-300/30 focus:outline-none focus:border-yellow-400 transition" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-purple-200">Email Address</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="joel@example.com" className="w-full bg-purple-950/60 border border-purple-800 rounded-xl px-4 py-3 text-white placeholder-purple-300/30 focus:outline-none focus:border-yellow-400 transition" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-purple-200">Describe the Issue or Inquiry</label>
                    <textarea rows="4" value={formData.issue} onChange={(e) => setFormData({...formData, issue: e.target.value})} placeholder="Tell us what's on your mind or what went wrong..." className="w-full bg-purple-950/60 border border-purple-800 rounded-xl px-4 py-3 text-white placeholder-purple-300/30 focus:outline-none focus:border-yellow-400 transition resize-none" required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold py-4 rounded-xl transition shadow-lg active:scale-[0.99]">Submit Issue Ticket</button>
                </form>
              )}
            </div>
          </div>
        </>
      )}

      {/* ================= CONDITION 2: REGISTRATION SCREEN VIEW ================= */}
      {authView === 'register' && (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 to-pink-900/40 backdrop-blur-[2px]"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center"
          >
            <button onClick={() => setAuthView('all')} className="absolute top-4 right-4 text-white/50 hover:text-white border border-white/10 w-7 h-7 flex items-center justify-center rounded-lg text-xs bg-white/5">✕</button>

            <h2 className="text-2xl font-bold text-purple-950 mb-8 tracking-wide">Registration</h2>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-6 text-left">
              <div className="relative border-b border-purple-950/30 pb-1">
                <span className="absolute right-2 bottom-2 text-purple-950/40 text-sm">👤</span>
                <input 
                  type="text" 
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  placeholder="Name" 
                  className="w-full bg-transparent outline-none border-none text-purple-950 placeholder-purple-950/60 font-medium py-1.5 pr-8"
                  required 
                />
              </div>

              <div className="relative border-b border-purple-950/30 pb-1">
                <span className="absolute right-2 bottom-2 text-purple-950/40 text-sm">✉️</span>
                <input 
                  type="email" 
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  placeholder="Email" 
                  className="w-full bg-transparent outline-none border-none text-purple-950 placeholder-purple-950/60 font-medium py-1.5 pr-8"
                  required 
                />
              </div>

              <div className="relative border-b border-purple-950/30 pb-1">
                <span className="absolute right-2 bottom-2 text-purple-950/40 text-sm">🔒</span>
                <input 
                  type="password" 
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  placeholder="Password" 
                  className="w-full bg-transparent outline-none border-none text-purple-950 placeholder-purple-950/60 font-medium py-1.5 pr-8"
                  required 
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-purple-950 font-medium pt-2">
                <input 
                  type="checkbox" 
                  checked={registerForm.agreeTerms}
                  onChange={(e) => setRegisterForm({...registerForm, agreeTerms: e.target.checked})}
                  className="rounded border-purple-950/30 bg-transparent accent-purple-950 cursor-pointer"
                />
                <label>I Agree to the <span className="underline cursor-pointer hover:text-purple-800">Terms & Conditions</span></label>
              </div>

              <button type="submit" className="w-full bg-purple-900 hover:bg-purple-950 text-white font-bold py-3.5 rounded-full text-sm shadow-md mt-4 active:scale-[0.99] transition-transform">
                Register
              </button>
            </form>

            <p className="text-xs text-purple-950/80 font-medium mt-8">
              Already have an account? <span onClick={() => setAuthView('login')} className="underline font-bold cursor-pointer text-purple-950 hover:text-purple-800 transition-colors">Login</span>
            </p>
          </motion.div>
        </div>
      )}

      {/* ================= CONDITION 3: LOGIN SCREEN VIEW ================= */}
      {authView === 'login' && (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center px-4">
          <div className="absolute inset-0 bg-purple-950/75 backdrop-blur-[2px]"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center"
          >
            <button onClick={() => setAuthView('all')} className="absolute top-4 right-4 text-white/50 hover:text-white border border-white/10 w-7 h-7 flex items-center justify-center rounded-lg text-xs bg-white/5">✕</button>

            <h2 className="text-3xl font-black text-white mb-8 tracking-wide">Login</h2>
            
            <form onSubmit={handleLoginSubmit} className="space-y-6 text-left">
              <div className="relative bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 flex items-center justify-between">
                <input 
                  type="text" 
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Username" 
                  className="w-full bg-transparent outline-none border-none text-white placeholder-white/50 font-light text-sm"
                  required 
                />
                <span className="text-white/40 text-sm">👤</span>
              </div>

              <div className="relative bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 flex items-center justify-between">
                <input 
                  type="password" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Password" 
                  className="w-full bg-transparent outline-none border-none text-white placeholder-white/50 font-light text-sm"
                  required 
                />
                <span className="text-white/40 text-sm">🔒</span>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80 font-light pt-1 px-1">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={loginForm.rememberMe}
                    onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                    className="rounded border-white/20 bg-transparent accent-purple-800 cursor-pointer"
                  />
                  <label>Remember me</label>
                </div>
                <span onClick={() => alert('Reset link dropped to linked server! 🔑')} className="hover:underline hover:text-white cursor-pointer transition">Forgot password?</span>
              </div>

              <button type="submit" className="w-full bg-white text-purple-950 font-black py-4 rounded-full text-center tracking-wide text-sm shadow-lg hover:bg-purple-100 mt-4 active:scale-[0.99] transition-transform">
                Login
              </button>
            </form>

            <p className="text-xs text-white/70 font-light mt-8">
              Don't have an account? <span onClick={() => setAuthView('register')} className="underline font-bold cursor-pointer text-white hover:text-yellow-300 transition-colors ml-1">Register</span>
            </p>
          </motion.div>
        </div>
      )}

    </div>
  );
}

export default App;