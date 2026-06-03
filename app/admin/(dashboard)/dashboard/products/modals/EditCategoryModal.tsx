/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryData: any; 
}

export default function EditCategoryModal({ isOpen, onClose, categoryData }: EditCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-[#E5E7EB] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-3 mb-4">
          <h3 className="text-base font-bold text-[#111827]">Edit Category</h3>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#4B5563] transition text-lg cursor-pointer">
            ✕
          </button>
        </div>

        {/* Form Body */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">Category Name</label>
            <input 
              type="text" 
              defaultValue={categoryData?.name || ''} 
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#E05613] bg-white text-[#111827]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4B5563] mb-1.5">Status</label>
            <select 
              defaultValue={categoryData?.status || 'Active'}
              className="w-full border border-[#E5E7EB] rounded-lg px-2.5 py-2 text-xs bg-white text-[#4B5563] outline-none focus:border-[#E05613]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-2 mt-6 pt-3 border-t border-[#E5E7EB]">
          <button 
            onClick={onClose} 
            className="px-4 py-2 border border-[#E5E7EB] text-[#4B5563] rounded-xl text-xs font-medium hover:bg-[#F9FAFB] cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => { /* এডিট সাবমিট লজিক */ onClose(); }} 
            className="px-4 py-2 bg-[#E05613] text-white rounded-xl text-xs font-medium hover:bg-[#c84b10] shadow-sm cursor-pointer"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}