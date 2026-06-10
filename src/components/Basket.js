import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Basket({ isOpen, onClose, cart, onRemove, totalPrice }) {
  // Screen views state: 'cart' (default list) or 'checkout' (form page)
  const [view, setView] = useState('cart');

  // Checkout Form Fields State
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'COD' // Default locked to Cash On Delivery
  });

  const [isSending, setIsSending] = useState(false);

  // Reset screen view back to default list tray whenever closed
  const handleClose = () => {
    setView('cart');
    onClose();
  };

  // Form Submit Handler simulating real Email processing
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // Prepare the order item text payload formatting for the email body
    const orderItemsList = cart.map(item => `• ${item.name} (₹${item.price})`).join('\n');
    
    // This object maps exactly to what you will send to joelantony869@gmail.com
    const emailPayload = {
      to_email: 'joelantony869@gmail.com',
      customer_name: shippingForm.fullName,
      customer_phone: shippingForm.phone,
      customer_address: `${shippingForm.address}, ${shippingForm.city}`,
      payment_type: shippingForm.paymentMethod,
      total_amount: `₹${totalPrice}`,
      items_ordered: orderItemsList
    };

    console.log("Email Delivery Payload Ready:", emailPayload);

    // FRONT-END EMAIL TRICK: 
    // To make this practically deliver to your inbox right now without an active server,
    // install EmailJS using terminal: npm install @emailjs/browser
    // Then you can uncomment the block below, insert your keys, and it will fire to your inbox!
    /*
    import emailjs from '@emailjs/browser';
    await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailPayload, 'YOUR_PUBLIC_KEY');
    */

    // Simulating completion delay
    setTimeout(() => {
      setIsSending(false);
      alert(`🎉 Order placed successfully, Joel!\nAn email summary of this invoice has been generated for delivery to joelantony869@gmail.com.`);
      
      // Reset forms and view state cleanly
      setShippingForm({ fullName: '', phone: '', address: '', city: '', paymentMethod: 'COD' });
      setView('cart');
      handleClose();
      window.location.reload(); // Wipes cart context upon completion
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Slide-out Panel Layer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-purple-950/95 border-l border-purple-800/40 text-white p-6 shadow-2xl z-50 flex flex-col backdrop-blur-md overflow-y-auto"
          >
            
            {/* ================= VIEW 1: TRADITIONAL BASKET LIST SYSTEM ================= */}
            {view === 'cart' && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-purple-800/60">
                    <h2 className="text-xl font-black text-yellow-300 flex items-center gap-2">
                      🛒 Your Basket ({cart.length})
                    </h2>
                    <button onClick={handleClose} className="text-purple-300 hover:text-yellow-300 transition text-sm font-bold bg-purple-900/40 px-3 py-1.5 rounded-xl border border-purple-800">
                      Close ✕
                    </button>
                  </div>

                  <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {cart.length === 0 ? (
                      <div className="py-20 flex flex-col items-center justify-center text-center text-purple-300/40 space-y-2">
                        <span className="text-4xl">🍃</span>
                        <p className="font-light text-sm">Your basket is feeling light! Add some fresh farm items.</p>
                      </div>
                    ) : (
                      cart.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 bg-purple-900/20 border border-purple-800/40 p-3 rounded-2xl shadow-sm">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-purple-700/30" />
                          <div className="flex-grow">
                            <h4 className="font-bold text-base capitalize text-white">{item.name}</h4>
                            <p className="text-yellow-400 font-extrabold text-sm mt-0.5">₹{item.price}</p>
                          </div>
                          <button onClick={() => onRemove(index)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-xl transition">
                            🗑️
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-purple-800/60 pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-300 font-medium">Subtotal Amount:</span>
                      <span className="text-2xl font-black text-yellow-300">₹{totalPrice}</span>
                    </div>
                    <button 
                      onClick={() => setView('checkout')}
                      className="w-full bg-gradient-to-r from-yellow-400 to-amber-300 text-purple-950 font-black py-4 rounded-xl text-center shadow-lg hover:from-yellow-300 hover:to-amber-200 active:scale-[0.99] transition"
                    >
                      Proceed to Checkout 🚀
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ================= VIEW 2: PREMIUM RE-SKINNED GLASSMORPHIC CHECKOUT (Matches Register Card View Look) ================= */}
            {view === 'checkout' && (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <button 
                      onClick={() => setView('cart')}
                      className="text-purple-300 hover:text-white text-xs font-semibold flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10"
                    >
                      ← Back
                    </button>
                    <h2 className="text-lg font-bold text-white tracking-wide">Secure Checkout</h2>
                    <button onClick={handleClose} className="text-white/40 hover:text-white text-xs">✕</button>
                  </div>

                  {/* Order Invoice Brief info review item box */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-5 mb-6 text-sm flex justify-between items-center">
                    <div>
                      <p className="text-white/50 text-xs">Total Bill Due</p>
                      <p className="text-xl font-black text-yellow-300 mt-0.5">₹{totalPrice}</p>
                    </div>
                    <p className="text-xs text-purple-300 bg-purple-900/40 border border-purple-800 px-3 py-1.5 rounded-xl">
                      📦 {cart.length} Farm Items Package
                    </p>
                  </div>

                  {/* Checkout Shipping Input Fields */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-left">
                    {/* Full Name Input Container */}
                    <div className="relative border-b border-white/20 pb-1">
                      <span className="absolute right-2 bottom-2 text-white/30 text-sm">👤</span>
                      <input 
                        type="text"
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({...shippingForm, fullName: e.target.value})}
                        placeholder="Full Shipping Name" 
                        className="w-full bg-transparent outline-none border-none text-white placeholder-white/40 font-light text-sm py-1.5 pr-8"
                        required 
                      />
                    </div>

                    {/* Contact Phone Input Container */}
                    <div className="relative border-b border-white/20 pb-1">
                      <span className="absolute right-2 bottom-2 text-white/30 text-sm">📞</span>
                      <input 
                        type="tel"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({...shippingForm, phone: e.target.value})}
                        placeholder="Contact Phone Number" 
                        className="w-full bg-transparent outline-none border-none text-white placeholder-white/40 font-light text-sm py-1.5 pr-8"
                        required 
                      />
                    </div>

                    {/* Street Address Input Container */}
                    <div className="relative border-b border-white/20 pb-1">
                      <span className="absolute right-2 bottom-2 text-white/30 text-sm">🏠</span>
                      <input 
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({...shippingForm, address: e.target.value})}
                        placeholder="Street Address, Apartment, Suite" 
                        className="w-full bg-transparent outline-none border-none text-white placeholder-white/40 font-light text-sm py-1.5 pr-8"
                        required 
                      />
                    </div>

                    {/* Destination City Input Container */}
                    <div className="relative border-b border-white/20 pb-1">
                      <span className="absolute right-2 bottom-2 text-white/30 text-sm">📍</span>
                      <input 
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({...shippingForm, city: e.target.value})}
                        placeholder="City / State Location" 
                        className="w-full bg-transparent outline-none border-none text-white placeholder-white/40 font-light text-sm py-1.5 pr-8"
                        required 
                      />
                    </div>

                    {/* ================= COMPLICATED TAX ID SKIPPED & PAYMENT METHOD TIED STRICTLY TO COD ================= */}
                    <div className="pt-4 space-y-2">
                      <label className="text-xs font-semibold text-white/50 uppercase tracking-wider block px-1">
                        Select Payment Method
                      </label>
                      <div className="bg-white/5 border border-white/20 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">💵</span>
                          <div>
                            <p className="text-sm font-bold text-white">Cash on Delivery (COD)</p>
                            <p className="text-white/40 text-xs mt-0.5">Pay with cash at your doorstep upon arrival</p>
                          </div>
                        </div>
                        {/* Radial Checked Circle Marker Icon */}
                        <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-yellow-400/10">
                          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        </div>
                      </div>
                    </div>

                    {/* Final checkout submission trigger button */}
                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full bg-purple-900 hover:bg-purple-950 border border-white/10 text-white font-bold py-4 rounded-full text-sm shadow-xl mt-6 active:scale-[0.99] transition-all disabled:opacity-50 disabled:animate-pulse"
                    >
                      {isSending ? "Processing Invoice Delivery..." : "Place Farm Order 🚀"}
                    </button>
                  </form>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Basket;