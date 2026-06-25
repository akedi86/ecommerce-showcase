import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

const products = [
  { id: 1, name: "Gold Necklace", price: 7500, image: "/images/necklace.jpg", description: "Elegant gold necklace with timeless design." },
  { id: 2, name: "Diamond Ring", price: 15000, image: "/images/ring.jpg", description: "Brilliant diamond ring crafted for luxury." },
  { id: 3, name: "Silver Bracelet", price: 5000, image: "/images/bracelet.jpg", description: "Stylish silver bracelet for everyday wear." },
  { id: 4, name: "Pearl Earrings", price: 3500, image: "/images/earrings.jpg", description: "Classic pearl earrings with modern touch." },
  { id: 5, name: "Luxury Watch", price: 12000, image: "/images/watch.jpg", description: "Premium watch combining elegance and precision." },
  { id: 6, name: "Emerald Pendant", price: 9000, image: "/images/pendant.jpg", description: "Emerald pendant necklace with rich color." }
];

function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity < 10) {
        setCart(cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} added to cart ✅`);
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.min(10, Math.max(1, item.quantity + change));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => { setPage("home"); setSelectedProduct(null); }}
        >
          Luxe Jewellery
        </h1>
        <nav>
          <button onClick={() => { setPage("products"); setSelectedProduct(null); }} className="px-3 text-gray-700">Products</button>
          <button onClick={() => { setPage("contact"); setSelectedProduct(null); }} className="px-3 text-gray-700">Contact</button>
          <button onClick={() => { setPage("cart"); setSelectedProduct(null); }} className="px-3 text-gray-700">
            Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </nav>
      </header>

      {/* Home Page */}
      {page === "home" && (
        <>
          <section className="relative text-center">
            <video 
              src="/videos/home.mp4" 
              autoPlay 
              muted 
              loop 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30">
              <h2 className="text-4xl font-bold text-white">Timeless Elegance</h2>
              <p className="text-white mt-2">Discover affordable luxury crafted for you.</p>
              <button 
                onClick={() => setPage("products")} 
                className="mt-4 bg-[#81D8D0] text-black px-6 py-2 rounded hover:bg-[#5bb8b0]"
              >
                Shop Now
              </button>
            </div>
          </section>
          <Footer />
        </>
      )}

      {/* Products Page */}
      {page === "products" && !selectedProduct && (
        <main className="p-12 grid grid-cols-1 md:grid-cols-3 gap-12 bg-[#f5f5f5]">
          {products.map(p => (
            <ProductCard 
              key={p.id} 
              {...p} 
              addToCart={() => addToCart(p)} 
              openProduct={() => setSelectedProduct(p)} 
            />
          ))}
        </main>
      )}

      {/* Product Detail Page */}
      {page === "products" && selectedProduct && (
        <section className="p-12 max-w-3xl mx-auto text-center">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-96 object-cover rounded mb-6"/>
          <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
          <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
          <p className="text-xl font-semibold mb-4">KSh {selectedProduct.price.toLocaleString()}</p>
          <button 
            onClick={() => addToCart(selectedProduct)} 
            className="bg-[#81D8D0] text-black px-6 py-2 rounded hover:bg-[#5bb8b0]"
          >
            Add to Cart
          </button>
          <div className="mt-6">
            <button onClick={() => setSelectedProduct(null)} className="text-gray-600 hover:underline">Back to Products</button>
          </div>
        </section>
      )}

      {/* Contact Page */}
      {page === "contact" && (
        <section className="p-12">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">Questions about your order or our jewellery? Reach out and we'll help.</p>
          <div className="max-w-md bg-white shadow rounded p-6">
            <p className="mb-2"><strong>Email:</strong> support@luxejewellery.com</p>
            <p><strong>Phone:</strong> +254 700 000 000</p>
          </div>
          <Footer />
        </section>
      )}

      {/* Cart Page */}
      {page === "cart" && (
        <>
          <section className="p-12 flex-grow">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="bg-white shadow rounded p-4 mb-2 flex justify-between items-center">
                      <span>{item.name} - KSh {item.price.toLocaleString()}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-300 rounded">-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-300 rounded">+</button>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 font-bold">Total: KSh {totalPrice.toLocaleString()}</div>
                <button 
                  onClick={() => setPage("checkout")} 
                  className="mt-4 bg-[#81D8D0] text-black px-4 py-2 rounded hover:bg-[#5bb8b0]"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </section>
          <Footer />
        </>
      )}

      {/* Checkout Page */}
      {page === "checkout" && (
        <section className="p-12">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <p className="text-gray-600 mb-4">Total Amount: KSh {totalPrice.toLocaleString()}</p>
          <form className="bg-white shadow rounded p-6 max-w-md mx-auto">
            <label className="block mb-2">Name on Card</label>
            <input type="text" className="border p-2 w-full mb-4" placeholder="John Doe" />

            <label className="block mb-2">Card Number</label>
            <input type="text" className="border p-2 w-full mb-4" placeholder="1234 5678 9012 3456" />

            <label className="block mb-2">Expiry Date</label>
            <input type="text" className="border p-2 w-full mb-4" placeholder="MM/YY" />

            <label className="block mb-2">CVV</label>
            <input type="text" className="border p-2 w-full mb-4" placeholder="123" />

            <button type="submit" className="bg-[#81D8D0] text-black px-4 py-2 rounded hover:bg-[#5bb8b0]">
              Pay Now
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default App;