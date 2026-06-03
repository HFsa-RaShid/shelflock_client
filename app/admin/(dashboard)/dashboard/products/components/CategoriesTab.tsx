/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; 

import { useState } from 'react';
import categoriesData from '../data/categories-data.json';
import CategorySummaryCards from './CategorySummaryCards';
import Image from 'next/image';

import { EditIcon, DeleteIcon, SearchIcon, DragIcon, ChevronDownIcon } from "./productIcons";
import EditCategoryModal from '../modals/EditCategoryModal';

export default function CategoriesTab() {
  const [categories, setProducts] = useState(categoriesData.categories_list);
  const [openCategory, setOpenCategory] = useState<string | null>('CAT-01');

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');

  const toggleAccordion = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      
      {/* 1. Top Counter Overview Cards */}
      <CategorySummaryCards />

      {/* 2. Sub-Header & Filters */}
      <div className="flex justify-between items-center mt-8">
        <div>
          <h2 className="h6-medium primary-text">Category & Subcategory</h2>
          <p className="body-sm-regular subtext">See all the Category & Subcategory list here..</p>
        </div>
        
        <div className="flex space-x-2 items-center">
          {/* Search Box */}
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Search categories" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#E5E7EB] rounded-lg pl-8 pr-3 py-1.5 text-xs outline-none w-52 focus:border-[#E05613] bg-white transition text-[#111827]" 
            />
            
            <SearchIcon className="text-[#9CA3AF] absolute left-2.5" size={14} />
          </div>
          
          <select className="border border-[#111827] bg-[#111827] text-white rounded-lg px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer">
            <option>A - Z</option>
          </select>
        </div>
      </div>

      {/* 3. Category Accordion List */}
      <div className="space-y-3">
        {filteredCategories.map((category) => {
          const isOpen = openCategory === category.id;
          return (
            <div key={category.id} className="border border-[#E5E7EB] rounded-xl bg-white overflow-hidden shadow-sm">
              
              {/* Category Header Row */}
              <div 
                className="flex items-center justify-between p-3.5 hover:bg-[#FAFAFA]/60 transition cursor-pointer" 
                onClick={() => toggleAccordion(category.id)}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="primary-text">
                   
                    <DragIcon size={16} />
                  </div>
                  
                  <div className="w-9 h-9 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-base shadow-sm overflow-hidden">
                    <Image height={36} width={36} src={category.image_url} alt={category.name} className="object-cover" />
                  </div>
                  
                  <div>
                    <h4 className="title-medium primary-text">{category.name}</h4>
                    <p className="body-sm-regular subtext mt-0.5">
                      {category.subcategories_count} subcategory &bull; {category.total_products} products
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
                  <span className={`px-2 py-0.5 body-xsm-regular rounded-full  ${
                    category.status === 'Active' ? 'bg-[#46D877]/10 text-[#46D877]' : 'bg-[#FDF2F2] text-[#EC4899]'
                  }`}>
                    &bull; {category.status}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button 
                      onClick={() => { setSelectedItem({ type: 'category', ...category }); setIsEditOpen(true); }}
                      className="text-[#0E2038] hover:text-[#E05613] p-1 transition cursor-pointer"
                    >
                      <EditIcon size={17} />
                    </button>
                    <button 
                      onClick={() => { setSelectedItem({ type: 'category', ...category }); setIsDeleteOpen(true); }}
                      className="text-[#0E2038] hover:text-red-500 p-1 transition cursor-pointer"
                    >
                      <DeleteIcon size={20} />
                    </button>
                  </div>

                  <button onClick={() => toggleAccordion(category.id)} className="text-[#9CA3AF] hover:text-[#4B5563] px-1 cursor-pointer">
                    
                    <ChevronDownIcon size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Subcategories Extended Drawer List */}
              {isOpen && (
                <div className="border-t border-[#E5E7EB] bg-[#FAFAFA]/30 divide-y divide-[#E5E7EB] animate-in slide-in-from-top-1 duration-150">
                  {category.subcategories.map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between py-3 pl-12 pr-14 text-xs text-[#4B5563] hover:bg-[#FAFAFA]/70 transition">
                      <div className="flex items-center space-x-3">
                        <div className="primary-text">
                         
                          <DragIcon size={14} />
                        </div>
                        <span className="body-l-medium primary-text">{sub.name}</span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <span className="body-sm-regular subtext">{sub.products} products</span>
                        
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => { setSelectedItem({ type: 'subcategory', parentId: category.id, ...sub }); setIsEditOpen(true); }}
                            className="text-[#6B7280] hover:text-[#E05613] p-1.5 transition rounded cursor-pointer"
                          >
                            <EditIcon size={14} />
                          </button>
                          <button 
                            onClick={() => { setSelectedItem({ type: 'subcategory', parentId: category.id, ...sub }); setIsDeleteOpen(true); }}
                            className="text-[#6B7280] hover:text-red-500 p-1.5 transition rounded cursor-pointer"
                          >
                            <DeleteIcon size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="py-2.5 pl-12 pr-14 flex justify-between items-center bg-white border-t border-[#E5E7EB]">
                    <span className="text-[11px] italic text-[#9CA3AF]">Want to add more?</span>
                    <button className="bg-[#111827] text-white rounded-lg px-2.5 py-1.5 text-[10px] font-bold flex items-center space-x-1 hover:bg-[#1F2937] transition cursor-pointer">
                      <span>+ Add new subcategory</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ➕ 4. Add New Category Form Component */}
      <div className="border border-[#E5E7EB] rounded-2xl bg-white p-5 mt-8 shadow-sm">
        <h3 className="title-medium primary-text mb-4">Add New Category / Sub - Category</h3>
        
        <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
          <div>
            <label className="block primary-text mb-1.5">Category name</label>
            <input 
              type="text" 
              placeholder="e.g Perfume & Fragrance" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-xl p-2.5 text-xs outline-none focus:border-[#E05613] placeholder-[#9CA3AF] bg-white transition text-[#111827]" 
            />
          </div>

          <div>
            <label className="block body-sm-medium primary-text mb-1.5">Parent category (When it is a subcategory)</label>
            <select 
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-xl p-2.5 text-xs outline-none bg-white text-[#4B5563] cursor-pointer"
            >
              <option value="">Select a main category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block body-sm-medium primary-text mb-1.5">Icon(optional)</label>
            <select className="w-full border border-[#E5E7EB] rounded-xl p-2.5 text-xs outline-none bg-white text-[#9CA3AF] cursor-pointer">
              <option>Add icon</option>
            </select>
          </div>

          <div>
            <label className="block body-sm-medium primary-text mb-1.5">Status</label>
            <div className="grid grid-cols-2 border border-[#E5E7EB] rounded-xl overflow-hidden p-0.5 bg-[#FAFAFA]">
              <button 
                type="button"
                onClick={() => setFormStatus('Active')}
                className={`text-xs py-2 font-semibold rounded-lg transition-all ${
                  formStatus === 'Active' ? 'bg-white text-[#111827] shadow-sm border border-[#E5E7EB]/10' : 'text-[#9CA3AF]'
                }`}
              >
                Active
              </button>
              <button 
                type="button"
                onClick={() => setFormStatus('Inactive')}
                className={`text-xs py-2 font-semibold rounded-lg transition-all ${
                  formStatus === 'Inactive' ? 'bg-[#FDF2F2] text-[#EC4899] shadow-sm border border-red-100' : 'text-[#9CA3AF]'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button type="button" className="border border-[#E5E7EB] text-[#4B5563] text-xs px-5 py-2 rounded-xl font-semibold hover:bg-[#F9FAFB] transition cursor-pointer">
            Cancel
          </button>
          <button type="button" className="bg-[#111827] text-white text-xs px-6 py-2 rounded-xl font-semibold hover:bg-black transition cursor-pointer">
            Save
          </button>
        </div>
      </div>

      <EditCategoryModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        categoryData={selectedItem}
      />

    </div>
  );
}