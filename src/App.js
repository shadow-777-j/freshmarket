import React, { useState } from 'react';
import { motion } from 'framer-motion'; // <-- Make sure this is here!
import About from './components/About';
import FruitCard from './components/FruitCard';
import Basket from './components/Basket';
import { products } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // AUTH STATE: Toggles layout screens: 'all' (main site), 'login', or 'register'
  // When a user clicks your header "Login" or "Register" buttons, we update this state!
  const [authView, setAuthView] = useState('all');

  // REGISTRATION FORM STATE (Matches image_d2cafc.png)
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', agreeTerms: false });
  // LOGIN FORM STATE (Matches image_d2cae4.jpg)
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

  // Form Submission Mock Handlers for Auth
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerForm.agreeTerms) {
      alert("Please check and agree to the Terms & Conditions first! 📜");
      return;
    }
    console.log("Registering User profile data payload:", registerForm);
    alert(`Account created successfully for ${registerForm.name}! Logging you in now... 🎉`);
    setAuthView('all'); // Re-routes cleanly back to shop layout storefront view upon entry completion
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Authenticating login user profile session payload:", loginForm);
    alert(`Welcome back, ${loginForm.username}! Session opened. 🔓`);
    setAuthView('all'); // Redirect back to active marketplace dashboard shelf view layout
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
      
      {/* ================= HEADER NAVBAR LAYER ================= */}
      {/* Updated links logic passing auth view controls into buttons triggers */}
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
      
      {/* Interactive Slide-out Basket Drawer Component */}
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

      {/* ================= CONDITION 2: REGISTRATION SCREEN VIEW (Matches image_d2cafc.png) ================= */}
      {authView === 'register' && (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center px-4">
          {/* Deep sunset cinematic tint overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 to-pink-900/40 backdrop-blur-[2px]"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center"
          >
            {/* Top Close Button cross icon mark */}
            <button onClick={() => setAuthView('all')} className="absolute top-4 right-4 text-white/50 hover:text-white border border-white/10 w-7 h-7 flex items-center justify-center rounded-lg text-xs bg-white/5">✕</button>

            <h2 className="text-2xl font-bold text-purple-950 mb-8 tracking-wide">Registration</h2>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-6 text-left">
              {/* Name Field */}
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

              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Terms Checkbox checkbox box */}
              <div className="flex items-center gap-2 text-xs text-purple-950 font-medium pt-2">
                <input 
                  type="checkbox" 
                  checked={registerForm.agreeTerms}
                  onChange={(e) => setRegisterForm({...registerForm, agreeTerms: e.target.checked})}
                  className="rounded border-purple-950/30 bg-transparent accent-purple-950 cursor-pointer"
                />
                <label>I Agree to the <span className="underline cursor-pointer hover:text-purple-800">Terms & Conditions</span></label>
              </div>

              {/* Submit Action Registration Trigger */}
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

      {/* ================= CONDITION 3: LOGIN SCREEN VIEW (Matches image_d2cae4.jpg) ================= */}
      {authView === 'login' && (
        <div className="relative min-h-[90vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center px-4">
          {/* Deep dark starry night haze mist blur overlay container */}
          <div className="absolute inset-0 bg-purple-950/75 backdrop-blur-[2px]"></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-md bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-center"
          >
            {/* Top Close Button cross icon mark */}
            <button onClick={() => setAuthView('all')} className="absolute top-4 right-4 text-white/50 hover:text-white border border-white/10 w-7 h-7 flex items-center justify-center rounded-lg text-xs bg-white/5">✕</button>

            <h2 className="text-3xl font-black text-white mb-8 tracking-wide">Login</h2>
            
            <form onSubmit={handleLoginSubmit} className="space-y-6 text-left">
              {/* Username Input Container */}
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

              {/* Password Input Container */}
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

              {/* Remember me & Forgot utilities links text layout plate */}
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

              {/* Action Submit Login Trigger button */}
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