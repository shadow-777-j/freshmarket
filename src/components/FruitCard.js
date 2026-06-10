import React from 'react';

function FruitCard({ product, onAdd }) {
  return (
    <div className="bg-white p-5 rounded-2xl text-purple-950 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      
      {/* Product Image Section */}
      {product.image ? (
        <div className="w-full h-44 overflow-hidden rounded-xl mb-4 bg-purple-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
          />
        </div>
      ) : (
        /* Fallback placeholder box if an image link fails to load */
        <div className="w-full h-44 bg-purple-100 rounded-xl mb-4 flex items-center justify-center text-purple-300 text-3xl">
          📦
        </div>
      )}

      {/* Product Metadata Details */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-xl tracking-tight text-purple-950 capitalize">
            {product.name}
          </h3>
          <p className="text-purple-600 font-black text-lg mt-1">
            ₹{product.price}
          </p>
        </div>

        {/* Interactive Action Button */}
        <button 
          onClick={() => onAdd(product)}
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl mt-5 hover:bg-purple-700 active:scale-[0.98] transition-all duration-150 shadow-md hover:shadow-purple-900/20"
        >
          Add to Basket
        </button>
      </div>

    </div>
  );
}

export default FruitCard;