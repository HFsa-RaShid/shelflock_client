'use client';

import { useState } from 'react';

interface Product {
  id: string;
  sku: string;
  product_name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  image_url: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updatedProduct: Product) => void;
}

export default function EditProductModal({ isOpen, onClose, product, onSave }: EditModalProps) {
  // useEffect ছাড়া সরাসরি ইনিশিয়াল স্টেট সেট করা হয়েছে
  const [name, setName] = useState(product?.product_name || '');
  const [category, setCategory] = useState(product?.category || 'Clothing');
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...product,
      product_name: name,
      category,
      price: Number(price),
      stock: Number(stock),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-xl border border-[#E5E7EB]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-[#111827]">Edit Product</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563] text-xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-[#4B5563] mb-1">Product Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              className="w-full border border-[#E5E7EB] rounded-lg p-2 text-xs outline-none focus:border-[#E05613]" 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-lg p-2 text-xs outline-none bg-white text-[#111827]"
              >
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Makeup">Makeup</option>
                <option value="Skin Care">Skin Care</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4B5563] mb-1">Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required 
                className="w-full border border-[#E5E7EB] rounded-lg p-2 text-xs outline-none focus:border-[#E05613]" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4B5563] mb-1">Stock</label>
            <input 
              type="number" 
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required 
              className="w-full border border-[#E5E7EB] rounded-lg p-2 text-xs outline-none focus:border-[#E05613]" 
            />
          </div>

          <div className="flex space-x-2.5 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-[#E5E7EB] text-[#4B5563] text-xs py-2 rounded-lg font-semibold hover:bg-[#F9FAFB] transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-[#E05613] text-white text-xs py-2 rounded-lg font-semibold hover:bg-[#C84B0F] shadow transition">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}