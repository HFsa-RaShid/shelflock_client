'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import inventoryData from '../data/inventory-data.json';
import categoriesData from '../data/categories-data.json';
import LowStockThreshold from './LowStockThreshold';
import StockHistoryLog from './StockHistoryLog';
import { orderIcon } from './productIcons';
import Pagination from '@/components/ui/pagination/Pagination';


interface InventoryItem {
  id: string;
  sku: string;
  product_name: string;
  category: string;
  price: number;
  current_stock: number | string;
  max_stock?: number;
  color?: string;
  status?: string; 
  image_url: string;
}

type SortKey = 'sku' | 'product_name' | 'category' | 'price' | 'current_stock' | 'status' | null;
type SortOrder = 'asc' | 'desc';


export default function InventoryTab() {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    return (inventoryData.inventory_stock_management as InventoryItem[]).map(item => ({
      ...item,
      status: item.status === 'Inactive' ? 'Inactive' : 'Active'
    }));
  });

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleStatus = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const currentStatus = item.status === 'Inactive' ? 'Inactive' : 'Active';
          return {
            ...item,
            status: currentStatus === 'Active' ? 'Inactive' : 'Active'
          };
        }
        return item;
      })
    );
  };

  const handleStockChange = (id: string, type: 'increment' | 'decrement') => {
    setItems(prevItems => prevItems.map(item => {
      if (item.id === id && typeof item.current_stock === 'number') {
        const diff = type === 'increment' ? 1 : -1;
        const newStock = Math.max(0, item.current_stock + diff);
        return { ...item, current_stock: newStock };
      }
      return item;
    }));
  };

  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === 'All') {
      setSelectedCategories([]);
    } else {
      if (selectedCategories.includes(categoryName)) {
        setSelectedCategories(selectedCategories.filter(cat => cat !== categoryName));
      } else {
        setSelectedCategories([...selectedCategories, categoryName]);
      }
    }
    setCurrentPage(1);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      
      const currentStatus = item.status === 'Inactive' ? 'Inactive' : 'Active';
      const matchesStatus = statusFilter === 'All' || currentStatus === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, selectedCategories, statusFilter]);

  const sortedItems = useMemo(() => {
    if (!sortKey) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === 'current_stock') {
        const numA = valA === 'Unlimited' ? Infinity : Number(valA);
        const numB = valB === 'Unlimited' ? Infinity : Number(valB);
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA! < valB!) return sortOrder === 'asc' ? -1 : 1;
      if (valA! > valB!) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortKey, sortOrder]);

  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = useMemo(() => {
    return sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedItems, indexOfFirstItem, indexOfLastItem]);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-4">
          <h2 className="text-base font-bold text-[#111827]">Product list</h2>
          <div className="relative">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-medium flex items-center space-x-1 hover:bg-[#F9FAFB] transition-all cursor-pointer ${
                selectedCategories.length > 0 ? 'bg-[#FFF4EC] text-[#E05613] border-[#E05613]' : 'bg-white text-[#4B5563]'
              }`}
            >
              <span>
                {selectedCategories.length === 0 
                  ? 'All Categories' 
                  : `${selectedCategories.length} Selected`}
              </span>
              <svg className={`w-3 h-3 text-[#9CA3AF] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-3 z-30">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <span className="text-xs font-bold text-[#111827]">Categories</span>
                  {selectedCategories.length > 0 && (
                    <button onClick={clearCategories} className="text-xs text-[#E05613] font-semibold hover:underline cursor-pointer">Clear</button>
                  )}
                </div>
                
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  <label className="flex items-center space-x-2.5 text-xs text-[#4B5563] cursor-pointer hover:text-[#111827] transition font-semibold">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.length === 0}
                      onChange={() => handleCategoryChange('All')}
                      className="accent-[#E05613] rounded border-[#E5E7EB] w-3.5 h-3.5 cursor-pointer" 
                  />
                    <span>All Categories</span>
                  </label>

                  {categoriesData.categories_list.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2.5 text-xs text-[#4B5563] cursor-pointer hover:text-[#111827] transition">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => handleCategoryChange(cat.name)}
                        className="accent-[#E05613] rounded border-[#E5E7EB] w-3.5 h-3.5 cursor-pointer" 
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 items-center">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search product" 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="border border-[#E5E7EB] rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none w-52 focus:border-[#E05613] bg-white transition text-[#111827]" 
            />
            <svg className="w-3.5 h-3.5 text-[#9CA3AF] absolute left-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs bg-white text-[#4B5563] font-medium outline-none focus:border-[#E05613] cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select className="border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs bg-white text-[#4B5563] font-medium outline-none cursor-pointer">
            <option>Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-[#E5E7EB] rounded-xl bg-white mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] body-sm-medium subtext">
              <th className="py-3 px-4 w-12">No.</th>
              <th className="py-3 px-4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('sku')}>
                  <span>Product ID</span>
                  {orderIcon()}
                </div>
              </th>
              <th className="py-3 px-4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('product_name')}>
                  <span>Product Name</span>
                  {orderIcon()}
                </div>
              </th>
              <th className="py-3 px-4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('category')}>
                  <span>Category</span>
                  {orderIcon()}
                </div>
              </th>
              <th className="py-3 px-4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('price')}>
                  <span>Price</span>
                  {orderIcon()}
                </div>
              </th>
              <th className="py-3 px-4 w-1/4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('current_stock')}>
                  <span>Stock</span>
                  {orderIcon()}
                </div>
              </th>
              <th className="py-3 px-4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('status')}>
                  <span>Status</span>
                  {orderIcon()}
                </div>
              </th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="body-sm-medium primary-text divide-y divide-[#E5E7EB]">
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => {
                const isItemActive = item.status !== 'Inactive';
                
                return (
                  <tr key={item.id} className="hover:bg-[#FAFAFA]/40 transition">
                    <td className="py-3.5 px-4 font-medium text-[#111827]">{indexOfFirstItem + idx + 1}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{item.sku}</td>
                    <td className="py-3.5 px-4 flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#F3F4F6] rounded-lg overflow-hidden flex items-center justify-center border border-[#E5E7EB]">
                        <Image src={item.image_url} alt={item.product_name} width={32} height={32} className="object-cover" />
                      </div>
                      <span className="font-semibold text-[#111827]">{item.product_name}</span>
                    </td>
                    <td className="py-3.5 px-4"><span className="text-[#E05613] font-semibold">{item.category}</span></td>
                    <td className="py-3.5 px-4 font-bold text-[#111827]">${item.price.toFixed(2)}</td>
                    
                    <td className="py-3.5 px-4">
                      {item.current_stock === 'Unlimited' ? (
                        <div>
                          <span className="text-[11px] font-bold text-[#4B5563] block text-center mb-1">Unlimited</span>
                          <div className="w-full bg-[#2563EB] h-1 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleStockChange(item.id, 'decrement')}
                            className="border border-[#E5E7EB] px-1.5 py-0.5 rounded text-xs text-[#6B7280] bg-white hover:bg-[#FAFAFA] cursor-pointer select-none"
                          >
                            -
                          </button>
                          <div className="flex-1">
                            <span className={`text-[10px] font-bold block text-center mb-0.5 ${item.color === 'red' ? 'text-[#EF4444]' : item.color === 'yellow' ? 'text-[#F59E0B]' : 'text-[#10B981]'}`}>
                              {item.current_stock}
                            </span>
                            <div className="w-full bg-[#F3F4F6] h-1 rounded-full">
                              <div 
                                className={`h-1 rounded-full transition-all duration-300 ${item.color === 'red' ? 'bg-[#EF4444]' : item.color === 'yellow' ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`}
                                style={{ width: `${((item.current_stock as number) / (item.max_stock || 100)) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleStockChange(item.id, 'increment')}
                            className="border border-[#E5E7EB] px-1.5 py-0.5 rounded text-xs text-[#6B7280] bg-white hover:bg-[#FAFAFA] cursor-pointer select-none"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </td>
                    
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold w-12 text-[#111827]">
                          {isItemActive ? 'Active' : 'Inactive'}
                        </span>
                        <button 
                          onClick={() => toggleStatus(item.id)}
                          className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 outline-none cursor-pointer ${isItemActive ? 'bg-[#E05613]' : 'bg-[#E5E7EB]'}`}
                        >
                          <div className={`bg-white w-3.5 h-3.5 rounded-full shadow transform duration-200 ${isItemActive ? 'translate-x-3.5' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center space-x-1.5">
                        <button className="p-1.5 text-[#4B5563] border border-[#E5E7EB] rounded-lg bg-white shadow-sm hover:bg-[#F9FAFB] transition cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button className="p-1.5 text-[#4B5563] border border-[#E5E7EB] rounded-lg bg-white shadow-sm hover:bg-[#FDF2F2] hover:text-red-500 transition cursor-pointer">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-10 text-sm text-[#9CA3AF]">No items found matching filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <div className="flex justify-between items-center mb-6 text-xs text-[#6B7280]">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-[#E5E7EB] rounded-lg px-2 py-1 bg-white font-medium outline-none text-[#111827] cursor-pointer focus:border-[#E05613]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>Per Page</span>
        </div>

        <div className="flex items-center space-x-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border font-semibold transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#E05613] text-white border-[#E05613] shadow-sm'
                  : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB]'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:hover:bg-transparent transition cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div> */}


<Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  itemsPerPage={itemsPerPage}
  setPage={setCurrentPage}
  setItemsPerPage={setItemsPerPage}
/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <LowStockThreshold />
        <StockHistoryLog />
      </div>
    </div>
  );
}