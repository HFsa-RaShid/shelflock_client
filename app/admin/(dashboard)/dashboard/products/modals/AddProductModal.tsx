// src/app/dashboard/products/modals/AddProductModal.tsx
'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-[#E5E7EB]">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-bold text-[#111827]">Add New Product</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563] text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">Product Name</label>
            <input type="text" required className="w-full border border-[#E5E7EB] rounded-lg p-2.5 text-sm outline-none focus:border-[#E05613]" placeholder="Polo Shirt" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">Category</label>
              <select className="w-full border border-[#E5E7EB] rounded-lg p-2.5 text-sm outline-none bg-white text-[#111827]">
                <option>Clothing</option>
                <option>Shoes</option>
                <option>Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">Price ($)</label>
              <input type="number" step="0.01" required className="w-full border border-[#E5E7EB] rounded-lg p-2.5 text-sm outline-none focus:border-[#E05613]" placeholder="23.50" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">Initial Stock</label>
            <input type="number" required className="w-full border border-[#E5E7EB] rounded-lg p-2.5 text-sm outline-none focus:border-[#E05613]" placeholder="600" />
          </div>

          <div className="flex space-x-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 border border-[#E5E7EB] text-[#4B5563] text-sm py-2.5 rounded-lg font-semibold hover:bg-[#F9FAFB] transition">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-[#E05613] text-white text-sm py-2.5 rounded-lg font-semibold hover:bg-[#C84B0F] shadow transition">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}