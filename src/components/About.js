import React from 'react';
import { motion } from 'framer-motion';

function About() {
  // Animation settings for the floating fruit bits
  const floatAnimation = (delayTime) => ({
    animate: {
      y: [0, -25, 0],
      x: [0, 10, 0],
      rotate: [0, 10, -10, 0]
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delayTime
    }
  });

  return (
    <div className="text-white font-sans bg-purple-950 overflow-hidden">
      
      {/* ================= UNIFIED CINEMATIC HERO WITH SECURE ORCHARD BACKGROUND ================= */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center px-6">
        
        {/* Deep cinematic background overlay blending fields, purple haze, and organic green */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/85 via-purple-950/40 to-purple-950 backdrop-blur-[1px]"></div>
        
        {/* Moving Fog Layer 1 */}
        <motion.div 
          animate={{ x: ['-5%', '15%', '-5%'], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clouds.png')] opacity-20 pointer-events-none mix-blend-screen scale-150"
        />

        {/* Shifting Dawn Mist Layer 2 */}
        <motion.div 
          animate={{ x: ['10%', '-15%', '10%'], y: [0, 10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[200%] h-64 bg-gradient-to-t from-purple-950 via-emerald-900/10 to-transparent blur-xl pointer-events-none"
        />

        {/* --- FLOATING REACT BITS OF FRUITS & LEAVES IN THE MIST --- */}
        
        {/* 1. Dewy Apple */}
        <motion.div 
          {...floatAnimation(0)}
          className="absolute top-[20%] left-[6%] hidden md:block select-none pointer-events-none z-30 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=250" 
            alt="Apple bit" 
            className="w-32 h-32 object-cover rounded-full border-2 border-emerald-500/30 bg-white"
          />
          <span className="absolute -bottom-2 -right-2 bg-purple-900/90 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-purple-700 whitespace-nowrap">🍎 Dawn</span>
        </motion.div>

        {/* 2. Crisp Grapes */}
        <motion.div 
          {...floatAnimation(1.5)}
          className="absolute bottom-[22%] left-[4%] hidden md:block select-none pointer-events-none z-30 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]"
        >
          <div className="w-36 h-36 rounded-full border-2 border-purple-400 bg-white shadow-2xl overflow-hidden relative">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg" 
              alt="Grapes bit" 
              className="w-full h-full object-cover mix-blend-normal contrast-125"
            />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-purple-900/90 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-purple-700 whitespace-nowrap">🍇 Crisp</span>
        </motion.div>

        {/* 3. Mist Orange */}
        <motion.div 
          {...floatAnimation(0.8)}
          className="absolute top-[22%] right-[6%] hidden md:block select-none pointer-events-none z-30 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=250" 
            alt="Orange bit" 
            className="w-32 h-32 object-cover rounded-full border-2 border-amber-500/30 bg-white"
          />
          <span className="absolute -bottom-2 -right-2 bg-purple-900/90 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-purple-700 whitespace-nowrap">🍊 Fresh</span>
        </motion.div>

        {/* 4. Dawn Berry */}
        <motion.div 
          {...floatAnimation(2.2)}
          className="absolute bottom-[20%] right-[4%] hidden md:block select-none pointer-events-none z-30 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        >
          <img 
            src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=250" 
            alt="Berry bit" 
            className="w-36 h-36 object-cover rounded-full border-2 border-red-500/30 bg-white"
          />
          <span className="absolute -bottom-2 -right-2 bg-purple-900/90 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 border border-purple-700 whitespace-nowrap">🍓 Pure</span>
        </motion.div>

        {/* Ambient Drifting Green Leaves */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 90, 0] }}
            transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
            className="absolute text-emerald-400 text-xl opacity-20 select-none pointer-events-none hidden md:block"
            style={{ top: `${30 + i * 15}%`, left: `${35 + i * 12}%` }}
          >
            🍃
          </motion.div>
        ))}

        {/* Core Branding Texts */}
        <div className="relative max-w-3xl text-center z-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs bg-purple-900/80 px-4 py-1.5 rounded-full border border-purple-700 inline-block backdrop-blur-sm">
              ✨ Welcome to FreshMarket
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-yellow-200 via-yellow-100 to-emerald-300 drop-shadow-2xl">
              Pure Nature. <br /> Delivered Fresh.
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-lg text-purple-200/80 max-w-xl mx-auto font-light leading-relaxed drop-shadow"
          >
            Experience the crisp snap of morning-harvested produce, glistening with dawn dew and brought straight from rich fields to your doorstep.
          </motion.p>
        </div>

        {/* Soft Glowing sunlight Ray Flare */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-t from-yellow-500/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
      </div>


      {/* ================= NEW OVERVIEW SECTION WITH INTEGRATED APPLE ORCHARD BACKGROUND ================= */}
      <div className="relative py-32 px-6 overflow-hidden bg-purple-950 min-h-[50vh] flex items-center justify-center">
        {/* Apple Orchard Background image container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1400" 
            alt="Apple orchard sunrise background" 
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
          {/* Deep professional overlays blending layout nicely into your background image */}
          <div className="absolute inset-0 bg-purple-950/80 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-transparent to-purple-950"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 px-4"
          >
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs bg-purple-900/80 px-4 py-1.5 rounded-full border border-purple-800 inline-block backdrop-blur-sm shadow-md">
              01 / Overview
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-yellow-300 drop-shadow-md">The Dew-Drop Standard</h2>
            <p className="text-purple-100/90 leading-relaxed text-base md:text-lg font-light max-w-2xl mx-auto drop-shadow-sm">
              We don't stockpile. Our products are picked in the cool morning mist when nutrition values hit their absolute peak. Every fruit retains its natural hydration, giving you that crisp premium crunch.
            </p>
          </motion.div>
        </div>
      </div>


      {/* ================= NEW OUR SECRET SECTION WITH INTEGRATED PANTRY/GRAINS BACKGROUND ================= */}
      <div className="relative py-32 px-6 overflow-hidden bg-purple-950 min-h-[50vh] flex items-center justify-center border-t border-purple-900/20">
        {/* Fresh Bulk Harvest & Pantry Grains Background image container */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=1400" 
            alt="Organic bulk pantry grain assets background" 
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
          {/* Cinematic dark tint matching your web ecosystem */}
          <div className="absolute inset-0 bg-purple-950/85 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950 via-transparent to-purple-950"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 px-4"
          >
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs bg-purple-900/80 px-4 py-1.5 rounded-full border border-purple-800 inline-block backdrop-blur-sm shadow-md">
              02 / Our Secret
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-yellow-300 drop-shadow-md">Untouched & Pure Origin</h2>
            <p className="text-purple-100/90 leading-relaxed text-base md:text-lg font-light max-w-2xl mx-auto drop-shadow-sm">
              Watch flour cascade elegantly like fine linen, milled traditionally to shield key nutrients. From premium whole grains to artisan salts, our pantry products maintain organic cellular structures straight from source maps.
            </p>
          </motion.div>
        </div>
      </div>


      {/* ================= TEXT BLOCK 3: ABOUT US ================= */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 bg-gradient-to-b from-purple-900/30 to-transparent p-10 rounded-3xl border border-purple-800/40 backdrop-blur-sm shadow-xl"
        >
          <h2 className="text-3xl font-black tracking-wider text-yellow-300 uppercase">
            About Our Roots
          </h2>
          <p className="text-lg text-purple-100/70 leading-relaxed font-light max-w-2xl mx-auto">
            Born from local soil, our mission is simple: to strip away commercial cold storage processing and restore pure culinary vitality. We bring pristine freshness, delicate handling, and luxurious natural flavors to your kitchen table.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
        </motion.div>
      </div>

    </div>
  );
}

export default About;