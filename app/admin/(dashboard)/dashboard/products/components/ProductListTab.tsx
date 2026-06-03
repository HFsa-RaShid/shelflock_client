'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import productsData from '../data/products-data.json';
import categoriesData from '../data/categories-data.json';
import EditProductModal from '../modals/EditProductModal';
import { orderIcon } from './productIcons';
import Pagination from '@/components/ui/pagination/Pagination';


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

type SortKey = 'sku' | 'product_name' | 'category' | 'price' | 'stock' | 'status' | null;
type SortOrder = 'asc' | 'desc';


export default function ProductListTab() {
  const [products, setProducts] = useState<Product[]>(productsData.product_list);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All'); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleStatus = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
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

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesStatus = statusFilter === 'All' || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, selectedCategories, statusFilter]);

  const sortedProducts = useMemo(() => {
    if (!sortKey) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB as string).toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortKey, sortOrder]);

  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentProducts = useMemo(() => {
    return sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedProducts, indexOfFirstItem, indexOfLastItem]);

  return (
    <div className="min-h-[400px]">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-4">
          <h2 className="h6-medium primary-text">Product list</h2>
          <div className="relative">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`border border-[#E5E7EB] rounded-lg px-4 py-2 body-sm-medium flex items-center space-x-1 hover:bg-[#F9FAFB] transition-all ${
                selectedCategories.length > 0 ? 'bg-[#FFF4EC] adsfixter-primary-text border-[#F74608]' : 'bg-white text-[#4B5563]'
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
              <div className="absolute left-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-xl shadow-lg pb-3 z-30">
                <div className="flex justify-between items-center p-1 bg-[#F6F6F6]">
                  <span className="body-medium primary-text p-3">Categories</span>
                  {selectedCategories.length > 0 && (
                    <button onClick={clearCategories} className="body-sm-medium adsfixter-primary-text underline pr-2">Clear</button>
                  )}
                </div>
                
                <div className="space-y-2 overflow-y-auto p-3">
                  <label className="flex items-center space-x-2.5 body-sm-medium adsfixter-primary-text cursor-pointer hover:text-[#111827] transition font-semibold">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.length === 0}
                      onChange={() => handleCategoryChange('All')}
                      className="accent-[#F74608] rounded border-[#E5E7EB] w-4 h-4 cursor-pointer" 
                    />
                    <span>All Categories</span>
                    
                  </label>

                  {categoriesData.categories_list.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2.5 body-sm-regular primary-text cursor-pointer hover:text-[#111827] transition">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat.name)}
                        onChange={() => handleCategoryChange(cat.name)}
                        className="accent-[#F74608] rounded border-[#E5E7EB] w-4 h-4 cursor-pointer" 
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
              className="border border-[#E5E7EB] rounded-lg pr-4 pl-10 py-2 body-sm-medium outline-none w-52 focus:border-[#E05613] bg-white transition" 
            />
            <svg className="w-4 h-4 text-[#9CA3AF] absolute left-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 body-sm-medium bg-white text-[#4B5563] font-medium outline-none focus:border-[#E05613] cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select className="border border-[#E5E7EB] rounded-lg px-3 py-1.5 body-sm-medium bg-white text-[#4B5563] font-medium outline-none"><option>Stock</option></select>
        </div>
      </div>

      <div className="overflow-x-auto border border-[#E9E9E9] rounded-xl bg-white">
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
              <th className="py-3 px-4 select-none">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleSort('stock')}>
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
            {currentProducts.length > 0 ? (
              currentProducts.map((product, idx) => (
                <tr key={product.id} className="hover:bg-[#FAFAFA]/40 transition">
                  <td className="py-3.5 px-4 body-sm-medium primary-text "><span className='py-1.5 px-2.5 border border-[#E5E7EB] rounded-lg'>{indexOfFirstItem + idx + 1}</span></td>
                  <td className="py-3.5 px-4 ">{product.sku}</td>
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#F3F4F6] rounded-lg overflow-hidden flex items-center justify-center border border-[#E5E7EB]">
                      <Image src={product.image_url} alt={product.product_name} width={32} height={32} className="object-cover" />
                    </div>
                    <span>{product.product_name}</span>
                  </td>
                  <td className="py-3.5 px-4"><span className="text-[#E05613] font-semibold">{product.category}</span></td>
                  <td className="py-3.5 px-4 ">${product.price.toFixed(2)}</td>
                  <td className="py-3.5 px-4 ">{product.stock}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <span>{product.status}</span>
                      <button 
                        onClick={() => toggleStatus(product.id)}
                        className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 outline-none ${product.status === 'Active' ? 'bg-[#E05613]' : 'bg-[#E5E7EB]'}`}
                      >
                        <div className={`bg-white w-3.5 h-3.5 rounded-full shadow transform duration-200 ${product.status === 'Active' ? 'translate-x-3.5' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex justify-center space-x-1.5">
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="p-1.5 text-[#4B5563] border border-[#E5E7EB] rounded-lg bg-white shadow-sm hover:bg-[#F9FAFB] transition"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="p-1.5 text-[#4B5563] border border-[#E5E7EB] rounded-lg bg-white shadow-sm hover:bg-[#FDF2F2] hover:text-red-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-10 text-sm text-[#9CA3AF]">No products found matching filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      <Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  itemsPerPage={itemsPerPage}
  setPage={setCurrentPage}
  setItemsPerPage={setItemsPerPage}
/>

      <EditProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
    </div>
  );
}