// src/app/(dashboard)/dashboard/customers/_component/CustomerTableSection.tsx
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { FiSearch, FiFilter, FiChevronDown } from "react-icons/fi";
import CustomerDetailsSidebar from "./CustomerDetailsSidebar";
import Image from "next/image";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  payment: string;
  orders: number;
  lastOrder: string;
  spend: number;
  area: string;
  type: string;
  email: string;
  regDate: string;
}

interface CustomerTableSectionProps {
  customers: Customer[];
}

export default function CustomerTableSection({
  customers = [],
}: CustomerTableSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCustomerTypeOpen, setIsCustomerTypeOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [customerTypeFilters, setCustomerTypeFilters] = useState<
    Record<string, boolean>
  >({
    All: true,
    New: false,
    Repeated: false,
    "Large order": false,
  });

  const [filters, setFilters] = useState({
    deliveryArea: [] as string[],
    paymentMethod: [] as string[],
    date: "" as string,
  });

  // Sorting State
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const filterRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      )
        setIsFilterOpen(false);
      if (typeRef.current && !typeRef.current.contains(event.target as Node))
        setIsCustomerTypeOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCustomerTypeChange = (type: string) => {
    setCustomerTypeFilters((prev) => {
      if (type === "All") {
        return { All: true, New: false, Repeated: false, "Large order": false };
      } else {
        const updated = { ...prev, [type]: !prev[type], All: false };
        const hasAnyActiveSubFilter =
          updated.New || updated.Repeated || updated["Large order"];
        if (!hasAnyActiveSubFilter) updated.All = true;
        return updated;
      }
    });
    setCurrentPage(1);
  };

  const clearCustomerTypeFilters = () => {
    setCustomerTypeFilters({
      All: true,
      New: false,
      Repeated: false,
      "Large order": false,
    });
    setCurrentPage(1);
  };

  const getCustomerTypeButtonLabel = () => {
    if (customerTypeFilters.All) return "All Categories";
    const selected = Object.keys(customerTypeFilters).filter(
      (k) => k !== "All" && customerTypeFilters[k],
    );
    if (selected.length === 1) return `${selected[0]} Customer`;
    return `${selected.length} Selected`;
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const toggleDeliveryArea = (area: string) => {
    setFilters((prev) => ({
      ...prev,
      deliveryArea: prev.deliveryArea.includes(area)
        ? prev.deliveryArea.filter((a) => a !== area)
        : [...prev.deliveryArea, area],
    }));
    setCurrentPage(1);
  };

  const togglePaymentMethod = (method: string) => {
    setFilters((prev) => ({
      ...prev,
      paymentMethod: prev.paymentMethod.includes(method)
        ? prev.paymentMethod.filter((m) => m !== method)
        : [...prev.paymentMethod, method],
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({ deliveryArea: [], paymentMethod: [], date: "" });
    setSearchQuery("");
    clearCustomerTypeFilters();
    setCurrentPage(1);
  };

  // সার্চ ও ফিল্টারিং প্রসেস
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q),
      );
    }

    if (!customerTypeFilters.All) {
      result = result.filter((c) => {
        if (customerTypeFilters.New && c.type === "New") return true;
        if (customerTypeFilters.Repeated && c.type === "Repeated") return true;
        if (customerTypeFilters["Large order"] && c.type === "Large order")
          return true;
        return false;
      });
    }

    if (filters.deliveryArea.length > 0) {
      result = result.filter((c) => {
        if (
          filters.deliveryArea.includes("Inside Dhaka") &&
          c.area.toLowerCase() === "dhaka"
        )
          return true;
        if (
          filters.deliveryArea.includes("Outside Dhaka") &&
          c.area.toLowerCase() !== "dhaka"
        )
          return true;
        return false;
      });
    }

    if (filters.paymentMethod.length > 0) {
      result = result.filter((c) =>
        filters.paymentMethod
          .map((p) => p.toLowerCase())
          .includes(c.payment.toLowerCase()),
      );
    }

    if (filters.date) {
      result = result.filter(
        (c) => c.lastOrder.toLowerCase() === filters.date.toLowerCase(),
      );
    }

    // সর্টিং লজিক
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key as keyof typeof a];
        let valB = b[sortConfig.key as keyof typeof b];

        if (valA === undefined || valB === undefined) return 0;

        if (sortConfig.key === "id") {
          return sortConfig.direction === "asc"
            ? parseInt(valA as string, 10) - parseInt(valB as string, 10)
            : parseInt(valB as string, 10) - parseInt(valA as string, 10);
        }

        if (typeof valA === "number") {
          return sortConfig.direction === "asc"
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
        }

        return sortConfig.direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [searchQuery, customerTypeFilters, filters, sortConfig, customers]);

  // পেজিনেশন স্লাইসিং
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCustomers, currentPage, itemsPerPage]);

  const totalPages = Math.max(
    Math.ceil(filteredCustomers.length / itemsPerPage),
    1,
  );

  const getPaymentBadgeStyle = (method: string) => {
    switch (method.toLowerCase()) {
      case "cod":
        return "bg-[#FFF4EC] text-[#E05613] border border-[#FFF4EC]";
      case "bkash":
        return "bg-[#FDF0F6] text-[#D12E7B] border border-[#FDF0F6]";
      case "nagad":
        return "bg-[#FFF0ED] text-[#DE4A2B] border border-[#FFF0ED]";
      case "rocket":
        return "bg-[#F3EFFE] text-[#663399] border border-[#F3EFFE]";
      default:
        return "bg-gray-100 text-[#4B5563] border border-gray-100";
    }
  };

  return (
    <div className="w-full flex flex-row gap-4 relative items-start">
      <div className="flex-1 min-w-0">
        {/* Table Filters & Upper Controls */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center space-x-4">
            <h2 className="h6-medium primary-text">Customer list</h2>

            {/* Custom Dynamic Category Dropdown */}
            <div className="relative" ref={typeRef}>
              <button
                onClick={() => setIsCustomerTypeOpen(!isCustomerTypeOpen)}
                className={`border border-[#E5E7EB] rounded-lg px-4 py-2 body-sm-medium flex items-center space-x-1 hover:bg-[#F9FAFB] transition-all ${
                  !customerTypeFilters.All
                    ? "bg-[#FFF4EC] text-[#E05613] border-[#E05613]"
                    : "bg-white text-[#4B5563]"
                }`}
              >
                <span>{getCustomerTypeButtonLabel()}</span>
                <svg
                  className={`w-3 h-3 text-[#9CA3AF] transition-transform ${isCustomerTypeOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isCustomerTypeOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-3 z-30">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="text-xs font-bold text-[#111827]">
                      Categories
                    </span>
                    {!customerTypeFilters.All && (
                      <button
                        onClick={clearCustomerTypeFilters}
                        className="text-xs text-[#E05613] font-semibold hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {["All", "New", "Repeated", "Large order"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-2.5 text-xs text-[#4B5563] cursor-pointer hover:text-[#111827] transition font-semibold"
                      >
                        <input
                          type="checkbox"
                          checked={customerTypeFilters[type]}
                          onChange={() => handleCustomerTypeChange(type)}
                          className="accent-[#E05613] rounded border-[#E5E7EB] w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>{type} Customers</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-2 items-center relative" ref={filterRef}>
            {/* Search Field */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search customer"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-[#E5E7EB] rounded-lg pr-4 pl-10 py-2 body-sm-medium outline-none w-52 focus:border-[#E05613] bg-white transition"
              />
              <svg
                className="w-4 h-4 text-[#9CA3AF] absolute left-2.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Advanced Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`border border-[#E5E7EB] rounded-lg px-4 py-2 body-sm-medium flex items-center space-x-1.5 transition-all bg-white hover:bg-[#F9FAFB] ${
                isFilterOpen
                  ? "border-[#E05613] text-[#E05613]"
                  : "text-[#4B5563]"
              }`}
            >
              <FiFilter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>

            {/* Advanced Filter Popover */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg w-64 z-40 p-4 flex flex-col space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs font-bold text-[#111827]">
                    Filters
                  </span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-[#E05613] hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Delivery Area */}
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[10px] font-bold text-[#9CA3AF] tracking-wider uppercase">
                    Delivery Area
                  </span>
                  {["Inside Dhaka", "Outside Dhaka"].map((area) => (
                    <label
                      key={area}
                      className="flex items-center space-x-2 text-xs text-[#4B5563] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.deliveryArea.includes(area)}
                        onChange={() => toggleDeliveryArea(area)}
                        className="accent-[#E05613] rounded w-3.5 h-3.5"
                      />
                      <span>{area}</span>
                    </label>
                  ))}
                </div>

                {/* Payment Method */}
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[10px] font-bold text-[#9CA3AF] tracking-wider uppercase">
                    Payment Method
                  </span>
                  {["COD", "Bkash", "Nagad", "Rocket"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center space-x-2 text-xs text-[#4B5563] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters.paymentMethod.includes(method)}
                        onChange={() => togglePaymentMethod(method)}
                        className="accent-[#E05613] rounded w-3.5 h-3.5"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>

                {/* Date Option */}
                <div className="flex flex-col space-y-1.5">
                  <span className="text-[10px] font-bold text-[#9CA3AF] tracking-wider uppercase">
                    Date
                  </span>
                  {["Today", "This week", "This Month"].map((dOption) => (
                    <label
                      key={dOption}
                      className="flex items-center space-x-2 text-xs text-[#4B5563] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="dateFilter"
                        checked={filters.date === dOption}
                        onChange={() => {
                          setFilters((prev) => ({ ...prev, date: dOption }));
                          setCurrentPage(1);
                        }}
                        className="accent-[#E05613] w-3.5 h-3.5"
                      />
                      <span>{dOption}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto border border-[#E9E9E9] rounded-xl bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] body-sm-medium subtext">
                <th
                  onClick={() => handleSort("id")}
                  className="py-3 px-4 w-12 cursor-pointer hover:bg-gray-50 select-none"
                >
                  No.
                </th>
                {[
                  { label: "Customer Name", key: "name" },
                  { label: "Phone Number", key: "phone" },
                  { label: "Payment", key: "payment" },
                  { label: "Total Order", key: "orders" },
                  { label: "Last Order", key: "lastOrder" },
                  { label: "Total Spend", key: "spend" },
                  { label: "Area", key: "area" },
                ].map((column) => (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column.key)}
                    className="py-3 px-4 cursor-pointer hover:bg-gray-50 select-none"
                  >
                    <div className="flex items-center space-x-1.5">
                      <span>{column.label}</span>
                      <svg
                        width="8"
                        height="11"
                        viewBox="0 0 8 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                      >
                        <path
                          d="M6.96059 6.16555C7.18034 6.3853 7.18034 6.74157 6.96059 6.96132L3.96059 9.96132C3.85109 10.0708 3.70707 10.1263 3.56307 10.1263C3.41907 10.1263 3.27504 10.0716 3.16554 9.96132L0.165545 6.96132C-0.0542051 6.74157 -0.0542051 6.3853 0.165545 6.16555C0.385295 5.9458 0.741571 5.9458 0.961321 6.16555L3.5638 8.76802L6.16628 6.16555C6.38528 5.9458 6.74084 5.9458 6.96059 6.16555ZM0.960589 3.96059L3.56307 1.35811L6.16555 3.96059C6.27505 4.07009 6.41907 4.12557 6.56307 4.12557C6.70707 4.12557 6.85109 4.07084 6.96059 3.96059C7.18034 3.74084 7.18034 3.38456 6.96059 3.16481L3.96059 0.164813C3.74084 -0.0549375 3.38456 -0.0549375 3.16481 0.164813L0.164813 3.16481C-0.0549375 3.38456 -0.0549375 3.74084 0.164813 3.96059C0.384563 4.18034 0.740839 4.18034 0.960589 3.96059Z"
                          fill={
                            sortConfig.key === column.key
                              ? "#E05613"
                              : "#9CA3AF"
                          }
                        />
                      </svg>
                    </div>
                  </th>
                ))}
                <th className="py-3 px-4 text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="body-sm-medium primary-text divide-y divide-[#E5E7EB]">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer, idx) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-[#FAFAFA]/40 transition"
                  >
                    <td className="py-3.5 px-4">
                      <span className="py-1.5 px-2.5 border border-[#E5E7EB] rounded-lg bg-white">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 flex items-center space-x-3  ">
                      <div className="w-8 h-8 bg-[#F3F4F6] rounded-full overflow-hidden flex items-center justify-center border border-[#E5E7EB] shrink-0">
                        {(customer as any).image_url ? (
                          <Image
                            src={(customer as any).image_url}
                            alt={customer.name}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full rounded-full"
                          />
                        ) : (
                          <span className="text-xs font-bold text-[#4B5563]">
                            {customer.name.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <span>{customer.name}</span>
                    </td>

                    <td className="py-3.5 px-4 text-[#4B5563]">
                      {customer.phone}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getPaymentBadgeStyle(customer.payment)}`}
                      >
                        {customer.payment}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium">
                      {customer.orders}
                    </td>
                    <td className="py-3.5 px-4 ]">
                      {customer.lastOrder}
                    </td>
                    <td className="py-3.5 px-4 ">
                      ${customer.spend.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="t">
                        {customer.area}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="w-[46px] h-[25px] flex items-center justify-center gap-[10px] bg-[#FFEDE6] text-[#F74608] rounded-[4px] py-[2px] px-[8px] text-[14px] font-normal tracking-[-0.01em] leading-[150%] text-center opacity-100 transition-all "
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-10 text-sm text-[#9CA3AF]"
                  >
                    No customers found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center mt-5 text-xs text-[#6B7280]">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-[#E5E7EB] rounded-lg px-2 py-1 bg-white font-medium outline-none text-[#111827] cursor-pointer"
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
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:hover:bg-transparent transition"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 flex items-center justify-center rounded-lg border font-semibold transition-all ${
                  currentPage === page
                    ? "bg-[#E05613] text-white border-[#E05613] shadow-sm"
                    : "bg-white text-[#4B5563] border-[#E5E7EB] hover:bg-[#F9FAFB]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 disabled:hover:bg-transparent transition"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDetailsSidebar
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
